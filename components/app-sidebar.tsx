import {
    Sidebar,
    SidebarContent,
    // SidebarFooter,
    // SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, TicketsIcon } from "lucide-react";
import Link from "next/link";

// Menu items
const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'Reservations',
        url: '/reservations',
        icon: TicketsIcon
    }
]

const AppSideBar = () => {
    return (
        <Sidebar collapsible="icon" variant="sidebar" className="overflow-hidden bg-black">
            {/* <SidebarHeader /> */}
            <SidebarContent className="bg-red-800">
                <SidebarGroup >
                    <SidebarGroupLabel>
                        NextJs Dashboard
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                items.map(item => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            {/* <SidebarFooter /> */}
        </Sidebar>
    )
}

export default AppSideBar;