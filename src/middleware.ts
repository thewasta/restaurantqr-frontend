import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import * as jose from 'jose';

const base64Secret = process.env.JWT_SECRET as string;
const secret = Buffer.from(base64Secret, 'base64');
export async function middleware(req: NextRequest) {
    const cookieStore = cookies();
    const jwtToken = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_NAME as string);
    let isAuthenticated = false;
    if (jwtToken?.value) {
        try {
            const decode  = await jose.jwtVerify(jwtToken.value, secret);
            if (decode.payload) {
                isAuthenticated = true;
            }
        }catch (e) {
            isAuthenticated = false;
        }
    }

    const url = req.nextUrl.clone();

    if (req.nextUrl.pathname === '/') {
        if (isAuthenticated) {
            url.pathname = '/dashboard/home';
            return NextResponse.redirect(url);
        } else {
            url.pathname = '/dashboard/auth/login';
            return NextResponse.redirect(url);
        }
    }
    // Protegemos rutas que comienzan con '/dashboard/'
    if (req.nextUrl.pathname.startsWith('/dashboard') && !req.nextUrl.pathname.startsWith('/dashboard/auth')) {
        if (!isAuthenticated) {
            url.pathname = '/dashboard/auth/login';
            return NextResponse.redirect(url);
        }
    }
    // Redirigimos a usuarios autenticados que intentan visitar '/auth/login'
    else if (req.nextUrl.pathname.startsWith('/dashboard/auth/login') && isAuthenticated) {
        url.pathname = '/dashboard/home'; // todo redirect to `/dashboard/` instead of `/dashboard/home`
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/api/:path*',
        '/auth/:path*'
    ]
}