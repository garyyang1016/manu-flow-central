
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 模擬登入驗證
    try {
      // 這裡應該連接您的 LDAP 認證系統
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模擬用戶資料
      const userData = {
        adt: credentials.username,
        wnum: "EMP001",
        wname: "張三",
        site: "台中廠",
        stage: "生產部",
        position: "組長",
        position_lv: 350
      }

      // 儲存用戶資料到 localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      
      toast({
        title: "登入成功",
        description: `歡迎回來，${userData.wname}！`,
      })

      navigate('/')
    } catch (error) {
      toast({
        title: "登入失敗",
        description: "請檢查帳號密碼是否正確",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-industrial-blue-800 to-industrial-blue-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-industrial-orange-500">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">生產製造部管理系統</CardTitle>
          <CardDescription>請使用您的帳號密碼登入</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">帳號</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="請輸入帳號"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密碼</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="請輸入密碼"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "登入中..." : "登入"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
