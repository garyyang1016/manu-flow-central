
import { Building2, BarChart3, Users, User, Bell, Calendar, Settings } from "lucide-react"
import { useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "生產儀表板",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "生產報表",
    url: "/production-reports",
    icon: BarChart3,
    submenu: [
      { title: "計劃 vs 實際", url: "/production-reports/plan-actual" },
      { title: "投入產出", url: "/production-reports/input-output" },
      { title: "良率分析", url: "/production-reports/yield" },
      { title: "設備效率", url: "/production-reports/efficiency" }
    ]
  },
  {
    title: "員工假勤",
    url: "/attendance",
    icon: Calendar,
  },
  {
    title: "個人資訊",
    url: "/profile",
    icon: User,
  },
  {
    title: "公告中心",
    url: "/announcements",
    icon: Bell,
  },
  {
    title: "系統設定",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <Building2 className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">生產製造部</h2>
            <p className="text-sm text-sidebar-foreground/70">管理系統</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">主要功能</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-sidebar-accent"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.submenu && location.pathname.startsWith('/production-reports') && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <SidebarMenuButton 
                          key={subItem.title}
                          asChild
                          size="sm"
                          isActive={location.pathname === subItem.url}
                          className="hover:bg-sidebar-accent"
                        >
                          <a href={subItem.url} className="text-sm">
                            {subItem.title}
                          </a>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="text-xs text-sidebar-foreground/70">
          製造部管理系統 v2.1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
