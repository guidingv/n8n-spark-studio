import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  Lightbulb, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User,
  Target,
  Clock,
  ArrowLeft,
  FileText,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  ChevronDown
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const contentBriefs = [
  {
    id: 1,
    title: "Spring Product Launch Campaign",
    strategy: "Spring Campaign 2024",
    dueDate: "2024-03-15",
    assignee: "Sarah Chen",
    priority: "high",
    status: "in-progress",
    audience: "Tech-savvy millennials",
    goal: "Drive product awareness and trial sign-ups",
    contentType: "Multi-channel campaign",
    deliverables: ["Blog post", "Social media posts", "Email campaign", "Landing page"],
    description: "Create comprehensive launch campaign for our new AI-powered features targeting millennials aged 25-35."
  },
  {
    id: 2,
    title: "Thought Leadership Article Series",
    strategy: "Thought Leadership Series", 
    dueDate: "2024-03-20",
    assignee: "Mike Johnson",
    priority: "medium",
    status: "brief-ready",
    audience: "Industry professionals",
    goal: "Establish expertise and build trust",
    contentType: "Educational content",
    deliverables: ["3 blog articles", "LinkedIn posts", "Industry report"],
    description: "Position company as thought leader with deep-dive articles on AI trends and implementation."
  },
  {
    id: 3,
    title: "Customer Success Story Video",
    strategy: "Product Demo Campaign",
    dueDate: "2024-03-25", 
    assignee: "Lisa Wang",
    priority: "high",
    status: "planning",
    audience: "Potential customers",
    goal: "Showcase features and drive conversions",
    contentType: "Video content",
    deliverables: ["Customer interview", "Demo video", "Case study", "Social clips"],
    description: "Create compelling customer success story showcasing real results and ROI from our platform."
  },
  {
    id: 4,
    title: "Community Engagement Initiative",
    strategy: "Community Building Initiative",
    dueDate: "2024-03-30",
    assignee: "David Kim", 
    priority: "medium",
    status: "approved",
    audience: "Existing customers",
    goal: "Foster engagement and loyalty",
    contentType: "Interactive content",
    deliverables: ["Community challenges", "User spotlight posts", "Engagement templates"],
    description: "Launch monthly community engagement program to increase user interaction and retention."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "bg-green-500/20 text-green-500 border-green-500/30";
    case "in-progress": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    case "brief-ready": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "planning": return "bg-purple-500/20 text-purple-500 border-purple-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-500/20 text-red-500 border-red-500/30";
    case "medium": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "low": return "bg-green-500/20 text-green-500 border-green-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved": return CheckCircle2;
    case "in-progress": return PlayCircle;
    case "brief-ready": return FileText;
    case "planning": return AlertCircle;
    default: return Clock;
  }
};

const ContentPlanning = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [briefs, setBriefs] = useState(contentBriefs);
  const { toast } = useToast();

  const statusOptions = [
    { value: "planning", label: "Planning", color: "bg-purple-500/20 text-purple-500 border-purple-500/30" },
    { value: "brief-ready", label: "Brief Ready", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" },
    { value: "in-progress", label: "In Progress", color: "bg-blue-500/20 text-blue-500 border-blue-500/30" },
    { value: "approved", label: "Approved", color: "bg-green-500/20 text-green-500 border-green-500/30" }
  ];

  const handleStatusChange = (briefId: number, newStatus: string) => {
    setBriefs(prev => prev.map(brief => 
      brief.id === briefId ? { ...brief, status: newStatus } : brief
    ));
    
    const statusLabel = statusOptions.find(s => s.value === newStatus)?.label || newStatus;
    toast({
      title: "Status Updated",
      description: `Brief status changed to ${statusLabel}`,
    });
  };

  const filteredBriefs = briefs.filter(brief => {
    const matchesSearch = brief.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brief.strategy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || brief.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Page Title */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Lightbulb className="w-8 h-8 text-primary" />
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Content Planning & Briefs
            </h1>
          </div>
          <p className="text-muted-foreground">Plan your content strategy and create detailed briefs</p>
        </div>

        {/* Controls */}
        <Card className="p-4 mb-6 bg-gradient-glass backdrop-blur-xl border-border/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search briefs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="planning">Planning</TabsTrigger>
                  <TabsTrigger value="brief-ready">Brief Ready</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              
              <Button onClick={() => navigate('/create')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Brief
              </Button>
            </div>
          </div>
        </Card>

        {/* Content Briefs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBriefs.map((brief) => {
            const StatusIcon = getStatusIcon(brief.status);
            return (
              <Card key={brief.id} className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10 hover:shadow-glass transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/planning/${brief.id}`)}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{brief.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{brief.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge className={`${getStatusColor(brief.status)} cursor-pointer hover:opacity-80 transition-opacity`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {brief.status}
                            <ChevronDown className="w-3 h-3 ml-1" />
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-50 bg-popover border shadow-md" align="end">
                          {statusOptions.map((option) => (
                            <DropdownMenuItem
                              key={option.value}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(brief.id, option.value);
                              }}
                              className="cursor-pointer"
                            >
                              <span className={`w-2 h-2 rounded-full mr-2 ${option.color.split(' ')[0]}`} />
                              {option.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Strategy & Priority */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{brief.strategy}</span>
                    </div>
                    <Badge className={getPriorityColor(brief.priority)}>
                      {brief.priority} priority
                    </Badge>
                  </div>

                  {/* Content Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Audience:</span>
                      <span>{brief.audience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Goal:</span>
                      <span className="line-clamp-1">{brief.goal}</span>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Deliverables:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {brief.deliverables.slice(0, 3).map((deliverable, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {deliverable}
                        </Badge>
                      ))}
                      {brief.deliverables.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{brief.deliverables.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{brief.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Due {new Date(brief.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Stats Footer */}
        <Card className="mt-6 p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredBriefs.length} briefs shown</span>
            <span>
              {briefs.filter(b => b.status === 'approved').length} approved • 
              {briefs.filter(b => b.status === 'in-progress').length} in progress • 
              {briefs.filter(b => b.status === 'planning').length} planning
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContentPlanning;