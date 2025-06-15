
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Plus, Edit, Trash2, Eye, Calendar, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Announcement {
  id: string
  title: string
  content: string
  type: '人事' | '廠務' | '環安' | '資安' | '系統' | '製程'
  priority: 'high' | 'medium' | 'low'
  date: string
  author: string
  image?: string
  published: boolean
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: '系統維護公告',
    content: '為提升系統效能，本系統將於本週日 (6/2) 凌晨 2:00-4:00 進行例行維護，期間系統將暫停服務，造成不便敬請見諒。',
    type: '系統',
    priority: 'high',
    date: '2024-05-29',
    author: 'IT部門',
    published: true
  },
  {
    id: '2',
    title: '新版功能上線通知',
    content: '生產報表系統新增即時監控功能，現在可以即時查看各生產線的運行狀態和產量數據。歡迎大家多多使用！',
    type: '系統',
    priority: 'medium',
    date: '2024-05-28',
    author: '系統管理員',
    published: true
  },
  {
    id: '3',
    title: '部門會議通知',
    content: '月度生產檢討會議將於下週一 (6/3) 下午 2:00 在會議室A舉行，請各組組長準時參加。',
    type: '人事',
    priority: 'medium',
    date: '2024-05-27',
    author: '人事部',
    published: false
  }
]

const AnnouncementAdmin = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: '系統' as const,
    priority: 'medium' as const,
    image: ''
  })
  const { toast } = useToast()

  const typeOptions = ['人事', '廠務', '環安', '資安', '系統', '製程'] as const
  const priorityOptions = [
    { value: 'high', label: '重要', color: 'bg-red-100 text-red-800' },
    { value: 'medium', label: '一般', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'low', label: '低', color: 'bg-green-100 text-green-800' }
  ] as const

  const getTypeColor = (type: string) => {
    switch (type) {
      case '人事': return 'bg-blue-100 text-blue-800'
      case '廠務': return 'bg-orange-100 text-orange-800'
      case '環安': return 'bg-green-100 text-green-800'
      case '資安': return 'bg-red-100 text-red-800'
      case '系統': return 'bg-purple-100 text-purple-800'
      case '製程': return 'bg-cyan-100 text-cyan-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: '系統',
      priority: 'medium',
      image: ''
    })
  }

  const handleCreate = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "錯誤",
        description: "請填寫標題和內容",
        variant: "destructive"
      })
      return
    }

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      type: formData.type,
      priority: formData.priority,
      date: new Date().toISOString().split('T')[0],
      author: '系統管理員',
      image: formData.image,
      published: false
    }

    setAnnouncements([newAnnouncement, ...announcements])
    setIsCreateDialogOpen(false)
    resetForm()
    toast({
      title: "成功",
      description: "公告已建立，可在草稿中查看"
    })
  }

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type,
      priority: announcement.priority,
      image: announcement.image || ''
    })
  }

  const handleUpdate = () => {
    if (!editingAnnouncement) return

    setAnnouncements(announcements.map(a => 
      a.id === editingAnnouncement.id 
        ? { ...a, ...formData }
        : a
    ))
    setEditingAnnouncement(null)
    resetForm()
    toast({
      title: "成功",
      description: "公告已更新"
    })
  }

  const handlePublish = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, published: true } : a
    ))
    toast({
      title: "成功",
      description: "公告已發布"
    })
  }

  const handleUnpublish = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, published: false } : a
    ))
    toast({
      title: "成功",
      description: "公告已下架"
    })
  }

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
    toast({
      title: "成功",
      description: "公告已刪除"
    })
  }

  const publishedAnnouncements = announcements.filter(a => a.published)
  const draftAnnouncements = announcements.filter(a => !a.published)

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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">公告管理中心</h1>
                  <p className="text-sm text-gray-600">
                    發布和管理系統公告
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      新增公告
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新增公告</DialogTitle>
                      <DialogDescription>
                        建立新的系統公告
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">標題</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="請輸入公告標題"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="type">分類</Label>
                          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {typeOptions.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">重要程度</Label>
                          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value as any })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {priorityOptions.map((priority) => (
                                <SelectItem key={priority.value} value={priority.value}>
                                  {priority.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="image">圖片網址 (選填)</Label>
                        <div className="flex gap-2">
                          <Input
                            id="image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                          />
                          <Button variant="outline" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="content">內容</Label>
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          placeholder="請輸入公告內容"
                          rows={6}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        取消
                      </Button>
                      <Button onClick={handleCreate}>
                        建立公告
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <NotificationBell />
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 max-w-7xl mx-auto">
            <Tabs defaultValue="published" className="space-y-6">
              <TabsList>
                <TabsTrigger value="published" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  已發布公告
                  <Badge variant="secondary" className="ml-2">
                    {publishedAnnouncements.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="draft" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  草稿
                  <Badge variant="secondary" className="ml-2">
                    {draftAnnouncements.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="published" className="space-y-4">
                {publishedAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="production-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(announcement.type)}>
                              {announcement.type}
                            </Badge>
                            <Badge className={priorityOptions.find(p => p.value === announcement.priority)?.color}>
                              {priorityOptions.find(p => p.value === announcement.priority)?.label}
                            </Badge>
                            <Badge variant="secondary">已發布</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEdit(announcement)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUnpublish(announcement.id)}
                          >
                            下架
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete(announcement.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{announcement.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {announcement.date}
                        </span>
                        <span>發布者: {announcement.author}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="draft" className="space-y-4">
                {draftAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="production-card border-l-4 border-l-orange-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(announcement.type)}>
                              {announcement.type}
                            </Badge>
                            <Badge className={priorityOptions.find(p => p.value === announcement.priority)?.color}>
                              {priorityOptions.find(p => p.value === announcement.priority)?.label}
                            </Badge>
                            <Badge variant="outline">草稿</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEdit(announcement)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handlePublish(announcement.id)}
                          >
                            發布
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete(announcement.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{announcement.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {announcement.date}
                        </span>
                        <span>建立者: {announcement.author}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* 編輯對話框 */}
          <Dialog open={!!editingAnnouncement} onOpenChange={() => setEditingAnnouncement(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>編輯公告</DialogTitle>
                <DialogDescription>
                  修改公告內容
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">標題</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="請輸入公告標題"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-type">分類</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {typeOptions.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-priority">重要程度</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value as any })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-image">圖片網址 (選填)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="edit-image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-content">內容</Label>
                  <Textarea
                    id="edit-content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="請輸入公告內容"
                    rows={6}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>
                  取消
                </Button>
                <Button onClick={handleUpdate}>
                  更新公告
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
