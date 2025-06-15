
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Target } from "lucide-react"

export function ProductionSummary() {
  // 模擬生產資料
  const productionData = {
    planCompletion: 87,
    yieldRate: 94.2,
    efficiency: 91.5,
    onTimeDelivery: 96.8,
    issues: 3
  }

  const getStatusIcon = (value: number, threshold: number) => {
    if (value >= threshold) {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    } else if (value >= threshold - 10) {
      return <Clock className="h-4 w-4 text-yellow-600" />
    } else {
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (value: number, threshold: number) => {
    if (value >= threshold) {
      return "text-green-600"
    } else if (value >= threshold - 10) {
      return "text-yellow-600"
    } else {
      return "text-red-600"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="production-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">計劃完成率</CardTitle>
          {getStatusIcon(productionData.planCompletion, 90)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">
            <span className={getStatusColor(productionData.planCompletion, 90)}>
              {productionData.planCompletion}%
            </span>
          </div>
          <Progress value={productionData.planCompletion} className="mb-2" />
          <p className="text-xs text-muted-foreground">
            目標: 90% | 
            {productionData.planCompletion >= 90 ? 
              <span className="text-green-600 ml-1">達標 ✓</span> : 
              <span className="text-red-600 ml-1">落後 {90 - productionData.planCompletion}%</span>
            }
          </p>
        </CardContent>
      </Card>

      <Card className="production-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">良率</CardTitle>
          {getStatusIcon(productionData.yieldRate, 95)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">
            <span className={getStatusColor(productionData.yieldRate, 95)}>
              {productionData.yieldRate}%
            </span>
          </div>
          <Progress value={productionData.yieldRate} className="mb-2" />
          <p className="text-xs text-muted-foreground">
            目標: 95% | 
            {productionData.yieldRate >= 95 ? 
              <span className="text-green-600 ml-1">達標 ✓</span> : 
              <span className="text-yellow-600 ml-1">差 {(95 - productionData.yieldRate).toFixed(1)}%</span>
            }
          </p>
        </CardContent>
      </Card>

      <Card className="production-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">設備效率</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">
            <span className={getStatusColor(productionData.efficiency, 90)}>
              {productionData.efficiency}%
            </span>
          </div>
          <Progress value={productionData.efficiency} className="mb-2" />
          <div className="flex items-center text-xs text-muted-foreground">
            {productionData.efficiency > 91.5 ? (
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
            )}
            較昨日 {productionData.efficiency > 91.5 ? "+" : ""}{(Math.random() * 2 - 1).toFixed(1)}%
          </div>
        </CardContent>
      </Card>

      <Card className="production-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">準時交貨率</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 mb-2">
            {productionData.onTimeDelivery}%
          </div>
          <Progress value={productionData.onTimeDelivery} className="mb-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">本月表現優異</span>
            <Badge variant="secondary" className="text-xs">
              {productionData.issues} 待處理
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
