"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Home,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  DollarSign,
  Shield,
  FileText,
  AlertTriangle,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "/avatars/john-smith.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Recent Activity",
          url: "/dashboard/activity",
        },
        {
          title: "Quick Actions",
          url: "/dashboard/quick-actions",
        },
      ],
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: Wallet,
      items: [
        {
          title: "Checking Account",
          url: "/accounts/checking",
        },
        {
          title: "Savings Account",
          url: "/accounts/savings",
        },
        {
          title: "Credit Cards",
          url: "/accounts/credit-cards",
        },
        {
          title: "Investment Accounts",
          url: "/accounts/investments",
        },
      ],
    },
    {
      title: "Transfers",
      url: "/transfers",
      icon: ArrowLeftRight,
      items: [
        {
          title: "Between Accounts",
          url: "/transfers/internal",
        },
        {
          title: "To Other Banks",
          url: "/transfers/external",
        },
        {
          title: "International",
          url: "/transfers/international",
        },
        {
          title: "Scheduled Transfers",
          url: "/transfers/scheduled",
        },
      ],
    },
    {
      title: "Payments",
      url: "/payments",
      icon: DollarSign,
      items: [
        {
          title: "Bill Pay",
          url: "/payments/bills",
        },
        {
          title: "Credit Card Payments",
          url: "/payments/credit-cards",
        },
        {
          title: "Loan Payments",
          url: "/payments/loans",
        },
        {
          title: "Payment History",
          url: "/payments/history",
        },
      ],
    },
    {
      title: "Security",
      url: "/security",
      icon: Shield,
      items: [
        {
          title: "Security Settings",
          url: "/security/settings",
        },
        {
          title: "Two-Factor Auth",
          url: "/security/2fa",
        },
        {
          title: "Device Management",
          url: "/security/devices",
        },
        {
          title: "Security Alerts",
          url: "/security/alerts",
        },
      ],
    },
    {
      title: "Statements",
      url: "/statements",
      icon: FileText,
      items: [
        {
          title: "Account Statements",
          url: "/statements/accounts",
        },
        {
          title: "Credit Card Statements",
          url: "/statements/credit-cards",
        },
        {
          title: "Tax Documents",
          url: "/statements/tax",
        },
        {
          title: "Download Center",
          url: "/statements/download",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "File a Complaint",
      url: "/complaint",
      icon: AlertTriangle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-blue-600 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Citi Bank</span>
                  <span className="truncate text-xs">Online Banking</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
