
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { Settings as SettingsIcon, User, Lock, Shield, Link, Plus, Edit, Trash2, Save } from "lucide-react"

interface QuickLink {
  id: number
  title: string
  url: string
  description?: string
  category: "common" | "department"
}

interface UserPermission {
  wnum: string
  wname: string
  currentLevel: number
  permissions: string[]
}

const mockLinks: QuickLink[] = [
  { id: 1, title: "公司內網", url: "http://intranet.company.com", description: "內部資訊平台", category: "common" },
  { id: 2, title: "員工手冊", url: "http://handbook.company.com", description: "制度規範", category: "common" },
  { id: 3, title: "人事部系統", url: "http://hr.company.com", description: "員工資料管理", category: "department" },
  { id: 4, title: "財務部系統", url: "http://finance.company.com", description: "預算與成本", category: "department" }
]

const mockUsers: UserPermission[] = [
  { wnum: "E001", wname: "張三", currentLevel: 100, permissions: ["查看報表", "考勤管理"] },
  { wnum: "E002", wname: "李四", currentLevel: 200, permissions: ["查看報表", "考勤管理", "人員管理"] }
]

const Settings = () => {
  const { user, hasPermission } = useAuth()
  const { toast } = useToast()
  const [links, setLinks] = useState<QuickLink[]>(mockLinks)
  const [users] = useState<UserPermission[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [linkForm, setLinkForm] = useState({ title: "", url: "", description: "", category: "common" as const })
  const [editingLink, setEditingLink] = useState<QuickLink | null>(null)
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)

  // 檢查管理員權限
  if (!hasPermission(300)) {
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

  const handlePasswordReset = () => {
    if (!selectedUser) {
      toast({
        title: "錯誤",
        description: "請選擇要重設密碼的用戶",
        variant: "destructive"
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "錯誤",
        description: "兩次輸入的密碼不一致",
        variant: "destructive"
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "錯誤",
        description: "密碼長度至少需要6個字符",
        variant: "destructive"
      })
      return
    }

    console.log("重設密碼:", { user: selectedUser, password: newPassword })
    
    toast({
      title: "密碼重設成功",
      description: `已為用戶 ${selectedUser} 重設密碼`
    })
    
    setSelectedUser("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleLinkSave = () => {
    if (!linkForm.title || !linkForm.url) {
      toast({
        title: "錯誤",
        description: "請填寫標題和連結",
        variant: "destructive"
      })
      return
    }

    if (editingLink) {
      setLinks(prev => prev.map(link => 
        link.id === editingLink.id 
          ? { ...editingLink, ...linkForm }
          : link
      ))
      toast({
        title: "連結已更新",
        description: `已更新連結 "${linkForm.title}"`
      })
    } else {
      const newLink: QuickLink = {
        id: Date.now(),
        ...linkForm
      }
      setLinks(prev => [...prev, newLink])
      toast({
        title: "連結已新增",
        description: `已新增連結 "${linkForm.title}"`
      })
    }

    setLinkForm({ title: "", url: "", description: "", category: "common" })
    setEditingLink(null)
    setIsLinkDialogOpen(false)
  }

  const handleLinkEdit = (link: QuickLink) => {
    setLinkForm({
      title: link.title,
      url: link.url,
      description: link.description || "",
      category: link.category
    })
    setEditingLink(link)
    setIsLinkDialogOpen(true)
  }

  const handleLinkDelete = (id: number) => {
    setLinks(prev => prev.filter(link => link.id !== id))
    toast({
      title: "連結已刪除",
      description: "連結已從系統中移除"
    })
  }

  const commonLinks = links.filter(link => link.category === "common")
  const departmentLinks = links.filter(link => link.category === "department")

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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">系統設定</h1>
                  <p className="text-sm text-gray-600">管理系統功能和用戶權限</p>
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
            <Tabs defaultValue="password" className="space-y-6">
              <TabsList>
                <TabsTrigger value="password">密碼管理</TabsTrigger>
                <TabsTrigger value="permissions">權限設定</TabsTrigger>
                <TabsTrigger value="common-links">常用連結</TabsTrigger>
                <TabsTrigger value="dept-links">部門連結</TabsTrigger>
              </TabsList>

              {/* 密碼管理 */}
              <TabsContent value="password">
                <Card className="production-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      重設用戶密碼
                    </CardTitle>
                    <CardDescription>
                      管理員可以為指定用戶重設登入密碼
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="user-select">選擇用戶</Label>
                      <select
                        id="user-select"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                      >
                        <option value="">請選擇用戶</option>
                        {users.map(user => (
                          <option key={user.wnum} value={user.wnum}>
                            {user.wname} ({user.wnum})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="new-password">新密碼</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="輸入新密碼"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">確認密碼</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="再次輸入新密碼"
                        />
                      </div>
                    </div>
                    
                    <Button onClick={handlePasswordReset} disabled={!selectedUser || !newPassword}>
                      <Lock className="h-4 w-4 mr-2" />
                      重設密碼
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 權限設定 */}
              <TabsContent value="permissions">
                <Card className="production-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      用戶權限管理
                    </CardTitle>
                    <CardDescription>
                      設定用戶的系統使用權限
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map(user => (
                        <Card key={user.wnum} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{user.wname}</div>
                              <div className="text-sm text-gray-500">員工編號: {user.wnum}</div>
                              <div className="flex gap-2 mt-2">
                                {user.permissions.map(perm => (
                                  <Badge key={perm} variant="secondary">{perm}</Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={user.currentLevel >= 300 ? "default" : "secondary"}>
                                等級 {user.currentLevel}
                              </Badge>
                              <div className="mt-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-2" />
                                  編輯權限
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 常用連結 */}
              <TabsContent value="common-links">
                <Card className="production-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link className="h-5 w-5" />
                        常用連結管理
                      </div>
                      <Button
                        onClick={() => {
                          setLinkForm({ title: "", url: "", description: "", category: "common" })
                          setEditingLink(null)
                          setIsLinkDialogOpen(true)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        新增連結
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      管理首頁顯示的常用連結
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {commonLinks.map(link => (
                        <Card key={link.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{link.title}</div>
                              <div className="text-sm text-gray-500">{link.url}</div>
                              {link.description && (
                                <div className="text-xs text-gray-400 mt-1">{link.description}</div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleLinkEdit(link)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleLinkDelete(link.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 部門連結 */}
              <TabsContent value="dept-links">
                <Card className="production-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link className="h-5 w-5" />
                        其他部門連結
                      </div>
                      <Button
                        onClick={() => {
                          setLinkForm({ title: "", url: "", description: "", category: "department" })
                          setEditingLink(null)
                          setIsLinkDialogOpen(true)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        新增連結
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      管理首頁顯示的其他部門系統連結
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {departmentLinks.map(link => (
                        <Card key={link.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{link.title}</div>
                              <div className="text-sm text-gray-500">{link.url}</div>
                              {link.description && (
                                <div className="text-xs text-gray-400 mt-1">{link.description}</div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleLinkEdit(link)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleLinkDelete(link.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* 連結編輯對話框 */}
          <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLink ? "編輯連結" : "新增連結"}</DialogTitle>
                <DialogDescription>
                  填寫連結資訊
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="link-title">標題</Label>
                  <Input
                    id="link-title"
                    value={linkForm.title}
                    onChange={(e) => setLinkForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="輸入連結標題"
                  />
                </div>
                
                <div>
                  <Label htmlFor="link-url">連結</Label>
                  <Input
                    id="link-url"
                    value={linkForm.url}
                    onChange={(e) => setLinkForm(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="http://example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="link-description">描述 (選填)</Label>
                  <Textarea
                    id="link-description"
                    value={linkForm.description}
                    onChange={(e) => setLinkForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="連結描述"
                    rows={2}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleLinkSave}>
                  <Save className="h-4 w-4 mr-2" />
                  儲存
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Settings
