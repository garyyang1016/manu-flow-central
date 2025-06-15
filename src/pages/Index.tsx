
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { ProductionDashboard } from "@/components/ProductionDashboard"
import { ProductionSummary } from "@/components/ProductionSummary"
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel"
import { SystemSearch } from "@/components/SystemSearch"
import { EmergencyContact } from "@/components/EmergencyContact"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1">
          <header className="border-b bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-industrial-blue-800">生產製造部管理系統</h1>
                  <p className="text-sm text-gray-600">
                    歡迎使用生產管理與監控平台
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <NotificationBell />
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* 系統搜尋 */}
            <SystemSearch />

            <div className="grid gap-6 lg:grid-cols-3">
              {/* 左側：生產總覽 */}
              <div className="lg:col-span-2 space-y-6">
                <ProductionDashboard />
                <ProductionSummary />
              </div>

              {/* 右側：公告和緊急聯絡 */}
              <div className="space-y-6">
                <AnnouncementCarousel />
                <EmergencyContact />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
