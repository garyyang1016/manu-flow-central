
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { ProductionDashboard } from "@/components/ProductionDashboard"
import { ProductionSummary } from "@/components/ProductionSummary"
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel"
import { Button } from "@/components/ui/button"
import { User, Phone, ExternalLink, Star, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// 緊急聯絡人資料
const emergencyContacts = [
  { name: "值班經理", phone: "1234", department: "管理部" },
  { name: "安全主管", phone: "5678", department: "安全組" },
  { name: "維修組長", phone: "9101", department: "維修組" },
  { name: "品保主管", phone: "1213", department: "品保組" },
  { name: "廠務主管", phone: "1415", department: "廠務組" },
  { name: "環安人員", phone: "1617", department: "環安組" }
]

// 常用連結資料
const commonLinks = [
  { title: "人事系統", url: "#", description: "員工資料管理" },
  { title: "採購系統", url: "#", description: "供應商管理" },
  { title: "品保系統", url: "#", description: "品質管理" },
  { title: "財務系統", url: "#", description: "預算成本" },
  { title: "庫存系統", url: "#", description: "倉庫管理" },
  { title: "維修系統", url: "#", description: "設備維護" }
]

// 我的最愛連結
const favoriteLinks = [
  { title: "生產報表", url: "/production-reports", icon: "📊" },
  { title: "製程教學", url: "/process-training", icon: "📚" },
  { title: "請假申請", url: "/leave-application", icon: "📝" },
  { title: "出勤管理", url: "/attendance", icon: "⏰" },
  { title: "公告中心", url: "/announcements", icon: "📢" },
  { title: "個人資料", url: "/profile", icon: "👤" }
]

const Index = () => {
  const [emergencyExpanded, setEmergencyExpanded] = useState(false)
  const [linksExpanded, setLinksExpanded] = useState(false)

  const displayedEmergencyContacts = emergencyExpanded ? emergencyContacts : emergencyContacts.slice(0, 4)
  const displayedCommonLinks = linksExpanded ? commonLinks : commonLinks.slice(0, 4)

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
            {/* 頂部區域：公告輪播、常用連結、緊急聯絡 */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* 公告輪播 - 4:3 比例 */}
              <div className="lg:col-span-1">
                <div className="aspect-[4/3]">
                  <AnnouncementCarousel />
                </div>
              </div>

              {/* 常用連結 */}
              <div>
                <Card className="production-card h-full">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">常用連結</h3>
                    <div className="space-y-2">
                      {displayedCommonLinks.map((link, index) => (
                        <Card key={index} className="production-card p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">{link.title}</div>
                              <div className="text-xs text-gray-500">{link.description}</div>
                            </div>
                            <ExternalLink className="h-3 w-3 text-gray-400" />
                          </div>
                        </Card>
                      ))}
                      {commonLinks.length > 4 && (
                        <Collapsible open={linksExpanded} onOpenChange={setLinksExpanded}>
                          <CollapsibleTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              {linksExpanded ? (
                                <>
                                  <ChevronUp className="h-4 w-4 mr-2" />
                                  收起
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4 mr-2" />
                                  展開更多 ({commonLinks.length - 4})
                                </>
                              )}
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-2 mt-2">
                            {commonLinks.slice(4).map((link, index) => (
                              <Card key={index + 4} className="production-card p-3 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-medium">{link.title}</div>
                                    <div className="text-xs text-gray-500">{link.description}</div>
                                  </div>
                                  <ExternalLink className="h-3 w-3 text-gray-400" />
                                </div>
                              </Card>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 緊急聯絡 */}
              <div>
                <Card className="production-card h-full">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">緊急聯絡</h3>
                    <div className="space-y-2">
                      {displayedEmergencyContacts.map((contact, index) => (
                        <Card key={index} className="production-card p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-industrial-orange-100 rounded-full flex items-center justify-center">
                              <Phone className="h-4 w-4 text-industrial-orange-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{contact.name}</div>
                              <div className="text-xs text-gray-500">{contact.department}</div>
                            </div>
                            <div className="text-xs font-bold text-industrial-orange-600">{contact.phone}</div>
                          </div>
                        </Card>
                      ))}
                      {emergencyContacts.length > 4 && (
                        <Collapsible open={emergencyExpanded} onOpenChange={setEmergencyExpanded}>
                          <CollapsibleTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              {emergencyExpanded ? (
                                <>
                                  <ChevronUp className="h-4 w-4 mr-2" />
                                  收起
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4 mr-2" />
                                  展開更多 ({emergencyContacts.length - 4})
                                </>
                              )}
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-2 mt-2">
                            {emergencyContacts.slice(4).map((contact, index) => (
                              <Card key={index + 4} className="production-card p-3 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-industrial-orange-100 rounded-full flex items-center justify-center">
                                    <Phone className="h-4 w-4 text-industrial-orange-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium">{contact.name}</div>
                                    <div className="text-xs text-gray-500">{contact.department}</div>
                                  </div>
                                  <div className="text-xs font-bold text-industrial-orange-600">{contact.phone}</div>
                                </div>
                              </Card>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 中區：生產資訊圖表與數值 */}
            <div className="space-y-6">
              <ProductionSummary />
              <ProductionDashboard />
            </div>

            {/* 底部：我的最愛連結 */}
            <Card className="production-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  我的最愛
                </h3>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                  {favoriteLinks.map((link, index) => (
                    <Card key={index} className="production-card hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{link.icon}</div>
                        <div className="text-sm font-medium">{link.title}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
