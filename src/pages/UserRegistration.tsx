
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, Mail, Phone, Building, User } from "lucide-react"

const UserRegistration = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    wname: "",
    email: "",
    phone: "",
    department: "",
    gender: "",
    position: "",
    site: "",
    reason: ""
  })

  const departments = [
    "生產製造部", "品質保證部", "工程部", "維修部", "倉儲部", 
    "人事部", "財務部", "採購部", "資訊部", "環安部"
  ]

  const positions = [
    "作業員", "技術員", "領班", "組長", "課長", "副理", "經理", "副總", "總經理"
  ]

  const sites = [
    "廠區A", "廠區B", "廠區C", "辦公大樓", "倉庫區"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 驗證必填欄位
    if (!formData.wname || !formData.email || !formData.phone || !formData.department) {
      toast({
        title: "錯誤",
        description: "請填寫所有必填欄位",
        variant: "destructive"
      })
      return
    }

    // 模擬提交申請
    console.log("用戶申請資料:", formData)
    
    toast({
      title: "申請已提交",
      description: "您的申請已送出，請等待管理員審核。審核結果將透過Email通知。"
    })

    // 清空表單
    setFormData({
      wname: "",
      email: "",
      phone: "",
      department: "",
      gender: "",
      position: "",
      site: "",
      reason: ""
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1">
          <header className="border-b bg-white px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-industrial-blue-800">申請使用者帳號</h1>
                <p className="text-sm text-gray-600">填寫個人資料申請系統使用權限</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <Card className="production-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    用戶申請表單
                  </CardTitle>
                  <CardDescription>
                    請完整填寫以下資料，管理員將會審核您的申請並開通帳號
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="wname">姓名 *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="wname"
                            value={formData.wname}
                            onChange={(e) => handleInputChange("wname", e.target.value)}
                            placeholder="請輸入真實姓名"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="gender">性別</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="請選擇性別" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">男</SelectItem>
                            <SelectItem value="female">女</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">電子郵件 *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="example@company.com"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">聯絡電話 *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="0900-000-000"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="department">部門 *</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="請選擇部門" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="position">職稱</Label>
                        <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="請選擇職稱" />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map((pos) => (
                              <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="site">工作地點</Label>
                      <Select value={formData.site} onValueChange={(value) => handleInputChange("site", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="請選擇工作地點" />
                        </SelectTrigger>
                        <SelectContent>
                          {sites.map((site) => (
                            <SelectItem key={site} value={site}>{site}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="reason">申請原因</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => handleInputChange("reason", e.target.value)}
                        placeholder="請說明申請系統使用權限的原因"
                        rows={3}
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">注意事項：</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• 請確保填寫資料的真實性和準確性</li>
                        <li>• 申請提交後，管理員將在3個工作日內審核</li>
                        <li>• 審核結果將透過您提供的電子郵件通知</li>
                        <li>• 如有疑問，請聯絡系統管理員</li>
                      </ul>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline">
                        重設表單
                      </Button>
                      <Button type="submit">
                        提交申請
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default UserRegistration
