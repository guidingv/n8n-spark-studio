import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICards } from "@/components/dashboard/KPICards";
import { ContentCalendar } from "@/components/dashboard/ContentCalendar";
import { ChatAgent } from "@/components/dashboard/ChatAgent";
import { ContentManager } from "@/components/dashboard/ContentManager";
import { ProjectHeader } from "@/components/ProjectHeader";
import { useStrategyContext } from "@/contexts/StrategyContext";
import { useProject } from "@/contexts/ProjectContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, ArrowRight, Target, FileText, Sparkles, BarChart3, Users, Calendar, Edit3 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

const Index = () => {
  const { currentProject } = useProject();
  const { isStrategyComplete, strategy } = useStrategyContext();

  // Redirect to project selector if no project is selected
  if (!currentProject) {
    return <Navigate to="/projects" replace />;
  }
  
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
      <ProjectHeader />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header with Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{currentProject.name}</h1>
              <p className="text-muted-foreground mt-1">{currentProject.description}</p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="gap-2">
                <Link to="/editor">
                  <Edit3 className="h-4 w-4" />
                  Create Content
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Overview */}
        <div className="mb-8">
          <KPICards />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Projects Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Project Content</CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/planning">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/strategy" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Content Strategy</p>
                      <p className="text-xs text-muted-foreground">{isStrategyComplete ? 'Completed' : 'In Progress'}</p>
                    </div>
                  </div>
                  <Badge variant={isStrategyComplete ? "default" : "secondary"} className="text-xs">
                    Enter
                  </Badge>
                </Link>
                
                <Link to="/calendar" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Content Calendar</p>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">View</Badge>
                </Link>
                
                <Link to="/planning" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                      <Edit3 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Content Planning</p>
                      <p className="text-xs text-muted-foreground">Create briefs</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Enter</Badge>
                </Link>
                
                <Link to="/editor" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Create Content</p>
                      <p className="text-xs text-muted-foreground">AI-powered editor</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Create</Badge>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Content Calendar */}
          <div className="lg:col-span-2">
            <ContentCalendar />
          </div>
        </div>

        {/* Recent Content & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Content */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Recent Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="p-1.5 rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">AI Analytics Blog Post</p>
                    <p className="text-xs text-muted-foreground">Published 2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="p-1.5 rounded-full bg-yellow-100 text-yellow-600">
                    <Circle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Product Demo Video</p>
                    <p className="text-xs text-muted-foreground">In review</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="p-1.5 rounded-full bg-blue-100 text-blue-600">
                    <Edit3 className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Weekly Newsletter</p>
                    <p className="text-xs text-muted-foreground">Draft</p>
                  </div>
                </div>
                
                <Button asChild variant="outline" size="sm" className="w-full mt-4">
                  <Link to="/planning">View All Content</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Assistant & Tools */}
          <div className="lg:col-span-2 space-y-6">
            <ChatAgent />
            <ContentManager />
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Strategy Planning</h3>
                <p className="text-sm text-muted-foreground mb-4">Define content strategy and pillars</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/strategy">Start Planning</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Content Calendar</h3>
                <p className="text-sm text-muted-foreground mb-4">Schedule and organize content</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/calendar">View Calendar</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Content Briefs</h3>
                <p className="text-sm text-muted-foreground mb-4">Create detailed content plans</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/planning">Create Brief</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">Track content performance</p>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
