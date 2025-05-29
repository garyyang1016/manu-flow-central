
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const productionData = [
  { name: '一月', plan: 4000, actual: 3800, yield: 95 },
  { name: '二月', plan: 3000, actual: 3200, yield: 96.5 },
  { name: '三月', plan: 2000, actual: 1900, yield: 92 },
  { name: '四月', plan: 2780, actual: 2890, yield: 98 },
  { name: '五月', plan: 1890, actual: 1950, yield: 94.5 },
  { name: '六月', plan: 2390, actual: 2400, yield: 97 },
]

const yieldData = [
  { name: '良品', value: 94.5, color: '#10b981' },
  { name: '不良品', value: 5.5, color: '#ef4444' }
]

const efficiencyData = [
  { equipment: '生產線A', efficiency: 87 },
  { equipment: '生產線B', efficiency: 92 },
  { equipment: '生產線C', efficiency: 78 },
  { equipment: '生產線D', efficiency: 95 },
]

export function ProductionDashboard() {
  const currentMonth = new Date().toLocaleDateString('zh-TW', { month: 'long' })
  
  return (
    <div className="space-y-6">
      {/* 概要統計卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="production-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日產量</CardTitle>
            <Badge variant="secondary">即時</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-industrial-blue-700">1,234</div>
            <p className="text-xs text-muted-foreground">
              目標: 1,300 (94.9%)
            </p>
            <Progress value={94.9} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="production-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月累計</CardTitle>
            <Badge variant="outline">月統計</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-industrial-orange-600">28,567</div>
            <p className="text-xs text-muted-foreground">
              較上月 +12.3%
            </p>
          </CardContent>
        </Card>

        <Card className="production-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">良率</CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800">優良</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.5%</div>
            <p className="text-xs text-muted-foreground">
              較上月 +2.1%
            </p>
          </CardContent>
        </Card>

        <Card className="production-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">設備效率</CardTitle>
            <Badge variant="outline">平均</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-industrial-blue-600">88.2%</div>
            <p className="text-xs text-muted-foreground">
              4台設備運行中
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 圖表區域 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>計劃 vs 實際產量</CardTitle>
            <CardDescription>過去6個月生產表現</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="plan" fill="#64748b" name="計劃產量" />
                <Bar dataKey="actual" fill="#f97316" name="實際產量" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>良率趨勢</CardTitle>
            <CardDescription>過去6個月良率變化</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="yield" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="良率 (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>良品率分布</CardTitle>
            <CardDescription>本月產品品質分析</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={yieldData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {yieldData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {yieldData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>設備效率</CardTitle>
            <CardDescription>各生產線即時效率</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {efficiencyData.map((equipment) => (
                <div key={equipment.equipment} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{equipment.equipment}</span>
                    <span className="font-medium">{equipment.efficiency}%</span>
                  </div>
                  <Progress 
                    value={equipment.efficiency} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
