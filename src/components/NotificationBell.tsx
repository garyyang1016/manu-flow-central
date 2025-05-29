
import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'announcement' | 'system' | 'alert'
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '系統維護公告',
    message: '系統將於本週日進行例行維護，預計停機2小時',
    time: '2小時前',
    read: false,
    type: 'announcement'
  },
  {
    id: '2',
    title: '生產線異常',
    message: '生產線C發生異常，請盡快檢查',
    time: '4小時前',
    read: false,
    type: 'alert'
  },
  {
    id: '3',
    title: '月報表已生成',
    message: '5月份生產報表已自動生成完成',
    time: '1天前',
    read: true,
    type: 'system'
  }
]

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800'
      case 'alert': return 'bg-red-100 text-red-800'
      case 'system': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">通知</h4>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs"
              >
                全部已讀
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="h-80">
          <div className="p-0">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-sm font-medium">{notification.title}</h5>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getTypeColor(notification.type)}`}
                      >
                        {notification.type === 'announcement' ? '公告' : 
                         notification.type === 'alert' ? '警告' : '系統'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
