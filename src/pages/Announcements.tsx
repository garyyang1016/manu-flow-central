
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Search, Filter, Bell, Pin, Calendar, User as UserIcon } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

const Announcements = () => {
  const { hasPermission } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedImportance, setSelectedImportance] = useState("全部")

  // 模擬公告資料
  const announcements = [
    {
      id: 1,
      title: "生產線維護通知",
      content: "生產線A將於本週六進行定期維護，請相關人員注意排程調整。",
      category: "維護公告",
      importance: "高",
      isPinned: true,
      author: "設備部",
      publishDate: "2024-05-29",
      readCount: 156
    },
    {
      id: 2,
      title: "新員工訓練課程",
      content: "下個月將舉辦新員工訓練課程，請人事部門安排相關事宜。",
      category: "人事公告",
      importance: "中",
      isPinned: false,
      author: "人事部",
      publishDate: "2024-05-28",
      readCount: 89
    },
    {
      id: 3,
      title: "安全檢查通知",
      content: "下週二將進行全廠安全檢查，請各部門主管配合檢查作業。",
      category: "安全公告",
      importance: "高",
      isPinned: true,
      author: "安全部",
      publishDate: "2024-05-27",
      readCount: 234
    },
    {
      id: 4,
      title: "月度績效檢討會議",
      content: "本月績效檢討會議將於週五下午2點於會議室A舉行。",
      category: "會議通知",
      importance: "中",
      isPinned: false,
      author: "管理部",
      publishDate: "2024-05-26",
      readCount: 67
    },
    {
      id: 5,
      title: "環保政策更新",
      content: "公司環保政策已更新，請各部門依新政策執行相關作業。",
      category: "政策公告",
      importance: "中",
      isPinned: false,
      author: "管理部",
      publishDate: "2024-05-25",
      readCount: 112
    },
    {
      id: 6,
      title: "緊急：設備故障通報",
      content: "生產線B設備發生故障，請立即停止作業並通知維修部門。",
      category: "緊急公告",
      importance: "緊急",
      isPinned: true,
      author: "生產部",
      publishDate: "2024-05-24",
      readCount: 345
    }
  ]

  const categories = ["全部", "維護公告", "人事公告", "安全公告", "會議通知", "政策公告", "緊急公告"]
  const importanceLevels = ["全部", "緊急", "高", "中", "低"]

  // 篩選和排序公告
  const filteredAnnouncements = announcements
    .filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "全部" || announcement.category === selectedCategory
      const matchesImportance = selectedImportance === "全部" || announcement.importance === selectedImportance
      return matchesSearch && matchesCategory && matchesImportance
    })
    .sort((a, b) => {
      // 置頂公告優先
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      
      // 按重要程度排序
      const importanceOrder = { "緊急": 4, "高": 3, "中": 2, "低": 1 }
      const aImportance = importanceOrder[a.importance as keyof typeof importanceOrder] || 0
      const bImportance = importanceOrder[b.importance as keyof typeof importanceOrder] || 0
      
      if (aImportance !== bImportance) return bImportance - aImportance
      
      // 最後按日期排序
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    })

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "緊急":
        return <Badge className="bg-red-100 text-red-800">緊急</Badge>
      case "高":
        return <Badge className="bg-orange-100 text-orange-800">高</Badge>
      case "中":
        return <Badge className="bg-yellow-100 text-yellow-800">中</Badge>
      case "低":
        return <Badge className="bg-gray-100 text-gray-800">低</Badge>
      default:
        return <Badge variant="secondary">{importance}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    return <Badge variant="outline">{category}</Badge>
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
                    查看最新的公司公告和重要通知
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {hasPermission(300) && (
                  <Button onClick={() => window.location.href = '/announcements/admin'}>
                    管理公告
                  </Button>
                )}
                <NotificationBell />
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* 搜尋和篩選區域 */}
            <Card className="production-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  搜尋與篩選
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="搜尋公告標題或內容..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="選擇分類" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={selectedImportance} onValueChange={setSelectedImportance}>
                      <SelectTrigger>
                        <SelectValue placeholder="重要程度" />
                      </SelectTrigger>
                      <SelectContent>
                        {importanceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 公告列表 */}
            <div className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="production-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {announcement.isPinned && (
                            <Pin className="h-4 w-4 text-red-500" />
                          )}
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          {getImportanceBadge(announcement.importance)}
                          {getCategoryBadge(announcement.category)}
                        </div>
                        <CardDescription className="text-base">
                          {announcement.content}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <UserIcon className="h-4 w-4" />
                          <span>{announcement.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{announcement.publishDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bell className="h-4 w-4" />
                        <span>已讀 {announcement.readCount} 次</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAnnouncements.length === 0 && (
              <Card className="production-card">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">沒有找到符合條件的公告</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Announcements
