
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Filter, Calendar, FileText, Clock, User as UserIcon, Search } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export const ProductionReportsContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("Summary")
  const [selectedSubCategory, setSelectedSubCategory] = useState("WIP")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["Summary", "Material", "Feol", "Beol"]
  
  const subCategories = {
    "Summary": ["WIP", "KIP", "機台資訊"],
    "Material": [],
    "Feol": [],
    "Beol": []
  }

  const reportsData = {
    Summary: {
      WIP: [
        {
          title: "WIP庫存報表",
          description: "在製品庫存狀況統計",
          lastUpdated: "2024-05-29",
          type: "即時報表",
          updateFreq: "每小時",
          reviewer: "生產主管",
          logic: "追蹤各站點在製品數量與週轉狀況"
        },
        {
          title: "WIP流動分析",
          description: "在製品流動速度與瓶頸分析",
          lastUpdated: "2024-05-28",
          type: "日報表",
          updateFreq: "每日",
          reviewer: "製程工程師",
          logic: "分析WIP在各站點的停留時間"
        }
      ],
      KIP: [
        {
          title: "關鍵指標儀表板",
          description: "KIP關鍵績效指標監控",
          lastUpdated: "2024-05-29",
          type: "即時報表",
          updateFreq: "每小時",
          reviewer: "廠長",
          logic: "彙整良率、稼動率、產能利用率等關鍵指標"
        },
        {
          title: "KIP趨勢分析",
          description: "關鍵指標歷史趨勢分析",
          lastUpdated: "2024-05-27",
          type: "週報表",
          updateFreq: "每週",
          reviewer: "品保主管",
          logic: "分析KIP指標變化趨勢與改善方向"
        }
      ],
      機台資訊: [
        {
          title: "機台狀態監控",
          description: "所有機台即時狀態顯示",
          lastUpdated: "2024-05-29",
          type: "即時報表",
          updateFreq: "即時",
          reviewer: "設備工程師",
          logic: "監控機台運行、停機、維修狀態"
        },
        {
          title: "機台效能分析",
          description: "機台產能與效率統計",
          lastUpdated: "2024-05-28",
          type: "日報表",
          updateFreq: "每日",
          reviewer: "生產主管",
          logic: "計算機台OEE與產能利用率"
        }
      ]
    },
    Material: [
      {
        title: "原料投入分析",
        description: "原物料使用效率與損耗分析",
        lastUpdated: "2024-05-29",
        type: "日報表",
        updateFreq: "每日",
        reviewer: "物料主管",
        logic: "計算原料投入產出比，分析損耗原因"
      },
      {
        title: "庫存水位監控",
        description: "原料庫存狀況與安全庫存預警",
        lastUpdated: "2024-05-29",
        type: "即時報表",
        updateFreq: "每小時",
        reviewer: "倉管主管",
        logic: "監控庫存水位，低於安全庫存自動預警"
      }
    ],
    Feol: [
      {
        title: "前段製程良率",
        description: "Feol製程各站點良率分析",
        lastUpdated: "2024-05-29",
        type: "即時報表",
        updateFreq: "每小時",
        reviewer: "Feol主管",
        logic: "計算各製程站點良率，識別異常站點"
      },
      {
        title: "設備稼動率分析",
        description: "Feol設備運行效率統計",
        lastUpdated: "2024-05-29",
        type: "日報表",
        updateFreq: "每日",
        reviewer: "設備工程師",
        logic: "統計設備運行時間與停機原因分析"
      }
    ],
    Beol: [
      {
        title: "後段製程良率",
        description: "Beol製程良率與缺陷分析",
        lastUpdated: "2024-05-29",
        type: "即時報表",
        updateFreq: "每小時",
        reviewer: "Beol主管",
        logic: "追蹤後段製程良率，分析主要缺陷類型"
      },
      {
        title: "封裝測試報告",
        description: "封裝與最終測試結果統計",
        lastUpdated: "2024-05-28",
        type: "日報表",
        updateFreq: "每日",
        reviewer: "測試工程師",
        logic: "統計封裝良率與測試通過率"
      }
    ]
  }

  // 取得當前分類的報表資料
  const getCurrentReports = () => {
    if (selectedCategory === "Summary" && reportsData.Summary[selectedSubCategory as keyof typeof reportsData.Summary]) {
      return reportsData.Summary[selectedSubCategory as keyof typeof reportsData.Summary]
    }
    return reportsData[selectedCategory as keyof typeof reportsData] || []
  }

  // 篩選報表
  const filteredReports = getCurrentReports().filter((report: any) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.reviewer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "即時報表":
        return "bg-green-100 text-green-800"
      case "日報表":
        return "bg-blue-100 text-blue-800"
      case "週報表":
        return "bg-yellow-100 text-yellow-800"
      case "月報表":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* 搜尋功能 */}
      <Card className="production-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            搜尋報表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜尋報表名稱、描述或審核者..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 分類選擇 */}
      <div className="flex gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Summary 子分類選擇 */}
      {selectedCategory === "Summary" && (
        <div className="flex gap-2">
          {subCategories.Summary.map((subCategory) => (
            <Button
              key={subCategory}
              variant={selectedSubCategory === subCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubCategory(subCategory)}
            >
              {subCategory}
            </Button>
          ))}
        </div>
      )}

      {/* 報表輪播顯示 */}
      {filteredReports.length > 0 && (
        <Carousel className="w-full">
          <CarouselContent>
            {filteredReports.map((report: any, index: number) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="production-card hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {report.description}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* 基本資訊 */}
                    <div className="flex items-center justify-between text-sm">
                      <Badge className={getTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                      <span className="text-gray-600">更新: {report.lastUpdated}</span>
                    </div>

                    {/* 詳細資訊 */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">更新頻率:</span>
                        <span className="font-medium">{report.updateFreq}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">審核者:</span>
                        <span className="font-medium">{report.reviewer}</span>
                      </div>
                    </div>

                    {/* 檢視邏輯 */}
                    <div className="border-t pt-3">
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <span className="text-gray-600">檢視邏輯:</span>
                          <p className="text-gray-700 mt-1">{report.logic}</p>
                        </div>
                      </div>
                    </div>

                    {/* 操作按鈕 */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        查看報表
                      </Button>
                      <Button variant="outline" size="sm">
                        設定
                      </Button>
                      <Button variant="outline" size="sm">
                        排程
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {filteredReports.length === 0 && (
        <Card className="production-card">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">沒有找到符合條件的報表</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
