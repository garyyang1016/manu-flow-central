
import { useState, useEffect } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, LogOut, Settings, Users, BarChart3, Wrench, ExternalLink } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { SystemCard } from "@/components/SystemCard"
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel"
import { EnhancedEmergencyContact } from "@/components/EnhancedEmergencyContact"
import { ProductionSummary } from "@/components/ProductionSummary"
import { useNavigate } from "react-router-dom"

// 模擬系統功能資料
const mockSystems = [
  { reportNo: 1, reportItem: "生產計劃 vs 實際", reportType: "生產資訊報表", url: "/production-reports/plan-actual", description: "即時監控生產進度", owner: "張三", visible: 1, unloginFlag: 1, browseCnt: 234 },
  { reportNo: 2, reportItem: "設備效率分析", reportType: "生產資訊報表", url: "/production-reports/efficiency", description: "設備OEE分析", owner: "李四", visible: 1, unloginFlag: 0, browseCnt: 156 },
  { reportNo: 3, reportItem: "員工出勤管理", reportType: "人員管理", url: "/attendance", description: "考勤統計與假單管理", owner: "王五", visible: 1, unloginFlag: 0, browseCnt: 98 },
  { reportNo: 4, reportItem: "作業時數管理", reportType: "人員管理", url: "/work-hours", description: "員工工時統計與管理", owner: "趙六", visible: 1, unloginFlag: 0, browseCnt: 67 },
  { reportNo: 5, reportItem: "人員問題反映", reportType: "人員管理", url: "/hr-issues", description: "員工意見與問題回報", owner: "陳七", visible: 1, unloginFlag: 0, browseCnt: 43 },
  { reportNo: 6, reportItem: "使用者登入設定", reportType: "人員管理", url: "/user-settings", description: "員工個資與工作設定", owner: "劉八", visible: 1, unloginFlag: 0, browseCnt: 89 },
  { reportNo: 7, reportItem: "申請使用者帳號", reportType: "系統功能", url: "/user-registration", description: "新用戶註冊申請", owner: "陳九", visible: 1, unloginFlag: 1, browseCnt: 127 },
  { reportNo: 9, reportItem: "品質檢驗記錄", reportType: "輔助生產系統", url: "#", description: "產品品質追蹤", owner: "劉八", visible: 1, unloginFlag: 1, browseCnt: 187 },
  { reportNo: 10, reportItem: "工單排程系統", reportType: "輔助生產系統", url: "#", description: "生產排程管理", owner: "林九", visible: 1, unloginFlag: 0, browseCnt: 143 },
  { reportNo: 11, reportItem: "庫存管理系統", reportType: "其他系統", url: "#", description: "原料與成品庫存", owner: "黃十", visible: 1, unloginFlag: 0, browseCnt: 76 }
]

const Index = () => {
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

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
            {/* 重點公告與快速連結 */}
            <div className="grid gap-6 lg:grid-cols-7">
              {/* 重點公告輪播 - 3:4 比例 */}
              <div className="lg:col-span-4">
                <h2 className="text-lg font-semibold mb-4">重點公告</h2>
                <AnnouncementCarousel />
              </div>
              
              {/* 快速連結與緊急聯絡 */}
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold mb-4">快速連結與緊急聯絡</h2>
                <EnhancedEmergencyContact />
              </div>
            </div>

            {/* 生產概況 */}
            <div>
              <h2 className="text-lg font-semibold mb-4">生產概況</h2>
              <ProductionSummary />
            </div>

            {/* 系統功能列表 */}
            <div>
              <h2 className="text-lg font-semibold mb-4">系統功能</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockSystems.map((system) => (
                  <div key={system.reportNo}>
                    <SystemCard 
                      {...system} 
                      visible={!!system.visible}
                      unloginFlag={!!system.unloginFlag}
                      isLoggedIn={isLoggedIn}
                    />
                  </div>
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
