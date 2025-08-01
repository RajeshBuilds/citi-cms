import * as React from "react"
import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isComplaintButton = item.title === "File a Complaint"
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  size={isComplaintButton ? "lg" : "sm"}
                  className={isComplaintButton ? 
                    "bg-red-600 hover:bg-red-700 text-white border border-red-500 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold" : 
                    ""
                  }
                >
                  <a href={item.url}>
                    <item.icon className={isComplaintButton ? "text-white" : ""} />
                    <span className={isComplaintButton ? "text-white font-medium" : ""}>
                      {item.title}
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
