import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Edit, Trash2, Clock, Users } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const calendarEvents = [
  {
    id: 1,
    title: "Spring Campaign Launch",
    date: "2024-03-15",
    time: "09:00",
    type: "campaign",
    status: "scheduled",
    platform: "Instagram, Facebook",
    assignee: "Sarah Chen"
  },
  {
    id: 2,
    title: "Product Demo Video",
    date: "2024-03-18",
    time: "14:30",
    type: "video",
    status: "in-progress",
    platform: "YouTube, LinkedIn",
    assignee: "Mike Johnson"
  },
  {
    id: 3,
    title: "Newsletter Send",
    date: "2024-03-20",
    time: "10:00",
    type: "email",
    status: "draft",
    platform: "Email",
    assignee: "Lisa Wang"
  },
  {
    id: 4,
    title: "Blog Post: AI Trends",
    date: "2024-03-22",
    time: "08:00",
    type: "blog",
    status: "scheduled",
    platform: "Website, LinkedIn",
    assignee: "David Kim"
  }
];

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

const ContentCalendar = () => {
  const [selectedView, setSelectedView] = useState("month");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Page Title */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-8 h-8 text-primary" />
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Content Calendar
            </h1>
          </div>
          <p className="text-muted-foreground">Plan and schedule your marketing content</p>
        </div>

        {/* Controls */}
        <Card className="p-4 mb-6 bg-gradient-glass backdrop-blur-xl border-border/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={selectedView === "month" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedView("month")}
              >
                Month
              </Button>
              <Button 
                variant={selectedView === "week" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedView("week")}
              >
                Week
              </Button>
              <Button 
                variant={selectedView === "list" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedView("list")}
              >
                List
              </Button>
            </div>
            <Button className="shrink-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </div>
        </Card>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <h3 className="text-lg font-semibold mb-4">March 2024</h3>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6; // Start from -6 to show previous month days
                  const isCurrentMonth = day > 0 && day <= 31;
                  const hasEvent = [15, 18, 20, 22].includes(day);
                  
                  return (
                    <div
                      key={i}
                      className={`
                        min-h-[80px] p-2 border border-border/10 rounded-lg
                        ${isCurrentMonth ? 'bg-white/5 hover:bg-white/10' : 'bg-muted/20'}
                        ${hasEvent ? 'ring-1 ring-primary/30' : ''}
                        transition-colors cursor-pointer
                      `}
                    >
                      <div className={`text-sm ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {isCurrentMonth ? day : ''}
                      </div>
                      {hasEvent && (
                        <div className="mt-1">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <h3 className="text-lg font-semibold mb-4">Upcoming</h3>
              <div className="space-y-4">
                {calendarEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="bg-white/5 border border-border/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1 truncate">{event.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Clock className="w-3 h-3 mr-1 shrink-0" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Users className="w-3 h-3 mr-1 shrink-0" />
                          <span>{event.assignee}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Content List */}
        <Card className="mt-6 p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
          <h3 className="text-lg font-semibold mb-4">All Scheduled Content</h3>
          <div className="space-y-3">
            {calendarEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-white/5 border border-border/10 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {event.date} at {event.time}
                    </span>
                    <span>{event.platform}</span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {event.assignee}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContentCalendar;