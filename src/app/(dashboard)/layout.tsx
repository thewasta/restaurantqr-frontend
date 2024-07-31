import type {Metadata} from "next";
import React, {Suspense} from "react";
import SidebarComponent from "@/components/navbar/sidebar";
import Loading from "@/app/(dashboard)/loading";
import {DashboardHeader} from "@/components/navbar/DashboardHeader";
import {ScrollArea} from "@/components/ui/scroll-area";

export const metadata: Metadata = {
    title: "Click2Eat | Panel",
    description: "Gestiona tu restaurante de forma sencilla",
};
export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    //const responsiveBreakpoint: string = "sm:bg-indigo-500 md:bg-red-600 lg:bg-green-300 xl:bg-blue-600 2xl:bg-gray-800";
    return (
        <Suspense fallback={<Loading/>}>
            <div className={"min-h-screen grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7"}>
                <SidebarComponent/>
                <div
                    className={"lg:col-span-6 md:col-span-4 col-span-1 md:grid-cols-3"}>
                    {/* Header   */}
                    <DashboardHeader/>
                    {/*Dashboard content*/}
                    <ScrollArea className={"h-[calc(90vh+30px)]"}>
                        <div className={"p-12"}>
                            {children}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </Suspense>
    );
}