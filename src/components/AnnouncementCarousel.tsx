
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Announcement {
  id: number
  title: string
  image: string
  link?: string
  description?: string
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "新版系統上線公告",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=300&fit=crop",
    link: "/announcements",
    description: "生產管理系統 v2.1.0 正式上線"
  },
  {
    id: 2,
    title: "安全生產月活動",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop",
    link: "/announcements",
    description: "2024年度安全生產月活動開始"
  },
  {
    id: 3,
    title: "設備維護通知",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=300&fit=crop",
    link: "/announcements",
    description: "生產線維護計劃公告"
  }
]

export function AnnouncementCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === mockAnnouncements.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? mockAnnouncements.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === mockAnnouncements.length - 1 ? 0 : currentIndex + 1)
  }

  const handleClick = () => {
    const current = mockAnnouncements[currentIndex]
    if (current.link) {
      window.location.href = current.link
    }
  }

  return (
    <Card className="production-card overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="relative h-48 cursor-pointer" onClick={handleClick}>
          <img
            src={mockAnnouncements[currentIndex].image}
            alt={mockAnnouncements[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-lg font-semibold mb-1">
              {mockAnnouncements[currentIndex].title}
            </h3>
            <p className="text-sm opacity-90">
              {mockAnnouncements[currentIndex].description}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {mockAnnouncements.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                goToSlide(index)
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
