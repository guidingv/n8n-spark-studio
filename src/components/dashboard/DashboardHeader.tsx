import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Zap, MessageSquare } from "lucide-react";

export const DashboardHeader = () => {
  const [isConnected, setIsConnected] = useState(true);

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-glass backdrop-blur-xl border-b border-border/10">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              n8n Spark Studio
            </h1>
            <p className="text-sm text-muted-foreground">Marketing Content Dashboard</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Badge 
          variant={isConnected ? "default" : "destructive"}
          className={`${isConnected ? 'bg-n8n-secondary/20 text-n8n-secondary border-n8n-secondary/30' : ''}`}
        >
          <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-n8n-secondary' : 'bg-destructive'}`} />
          {isConnected ? "n8n Connected" : "n8n Disconnected"}
        </Badge>
        
        <Button variant="outline" size="sm" className="border-border/30 hover:bg-white/5">
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat Agent
        </Button>
        
        <Button variant="outline" size="sm" className="border-border/30 hover:bg-white/5">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};