
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Download, Calendar, Filter } from "lucide-react"

const ProductionReports = () => {
  const reports = [
    {
      title: "計劃 vs 實際產量",
      description: "分析生產計劃與實際執行的差異",
      lastUpdated: "2024-05-29",
      type: "月報表"
    },
    {
      title: "投入產出分析",
      description: "原料投入與成品產出效率分析",
      lastUpdated: "2024-05-29",
      type: "週報表"
    },
    {
      title: "良率分析報告",
      description: "產品良率趨勢與品質控制報告",
      lastUpdated: "2024-05-28",
      type: "日報表"
    },
    {
      title: "設備效率報告",
      description: "各生產線設備運行效率統計",
      lastUpdated: "2024-05-29",
      type: "即時報表"
    }
  ]

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

          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {reports.map((report, index) => (
                <Card key={index} className="production-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
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
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>類型: {report.type}</span>
                      <span>更新: {report.lastUpdated}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1">
                        查看報表
                      </Button>
                      <Button variant="outline" size="sm">
                        設定
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
