import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICards } from "@/components/dashboard/KPICards";
import { ContentCalendar } from "@/components/dashboard/ContentCalendar";
import { ChatAgent } from "@/components/dashboard/ChatAgent";
import { ContentManager } from "@/components/dashboard/ContentManager";
import { useStrategyContext } from "@/contexts/StrategyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight, Target, FileText, Sparkles, BarChart3, Users, Calendar, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { isStrategyComplete, strategy } = useStrategyContext();
  
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Welcome & Progress Section */}
        <div className="py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome to MarketingHub
            </h1>
            <p className="text-lg text-muted-foreground">
              Your complete content marketing workspace. Follow these steps to get started.
            </p>
          </div>

          {/* Status Overview */}
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="h-5 w-5" />
                Your Marketing Hub Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                {isStrategyComplete 
                  ? "🚀 Your marketing hub is active and ready for ongoing content creation and management."
                  : "👋 Welcome! Set up your strategy foundation to unlock the full potential of your marketing hub."
                }
              </p>
            </CardContent>
          </Card>

          {/* Step-by-Step Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StepCard
              step={1}
              title="Strategy Foundation"
              description="Define your brand DNA, target audience, and content pillars to create a solid foundation for all your marketing efforts."
              icon={Target}
              status={getStepStatus(1)}
              action={isStrategyComplete ? "Review Strategy" : "Set Up Strategy"}
              link="/strategy"
            />
            
            <StepCard
              step={2}
              title="Content Planning"
              description="Create content briefs, plan your calendar, and organize your content pipeline for consistent publishing."
              icon={Calendar}
              status={getStepStatus(2)}
              action={hasContentBriefs ? "Manage Content" : "Plan Content"}
              link="/planning"
            />
            
            <StepCard
              step={3}
              title="Create & Publish"
              description="Use AI assistance to create compelling, brand-aligned content with bias checking and strategic guidance for consistent messaging."
              icon={Edit3}
              status={getStepStatus(3)}
              action={hasCreatedContent ? "View Content" : "Start Creating"}
              link="/create"
            />
          </div>
        </div>

        {/* Quick Access Dashboard - Only show if strategy is complete */}
        {isStrategyComplete && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Access Dashboard</h2>
            </div>
            
            <KPICards />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 pb-6">
              <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                <ContentCalendar />
                <ContentManager />
              </div>
              
              <div className="lg:col-span-1">
                <ChatAgent />
              </div>
            </div>
          </>
        )}

        {/* Getting Started Tips - Show if strategy is not complete */}
        {!isStrategyComplete && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Quick Start Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Circle className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-medium">Start with Strategy</h4>
                    <p className="text-sm text-muted-foreground">Define your brand voice, audience, and goals first for better content alignment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-medium">Use AI Assistance</h4>
                    <p className="text-sm text-muted-foreground">Our AI helps generate content ideas and optimize your messaging.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-medium">Plan Ahead</h4>
                    <p className="text-sm text-muted-foreground">Create content briefs and calendar schedules for consistent publishing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-medium">Track Performance</h4>
                    <p className="text-sm text-muted-foreground">Monitor your content's impact and optimize based on data insights.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
