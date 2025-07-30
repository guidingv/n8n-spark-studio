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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-8">
        {/* Progress Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Content Marketing Hub</h1>
            <Badge variant="outline" className="text-sm">
              {overallProgress}% Complete
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Getting Started Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Getting Started</h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <StepCard
              step={1}
              title="Define Strategy"
              description="Set up your brand DNA, content pillars, and target audiences to create a comprehensive content strategy."
              icon={Target}
              status={getStepStatus(1)}
              action={isStrategyComplete ? "Review Strategy" : "Start Strategy"}
              link="/strategy"
            />
            
            <StepCard
              step={2}
              title="Plan Content"
              description="Create detailed content briefs and plan your content calendar based on your strategy."
              icon={FileText}
              status={getStepStatus(2)}
              action="Plan Content"
              link="/planning"
            />
            
            <StepCard
              step={3}
              title="Create & Publish"
              description="Use AI-powered tools to create engaging content and manage your publishing schedule."
              icon={Sparkles}
              status={getStepStatus(3)}
              action="Create Content"
              link="/editor"
            />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <KPICards />
            <div className="mt-6">
              <ContentCalendar />
            </div>
          </div>
          <div className="space-y-6">
            <ChatAgent />
            <ContentManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
