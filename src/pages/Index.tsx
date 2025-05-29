
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ProductionDashboard } from "@/components/ProductionDashboard"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1">
          {/* 頂部導航欄 */}
          <header className="border-b bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-industrial-blue-800">生產儀表板</h1>
                  <p className="text-sm text-gray-600">
                    歡迎回來，{new Date().toLocaleDateString('zh-TW', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      weekday: 'long'
                    })}
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

          {/* 主要內容區域 */}
          <div className="p-6">
            <ProductionDashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
