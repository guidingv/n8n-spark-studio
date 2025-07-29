import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Users, 
  TrendingUp, 
  Calendar, 
  Tag,
  ChevronDown,
  Check
} from "lucide-react";

interface Strategy {
  id: string;
  name: string;
  type: string;
  audience: string;
  contentTone: string;
  contentGoal: string;
  goals: string[];
  timeline: string;
  priority: "high" | "medium" | "low";
  color: string;
}

interface StrategyPackProps {
  selectedStrategy?: string;
  onStrategyChange: (strategyId: string) => void;
}

const strategies: Strategy[] = [
  {
    id: "1",
    name: "Spring Campaign 2024",
    type: "Product Launch",
    audience: "Tech-savvy millennials (25-35)",
    contentTone: "Enthusiastic and innovative",
    contentGoal: "Drive product awareness and trial sign-ups",
    goals: ["Brand awareness", "Lead generation", "Sales conversion"],
    timeline: "Q2 2024",
    priority: "high",
    color: "bg-green-500"
  },
  {
    id: "2", 
    name: "Thought Leadership Series",
    type: "Content Marketing",
    audience: "Industry professionals and decision makers",
    contentTone: "Professional and authoritative",
    contentGoal: "Establish expertise and build trust",
    goals: ["Authority building", "Community engagement"],
    timeline: "Ongoing",
    priority: "medium",
    color: "bg-blue-500"
  },
  {
    id: "3",
    name: "Product Demo Campaign",
    type: "Video Marketing",
    audience: "Potential customers researching solutions",
    contentTone: "Clear and demonstrative",
    contentGoal: "Showcase features and drive conversions",
    goals: ["Feature showcase", "Trial sign-ups"],
    timeline: "Q3 2024",
    priority: "high",
    color: "bg-purple-500"
  },
  {
    id: "4",
    name: "Community Building Initiative",
    type: "Social Media",
    audience: "Existing customers and advocates",
    contentTone: "Friendly and community-focused",
    contentGoal: "Foster engagement and loyalty",
    goals: ["Retention", "User-generated content"],
    timeline: "Q4 2024",
    priority: "medium",
    color: "bg-orange-500"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-500/20 text-red-500 border-red-500/30";
    case "medium": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "low": return "bg-green-500/20 text-green-500 border-green-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

export const StrategyPack: React.FC<StrategyPackProps> = ({
  selectedStrategy,
  onStrategyChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const selectedStrategyData = strategies.find(s => s.id === selectedStrategy);

  return (
    <Card className="p-4 mb-6 bg-gradient-glass backdrop-blur-xl border-border/10">
      {selectedStrategyData ? (
        <div className="space-y-3">
          {/* Header with strategy info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${selectedStrategyData.color}`} />
                <span className="font-semibold">{selectedStrategyData.name}</span>
              </div>
              <Badge className={getPriorityColor(selectedStrategyData.priority)}>
                {selectedStrategyData.priority}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Compact content guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Audience</span>
                <p className="text-foreground">{selectedStrategyData.audience}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Content Goal</span>
                <p className="text-foreground">{selectedStrategyData.contentGoal}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Tone</span>
                <p className="text-foreground">{selectedStrategyData.contentTone}</p>
              </div>
            </div>
          </div>

          {/* Expanded details */}
          {isExpanded && (
            <>
              <Separator />
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Change Strategy Association
                  </label>
                  <Select value={selectedStrategy} onValueChange={onStrategyChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a strategy pack..." />
                    </SelectTrigger>
                    <SelectContent>
                      {strategies.map((strategy) => (
                        <SelectItem key={strategy.id} value={strategy.id}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${strategy.color}`} />
                            <span>{strategy.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Type:</span>
                      <span>{selectedStrategyData.type}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Timeline:</span>
                      <span>{selectedStrategyData.timeline}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <span className="font-medium">Strategic Goals:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedStrategyData.goals.map((goal, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Strategy Pack</h3>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              Associate with Strategy
            </label>
            <Select value={selectedStrategy} onValueChange={onStrategyChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a strategy pack..." />
              </SelectTrigger>
              <SelectContent>
                {strategies.map((strategy) => (
                  <SelectItem key={strategy.id} value={strategy.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${strategy.color}`} />
                      <span>{strategy.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </Card>
  );
};