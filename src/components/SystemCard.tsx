
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"

interface SystemCardProps {
  reportNo: number
  reportItem: string
  reportType: string
  url: string
  description?: string
  owner: string
  visible: boolean
  unloginFlag: boolean
  browseCnt: number
  isLoggedIn: boolean
}

export function SystemCard({ 
  reportNo, 
  reportItem, 
  reportType, 
  url, 
  description, 
  owner, 
  visible, 
  unloginFlag, 
  browseCnt, 
  isLoggedIn 
}: SystemCardProps) {
  // 檢查是否需要登入才能使用
  const needLogin = !unloginFlag && !isLoggedIn
  
  const handleClick = () => {
    if (needLogin) {
      alert("此功能需要登入後使用")
      return
    }
    if (url && url !== '#') {
      window.location.href = url
    }
  }

  return (
    <Card className={`production-card cursor-pointer transition-all hover:shadow-lg ${needLogin ? 'opacity-60' : ''}`} onClick={handleClick}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base font-medium text-industrial-blue-800 leading-tight">
              {reportItem}
            </CardTitle>
            <Badge variant="secondary" className="mt-1 text-xs">
              {reportType}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            {isLoggedIn && (
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Star className="h-3 w-3" />
              </Button>
            )}
            {url !== '#' && (
              <ExternalLink className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {description && (
          <CardDescription className="text-sm text-gray-600 mb-2 line-clamp-2">
            {description}
          </CardDescription>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>負責人: {owner}</span>
          <span>瀏覽: {browseCnt}</span>
        </div>
        {needLogin && (
          <div className="mt-2 text-xs text-red-500 font-medium">
            需要登入使用
          </div>
        )}
      </CardContent>
    </Card>
  )
}
