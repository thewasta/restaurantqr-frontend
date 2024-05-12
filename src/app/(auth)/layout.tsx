import React from "react";
import type {Metadata} from "next";
import {RegisterAccountContextProvider} from "@/lib/context/auth/register-account-context";

export const metadata: Metadata = {
    title: "Click2Eat | Iniciar Sesión",
    description: "Generated by create next restaurant",
};
export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="w-full h-screen flex items-start">
                <RegisterAccountContextProvider>
                    {children}
                </RegisterAccountContextProvider>
            </div>
        </main>
    );
}