
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { 
  FileText, 
  Download, 
  Calendar, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react"

// 報表資料結構
interface Report {
  title: string
  description: string
  lastUpdated: string
  type: string
  updateFreq: string
  reviewer: string
  logic: string
}

// Summary 子分類的報表資料
const summaryReports = {
  WIP: [
    {
      title: "在製品庫存報表",
      description: "顯示各生產線在製品數量與狀態",
      lastUpdated: "2024-06-15",
      type: "Excel",
      updateFreq: "每日",
      reviewer: "生產經理",
      logic: "統計各工站在製品數量"
    },
    {
      title: "WIP 週轉率分析",
      description: "分析在製品週轉效率",
      lastUpdated: "2024-06-14",
      type: "PDF",
      updateFreq: "週報",
      reviewer: "IE工程師",
      logic: "計算週轉天數與效率指標"
    }
  ],
  KIP: [
    {
      title: "關鍵績效指標",
      description: "月度KIP綜合分析報表",
      lastUpdated: "2024-06-15",
      type: "Excel",
      updateFreq: "月報",
      reviewer: "廠長",
      logic: "彙整各部門關鍵指標"
    },
    {
      title: "生產效率KIP",
      description: "生產線效率關鍵指標追蹤",
      lastUpdated: "2024-06-14",
      type: "PDF",
      updateFreq: "週報",
      reviewer: "生產主管",
      logic: "監控生產效率變化趨勢"
    }
  ],
  機台資訊: [
    {
      title: "設備稼動率報表",
      description: "各機台運轉時間與稼動率統計",
      lastUpdated: "2024-06-15",
      type: "Excel",
      updateFreq: "每日",
      reviewer: "設備工程師",
      logic: "計算機台運轉時間比例"
    },
    {
      title: "設備維護記錄",
      description: "機台保養與維修歷程記錄",
      lastUpdated: "2024-06-13",
      type: "PDF",
      updateFreq: "不定期",
      reviewer: "維修主管",
      logic: "記錄設備維護作業"
    }
  ]
}

// 其他分類的報表資料
const otherReports: Report[] = [
  {
    title: "月度生產統計",
    description: "本月各產線產量與良率統計分析",
    lastUpdated: "2024-06-15",
    type: "Excel",
    updateFreq: "月報",
    reviewer: "生產經理",
    logic: "彙整月度生產數據"
  },
  {
    title: "品質分析報告",
    description: "產品品質趨勢與不良分析",
    lastUpdated: "2024-06-14",
    type: "PDF",
    updateFreq: "週報",
    reviewer: "品保主管",
    logic: "分析品質問題根因"
  },
  {
    title: "成本效益分析",
    description: "生產成本與效益評估報告",
    lastUpdated: "2024-06-13",
    type: "Excel",
    updateFreq: "月報",
    reviewer: "財務經理",
    logic: "計算生產成本效益比"
  }
]

export function ProductionReportsContent() {
  const [activeCategory, setActiveCategory] = useState("Summary")
  const [activeSummaryTab, setActiveSummaryTab] = useState("WIP")

  const categories = [
    { id: "Summary", name: "Summary", icon: FileText },
    { id: "Planning", name: "Planning", icon: Calendar },
    { id: "Quality", name: "Quality", icon: Settings },
    { id: "Analytics", name: "Analytics", icon: User }
  ]

  const summaryTabs = [
    { id: "WIP", name: "WIP" },
    { id: "KIP", name: "KIP" },
    { id: "機台資訊", name: "機台資訊" }
  ]

  const getCurrentReports = () => {
    if (activeCategory === "Summary") {
      return summaryReports[activeSummaryTab as keyof typeof summaryReports] || []
    }
    return otherReports
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Excel":
        return "bg-green-100 text-green-800"
      case "PDF":
        return "bg-red-100 text-red-800"
      case "CSV":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFrequencyColor = (freq: string) => {
    switch (freq) {
      case "每日":
        return "bg-orange-100 text-orange-800"
      case "週報":
        return "bg-blue-100 text-blue-800"
      case "月報":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* 分類導航 */}
      <div className="flex gap-2">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-2"
            >
              <IconComponent className="h-4 w-4" />
              {category.name}
            </Button>
          )
        })}
      </div>

      {/* Summary 子分類標籤 */}
      {activeCategory === "Summary" && (
        <Tabs value={activeSummaryTab} onValueChange={setActiveSummaryTab}>
          <TabsList className="grid w-full grid-cols-3">
            {summaryTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* 報表列表 */}
      <div className="space-y-4">
        {activeCategory === "Summary" ? (
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {getCurrentReports().map((report, index) => (
                <Card key={index} className="production-card min-w-[300px] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">更新頻率:</span>
                        <Badge className={`ml-2 ${getFrequencyColor(report.updateFreq)}`}>
                          {report.updateFreq}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-500">最後更新:</span>
                        <span className="ml-2 font-medium">{report.lastUpdated}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">審核者:</span>
                        <span className="ml-2 font-medium">{report.reviewer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">邏輯:</span>
                        <span className="ml-2 text-xs text-gray-600">{report.logic}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        下載
                      </Button>
                      <Button variant="outline" size="sm">
                        預覽
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getCurrentReports().map((report, index) => (
              <Card key={index} className="production-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">更新頻率:</span>
                      <Badge className={`ml-2 ${getFrequencyColor(report.updateFreq)}`}>
                        {report.updateFreq}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-500">最後更新:</span>
                      <span className="ml-2 font-medium">{report.lastUpdated}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">審核者:</span>
                      <span className="ml-2 font-medium">{report.reviewer}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">邏輯:</span>
                      <span className="ml-2 text-xs text-gray-600">{report.logic}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      下載
                    </Button>
                    <Button variant="outline" size="sm">
                      預覽
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
