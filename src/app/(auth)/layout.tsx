import React, {Suspense} from "react";
import type {Metadata} from "next";
import {RegisterAccountContextProvider} from "@/lib/context/auth/register-account-context";
import {Loader} from "lucide-react";
import Image from "next/image";
import MiddleLeftSide from "@/components/auth/middleLeftSide";
import MiddleRightSide from "@/components/auth/middleRigthSide";

export const metadata: Metadata = {
    title: "Click2Eat | Acceso panel",
    description: "Gestiona tu restaurante de forma sencilla",
};
export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="w-full h-screen flex items-start">
                <RegisterAccountContextProvider>
                    <MiddleLeftSide>
                        <Suspense fallback={<Loader/>}>
                            <Image
                                src="/assets/auth_main.avif"
                                alt=""
                                width={852}
                                height={520}
                                className="w-full h-full object-cover"
                            />
                        </Suspense>
                    </MiddleLeftSide>
                    <MiddleRightSide customClass="justify-center flex gap-5">
                        {children}
                    </MiddleRightSide>
                </RegisterAccountContextProvider>
            </div>
        </main>
    );
}