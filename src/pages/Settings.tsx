
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Settings as SettingsIcon, Users, Key, ExternalLink, Plus, Edit, Trash2, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("password")
  const [users, setUsers] = useState([
    { id: 1, name: "張小明", email: "zhang@company.com", position: "操作員", department: "生產部", permissionLevel: 100 },
    { id: 2, name: "李小華", email: "li@company.com", position: "組長", department: "品保部", permissionLevel: 200 },
    { id: 3, name: "王小美", email: "wang@company.com", position: "主管", department: "製造部", permissionLevel: 300 }
  ])

  // 其他部門連結
  const [departmentLinks, setDepartmentLinks] = useState([
    { id: 1, title: "人事部系統", url: "#", description: "員工資料管理" },
    { id: 2, title: "財務部系統", url: "#", description: "預算與成本" },
    { id: 3, title: "採購部系統", url: "#", description: "供應商管理" },
    { id: 4, title: "研發部系統", url: "#", description: "產品開發" }
  ])

  // 常用連結
  const [commonLinks, setCommonLinks] = useState([
    { id: 1, title: "公司內網", url: "#", description: "內部資訊平台" },
    { id: 2, title: "員工手冊", url: "#", description: "制度規範" },
    { id: 3, title: "表單下載", url: "#", description: "常用表單" },
    { id: 4, title: "IT支援", url: "#", description: "技術協助" }
  ])

  const [newDepartmentLink, setNewDepartmentLink] = useState({ title: "", url: "", description: "" })
  const [newCommonLink, setNewCommonLink] = useState({ title: "", url: "", description: "" })
  const [editingDepartmentLink, setEditingDepartmentLink] = useState<number | null>(null)
  const [editingCommonLink, setEditingCommonLink] = useState<number | null>(null)

  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false)
  const [showAddCommonForm, setShowAddCommonForm] = useState(false)

  const handlePasswordReset = (userId: number) => {
    console.log(`重置用戶 ${userId} 的密碼`)
    // 實際應用中會調用 API
  }

  const handlePermissionChange = (userId: number, newLevel: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, permissionLevel: newLevel } : user
    ))
  }

  const addDepartmentLink = () => {
    if (newDepartmentLink.title && newDepartmentLink.url) {
      setDepartmentLinks([...departmentLinks, {
        id: Date.now(),
        ...newDepartmentLink
      }])
      setNewDepartmentLink({ title: "", url: "", description: "" })
      setShowAddDepartmentForm(false)
    }
  }

  const addCommonLink = () => {
    if (newCommonLink.title && newCommonLink.url) {
      setCommonLinks([...commonLinks, {
        id: Date.now(),
        ...newCommonLink
      }])
      setNewCommonLink({ title: "", url: "", description: "" })
      setShowAddCommonForm(false)
    }
  }

  const deleteDepartmentLink = (id: number) => {
    setDepartmentLinks(departmentLinks.filter(link => link.id !== id))
  }

  const deleteCommonLink = (id: number) => {
    setCommonLinks(commonLinks.filter(link => link.id !== id))
  }

  const renderPasswordManagement = () => (
    <Card className="production-card">
      <CardHeader>
        <CardTitle>密碼管理</CardTitle>
        <CardDescription>管理員可重置指定用戶密碼</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email} | {user.position}</div>
              </div>
              <Button onClick={() => handlePasswordReset(user.id)} variant="outline" size="sm">
                <Key className="h-4 w-4 mr-2" />
                重置密碼
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderPermissionManagement = () => (
    <Card className="production-card">
      <CardHeader>
        <CardTitle>權限設定</CardTitle>
        <CardDescription>設定用戶系統權限等級</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">{user.position} | {user.department}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={user.permissionLevel >= 300 ? "default" : user.permissionLevel >= 200 ? "secondary" : "outline"}>
                  等級 {user.permissionLevel}
                </Badge>
                <Select 
                  value={user.permissionLevel.toString()} 
                  onValueChange={(value) => handlePermissionChange(user.id, parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">一般用戶</SelectItem>
                    <SelectItem value="200">主管</SelectItem>
                    <SelectItem value="300">管理員</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderLinkManagement = (
    title: string,
    links: typeof departmentLinks,
    newLink: typeof newDepartmentLink,
    setNewLink: typeof setNewDepartmentLink,
    showAddForm: boolean,
    setShowAddForm: typeof setShowAddDepartmentForm,
    addLink: typeof addDepartmentLink,
    deleteLink: typeof deleteDepartmentLink,
    editingId: number | null,
    setEditingId: typeof setEditingDepartmentLink
  ) => (
    <Card className="production-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Button onClick={() => setShowAddForm(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            新增連結
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <div className="mb-4 p-4 border rounded-lg space-y-3">
            <Input
              placeholder="連結標題"
              value={newLink.title}
              onChange={(e) => setNewLink({...newLink, title: e.target.value})}
            />
            <Input
              placeholder="連結網址"
              value={newLink.url}
              onChange={(e) => setNewLink({...newLink, url: e.target.value})}
            />
            <Input
              placeholder="連結描述"
              value={newLink.description}
              onChange={(e) => setNewLink({...newLink, description: e.target.value})}
            />
            <div className="flex gap-2">
              <Button onClick={addLink} size="sm">
                <Save className="h-4 w-4 mr-2" />
                儲存
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                取消
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{link.title}</div>
                <div className="text-sm text-gray-500">{link.description}</div>
                <div className="text-xs text-blue-600">{link.url}</div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setEditingId(link.id)} variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button onClick={() => deleteLink(link.id)} variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

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
                  <p className="text-sm text-gray-600">管理系統功能與用戶權限</p>
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
            {/* 功能選項卡 */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={activeTab === "password" ? "default" : "outline"}
                onClick={() => setActiveTab("password")}
              >
                密碼管理
              </Button>
              <Button
                variant={activeTab === "permissions" ? "default" : "outline"}
                onClick={() => setActiveTab("permissions")}
              >
                權限設定
              </Button>
              <Button
                variant={activeTab === "department-links" ? "default" : "outline"}
                onClick={() => setActiveTab("department-links")}
              >
                其他部門連結
              </Button>
              <Button
                variant={activeTab === "common-links" ? "default" : "outline"}
                onClick={() => setActiveTab("common-links")}
              >
                常用連結
              </Button>
            </div>

            {/* 內容區域 */}
            {activeTab === "password" && renderPasswordManagement()}
            {activeTab === "permissions" && renderPermissionManagement()}
            {activeTab === "department-links" && renderLinkManagement(
              "其他部門連結設定",
              departmentLinks,
              newDepartmentLink,
              setNewDepartmentLink,
              showAddDepartmentForm,
              setShowAddDepartmentForm,
              addDepartmentLink,
              deleteDepartmentLink,
              editingDepartmentLink,
              setEditingDepartmentLink
            )}
            {activeTab === "common-links" && renderLinkManagement(
              "常用連結設定",
              commonLinks,
              newCommonLink,
              setNewCommonLink,
              showAddCommonForm,
              setShowAddCommonForm,
              addCommonLink,
              deleteCommonLink,
              editingCommonLink,
              setEditingCommonLink
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Settings
