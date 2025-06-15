
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, Plus, Edit, Trash2, Save, Upload, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

type AnnouncementCategory = "人事" | "廠務" | "環安" | "資安" | "系統" | "製程"
type Priority = "high" | "medium" | "low"

interface Announcement {
  id: number
  title: string
  content: string
  category: AnnouncementCategory
  priority: Priority
  image?: string
  createdAt: string
  updatedAt: string
  status: "published" | "draft"
  author: string
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "系統維護通知",
    content: "本系統將於本週六進行定期維護...",
    category: "系統",
    priority: "high",
    createdAt: "2024-05-29",
    updatedAt: "2024-05-29",
    status: "published",
    author: "系統管理員"
  },
  {
    id: 2,
    title: "新進人員訓練",
    content: "下週一將舉辦新進人員訓練課程...",
    category: "人事",
    priority: "medium",
    createdAt: "2024-05-28",
    updatedAt: "2024-05-28",
    status: "draft",
    author: "人事部"
  }
]

const AnnouncementAdmin = () => {
  const { user, hasPermission } = useAuth()
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "系統" as AnnouncementCategory,
    priority: "medium" as Priority,
    image: ""
  })

  // 檢查權限
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

  const handleCreateNew = () => {
    setFormData({
      title: "",
      content: "",
      category: "系統",
      priority: "medium",
      image: ""
    })
    setSelectedAnnouncement(null)
    setIsEditDialogOpen(true)
  }

  const handleEdit = (announcement: Announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      priority: announcement.priority,
      image: announcement.image || ""
    })
    setSelectedAnnouncement(announcement)
    setIsEditDialogOpen(true)
  }

  const handleSave = (status: "published" | "draft") => {
    const newAnnouncement: Announcement = {
      id: selectedAnnouncement?.id || Date.now(),
      ...formData,
      status,
      createdAt: selectedAnnouncement?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      author: user?.wname || "未知用戶"
    }

    if (selectedAnnouncement) {
      setAnnouncements(prev => prev.map(ann => ann.id === selectedAnnouncement.id ? newAnnouncement : ann))
    } else {
      setAnnouncements(prev => [...prev, newAnnouncement])
    }

    setIsEditDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id))
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
    }
  }

  const publishedAnnouncements = announcements.filter(ann => ann.status === "published")
  const draftAnnouncements = announcements.filter(ann => ann.status === "draft")

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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">公告管理</h1>
                  <p className="text-sm text-gray-600">管理系統公告與通知</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button onClick={handleCreateNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  新增公告
                </Button>
                <NotificationBell />
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            <Tabs defaultValue="published" className="space-y-6">
              <TabsList>
                <TabsTrigger value="published">已發布 ({publishedAnnouncements.length})</TabsTrigger>
                <TabsTrigger value="draft">草稿 ({draftAnnouncements.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="published" className="space-y-4">
                {publishedAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="production-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{announcement.category}</Badge>
                            <Badge className={getPriorityColor(announcement.priority)}>
                              {announcement.priority === "high" ? "高" : announcement.priority === "medium" ? "中" : "低"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(announcement)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(announcement.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{announcement.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>作者: {announcement.author}</span>
                        <span>更新: {announcement.updatedAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="draft" className="space-y-4">
                {draftAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="production-card opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {announcement.title}
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{announcement.category}</Badge>
                            <Badge className={getPriorityColor(announcement.priority)}>
                              {announcement.priority === "high" ? "高" : announcement.priority === "medium" ? "中" : "低"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(announcement)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(announcement.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{announcement.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>作者: {announcement.author}</span>
                        <span>建立: {announcement.createdAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedAnnouncement ? "編輯公告" : "新增公告"}</DialogTitle>
                <DialogDescription>
                  填寫公告內容並選擇發布狀態
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">標題</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="輸入公告標題"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">分類</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: AnnouncementCategory) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="人事">人事</SelectItem>
                        <SelectItem value="廠務">廠務</SelectItem>
                        <SelectItem value="環安">環安</SelectItem>
                        <SelectItem value="資安">資安</SelectItem>
                        <SelectItem value="系統">系統</SelectItem>
                        <SelectItem value="製程">製程</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">重要程度</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: Priority) => setFormData(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">高</SelectItem>
                        <SelectItem value="medium">中</SelectItem>
                        <SelectItem value="low">低</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">內容</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="輸入公告內容"
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="image">圖片 (選填)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="圖片 URL 或上傳圖片"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => handleSave("draft")}>
                  <Save className="h-4 w-4 mr-2" />
                  存為草稿
                </Button>
                <Button onClick={() => handleSave("published")}>
                  <Eye className="h-4 w-4 mr-2" />
                  立即發布
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AnnouncementAdmin
