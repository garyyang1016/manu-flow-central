
import { Card, CardContent } from "@/components/ui/card"
import { Phone } from "lucide-react"

interface EmergencyContactProps {
  name: string
  phone: string
  department: string
  image?: string
}

export function EmergencyContact({ name, phone, department, image }: EmergencyContactProps) {
  return (
    <Card className="production-card w-24 h-28 hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-2 h-full flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 bg-industrial-orange-100 rounded-full flex items-center justify-center mb-1">
          {image ? (
            <img src={image} alt={name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <Phone className="h-5 w-5 text-industrial-orange-600" />
          )}
        </div>
        <div className="text-xs font-medium text-gray-800 leading-tight">{name}</div>
        <div className="text-xs text-gray-600 mt-1">{department}</div>
      </CardContent>
    </Card>
  )
}
