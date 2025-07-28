import { Card } from "@/components/ui/card";
import { TrendingUp, Calendar, ImageIcon, MessageCircle } from "lucide-react";

const kpiData = [
  {
    title: "Content Planned",
    value: "24",
    subtitle: "This month",
    icon: Calendar,
    trend: "+12%",
    color: "text-n8n-primary"
  },
  {
    title: "Images Generated",
    value: "156",
    subtitle: "Via n8n flows",
    icon: ImageIcon,
    trend: "+8%",
    color: "text-n8n-secondary"
  },
  {
    title: "Engagement Rate",
    value: "4.2%",
    subtitle: "Average",
    icon: TrendingUp,
    trend: "+15%",
    color: "text-n8n-accent"
  },
  {
    title: "AI Suggestions",
    value: "89",
    subtitle: "This week",
    icon: MessageCircle,
    trend: "+23%",
    color: "text-green-400"
  }
];

export const KPICards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 p-4 lg:p-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10 hover:shadow-glass transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 ${kpi.color}`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <span className="text-green-400 text-sm font-medium">{kpi.trend}</span>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{kpi.value}</h3>
            <p className="text-sm text-muted-foreground mb-2">{kpi.title}</p>
            <p className="text-xs text-muted-foreground/80">{kpi.subtitle}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};