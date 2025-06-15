
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Download, Calendar, Filter, FileText, Clock, User as UserIcon } from "lucide-react"

const ProductionReports = () => {
  const [selectedCategory, setSelectedCategory] = useState("Summary")

  const categories = ["Summary", "Material", "Feol", "Beol"]

  const reportsData = {
    Summary: [
      {
        title: "生產總覽儀表板",
        description: "整體生產狀況與KPI監控",
        lastUpdated: "2024-05-29",
        type: "即時報表",
        updateFreq: "每小時",
        reviewer: "生產主管",
        logic: "彙整各產線資料，計算OEE與良率"
      },
      {
        title: "月度生產總結",
        description: "月度生產績效統計分析",
        lastUpdated: "2024-05-28",
        type: "月報表",
        updateFreq: "每月",
        reviewer: "廠長",
        logic: "統計月度產量、良率、效率指標"
      }
    ],
    Material: [
      {
        title: "原料投入分析",
        description: "原物料使用效率與損耗分析",
        lastUpdated: "2024-05-29",
        type: "日報表",
        updateFreq: "每日",
        reviewer: "物料主管",
        logic: "計算原料投入產出比，分析損耗原因"
      },
      {
        title: "庫存水位監控",
        description: "原料庫存狀況與安全庫存預警",
        lastUpdated: "2024-05-29",
        type: "即時報表",
        updateFreq: "每小時",
        reviewer: "倉管主管",
        logic: "監控庫存水位，低於安全庫存自動預警"
      },
      {
        title: "供應商交期分析",
        description: "供應商準時交貨率統計",
        lastUpdated: "2024-05-27",
        type: "週報表",
        updateFreq: "每週",
        reviewer: "採購主管",
        logic: "統計各供應商交期準確率與延遲原因"
      }
    ],
    Feol: [
      {
        title: "前段製程良率",
        description: "Feol製程各站點良率分析",
        lastUpdated: "2024-05-29",
        type: "即時報表",
        updateFreq: "每小時",
        reviewer: "Feol主管",
        logic: "計算各製程站點良率，識別異常站點"
      },
      {
        title: "設備稼動率分析",
        description: "Feol設備運行效率統計",
        lastUpdated: "2024-05-29",
        type: "日報表",
        updateFreq: "每日",
        reviewer: "設備工程師",
        logic: "統計設備運行時間與停機原因分析"
      },
      {
        title: "製程參數監控",
        description: "關鍵製程參數趨勢分析",
        lastUpdated: "2024-05-28",
        type: "即時報表",
        updateFreq: "即時",
        reviewer: "製程工程師",
        logic: "監控溫度、壓力等關鍵參數變化"
      }
    ],
    Beol: [
      {
        title: "後段製程良率",
        description: "Beol製程良率與缺陷分析",
        lastUpdated: "2024-05-29",
        type: "即時報表",
        updateFreq: "每小時",
        reviewer: "Beol主管",
        logic: "追蹤後段製程良率，分析主要缺陷類型"
      },
      {
        title: "封裝測試報告",
        description: "封裝與最終測試結果統計",
        lastUpdated: "2024-05-28",
        type: "日報表",
        updateFreq: "每日",
        reviewer: "測試工程師",
        logic: "統計封裝良率與測試通過率"
      },
      {
        title: "出貨品質報告",
        description: "最終產品品質與客戶回饋",
        lastUpdated: "2024-05-27",
        type: "週報表",
        updateFreq: "每週",
        reviewer: "品保主管",
        logic: "彙整出貨品質數據與客戶反饋"
      }
    ]
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "即時報表":
        return "bg-green-100 text-green-800"
      case "日報表":
        return "bg-blue-100 text-blue-800"
      case "週報表":
        return "bg-yellow-100 text-yellow-800"
      case "月報表":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">生產報表</h1>
                  <p className="text-sm text-gray-600">
                    查看和下載各種生產分析報表
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  篩選
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  日期範圍
                </Button>
                <NotificationBell />
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* 分類選擇 */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* 報表列表 */}
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {reportsData[selectedCategory as keyof typeof reportsData].map((report, index) => (
                <Card key={index} className="production-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {report.description}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* 基本資訊 */}
                    <div className="flex items-center justify-between text-sm">
                      <Badge className={getTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                      <span className="text-gray-600">更新: {report.lastUpdated}</span>
                    </div>

                    {/* 詳細資訊 */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">更新頻率:</span>
                        <span className="font-medium">{report.updateFreq}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">審核者:</span>
                        <span className="font-medium">{report.reviewer}</span>
                      </div>
                    </div>

                    {/* 檢視邏輯 */}
                    <div className="border-t pt-3">
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <span className="text-gray-600">檢視邏輯:</span>
                          <p className="text-gray-700 mt-1">{report.logic}</p>
                        </div>
                      </div>
                    </div>

                    {/* 操作按鈕 */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        查看報表
                      </Button>
                      <Button variant="outline" size="sm">
                        設定
                      </Button>
                      <Button variant="outline" size="sm">
                        排程
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default ProductionReports
