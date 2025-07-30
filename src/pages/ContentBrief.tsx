import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Calendar,
  User,
  Target,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  ChevronDown
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

// Mock data - in a real app this would come from an API
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
    description: "Create comprehensive launch campaign for our new AI-powered features targeting millennials aged 25-35.",
    background: "Our latest AI features have been in beta testing for 3 months with positive feedback. We need to create awareness and drive adoption among our target demographic.",
    keyMessages: [
      "Revolutionary AI features that save time",
      "Easy-to-use interface for everyone",
      "Proven results from beta testing"
    ],
    contentOutline: [
      {
        type: "Blog post",
        title: "Introducing Our Game-Changing AI Features",
        description: "Long-form content explaining the features and benefits"
      },
      {
        type: "Social media posts",
        title: "Social Campaign Assets",
        description: "10 posts across LinkedIn, Twitter, and Instagram"
      },
      {
        type: "Email campaign",
        title: "Launch Announcement Series",
        description: "3-part email series for existing users"
      },
      {
        type: "Landing page",
        title: "Feature Overview Page",
        description: "Dedicated page for feature exploration and sign-up"
      }
    ],
    requirements: [
      "Must align with brand voice and tone",
      "Include customer testimonials",
      "Use beta testing data and results",
      "Call-to-action for trial sign-up"
    ],
    resources: [
      "Beta testing report",
      "Customer testimonials",
      "Feature screenshots",
      "Brand guidelines"
    ]
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
    description: "Position company as thought leader with deep-dive articles on AI trends and implementation.",
    background: "The AI industry is rapidly evolving and our audience needs trusted insights to navigate the changes.",
    keyMessages: [
      "We understand the challenges of AI implementation",
      "Practical insights based on real experience",
      "Future-focused perspective on AI trends"
    ],
    contentOutline: [
      {
        type: "Blog article",
        title: "The Future of AI in Business: 2024 Predictions",
        description: "Comprehensive analysis of upcoming AI trends"
      },
      {
        type: "Blog article", 
        title: "Overcoming AI Implementation Challenges",
        description: "Practical guide for business leaders"
      },
      {
        type: "Blog article",
        title: "ROI Measurement for AI Initiatives",
        description: "Framework for measuring AI success"
      }
    ],
    requirements: [
      "Data-driven insights",
      "Original research or analysis",
      "Expert quotes and interviews",
      "Actionable takeaways"
    ],
    resources: [
      "Industry research reports",
      "Internal case studies",
      "Expert interview contacts",
      "Data analytics tools"
    ]
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

const ContentBrief = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [briefData, setBriefData] = useState(() => contentBriefs.find(b => b.id === parseInt(id || "0")));
  const { toast } = useToast();

  const statusOptions = [
    { value: "planning", label: "Planning", color: "bg-purple-500/20 text-purple-500 border-purple-500/30" },
    { value: "brief-ready", label: "Brief Ready", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" },
    { value: "in-progress", label: "In Progress", color: "bg-blue-500/20 text-blue-500 border-blue-500/30" },
    { value: "approved", label: "Approved", color: "bg-green-500/20 text-green-500 border-green-500/30" }
  ];

  const priorityOptions = [
    { value: "low", label: "Low", color: "bg-green-500/20 text-green-500 border-green-500/30" },
    { value: "medium", label: "Medium", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" },
    { value: "high", label: "High", color: "bg-red-500/20 text-red-500 border-red-500/30" }
  ];

  const handleStatusChange = (newStatus: string) => {
    if (briefData) {
      setBriefData({ ...briefData, status: newStatus });
      const statusLabel = statusOptions.find(s => s.value === newStatus)?.label || newStatus;
      toast({
        title: "Status Updated",
        description: `Brief status changed to ${statusLabel}`,
      });
    }
  };

  const handlePriorityChange = (newPriority: string) => {
    if (briefData) {
      setBriefData({ ...briefData, priority: newPriority });
      const priorityLabel = priorityOptions.find(p => p.value === newPriority)?.label || newPriority;
      toast({
        title: "Priority Updated",
        description: `Brief priority changed to ${priorityLabel}`,
      });
    }
  };
  
  if (!briefData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <DashboardHeader />
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Brief Not Found</h1>
            <p className="text-muted-foreground mb-6">The content brief you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/planning")}>Back to Planning</Button>
          </div>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(briefData.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/planning")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Planning
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Brief
                </>
              )}
            </Button>
            {isEditing && (
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        </div>

        {/* Brief Header */}
        <Card className="p-6 mb-6 bg-gradient-glass backdrop-blur-xl border-border/10">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {isEditing ? (
                  <Input 
                    defaultValue={briefData.title}
                    className="text-2xl font-bold bg-transparent border-none p-0 mb-2"
                  />
                ) : (
                  <h1 className="text-2xl font-bold mb-2">{briefData.title}</h1>
                )}
                {isEditing ? (
                  <Textarea 
                    defaultValue={briefData.description}
                    className="bg-transparent border-none p-0 resize-none"
                    rows={2}
                  />
                ) : (
                  <p className="text-muted-foreground">{briefData.description}</p>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Badge className={`${getStatusColor(briefData.status)} cursor-pointer hover:opacity-80 transition-opacity`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {briefData.status}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Badge>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-50 bg-background border-border shadow-lg" align="end">
                    {statusOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleStatusChange(option.value)}
                        className="cursor-pointer"
                      >
                        <span className={`w-2 h-2 rounded-full mr-2 ${option.color.split(' ')[0]}`} />
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Badge className={`${getPriorityColor(briefData.priority)} cursor-pointer hover:opacity-80 transition-opacity`}>
                      {briefData.priority} priority
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Badge>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-50 bg-background border-border shadow-lg" align="end">
                    {priorityOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handlePriorityChange(option.value)}
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-border/10">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Strategy</div>
                  {isEditing ? (
                    <Select defaultValue={briefData.strategy} onValueChange={(value) => setBriefData({...briefData, strategy: value})}>
                      <SelectTrigger className="h-auto p-0 border-none bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        <SelectItem value="Spring Campaign 2024">Spring Campaign 2024</SelectItem>
                        <SelectItem value="Thought Leadership Series">Thought Leadership Series</SelectItem>
                        <SelectItem value="Product Launch">Product Launch</SelectItem>
                        <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="font-medium">{briefData.strategy}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Assignee</div>
                  {isEditing ? (
                    <Select defaultValue={briefData.assignee} onValueChange={(value) => setBriefData({...briefData, assignee: value})}>
                      <SelectTrigger className="h-auto p-0 border-none bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                        <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                        <SelectItem value="Alex Rodriguez">Alex Rodriguez</SelectItem>
                        <SelectItem value="Emma Wilson">Emma Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="font-medium">{briefData.assignee}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Due Date</div>
                  {isEditing ? (
                    <Input 
                      type="date" 
                      defaultValue={briefData.dueDate}
                      onChange={(e) => setBriefData({...briefData, dueDate: e.target.value})}
                      className="h-auto p-0 border-none bg-transparent font-medium"
                    />
                  ) : (
                    <div className="font-medium">{new Date(briefData.dueDate).toLocaleDateString()}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">Content Type</div>
                  {isEditing ? (
                    <Select defaultValue={briefData.contentType} onValueChange={(value) => setBriefData({...briefData, contentType: value})}>
                      <SelectTrigger className="h-auto p-0 border-none bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        <SelectItem value="Multi-channel campaign">Multi-channel campaign</SelectItem>
                        <SelectItem value="Educational content">Educational content</SelectItem>
                        <SelectItem value="Social media">Social media</SelectItem>
                        <SelectItem value="Blog content">Blog content</SelectItem>
                        <SelectItem value="Email marketing">Email marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="font-medium">{briefData.contentType}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Background */}
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Project Background & Goal
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Background</Label>
                  {isEditing ? (
                    <Textarea 
                      defaultValue={briefData.background}
                      className="mt-2"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-2">{briefData.background}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Primary Goal</Label>
                  {isEditing ? (
                    <Input defaultValue={briefData.goal} className="mt-2" />
                  ) : (
                    <p className="mt-2">{briefData.goal}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
                  {isEditing ? (
                    <Input defaultValue={briefData.audience} className="mt-2" />
                  ) : (
                    <p className="mt-2">{briefData.audience}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Key Messages */}
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Key Messages
                </h3>
                {isEditing && (
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Message
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {briefData.keyMessages.map((message, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input defaultValue={message} className="flex-1" />
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <p>{message}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Content Outline */}
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Content Outline
                </h3>
                {isEditing && (
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {briefData.contentOutline.map((content, index) => (
                  <div key={index} className="border border-border/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="mb-2">{content.type}</Badge>
                      {isEditing && (
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input defaultValue={content.title} placeholder="Title" />
                        <Textarea defaultValue={content.description} placeholder="Description" rows={2} />
                      </div>
                    ) : (
                      <>
                        <h4 className="font-medium mb-1">{content.title}</h4>
                        <p className="text-sm text-muted-foreground">{content.description}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deliverables */}
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Deliverables</h3>
                {isEditing && (
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {briefData.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input defaultValue={deliverable} className="text-sm" />
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm">{deliverable}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Requirements */}
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Requirements</h3>
                {isEditing && (
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {briefData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input defaultValue={requirement} className="text-sm" />
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm">{requirement}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Resources */}
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Resources</h3>
                {isEditing && (
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {briefData.resources.map((resource, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input defaultValue={resource} className="text-sm" />
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm">{resource}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBrief;