'use client';

import { ReactElement } from "react";

import AppSidebar from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

type PropsType = {
    children: ReactElement | ReactElement[]
}

const headers = [
    {
        title: 'Dashboard',
        url: '/dashboard'
    }, 
    {
        title: 'Reservations',
        url: '/reservations'
    }, 
]

const Template = ({ children }: PropsType) => {
    const pathname = usePathname();
    const title = headers.find(item => item.url === pathname)?.title;

    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h1 className="text-3xl font-bold">{title}</h1>
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Template;