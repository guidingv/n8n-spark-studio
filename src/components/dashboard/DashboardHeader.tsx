import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Zap, MessageSquare, Calendar, FolderOpen, Home, Sparkles, Target } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const DashboardHeader = () => {
  const [isConnected, setIsConnected] = useState(true);
  const location = useLocation();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 lg:p-6 bg-gradient-glass backdrop-blur-xl border-b border-border/10 gap-4">
      <div className="flex items-center space-x-3 lg:space-x-4">
        <div className="flex items-center space-x-2 lg:space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Marketinghub
            </h1>
            <p className="text-xs lg:text-sm text-muted-foreground">Marketing Content Dashboard</p>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "secondary" : "ghost"} 
              size="sm"
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
          <Link to="/calendar">
            <Button 
              variant={location.pathname === "/calendar" ? "secondary" : "ghost"} 
              size="sm"
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </Button>
          </Link>
          <Link to="/strategy">
            <Button 
              variant={location.pathname === "/strategy" ? "secondary" : "ghost"} 
              size="sm"
              className="flex items-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>Strategy</span>
            </Button>
          </Link>
          <Link to="/create">
            <Button 
              variant={location.pathname === "/create" ? "secondary" : "ghost"} 
              size="sm"
              className="flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create</span>
            </Button>
          </Link>
          <Link to="/assets">
            <Button 
              variant={location.pathname === "/assets" ? "secondary" : "ghost"} 
              size="sm"
              className="flex items-center space-x-2"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Assets</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 lg:space-x-4 justify-start lg:justify-end overflow-x-auto">
        <Badge 
          variant={isConnected ? "default" : "destructive"}
          className={`${isConnected ? 'bg-n8n-secondary/20 text-n8n-secondary border-n8n-secondary/30' : ''}`}
        >
          <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-n8n-secondary' : 'bg-destructive'}`} />
          {isConnected ? "Database Connected" : "Database Disconnected"}
        </Badge>
        
        <Button variant="outline" size="sm" className="border-border/30 hover:bg-white/10 hover:text-white hover:border-white/20 shrink-0">
          <MessageSquare className="w-4 h-4 lg:mr-2" />
          <span className="hidden lg:inline">Chat Agent</span>
        </Button>
        
        <Button variant="outline" size="sm" className="border-border/30 hover:bg-white/10 hover:text-white hover:border-white/20 shrink-0">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};