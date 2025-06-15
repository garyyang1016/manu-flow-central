
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, MessageSquare, Plus, Send, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const HRIssues = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    priority: "中"
  })

  const issuesData = [
    {
      id: 1,
      title: "工作環境噪音過大",
      category: "工作環境",
      reporter: "張小明",
      status: "處理中",
      priority: "高",
      createDate: "2024-05-28",
      description: "生產線A區域機器噪音超過標準，影響工作效率"
    },
    {
      id: 2,
      title: "休息室冷氣故障",
      category: "設施維護",
      reporter: "李小華",
      status: "已解決",
      priority: "中",
      createDate: "2024-05-27",
      description: "員工休息室冷氣無法正常運作"
    },
    {
      id: 3,
      title: "加班費計算問題",
      category: "薪資福利",
      reporter: "王小美",
      status: "待處理",
      priority: "高",
      createDate: "2024-05-26",
      description: "本月加班費計算似乎有誤，請協助確認"
    },
    {
      id: 4,
      title: "建議增設員工停車位",
      category: "員工建議",
      reporter: "陳小強",
      status: "評估中",
      priority: "低",
      createDate: "2024-05-25",
      description: "目前停車位不足，建議增設員工專用停車區域"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "已解決":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />已解決</Badge>
      case "處理中":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />處理中</Badge>
      case "評估中":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />評估中</Badge>
      case "待處理":
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />待處理</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "高":
        return <Badge variant="destructive">高</Badge>
      case "中":
        return <Badge className="bg-yellow-100 text-yellow-800">中</Badge>
      case "低":
        return <Badge className="bg-gray-100 text-gray-800">低</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("提交問題反映:", formData)
    // 這裡可以添加提交邏輯
    setShowForm(false)
    setFormData({ title: "", category: "", description: "", priority: "中" })
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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">人員問題反映</h1>
                  <p className="text-sm text-gray-600">
                    員工意見回饋與問題處理追蹤
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button onClick={() => setShowForm(!showForm)}>
                  <Plus className="h-4 w-4 mr-2" />
                  新增問題反映
                </Button>
                <NotificationBell />
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* 統計概覽 */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">總問題數</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">本月累計</p>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">待處理</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <p className="text-xs text-muted-foreground">需要處理</p>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">處理中</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <p className="text-xs text-muted-foreground">正在處理</p>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">已解決</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">16</div>
                  <p className="text-xs text-muted-foreground">完成處理</p>
                </CardContent>
              </Card>
            </div>

            {/* 新增問題表單 */}
            {showForm && (
              <Card className="production-card">
                <CardHeader>
                  <CardTitle>新增問題反映</CardTitle>
                  <CardDescription>請詳細描述您遇到的問題或建議</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">問題標題</label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="請輸入問題標題"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">問題分類</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          required
                        >
                          <option value="">請選擇分類</option>
                          <option value="工作環境">工作環境</option>
                          <option value="設施維護">設施維護</option>
                          <option value="薪資福利">薪資福利</option>
                          <option value="員工建議">員工建議</option>
                          <option value="其他">其他</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">問題描述</label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="請詳細描述問題內容..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        取消
                      </Button>
                      <Button type="submit">
                        <Send className="h-4 w-4 mr-2" />
                        提交
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* 問題列表 */}
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>問題反映記錄</CardTitle>
                <CardDescription>員工問題反映與處理狀況追蹤</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {issuesData.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{issue.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {getPriorityBadge(issue.priority)}
                          {getStatusBadge(issue.status)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span>反映人: {issue.reporter}</span>
                          <span>分類: {issue.category}</span>
                        </div>
                        <span>建立時間: {issue.createDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default HRIssues
