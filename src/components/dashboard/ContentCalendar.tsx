import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Plus, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const contentData = [
  {
    id: 1,
    title: "Product Launch Campaign",
    date: "2024-01-15",
    type: "Social Media",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Brand Story Video",
    date: "2024-01-18",
    type: "Video Content",
    status: "in-progress",
    image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Newsletter Design",
    date: "2024-01-22",
    type: "Email Marketing",
    status: "draft",
    image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Influencer Collaboration",
    date: "2024-01-25",
    type: "Partnership",
    status: "scheduled",
    image: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=300&fit=crop"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled": return "bg-n8n-secondary/20 text-n8n-secondary border-n8n-secondary/30";
    case "in-progress": return "bg-n8n-accent/20 text-n8n-accent border-n8n-accent/30";
    case "draft": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

export const ContentCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState("January 2024");
  const navigate = useNavigate();

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-n8n-primary" />
          <h2 className="text-xl font-semibold text-foreground">Content Calendar</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/calendar')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-border/30 hover:bg-white/5">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-foreground px-3">{currentMonth}</span>
            <Button variant="outline" size="sm" className="border-border/30 hover:bg-white/5">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/create')}
              className="border-n8n-primary/30 text-n8n-primary hover:bg-n8n-primary/10"
            >
              Plan Content
            </Button>
            <Button 
              onClick={() => navigate('/create')} 
              className="bg-gradient-primary hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contentData.map((content) => (
          <div 
            key={content.id} 
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-border/20 hover:shadow-glass transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/editor/${content.id}`)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={content.image} 
                alt={content.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <Badge className={`absolute top-3 right-3 ${getStatusColor(content.status)}`}>
                {content.status}
              </Badge>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{content.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-n8n-secondary">{content.type}</span>
                <span className="text-muted-foreground">{new Date(content.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};