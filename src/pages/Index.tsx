
import { useState, useEffect } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, LogOut, Search, Settings, Users, BarChart3, Wrench, ExternalLink } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { SystemCard } from "@/components/SystemCard"
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel"
import { SystemSearch } from "@/components/SystemSearch"
import { EmergencyContact } from "@/components/EmergencyContact"
import { useNavigate } from "react-router-dom"

// 模擬系統功能資料
const mockSystems = [
  { reportNo: 1, reportItem: "生產計劃 vs 實際", reportType: "生產資訊報表", url: "/production-reports/plan-actual", description: "即時監控生產進度", owner: "張三", visible: 1, unloginFlag: 1, browseCnt: 234 },
  { reportNo: 2, reportItem: "設備效率分析", reportType: "生產資訊報表", url: "/production-reports/efficiency", description: "設備OEE分析", owner: "李四", visible: 1, unloginFlag: 0, browseCnt: 156 },
  { reportNo: 3, reportItem: "員工出勤管理", reportType: "人員管理", url: "/attendance", description: "考勤統計與假單管理", owner: "王五", visible: 1, unloginFlag: 0, browseCnt: 98 },
  { reportNo: 4, reportItem: "品質檢驗記錄", reportType: "輔助生產系統", url: "#", description: "產品品質追蹤", owner: "趙六", visible: 1, unloginFlag: 1, browseCnt: 187 },
  { reportNo: 5, reportItem: "工單排程系統", reportType: "輔助生產系統", url: "#", description: "生產排程管理", owner: "陳七", visible: 1, unloginFlag: 0, browseCnt: 143 },
  { reportNo: 6, reportItem: "庫存管理系統", reportType: "其他系統", url: "#", description: "原料與成品庫存", owner: "劉八", visible: 1, unloginFlag: 0, browseCnt: 76 }
]

const emergencyContacts = [
  { name: "值班經理", phone: "1234", department: "管理部" },
  { name: "安全主管", phone: "5678", department: "安全組" },
  { name: "維修組長", phone: "9101", department: "維修組" },
  { name: "品保主管", phone: "1213", department: "品保組" }
]

const Index = () => {
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState(mockSystems)
  const [selectedCategory, setSelectedCategory] = useState("全部")

  const categories = ["全部", "生產資訊報表", "輔助生產系統", "人員管理", "其他系統"]

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(mockSystems)
      return
    }
    
    const filtered = mockSystems.filter(system => 
      system.reportItem.toLowerCase().includes(query.toLowerCase()) ||
      system.description?.toLowerCase().includes(query.toLowerCase()) ||
      system.reportType.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filtered)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === "全部") {
      setSearchResults(mockSystems)
    } else {
      setSearchResults(mockSystems.filter(system => system.reportType === category))
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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
                    {isLoggedIn ? `歡迎回來，${user?.wname} (${user?.position})` : "訪客模式 - 部分功能需要登入使用"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {isLoggedIn ? (
                  <>
                    <NotificationBell />
                    <Button variant="outline" size="icon" onClick={() => navigate('/profile')}>
                      <User className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      登出
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => navigate('/login')}>
                    登入
                  </Button>
                )}
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* 搜尋區域 */}
            <Card className="production-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  系統功能搜尋
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SystemSearch onSearch={handleSearch} />
              </CardContent>
            </Card>

            {/* 公告輪播與緊急聯絡 */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold mb-4">重點公告</h2>
                <AnnouncementCarousel />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">緊急聯絡</h2>
                <div className="grid grid-cols-2 gap-3">
                  {emergencyContacts.map((contact, index) => (
                    <EmergencyContact key={index} {...contact} />
                  ))}
                </div>
              </div>
            </div>

            {/* 分類篩選 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* 系統功能列表 */}
            <div>
              <h2 className="text-lg font-semibold mb-4">系統功能</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((system) => (
                  <SystemCard 
                    key={system.reportNo} 
                    {...system} 
                    visible={!!system.visible}
                    isLoggedIn={isLoggedIn}
                  />
                ))}
              </div>
            </div>

            {/* 快速連結區域 */}
            {isLoggedIn && (
              <div>
                <h2 className="text-lg font-semibold mb-4">我的最愛</h2>
                <Card className="production-card">
                  <CardContent className="p-6">
                    <p className="text-gray-600 text-center">
                      點擊系統卡片上的星號來添加到我的最愛
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
