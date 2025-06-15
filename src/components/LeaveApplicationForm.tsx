
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Clock, Send, FileText } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export const LeaveApplicationForm = () => {
  const { user } = useAuth()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [leaveType, setLeaveType] = useState("")
  const [reason, setReason] = useState("")

  // 生成時間選項（以30分鐘為間隔）
  const generateTimeOptions = () => {
    const times = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        times.push(timeStr)
      }
    }
    return times
  }

  const timeOptions = generateTimeOptions()

  // 模擬使用者的假期餘額
  const leaveBalances = [
    { type: "特休假", remaining: 14, total: 14, unit: "天" },
    { type: "病假", remaining: 28, total: 30, unit: "天" },
    { type: "事假", remaining: 12, total: 14, unit: "天" },
    { type: "喪假", remaining: 6, total: 6, unit: "天" },
    { type: "婚假", remaining: 8, total: 8, unit: "天" },
    { type: "產假", remaining: 56, total: 56, unit: "天" }
  ]

  const leaveTypes = [
    "特休假", "病假", "事假", "喪假", "婚假", "產假", "陪產假", "家庭照顧假", "生理假"
  ]

  const handleSubmit = () => {
    // 處理請假申請提交
    console.log({
      startDate,
      endDate,
      startTime,
      endTime,
      leaveType,
      reason
    })
  }

  const getBalanceColor = (remaining: number, total: number) => {
    const ratio = remaining / total
    if (ratio > 0.7) return "bg-green-100 text-green-800"
    if (ratio > 0.3) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* 申請表單 */}
      <div className="lg:col-span-2">
        <Card className="production-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              請假申請表
            </CardTitle>
            <CardDescription>
              請填寫完整的請假資訊
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 申請人資訊 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>申請人</Label>
                <Input value={user?.wname || "未登入"} disabled />
              </div>
              <div>
                <Label>部門/職稱</Label>
                <Input value={`${user?.site || ""} / ${user?.position || ""}`} disabled />
              </div>
            </div>

            {/* 假別選擇 */}
            <div>
              <Label>假別</Label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger>
                  <SelectValue placeholder="請選擇假別" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 開始日期時間 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>開始日期</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "yyyy/MM/dd") : "選擇開始日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>開始時間</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇開始時間" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 結束日期時間 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>結束日期</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "yyyy/MM/dd") : "選擇結束日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>結束時間</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇結束時間" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 請假原因 */}
            <div>
              <Label>請假原因</Label>
              <Textarea
                placeholder="請詳細說明請假原因..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
              />
            </div>

            {/* 提交按鈕 */}
            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                提交申請
              </Button>
              <Button variant="outline">
                儲存草稿
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 假期餘額 */}
      <div>
        <Card className="production-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              假期餘額
            </CardTitle>
            <CardDescription>
              您目前的各項假期剩餘時數
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaveBalances.map((balance, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{balance.type}</div>
                  <div className="text-sm text-gray-600">
                    剩餘 {balance.remaining} / 總計 {balance.total} {balance.unit}
                  </div>
                </div>
                <Badge className={getBalanceColor(balance.remaining, balance.total)}>
                  {balance.remaining}{balance.unit}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 申請記錄 */}
        <Card className="production-card mt-6">
          <CardHeader>
            <CardTitle>最近申請記錄</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">特休假</div>
                    <div className="text-sm text-gray-600">2024/05/25 - 2024/05/26</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">已核准</Badge>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">病假</div>
                    <div className="text-sm text-gray-600">2024/05/20 08:00-12:00</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">審核中</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
