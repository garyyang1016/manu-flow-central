
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Clock, Calendar, BarChart3, FileText } from "lucide-react"

const WorkHours = () => {
  const workHoursData = [
    {
      employee: "張小明",
      department: "生產線A",
      regularHours: "160",
      overtimeHours: "12",
      totalHours: "172",
      efficiency: "105%",
      month: "2024-05"
    },
    {
      employee: "李小華",
      department: "生產線B", 
      regularHours: "152",
      overtimeHours: "8",
      totalHours: "160",
      efficiency: "98%",
      month: "2024-05"
    },
    {
      employee: "王小美",
      department: "品管部",
      regularHours: "168",
      overtimeHours: "15",
      totalHours: "183",
      efficiency: "112%",
      month: "2024-05"
    },
    {
      employee: "陳小強",
      department: "生產線C",
      regularHours: "145",
      overtimeHours: "5",
      totalHours: "150",
      efficiency: "92%",
      month: "2024-05"
    }
  ]

  const getEfficiencyBadge = (efficiency: string) => {
    const value = parseInt(efficiency)
    if (value >= 110) return <Badge className="bg-green-100 text-green-800">{efficiency}</Badge>
    if (value >= 100) return <Badge className="bg-blue-100 text-blue-800">{efficiency}</Badge>
    if (value >= 90) return <Badge className="bg-yellow-100 text-yellow-800">{efficiency}</Badge>
    return <Badge className="bg-red-100 text-red-800">{efficiency}</Badge>
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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">作業時數管理</h1>
                  <p className="text-sm text-gray-600">
                    員工工時統計與生產效率分析
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  匯出報表
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  設定時數
                </Button>
                <NotificationBell />
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* 工時統計概覽 */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">月平均工時</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">166.25</div>
                  <p className="text-xs text-muted-foreground">小時</p>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">總加班時數</CardTitle>
                  <BarChart3 className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">40</div>
                  <p className="text-xs text-muted-foreground">小時</p>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">平均效率</CardTitle>
                  <BarChart3 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">101.8%</div>
                  <p className="text-xs text-muted-foreground">生產效率</p>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">參與人數</CardTitle>
                  <User className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <p className="text-xs text-muted-foreground">名員工</p>
                </CardContent>
              </Card>
            </div>

            {/* 個人工時詳細記錄 */}
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>個人工時記錄</CardTitle>
                <CardDescription>員工月度工時統計與效率分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">員工姓名</th>
                        <th className="text-left p-2">部門</th>
                        <th className="text-left p-2">正常工時</th>
                        <th className="text-left p-2">加班時數</th>
                        <th className="text-left p-2">總工時</th>
                        <th className="text-left p-2">生產效率</th>
                        <th className="text-left p-2">統計月份</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workHoursData.map((record, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{record.employee}</td>
                          <td className="p-2">{record.department}</td>
                          <td className="p-2">{record.regularHours}h</td>
                          <td className="p-2 text-orange-600 font-medium">{record.overtimeHours}h</td>
                          <td className="p-2 font-semibold">{record.totalHours}h</td>
                          <td className="p-2">{getEfficiencyBadge(record.efficiency)}</td>
                          <td className="p-2">{record.month}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* 工時分析圖表區域 */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>部門工時分布</CardTitle>
                  <CardDescription>各部門月度總工時統計</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    [工時分布圖表區域]
                  </div>
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader>
                  <CardTitle>效率趨勢分析</CardTitle>
                  <CardDescription>生產效率月度變化趨勢</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    [效率趨勢圖表區域]
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default WorkHours
