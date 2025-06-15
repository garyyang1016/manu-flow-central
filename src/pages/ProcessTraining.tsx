
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, BookOpen, Video, FileText, Download } from "lucide-react"

const ProcessTraining = () => {
  const trainingMaterials = [
    {
      title: "Feol製程基礎教學",
      description: "前段製程操作流程與注意事項",
      type: "video",
      duration: "45分鐘",
      level: "基礎"
    },
    {
      title: "Beol製程進階教學",
      description: "後段製程品質控制與故障排除",
      type: "document",
      pages: "120頁",
      level: "進階"
    },
    {
      title: "設備保養手冊",
      description: "生產設備日常保養與維護指南",
      type: "document", 
      pages: "85頁",
      level: "中級"
    },
    {
      title: "安全操作規範",
      description: "工廠安全操作標準作業程序",
      type: "video",
      duration: "30分鐘",
      level: "基礎"
    }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "基礎":
        return "bg-green-100 text-green-800"
      case "中級":
        return "bg-yellow-100 text-yellow-800"
      case "進階":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
                  <h1 className="text-2xl font-bold text-industrial-blue-800">製程教學專區</h1>
                  <p className="text-sm text-gray-600">
                    製程操作教學資源與培訓材料
                  </p>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trainingMaterials.map((material, index) => (
                <Card key={index} className="production-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {material.type === 'video' ? (
                            <Video className="h-5 w-5 text-blue-600" />
                          ) : (
                            <FileText className="h-5 w-5 text-green-600" />
                          )}
                          {material.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {material.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {material.type === 'video' ? `時長: ${material.duration}` : `頁數: ${material.pages}`}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(material.level)}`}>
                        {material.level}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <BookOpen className="h-4 w-4 mr-2" />
                        開始學習
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default ProcessTraining
