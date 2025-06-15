
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { User, Save, Search, Shield, Users } from "lucide-react"

interface UserData {
  wnum: string
  wname: string
  site: string
  stage: string
  position: string
  position_lv: number
  department: string
  shift: string
  email: string
  phone: string
}

const mockUsers: UserData[] = [
  {
    wnum: "E001",
    wname: "張三",
    site: "廠區A",
    stage: "生產線1",
    position: "作業員",
    position_lv: 100,
    department: "生產製造部",
    shift: "白班",
    email: "zhang@company.com",
    phone: "0912-345-678"
  },
  {
    wnum: "E002",
    wname: "李四",
    site: "廠區B",
    stage: "生產線2",
    position: "組長",
    position_lv: 200,
    department: "生產製造部",
    shift: "夜班",
    email: "li@company.com",
    phone: "0923-456-789"
  }
]

const UserSettings = () => {
  const { user, hasPermission } = useAuth()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [editData, setEditData] = useState<Partial<UserData>>({})

  // 檢查權限
  if (!hasPermission(200)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">您沒有權限訪問此頁面</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const filteredUsers = mockUsers.filter(u => 
    u.wname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.wnum.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUserSelect = (userData: UserData) => {
    setSelectedUser(userData)
    setEditData(userData)
  }

  const handleSave = () => {
    if (!selectedUser) return

    console.log("更新用戶資料:", editData)
    toast({
      title: "儲存成功",
      description: `已更新 ${selectedUser.wname} 的個人資料`
    })
  }

  const positions = [
    "作業員", "技術員", "領班", "組長", "課長", "副理", "經理", "副總", "總經理"
  ]

  const shifts = ["白班", "夜班", "輪班"]
  const sites = ["廠區A", "廠區B", "廠區C", "辦公大樓", "倉庫區"]

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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">使用者登入設定</h1>
                  <p className="text-sm text-gray-600">管理員工個人資料與工作資訊</p>
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

          <div className="p-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* 用戶搜尋列表 */}
              <div className="lg:col-span-1">
                <Card className="production-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      員工列表
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="搜尋員工..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {filteredUsers.map((userData) => (
                      <Card 
                        key={userData.wnum}
                        className={`p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                          selectedUser?.wnum === userData.wnum ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => handleUserSelect(userData)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{userData.wname}</div>
                            <div className="text-sm text-gray-500">{userData.wnum}</div>
                            <div className="text-xs text-gray-400">{userData.department}</div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="text-xs">
                              {userData.position}
                            </Badge>
                            <div className="text-xs text-gray-500 mt-1">{userData.site}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* 用戶資料編輯 */}
              <div className="lg:col-span-2">
                {selectedUser ? (
                  <Card className="production-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        編輯員工資料 - {selectedUser.wname}
                      </CardTitle>
                      <CardDescription>
                        修改員工的基本資料和工作資訊
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="basic" className="space-y-4">
                        <TabsList>
                          <TabsTrigger value="basic">基本資料</TabsTrigger>
                          <TabsTrigger value="work">工作資訊</TabsTrigger>
                          <TabsTrigger value="contact">聯絡資訊</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="wnum">員工編號</Label>
                              <Input
                                id="wnum"
                                value={editData.wnum || ""}
                                onChange={(e) => setEditData(prev => ({ ...prev, wnum: e.target.value }))}
                                disabled
                                className="bg-gray-50"
                              />
                            </div>
                            <div>
                              <Label htmlFor="wname">姓名</Label>
                              <Input
                                id="wname"
                                value={editData.wname || ""}
                                onChange={(e) => setEditData(prev => ({ ...prev, wname: e.target.value }))}
                              />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="work" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="position">職稱</Label>
                              <Select
                                value={editData.position || ""}
                                onValueChange={(value) => setEditData(prev => ({ ...prev, position: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {positions.map((pos) => (
                                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="shift">班別</Label>
                              <Select
                                value={editData.shift || ""}
                                onValueChange={(value) => setEditData(prev => ({ ...prev, shift: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {shifts.map((shift) => (
                                    <SelectItem key={shift} value={shift}>{shift}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="site">工作地點</Label>
                              <Select
                                value={editData.site || ""}
                                onValueChange={(value) => setEditData(prev => ({ ...prev, site: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {sites.map((site) => (
                                    <SelectItem key={site} value={site}>{site}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="stage">生產線/部門</Label>
                              <Input
                                id="stage"
                                value={editData.stage || ""}
                                onChange={(e) => setEditData(prev => ({ ...prev, stage: e.target.value }))}
                              />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="contact" className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <Label htmlFor="email">電子郵件</Label>
                              <Input
                                id="email"
                                type="email"
                                value={editData.email || ""}
                                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">聯絡電話</Label>
                              <Input
                                id="phone"
                                value={editData.phone || ""}
                                onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                              />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline">
                          取消
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          儲存變更
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="production-card">
                    <CardContent className="p-8 text-center text-gray-500">
                      <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>請從左側列表選擇要編輯的員工</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default UserSettings
