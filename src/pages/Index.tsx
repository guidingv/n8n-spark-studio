import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICards } from "@/components/dashboard/KPICards";
import { ContentCalendar } from "@/components/dashboard/ContentCalendar";
import { ChatAgent } from "@/components/dashboard/ChatAgent";
import { ContentManager } from "@/components/dashboard/ContentManager";
import { useStrategyContext } from "@/contexts/StrategyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { CheckCircle, Circle, ArrowRight, Target, FileText, Sparkles, BarChart3, Users, Calendar, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  console.log("Index component rendering");
  const { isStrategyComplete, strategy } = useStrategyContext();
  console.log("Strategy data:", { isStrategyComplete, strategy });
  
  // Calculate completion progress
  const hasContentBriefs = true; // You can track this with actual data later
  const hasCreatedContent = true; // You can track this with actual data later
  
  const getStepStatus = (step: number) => {
    switch (step) {
      case 1:
        return isStrategyComplete ? 'complete' : 'current';
      case 2:
        return isStrategyComplete ? (hasContentBriefs ? 'complete' : 'current') : 'upcoming';
      case 3:
        return isStrategyComplete && hasContentBriefs ? (hasCreatedContent ? 'complete' : 'current') : 'upcoming';
      default:
        return 'upcoming';
    }
  };

  const overallProgress = (() => {
    let progress = 0;
    if (isStrategyComplete) progress += 33;
    if (hasContentBriefs) progress += 33;
    if (hasCreatedContent) progress += 34;
    return progress;
  })();

  const StepCard = ({ 
    step, 
    title, 
    description, 
    icon: Icon, 
    status, 
    action, 
    link 
  }: {
    step: number;
    title: string;
    description: string;
    icon: any;
    status: 'complete' | 'current' | 'upcoming';
    action: string;
    link: string;
  }) => (
    <Card className={`relative transition-all duration-200 ${
      status === 'current' 
        ? 'border-primary shadow-lg shadow-primary/10 bg-primary/5' 
        : status === 'complete' 
        ? 'border-green-500/50 bg-green-500/10' 
        : 'border-muted-foreground/20 bg-muted/30 opacity-75'
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              status === 'complete' 
                ? 'bg-green-100 text-green-600' 
                : status === 'current' 
                ? 'bg-primary/10 text-primary' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {status === 'complete' ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
            </div>
            <div>
              <CardTitle className="text-lg">Step {step}: {title}</CardTitle>
              <Badge variant={status === 'current' ? 'secondary' : 'outline'} className="mt-1">
                {status === 'current' ? 'Active' : 'Available'}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">{description}</p>
        <Button 
          asChild 
          variant={status === 'current' ? 'default' : status === 'complete' ? 'outline' : 'ghost'}
          disabled={status === 'upcoming'}
          className="w-full"
        >
          <Link to={link}>
            {action} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  console.log("About to render Index JSX");
  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to MarketingHub - Test
        </h1>
        <p className="text-gray-600">
          This is a test to see if the basic rendering works.
        </p>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-800">Strategy complete: {isStrategyComplete ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
