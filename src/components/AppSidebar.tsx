
import { Building2, BarChart3, Users, User, Bell, Calendar, Settings, LogIn, Clock, MessageSquare, Shield, UserPlus, Search, FileText } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
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

export function AppSidebar() {
  const location = useLocation()
  const { isLoggedIn, user, hasPermission } = useAuth()

  const menuItems = [
    {
      title: "系統首頁",
      url: "/",
      icon: BarChart3,
      requireAuth: false
    },
    {
      title: "系統功能搜尋",
      url: "/#search",
      icon: Search,
      requireAuth: false
    },
    {
      title: "生產報表",
      url: "/production-reports",
      icon: BarChart3,
      requireAuth: false,
      submenu: [
        { title: "Summary", url: "/production-reports?category=Summary" },
        { title: "Material", url: "/production-reports?category=Material" },
        { title: "Feol", url: "/production-reports?category=Feol" },
        { title: "Beol", url: "/production-reports?category=Beol" }
      ]
    },
    {
      title: "人員管理",
      url: "/attendance",
      icon: Users,
      requireAuth: true,
      submenu: [
        { title: "員工假勤", url: "/attendance" },
        { title: "請假申請", url: "/leave-application" },
        { title: "作業時數管理", url: "/work-hours" },
        { title: "人員問題反映", url: "/hr-issues" },
        { title: "使用者登入設定", url: "/user-settings" }
      ]
    },
    {
      title: "個人資訊",
      url: "/profile",
      icon: User,
      requireAuth: true
    },
    {
      title: "公告中心",
      url: "/announcements",
      icon: Bell,
      requireAuth: false,
      submenu: hasPermission(300) ? [
        { title: "查看公告", url: "/announcements" },
        { title: "公告管理", url: "/announcements/admin" }
      ] : undefined
    },
    {
      title: "申請帳號",
      url: "/user-registration",
      icon: UserPlus,
      requireAuth: false
    },
    {
      title: "系統設定",
      url: "/settings",
      icon: Settings,
      requireAuth: true,
      permissionLevel: 300
    },
  ]

  const availableMenuItems = menuItems.filter(item => {
    if (item.requireAuth && !isLoggedIn) return false
    if (item.permissionLevel && !hasPermission(item.permissionLevel)) return false
    return true
  })

  const handleSearchClick = () => {
    // 聚焦到搜尋框
    setTimeout(() => {
      const searchInput = document.querySelector('input[placeholder="搜尋系統功能..."]') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
        searchInput.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

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
        {isLoggedIn && user && (
          <div className="mt-3 p-2 bg-sidebar-accent rounded-md">
            <p className="text-sm text-sidebar-foreground font-medium">{user.wname}</p>
            <p className="text-xs text-sidebar-foreground/70">{user.position} | {user.site}</p>
            {hasPermission(300) && (
              <div className="flex items-center gap-1 mt-1">
                <Shield className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">管理員</span>
              </div>
            )}
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">主要功能</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {!isLoggedIn && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-sidebar-accent">
                    <a href="/login" className="flex items-center gap-3">
                      <LogIn className="h-5 w-5" />
                      <span>登入系統</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {availableMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-sidebar-accent"
                  >
                    {item.url === "/#search" ? (
                      <button onClick={handleSearchClick} className="flex items-center gap-3 w-full text-left">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                  {item.submenu && (
                    (location.pathname.startsWith('/production-reports') && item.url === '/production-reports') ||
                    (location.pathname.startsWith('/attendance') || location.pathname.startsWith('/leave-application') || location.pathname.startsWith('/work-hours') || location.pathname.startsWith('/hr-issues') || location.pathname.startsWith('/user-settings')) && item.url === '/attendance' ||
                    (location.pathname.startsWith('/announcements') && item.url === '/announcements')
                  ) && (
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
        {!isLoggedIn && (
          <div className="text-xs text-sidebar-foreground/50 mt-1">
            訪客模式 - 功能受限
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
