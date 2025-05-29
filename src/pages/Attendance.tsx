
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Clock, UserCheck } from "lucide-react"

const Attendance = () => {
  const attendanceData = [
    {
      employee: "張小明",
      department: "生產線A",
      status: "出勤",
      checkIn: "08:00",
      checkOut: "17:30",
      hours: "8.5",
      date: "2024-05-29"
    },
    {
      employee: "李小華",
      department: "生產線B", 
      status: "請假",
      checkIn: "-",
      checkOut: "-",
      hours: "0",
      date: "2024-05-29"
    },
    {
      employee: "王小美",
      department: "品管部",
      status: "出勤",
      checkIn: "08:15",
      checkOut: "17:45",
      hours: "8.5",
      date: "2024-05-29"
    },
    {
      employee: "陳小強",
      department: "生產線C",
      status: "遲到",
      checkIn: "08:30",
      checkOut: "17:30",
      hours: "8.0",
      date: "2024-05-29"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "出勤":
        return <Badge className="bg-green-100 text-green-800">出勤</Badge>
      case "請假":
        return <Badge className="bg-yellow-100 text-yellow-800">請假</Badge>
      case "遲到":
        return <Badge className="bg-red-100 text-red-800">遲到</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">員工假勤管理</h1>
                  <p className="text-sm text-gray-600">
                    管理部門員工的出勤記錄和請假申請
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <UserCheck className="h-4 w-4 mr-2" />
                  簽到
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  請假申請
                </Button>
                <NotificationBell />
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* 今日統計 */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">總員工數</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">今日出勤</CardTitle>
                  <Clock className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">22</div>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">請假人數</CardTitle>
                  <Calendar className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">遲到人數</CardTitle>
                  <Clock className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">1</div>
                </CardContent>
              </Card>
            </div>

            {/* 出勤記錄表 */}
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>今日出勤記錄</CardTitle>
                <CardDescription>部門員工出勤狀況一覽</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">員工姓名</th>
                        <th className="text-left p-2">部門</th>
                        <th className="text-left p-2">狀態</th>
                        <th className="text-left p-2">上班時間</th>
                        <th className="text-left p-2">下班時間</th>
                        <th className="text-left p-2">工作時數</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((record, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{record.employee}</td>
                          <td className="p-2">{record.department}</td>
                          <td className="p-2">{getStatusBadge(record.status)}</td>
                          <td className="p-2">{record.checkIn}</td>
                          <td className="p-2">{record.checkOut}</td>
                          <td className="p-2">{record.hours}h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Attendance
