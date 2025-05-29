
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Calendar, Save } from "lucide-react"

const Profile = () => {
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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">個人資訊</h1>
                  <p className="text-sm text-gray-600">
                    管理您的個人資訊和帳戶設定
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

          <div className="p-6 max-w-4xl mx-auto space-y-6">
            {/* 個人頭像區 */}
            <Card className="production-card">
              <CardHeader>
                <CardTitle>個人檔案</CardTitle>
                <CardDescription>更新您的個人資訊和聯絡方式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-lg">張明</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">張小明</h3>
                    <p className="text-gray-600">生產線主管</p>
                    <Button variant="outline" size="sm">
                      更換頭像
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 基本資訊 */}
            <Card className="production-card">
              <CardHeader>
                <CardTitle>基本資訊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" defaultValue="張小明" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-id">員工編號</Label>
                    <Input id="employee-id" defaultValue="EMP001" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">部門</Label>
                    <Input id="department" defaultValue="生產製造部" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">職位</Label>
                    <Input id="position" defaultValue="生產線主管" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 聯絡資訊 */}
            <Card className="production-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  聯絡資訊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">電子郵件</Label>
                    <Input id="email" type="email" defaultValue="zhang.ming@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">手機號碼</Label>
                    <Input id="phone" defaultValue="0912-345-678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="extension">分機號碼</Label>
                    <Input id="extension" defaultValue="1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-contact">緊急聯絡人</Label>
                    <Input id="emergency-contact" defaultValue="王小美 (0987-654-321)" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">地址</Label>
                  <Input id="address" defaultValue="台北市信義區信義路五段7號" />
                </div>
              </CardContent>
            </Card>

            {/* 工作資訊 */}
            <Card className="production-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  工作資訊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">到職日期</Label>
                    <Input id="start-date" defaultValue="2020-03-15" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="work-years">年資</Label>
                    <Input id="work-years" defaultValue="4年2個月" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supervisor">直屬主管</Label>
                    <Input id="supervisor" defaultValue="李部長" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">工作地點</Label>
                    <Input id="location" defaultValue="生產廠區A棟" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 儲存按鈕 */}
            <div className="flex justify-end gap-4">
              <Button variant="outline">取消</Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                儲存變更
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Profile
