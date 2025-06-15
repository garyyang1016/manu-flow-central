
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink } from "lucide-react"

interface SystemSearchProps {
  onSearch?: (query: string) => void
}

export function SystemSearch({ onSearch }: SystemSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  // 所有系統功能資料
  const allSystems = [
    { 
      name: "生產報表", 
      description: "查看和下載各種生產分析報表", 
      url: "/production-reports", 
      category: "生產管理",
      keywords: ["報表", "生產", "統計", "分析"]
    },
    { 
      name: "員工假勤", 
      description: "員工出勤記錄管理", 
      url: "/attendance", 
      category: "人員管理",
      keywords: ["出勤", "考勤", "假期", "員工"]
    },
    { 
      name: "請假申請", 
      description: "申請各類假期並查看剩餘假期時數", 
      url: "/leave-application", 
      category: "人員管理",
      keywords: ["請假", "假期", "申請", "休假"]
    },
    { 
      name: "作業時數管理", 
      description: "管理和統計員工作業時數", 
      url: "/work-hours", 
      category: "人員管理",
      keywords: ["時數", "工時", "加班", "作業"]
    },
    { 
      name: "人員問題反映", 
      description: "員工問題反映和處理系統", 
      url: "/hr-issues", 
      category: "人員管理",
      keywords: ["問題", "反映", "HR", "員工"]
    },
    { 
      name: "公告中心", 
      description: "查看系統公告和重要通知", 
      url: "/announcements", 
      category: "資訊管理",
      keywords: ["公告", "通知", "消息", "資訊"]
    },
    { 
      name: "個人資訊", 
      description: "查看和編輯個人基本資料", 
      url: "/profile", 
      category: "個人設定",
      keywords: ["個人", "資料", "檔案", "設定"]
    },
    { 
      name: "系統設定", 
      description: "系統參數和權限設定", 
      url: "/settings", 
      category: "系統管理",
      keywords: ["設定", "參數", "權限", "管理"]
    },
    { 
      name: "申請帳號", 
      description: "新用戶帳號申請", 
      url: "/user-registration", 
      category: "帳號管理",
      keywords: ["申請", "註冊", "帳號", "用戶"]
    },
    { 
      name: "使用者登入設定", 
      description: "管理使用者登入相關設定", 
      url: "/user-settings", 
      category: "帳號管理",
      keywords: ["登入", "設定", "密碼", "帳號"]
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery)
    onSearch?.(searchQuery)
  }

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const filtered = allSystems.filter(system => 
      system.name.toLowerCase().includes(query.toLowerCase()) ||
      system.description.toLowerCase().includes(query.toLowerCase()) ||
      system.category.toLowerCase().includes(query.toLowerCase()) ||
      system.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
    )

    setSearchResults(filtered)
  }

  const handleInputChange = (value: string) => {
    setSearchQuery(value)
    performSearch(value)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "生產管理":
        return "bg-blue-100 text-blue-800"
      case "人員管理":
        return "bg-green-100 text-green-800"
      case "資訊管理":
        return "bg-yellow-100 text-yellow-800"
      case "個人設定":
        return "bg-purple-100 text-purple-800"
      case "系統管理":
        return "bg-red-100 text-red-800"
      case "帳號管理":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="production-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          系統功能搜尋
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="搜尋系統功能..."
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {searchResults.length > 0 && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {searchResults.map((system, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{system.name}</h4>
                      <Badge className={getCategoryColor(system.category)}>
                        {system.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{system.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {system.keywords.map((keyword: string, idx: number) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={system.url} className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      前往
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchQuery && searchResults.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            沒有找到符合條件的系統功能
          </div>
        )}
      </CardContent>
    </Card>
  )
}
