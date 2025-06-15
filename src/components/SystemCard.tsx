
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, StarOff } from "lucide-react"
import { useState } from "react"

interface SystemCardProps {
  reportNo: number
  reportItem: string
  reportType: string
  url: string
  description?: string
  owner?: string
  visible: boolean
  unloginFlag?: boolean
  isLoggedIn: boolean
  browseCnt: number
}

export function SystemCard({ 
  reportNo, 
  reportItem, 
  reportType, 
  url, 
  description, 
  owner, 
  visible, 
  unloginFlag = false, 
  isLoggedIn,
  browseCnt 
}: SystemCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  
  // 檢查是否可以使用
  const canAccess = visible && (isLoggedIn || unloginFlag)

  const handleClick = () => {
    if (canAccess && url) {
      window.open(url, '_blank')
    }
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  if (!canAccess) return null

  return (
    <Card className="production-card hover:shadow-lg transition-all cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base group-hover:text-industrial-orange-600 transition-colors">
              {reportItem}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1 text-sm">
                {description}
              </CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent onClick={handleClick}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {reportType}
            </Badge>
            {!isLoggedIn && unloginFlag && (
              <Badge variant="outline" className="text-xs">
                免登入
              </Badge>
            )}
          </div>
          <div className="text-xs text-gray-500">
            使用次數: {browseCnt}
          </div>
        </div>
        {owner && (
          <div className="mt-2 text-xs text-gray-600">
            負責人: {owner}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
