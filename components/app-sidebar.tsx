"use client"

import * as React from "react"
import {
  Home,
  LayoutDashboard,
  Tickets,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      // isActive: true,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      // isActive: true,
    },
    {
      title: "Reservations",
      url: "/reservations",
      icon: Tickets,
      // isActive: true,
    },
  ],
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" {...props} >
      <SidebarHeader className="p-5">
        <h2 className="text-xl">NextJS Dashboard</h2>
      </SidebarHeader>
      <SidebarContent className="px-5 text-sm">
        {
          data.navMain.map(item => (
              <Link key={item.title} href={item.url} className="flex items-center gap-3 border rounded-xl border-transparent hover:border-[hsl(var(----border))] transition-all p-2">
                {item.icon && <item.icon />}
                {item.title}
              </Link>
          ))
        }
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
