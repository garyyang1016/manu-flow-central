
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { ProductionDashboard } from "@/components/ProductionDashboard"
import { ProductionSummary } from "@/components/ProductionSummary"
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel"
import { SystemSearch } from "@/components/SystemSearch"
import { Button } from "@/components/ui/button"
import { User, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// 緊急聯絡人資料
const emergencyContacts = [
  { name: "值班經理", phone: "1234", department: "管理部" },
  { name: "安全主管", phone: "5678", department: "安全組" },
  { name: "維修組長", phone: "9101", department: "維修組" },
  { name: "品保主管", phone: "1213", department: "品保組" },
  { name: "廠務主管", phone: "1415", department: "廠務組" },
  { name: "環安人員", phone: "1617", department: "環安組" }
]

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
                
                {/* 緊急聯絡 */}
                <Card className="production-card">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">緊急聯絡</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {emergencyContacts.map((contact, index) => (
                        <Card key={index} className="production-card w-full h-28 hover:shadow-lg transition-shadow cursor-pointer">
                          <CardContent className="p-2 h-full flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 bg-industrial-orange-100 rounded-full flex items-center justify-center mb-1">
                              <Phone className="h-5 w-5 text-industrial-orange-600" />
                            </div>
                            <div className="text-xs font-medium text-gray-800 leading-tight">{contact.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{contact.department}</div>
                            <div className="text-xs font-bold text-industrial-orange-600 mt-1">{contact.phone}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
