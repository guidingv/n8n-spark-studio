import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users, Edit, Eye, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  status: string;
  platform: string;
  assignee: string;
}

interface DayDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string;
  events: CalendarEvent[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled": return "bg-green-500/20 text-green-500 border-green-500/30";
    case "in-progress": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "draft": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "campaign": return "bg-purple-500/20 text-purple-500 border-purple-500/30";
    case "video": return "bg-red-500/20 text-red-500 border-red-500/30";
    case "email": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    case "blog": return "bg-green-500/20 text-green-500 border-green-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  open,
  onOpenChange,
  selectedDate,
  events
}) => {
  const navigate = useNavigate();

  const handleEditContent = (eventId: number) => {
    navigate(`/editor/${eventId}`);
    onOpenChange(false);
  };

  const handleViewDetails = (eventId: number) => {
    navigate(`/editor/${eventId}?mode=preview`);
    onOpenChange(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {formatDate(selectedDate)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {events.length === 0 ? (
            <Card className="p-6 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No content scheduled
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                There's no content scheduled for this day yet.
              </p>
              <Button onClick={() => { navigate('/create'); onOpenChange(false); }}>
                Create Content
              </Button>
            </Card>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-4">
                {events.length} content item{events.length !== 1 ? 's' : ''} scheduled
              </div>
              
              {events.map((event) => (
                <Card key={event.id} className="p-4 bg-gradient-glass border-border/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          <span>{event.platform}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{event.assignee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-3 border-t border-border/10">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(event.id)}
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditContent(event.id)}
                    >
                      <Edit className="w-3 h-3 mr-2" />
                      Edit Content
                    </Button>
                  </div>
                </Card>
              ))}
              
              <div className="flex justify-center pt-4">
                <Button 
                  variant="outline"
                  onClick={() => { navigate('/create'); onOpenChange(false); }}
                >
                  Add More Content
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};