import Stripe from "stripe";
import {
    deletePriceRecord,
    deleteProductRecord,
    manageSubscriptionStatusChange,
    updatePaymentTokenStatus,
    upsertPriceRecord,
    upsertProductRecord
} from "@/_lib/supabase/admin";
import {stripe} from "@/_lib/stripe/config";
import {NextResponse} from "next/server";
import * as Sentry from '@sentry/nextjs';

const stripeEvents = new Set([
    'product.created',
    'product.updated',
    'product.deleted',
    'price.created',
    'price.updated',
    'price.deleted',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted'
]);


export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature') as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;
    try {
        if (!sig || !webhookSecret) {
            Sentry.captureException('Webhook Secret not found.');
            return NextResponse.json({error: `Webhook secret not found`}, {status: 400});
        }
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        return NextResponse.json({error: `Webhook Error: ${err.message}`}, {status: 400});
    }


    if (!stripeEvents.has(event.type)) {
        return NextResponse.json({error: `Event not supported: ${event.type}`}, {status: 400});
    }

    try {
        switch (event.type) {
            case 'product.created':
            case 'product.updated':
                await upsertProductRecord(event.data.object as Stripe.Product);
                break;
            case 'price.created':
            case 'price.updated':
                await upsertPriceRecord(event.data.object as Stripe.Price);
                break;
            case 'price.deleted':
                await deletePriceRecord(event.data.object as Stripe.Price);
                break;
            case 'product.deleted':
                await deleteProductRecord(event.data.object as Stripe.Product);
                break;
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                const subscription = event.data.object as Stripe.Subscription;
                await manageSubscriptionStatusChange(
                    subscription.id,
                    subscription.customer as string,
                    event.type === 'customer.subscription.created'
                );
                break;
            case 'checkout.session.completed':
                const checkoutSession = event.data.object as Stripe.Checkout.Session;
                if (checkoutSession.mode === 'subscription') {
                    const subscriptionId = checkoutSession.subscription;
                    await manageSubscriptionStatusChange(
                        subscriptionId as string,
                        checkoutSession.customer as string,
                        true
                    );
                    await updatePaymentTokenStatus(checkoutSession.id);
                }
                break;
            default:
                return NextResponse.json({error: `Event not supported: ${event.type}`}, {status: 400});
        }
    } catch (error: any) {
        Sentry.captureException(error, {
            level: "fatal"
        });
        return NextResponse.json({error: 'Webhook signature verification failed.'}, {status: 400});
    }

    return NextResponse.json({received: true}, {status: 200});

}

export async function GET(request: Request) {
    return new NextResponse(
        JSON.stringify({message: `Método ${request.method} no permitido`}),
        {
            status: 405,
            headers: {
                'Allow': 'POST',
                'Content-Type': 'application/json'
            }
        }
    );
}

export async function PUT(request: Request) {
    return new NextResponse(
        JSON.stringify({message: `Método ${request.method} no permitido`}),
        {
            status: 405,
            headers: {
                'Allow': 'POST',
                'Content-Type': 'application/json'
            }
        }
    );
}

export async function DELETE(request: Request) {
    return new NextResponse(
        JSON.stringify({message: `Método ${request.method} no permitido`}),
        {
            status: 405,
            headers: {
                'Allow': 'POST',
                'Content-Type': 'application/json'
            }
        }
    );
}

export async function PATCH(request: Request) {
    return new NextResponse(
        JSON.stringify({message: `Método ${request.method} no permitido`}),
        {
            status: 405,
            headers: {
                'Allow': 'POST',
                'Content-Type': 'application/json'
            }
        }
    );
}