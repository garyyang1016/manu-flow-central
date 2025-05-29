
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, CheckCheck, Eye, Calendar } from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  type: 'system' | 'maintenance' | 'general'
  priority: 'high' | 'medium' | 'low'
  date: string
  author: string
  read: boolean
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: '系統維護公告',
    content: '為提升系統效能，本系統將於本週日 (6/2) 凌晨 2:00-4:00 進行例行維護，期間系統將暫停服務，造成不便敬請見諒。',
    type: 'maintenance',
    priority: 'high',
    date: '2024-05-29',
    author: 'IT部門',
    read: false
  },
  {
    id: '2',
    title: '新版功能上線通知',
    content: '生產報表系統新增即時監控功能，現在可以即時查看各生產線的運行狀態和產量數據。歡迎大家多多使用！',
    type: 'system',
    priority: 'medium',
    date: '2024-05-28',
    author: '系統管理員',
    read: false
  },
  {
    id: '3',
    title: '部門會議通知',
    content: '月度生產檢討會議將於下週一 (6/3) 下午 2:00 在會議室A舉行，請各組組長準時參加。',
    type: 'general',
    priority: 'medium',
    date: '2024-05-27',
    author: '人事部',
    read: true
  },
  {
    id: '4',
    title: '安全生產提醒',
    content: '近期工廠安全檢查發現部分防護設備老化，請各位同事務必注意安全操作規範，如發現設備異常請立即報告。',
    type: 'general',
    priority: 'high',
    date: '2024-05-26',
    author: '安全部門',
    read: true
  }
]

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  
  const unreadAnnouncements = announcements.filter(a => !a.read)
  const readAnnouncements = announcements.filter(a => a.read)

  const markAsRead = (id: string) => {
    setAnnouncements(prev => 
      prev.map(a => a.id === id ? { ...a, read: true } : a)
    )
  }

  const markAllAsRead = () => {
    setAnnouncements(prev => 
      prev.map(a => ({ ...a, read: true }))
    )
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'system': return '系統'
      case 'maintenance': return '維護'
      case 'general': return '一般'
      default: return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'system': return 'bg-blue-100 text-blue-800'
      case 'maintenance': return 'bg-orange-100 text-orange-800'
      case 'general': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '重要'
      case 'medium': return '一般'
      case 'low': return '低'
      default: return priority
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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">公告中心</h1>
                  <p className="text-sm text-gray-600">
                    查看系統公告和重要通知
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {unreadAnnouncements.length > 0 && (
                  <Button onClick={markAllAsRead} size="sm">
                    <CheckCheck className="h-4 w-4 mr-2" />
                    全部已讀
                  </Button>
                )}
                <NotificationBell />
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 max-w-6xl mx-auto">
            <Tabs defaultValue="unread" className="space-y-6">
              <TabsList>
                <TabsTrigger value="unread" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  未讀公告
                  {unreadAnnouncements.length > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {unreadAnnouncements.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="read" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  已讀公告
                </TabsTrigger>
              </TabsList>

              <TabsContent value="unread" className="space-y-4">
                {unreadAnnouncements.length === 0 ? (
                  <Card className="production-card">
                    <CardContent className="text-center py-8">
                      <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">沒有未讀公告</p>
                    </CardContent>
                  </Card>
                ) : (
                  unreadAnnouncements.map((announcement) => (
                    <Card key={announcement.id} className="production-card border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-lg">{announcement.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge className={getTypeColor(announcement.type)}>
                                {getTypeLabel(announcement.type)}
                              </Badge>
                              <Badge className={getPriorityColor(announcement.priority)}>
                                {getPriorityLabel(announcement.priority)}
                              </Badge>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => markAsRead(announcement.id)}
                          >
                            標記已讀
                          </Button>
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
                  ))
                )}
              </TabsContent>

              <TabsContent value="read" className="space-y-4">
                {readAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="production-card opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(announcement.type)}>
                              {getTypeLabel(announcement.type)}
                            </Badge>
                            <Badge className={getPriorityColor(announcement.priority)}>
                              {getPriorityLabel(announcement.priority)}
                            </Badge>
                            <Badge variant="secondary">已讀</Badge>
                          </div>
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
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Announcements
