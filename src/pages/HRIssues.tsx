
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, MessageSquare, Plus, Send, AlertTriangle, CheckCircle, Clock, Reply, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const HRIssues = () => {
  const [showForm, setShowForm] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    priority: "中"
  })
  const [replyText, setReplyText] = useState("")

  const categories = ["全部", "工作環境", "設施維護", "薪資福利", "員工建議", "其他"]

  const [issuesData, setIssuesData] = useState([
    {
      id: 1,
      title: "工作環境噪音過大",
      category: "工作環境",
      reporter: "張小明",
      status: "處理中",
      priority: "高",
      createDate: "2024-05-28",
      description: "生產線A區域機器噪音超過標準，影響工作效率",
      replies: [
        { id: 1, author: "人事主管", content: "已安排環安人員現場測量", date: "2024-05-29" }
      ]
    },
    {
      id: 2,
      title: "休息室冷氣故障",
      category: "設施維護",
      reporter: "李小華",
      status: "已解決",
      priority: "中",
      createDate: "2024-05-27",
      description: "員工休息室冷氣無法正常運作",
      replies: [
        { id: 1, author: "廠務組", content: "已聯絡廠商維修", date: "2024-05-27" },
        { id: 2, author: "廠務組", content: "冷氣已修復完成", date: "2024-05-28" }
      ]
    },
    {
      id: 3,
      title: "加班費計算問題",
      category: "薪資福利",
      reporter: "王小美",
      status: "待處理",
      priority: "高",
      createDate: "2024-05-26",
      description: "本月加班費計算似乎有誤，請協助確認",
      replies: []
    },
    {
      id: 4,
      title: "建議增設員工停車位",
      category: "員工建議",
      reporter: "陳小強",
      status: "評估中",
      priority: "低",
      createDate: "2024-05-25",
      description: "目前停車位不足，建議增設員工專用停車區域",
      replies: [
        { id: 1, author: "總務組", content: "正在評估可行性與預算", date: "2024-05-26" }
      ]
    }
  ])

  const filteredIssues = selectedCategory === "全部" 
    ? issuesData 
    : issuesData.filter(issue => issue.category === selectedCategory)

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
    const newIssue = {
      id: Date.now(),
      ...formData,
      reporter: "當前用戶", // 實際應用中從用戶上下文取得
      status: "待處理",
      createDate: new Date().toISOString().split('T')[0],
      replies: []
    }
    setIssuesData([newIssue, ...issuesData])
    setShowForm(false)
    setFormData({ title: "", category: "", description: "", priority: "中" })
  }

  const handleReply = (issueId: number) => {
    if (!replyText.trim()) return
    
    setIssuesData(issuesData.map(issue => 
      issue.id === issueId 
        ? {
            ...issue,
            replies: [...issue.replies, {
              id: Date.now(),
              author: "管理員", // 實際應用中從用戶上下文取得
              content: replyText,
              date: new Date().toISOString().split('T')[0]
            }]
          }
        : issue
    ))
    setReplyText("")
    setShowReplyForm(null)
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
                  <div className="text-2xl font-bold">{issuesData.length}</div>
                  <p className="text-xs text-muted-foreground">本月累計</p>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">待處理</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {issuesData.filter(issue => issue.status === "待處理").length}
                  </div>
                  <p className="text-xs text-muted-foreground">需要處理</p>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">處理中</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {issuesData.filter(issue => issue.status === "處理中" || issue.status === "評估中").length}
                  </div>
                  <p className="text-xs text-muted-foreground">正在處理</p>
                </CardContent>
              </Card>

              <Card className="production-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">已解決</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {issuesData.filter(issue => issue.status === "已解決").length}
                  </div>
                  <p className="text-xs text-muted-foreground">完成處理</p>
                </CardContent>
              </Card>
            </div>

            {/* 分類篩選 */}
            <div className="flex items-center gap-4">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">篩選分類：</span>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
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
                        <Select 
                          value={formData.category}
                          onValueChange={(value) => setFormData({...formData, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="請選擇分類" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="工作環境">工作環境</SelectItem>
                            <SelectItem value="設施維護">設施維護</SelectItem>
                            <SelectItem value="薪資福利">薪資福利</SelectItem>
                            <SelectItem value="員工建議">員工建議</SelectItem>
                            <SelectItem value="其他">其他</SelectItem>
                          </SelectContent>
                        </Select>
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
                <CardDescription>
                  員工問題反映與處理狀況追蹤 
                  {selectedCategory !== "全部" && ` - ${selectedCategory}分類`}
                  （共 {filteredIssues.length} 筆）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredIssues.map((issue) => (
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
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-4">
                          <span>反映人: {issue.reporter}</span>
                          <span>分類: {issue.category}</span>
                        </div>
                        <span>建立時間: {issue.createDate}</span>
                      </div>

                      {/* 回覆區域 */}
                      {issue.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">回覆記錄：</h4>
                          {issue.replies.map((reply) => (
                            <div key={reply.id} className="bg-gray-50 p-3 rounded text-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{reply.author}</span>
                                <span className="text-xs text-gray-500">{reply.date}</span>
                              </div>
                              <p className="text-gray-700">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 回覆表單 */}
                      <div className="mt-3 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowReplyForm(showReplyForm === issue.id ? null : issue.id)}
                        >
                          <Reply className="h-4 w-4 mr-2" />
                          回覆
                        </Button>
                      </div>

                      {showReplyForm === issue.id && (
                        <div className="mt-3 space-y-2">
                          <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="輸入回覆內容..."
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleReply(issue.id)}>
                              <Send className="h-4 w-4 mr-2" />
                              送出回覆
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setShowReplyForm(null)}
                            >
                              取消
                            </Button>
                          </div>
                        </div>
                      )}
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
