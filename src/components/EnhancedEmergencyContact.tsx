
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, ChevronDown, ChevronUp, ExternalLink, Star } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface EmergencyContact {
  name: string
  phone: string
  department: string
  image?: string
  priority?: boolean
}

interface QuickLink {
  title: string
  url: string
  description?: string
}

const emergencyContacts: EmergencyContact[] = [
  { name: "值班經理", phone: "1234", department: "管理部", priority: true },
  { name: "安全主管", phone: "5678", department: "安全組", priority: true },
  { name: "維修組長", phone: "9101", department: "維修組" },
  { name: "品保主管", phone: "1213", department: "品保組" },
  { name: "廠務主管", phone: "1415", department: "廠務組" },
  { name: "環安人員", phone: "1617", department: "環安組" },
  { name: "警衛室", phone: "1819", department: "保全" },
  { name: "醫護室", phone: "2021", department: "醫護" }
]

const otherDepartmentLinks: QuickLink[] = [
  { title: "人事部系統", url: "#", description: "員工資料管理" },
  { title: "財務部系統", url: "#", description: "預算與成本" },
  { title: "採購部系統", url: "#", description: "供應商管理" },
  { title: "研發部系統", url: "#", description: "產品開發" }
]

const commonLinks: QuickLink[] = [
  { title: "公司內網", url: "#", description: "內部資訊平台" },
  { title: "員工手冊", url: "#", description: "制度規範" },
  { title: "表單下載", url: "#", description: "常用表單" },
  { title: "IT支援", url: "#", description: "技術協助" }
]

export function EnhancedEmergencyContact() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const priorityContacts = emergencyContacts.filter(contact => contact.priority)
  const otherContacts = emergencyContacts.filter(contact => !contact.priority)

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* 其他部門連結 */}
      <div>
        <h3 className="text-sm font-semibold mb-3">其他部門連結</h3>
        <div className="space-y-2">
          {otherDepartmentLinks.map((link, index) => (
            <Card key={index} className="production-card p-3 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{link.title}</div>
                  {link.description && (
                    <div className="text-xs text-gray-500">{link.description}</div>
                  )}
                </div>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 緊急聯絡 */}
      <div>
        <h3 className="text-sm font-semibold mb-3">緊急聯絡</h3>
        <div className="space-y-2">
          {/* 顯示前兩個重要聯絡人 */}
          {priorityContacts.map((contact, index) => (
            <Card key={index} className="production-card p-3 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{contact.name}</div>
                  <div className="text-xs text-gray-500">{contact.department}</div>
                </div>
                <Badge variant="destructive" className="text-xs">
                  {contact.phone}
                </Badge>
              </div>
            </Card>
          ))}

          {/* 展開更多聯絡人 */}
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    收起更多聯絡
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    展開更多聯絡 ({otherContacts.length})
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {otherContacts.map((contact, index) => (
                <Card key={index} className="production-card p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-industrial-orange-100 rounded-full flex items-center justify-center">
                      <Phone className="h-4 w-4 text-industrial-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{contact.name}</div>
                      <div className="text-xs text-gray-500">{contact.department}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {contact.phone}
                    </Badge>
                  </div>
                </Card>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* 常用連結 */}
      <div>
        <h3 className="text-sm font-semibold mb-3">常用連結</h3>
        <div className="space-y-2">
          {commonLinks.map((link, index) => (
            <Card key={index} className="production-card p-3 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium flex items-center gap-2">
                    {link.title}
                    <Star className="h-3 w-3 text-yellow-500" />
                  </div>
                  {link.description && (
                    <div className="text-xs text-gray-500">{link.description}</div>
                  )}
                </div>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
