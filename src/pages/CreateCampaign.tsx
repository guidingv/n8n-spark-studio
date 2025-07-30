import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useStrategy } from "@/hooks/useStrategy";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  Send, 
  User, 
  Bot, 
  Calendar,
  Image,
  FileText,
  Download,
  Save,
  Wand2,
  ArrowLeft,
  Zap,
  Target,
  PenTool,
  CheckCircle,
  Eye,
  ExternalLink
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  assets?: GeneratedAsset[];
}

interface GeneratedAsset {
  id: string;
  type: "image" | "text" | "calendar" | "brief" | "campaign";
  title: string;
  content: string;
  metadata?: any;
}

type CreationType = "campaign" | "brief" | "post" | "series";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getAIContext, isStrategyComplete } = useStrategy();
  const [activeTab, setActiveTab] = useState<CreationType>("campaign");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: getWelcomeMessage("campaign"),
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [savedAssets, setSavedAssets] = useState<GeneratedAsset[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function getWelcomeMessage(type: CreationType): string {
    const context = isStrategyComplete ? getAIContext() : null;
    const brandInfo = context?.brand ? `for ${context.brand.name}` : "";
    
    switch (type) {
      case "campaign":
        return `Hi! I'm your AI content creation assistant. I'll help you create comprehensive campaigns ${brandInfo}. ${context ? "I have your brand strategy loaded and ready to use!" : "Tell me about your brand and campaign goals to get started."}`;
      case "brief":
        return `Ready to create detailed content briefs ${brandInfo}! I can help you plan individual content pieces with specific objectives, target audiences, and deliverables. ${context ? "I'll use your brand strategy to ensure consistency." : "Share your content goals to begin."}`;
      case "post":
        return `Let's create individual content posts ${brandInfo}! I can generate copy, suggest visuals, and optimize for your target audience. ${context ? "Your brand voice and visual style are loaded and ready." : "Tell me what type of content you need."}`;
      case "series":
        return `Perfect! I'll help you plan a content series ${brandInfo}. I can create multi-part campaigns with consistent messaging and progressive storytelling. ${context ? "Using your content pillars and brand guidelines." : "Describe your series concept to start."}`;
      default:
        return "Hi! How can I help you create content today?";
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateContent = async (userMessage: string): Promise<GeneratedAsset[]> => {
    // Simulate AI content generation with strategy context
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const assets: GeneratedAsset[] = [];
    const context = isStrategyComplete ? getAIContext() : null;
    
    // Generate content based on active tab and user input
    switch (activeTab) {
      case "campaign":
        if (userMessage.toLowerCase().includes("full campaign") || userMessage.toLowerCase().includes("complete")) {
          assets.push({
            id: crypto.randomUUID(),
            type: "campaign",
            title: "Complete Campaign Strategy",
            content: `Campaign Overview:\n${context?.brand ? `Brand: ${context.brand.name}\n` : ""}Objective: Drive brand awareness and engagement\nTarget Audience: ${context?.audience?.name || "Primary target group"}\nDuration: 4 weeks\n\nContent Pillars:\n${context?.contentPillars?.map(p => `• ${p.name}: ${p.description}`).join('\n') || "• Educational content\n• Behind-the-scenes\n• Product highlights"}`,
            metadata: { type: "strategy", duration: "4 weeks" }
          });
        }
        break;
        
      case "brief":
        assets.push({
          id: crypto.randomUUID(),
          type: "brief",
          title: "Content Brief",
          content: `Content Brief\n\nObjective: ${userMessage}\nTarget Audience: ${context?.audience?.name || "Primary audience"}\nBrand Voice: ${context?.brand?.tone || "Professional and engaging"}\nKey Message: [Generated based on brand values]\nDeliverables: \n• Primary content piece\n• Social media posts\n• Visual assets\nSuccess Metrics: Engagement rate, reach, conversions`,
          metadata: { type: "brief", status: "draft" }
        });
        break;
        
      case "post":
        if (userMessage.toLowerCase().includes("copy") || userMessage.toLowerCase().includes("text")) {
          const brandValues = context?.brand?.values?.join(", ") || "innovation, quality, trust";
          assets.push({
            id: crypto.randomUUID(),
            type: "text",
            title: "Social Media Copy",
            content: `🚀 ${context?.brand?.name ? `At ${context.brand.name}, we believe in ` : "We believe in "}${brandValues}.\n\n${context?.brand?.tagline || "Transform your experience with us."}\n\n#${context?.brand?.name?.replace(/\s+/g, '') || "Brand"} #Innovation #Quality`,
            metadata: { platform: "social", tone: context?.brand?.tone || "professional" }
          });
        }
        break;
        
      case "series":
        assets.push({
          id: crypto.randomUUID(),
          type: "calendar",
          title: "Content Series Plan",
          content: `Content Series: "${userMessage}"\n\nWeek 1: Introduction & Problem\nWeek 2: Solution Deep Dive\nWeek 3: Success Stories\nWeek 4: Call to Action\n\nContent Types:\n• Blog posts\n• Social media\n• Email campaigns\n• Visual content`,
          metadata: { type: "series", duration: "4 weeks" }
        });
        break;
    }
    
    // Universal content types
    if (userMessage.toLowerCase().includes("image") || userMessage.toLowerCase().includes("visual")) {
      const brandColors = context?.brand?.colors?.[0] || "#3B82F6";
      assets.push({
        id: crypto.randomUUID(),
        type: "image",
        title: "Brand Visual",
        content: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        metadata: { 
          dimensions: "800x600", 
          format: "JPG",
          brandColors: context?.brand?.colors || ["#3B82F6"],
          style: context?.brand?.visualStyle?.description || "modern and professional"
        }
      });
    }
    
    return assets;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsGenerating(true);

    try {
      // Generate content based on user input
      const assets = await generateContent(inputValue);
      
      let botResponse = "I've analyzed your request and generated some content for your campaign. ";
      
      if (assets.length > 0) {
        botResponse += `Here's what I created:\n\n`;
        assets.forEach(asset => {
          botResponse += `• ${asset.title} (${asset.type})\n`;
        });
        botResponse += "\nYou can preview, edit, or save these assets below. Would you like me to generate anything else?";
      } else {
        botResponse += "Could you be more specific about what type of content you need? I can help create images, copy, or schedule your campaign.";
      }

      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
        assets: assets.length > 0 ? assets : undefined
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Sorry, I encountered an error generating content. Please try again.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "image": return Image;
      case "text": return FileText;
      case "calendar": return Calendar;
      case "brief": return PenTool;
      case "campaign": return Target;
      default: return FileText;
    }
  };

  const handleTabChange = (value: string) => {
    const newTab = value as CreationType;
    setActiveTab(newTab);
    setMessages([{
      id: crypto.randomUUID(),
      content: getWelcomeMessage(newTab),
      sender: "bot",
      timestamp: new Date()
    }]);
  };

  const saveAsset = (asset: GeneratedAsset) => {
    // Add to saved assets
    setSavedAssets(prev => [...prev, asset]);
    
    // Show success notification
    toast({
      title: "Content Saved Successfully!",
      description: `${asset.title} has been saved to your ${getAssetDestination(asset.type)}.`,
      action: asset.type === "brief" ? (
        <Button variant="outline" size="sm" onClick={() => navigate("/planning")}>
          <ExternalLink className="w-3 h-3 mr-1" />
          View
        </Button>
      ) : undefined,
    });
  };

  const getAssetDestination = (type: string) => {
    switch (type) {
      case "brief": return "content planning";
      case "campaign": return "campaign library";
      case "image": return "asset hub";
      case "text": return "content library";
      case "calendar": return "content calendar";
      default: return "project";
    }
  };

  const getQuickStartExamples = () => {
    const context = isStrategyComplete ? getAIContext() : null;
    const brandName = context?.brand?.name || "my brand";
    
    switch (activeTab) {
      case "campaign":
        return [
          `Create a complete product launch campaign for ${brandName}`,
          `Design a holiday marketing campaign`,
          `Plan a brand awareness campaign with visuals and copy`,
        ];
      case "brief":
        return [
          `Create a content brief for our new product announcement`,
          `Plan a thought leadership blog post series`,
          `Brief for social media engagement campaign`,
        ];
      case "post":
        return [
          `Write an Instagram post about our latest feature`,
          `Create LinkedIn thought leadership content`,
          `Generate copy for a promotional email`,
        ];
      case "series":
        return [
          `Plan a 4-week educational content series`,
          `Create a product tutorial series`,
          `Design a customer success story series`,
        ];
      default:
        return [];
    }
  };

  const getCapabilities = () => {
    switch (activeTab) {
      case "campaign":
        return [
          { icon: Target, color: "text-blue-500", title: "Full Campaign Strategy", description: "Complete planning with goals, audience, timeline" },
          { icon: Image, color: "text-green-500", title: "Visual Assets", description: "Hero images, social media graphics, banners" },
          { icon: Calendar, color: "text-purple-500", title: "Content Calendar", description: "Scheduled posting timeline and content plan" },
        ];
      case "brief":
        return [
          { icon: PenTool, color: "text-blue-500", title: "Detailed Briefs", description: "Comprehensive content specifications" },
          { icon: Target, color: "text-green-500", title: "Clear Objectives", description: "Defined goals and success metrics" },
          { icon: FileText, color: "text-purple-500", title: "Deliverables List", description: "Specific content requirements and formats" },
        ];
      case "post":
        return [
          { icon: FileText, color: "text-blue-500", title: "Platform Copy", description: "Optimized text for each social platform" },
          { icon: Image, color: "text-green-500", title: "Visual Suggestions", description: "Image concepts and style recommendations" },
          { icon: Zap, color: "text-purple-500", title: "Instant Generation", description: "Quick content creation for immediate use" },
        ];
      case "series":
        return [
          { icon: Calendar, color: "text-blue-500", title: "Multi-Part Planning", description: "Connected content with progressive narrative" },
          { icon: Target, color: "text-green-500", title: "Consistent Messaging", description: "Unified brand voice across all content" },
          { icon: Sparkles, color: "text-purple-500", title: "Cross-Platform", description: "Adapted content for multiple channels" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      
      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Page Header */}
        <div className="mb-4 lg:mb-6">
          <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
            <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-primary flex-shrink-0" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Content Creator
            </h1>
          </div>
          <p className="text-sm lg:text-base text-muted-foreground">
            Create campaigns, briefs, posts, and content series with AI {isStrategyComplete && (
              <span className="hidden sm:inline">using your brand strategy</span>
            )}
          </p>
        </div>

        {/* Content Type Tabs */}
        <Card className="p-3 lg:p-4 mb-4 lg:mb-6 bg-gradient-glass backdrop-blur-xl border-border/10">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="campaign" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
                <Target className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">Campaign</span>
                <span className="sm:hidden">Camp</span>
              </TabsTrigger>
              <TabsTrigger value="brief" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
                <PenTool className="w-3 h-3 lg:w-4 lg:h-4" />
                Brief
              </TabsTrigger>
              <TabsTrigger value="post" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
                <FileText className="w-3 h-3 lg:w-4 lg:h-4" />
                Post
              </TabsTrigger>
              <TabsTrigger value="series" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
                <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                Series
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        {/* Project Name Input */}
        <Card className="p-3 lg:p-4 mb-4 lg:mb-6 bg-gradient-glass backdrop-blur-xl border-border/10">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <label className="text-sm font-medium whitespace-nowrap">Project Name:</label>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder={`Enter your ${activeTab} name...`}
              className="flex-1"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[500px] lg:h-[600px] flex flex-col bg-gradient-glass backdrop-blur-xl border-border/10">
              {/* Chat Header */}
              <div className="p-3 lg:p-4 border-b border-border/10">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm lg:text-base truncate">AI Content Assistant</h3>
                    <p className="text-xs text-muted-foreground hidden sm:block">Powered by AI content generation</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs flex-shrink-0">
                    Online
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-start space-x-2 lg:space-x-3 max-w-[90%] sm:max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.sender === "user" 
                          ? "bg-primary" 
                          : "bg-gradient-primary"
                      }`}>
                        {message.sender === "user" ? (
                          <User className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-xl p-2 lg:p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/10 border border-border/20"
                      }`}>
                        <p className="text-xs lg:text-sm whitespace-pre-line break-words">{message.content}</p>
                        
                        {/* Generated Assets */}
                        {message.assets && message.assets.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {message.assets.map((asset) => {
                              const AssetIcon = getAssetIcon(asset.type);
                              return (
                                <div key={asset.id} className="bg-black/20 rounded-lg p-3 border border-border/10">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      <AssetIcon className="w-4 h-4 text-primary" />
                                      <span className="font-medium text-sm">{asset.title}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {asset.type}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  {asset.type === "image" && (
                                    <img 
                                      src={asset.content} 
                                      alt={asset.title}
                                      className="w-full h-32 object-cover rounded mb-2"
                                    />
                                  )}
                                  
                                  {asset.type === "text" && (
                                    <p className="text-xs text-muted-foreground mb-2 italic">
                                      "{asset.content.substring(0, 100)}..."
                                    </p>
                                  )}
                                  
                                  {asset.type === "calendar" && (
                                    <div className="text-xs text-muted-foreground mb-2">
                                      <p className="whitespace-pre-line">{asset.content}</p>
                                    </div>
                                  )}
                                  
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Eye className="w-3 h-3 mr-1" />
                                      Preview
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      className="text-xs"
                                      onClick={() => saveAsset(asset)}
                                    >
                                      <Save className="w-3 h-3 mr-1" />
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 border border-border/20 rounded-xl p-3">
                        <div className="flex items-center space-x-2">
                          <Wand2 className="w-4 h-4 text-primary animate-spin" />
                          <span className="text-sm">Generating content...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 lg:p-4 border-t border-border/10">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe what you need for your campaign..."
                    className="flex-1 min-h-[50px] lg:min-h-[60px] resize-none text-sm"
                    disabled={isGenerating}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputValue.trim() || isGenerating}
                    className="px-3 lg:px-4 sm:w-auto w-full"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-4 lg:space-y-6">
            <Card className="p-3 lg:p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
              <h3 className="font-semibold mb-3 text-sm lg:text-base">Quick Start Examples</h3>
              <div className="space-y-2">
                {getQuickStartExamples().map((example, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left text-xs lg:text-sm p-2 lg:p-3"
                    onClick={() => setInputValue(example)}
                  >
                    <span className="truncate">"{example}"</span>
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
              <h3 className="font-semibold mb-3">AI Capabilities</h3>
              <div className="space-y-3">
                {getCapabilities().map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <capability.icon className={`w-5 h-5 ${capability.color}`} />
                    <div>
                      <p className="font-medium text-sm">{capability.title}</p>
                      <p className="text-xs text-muted-foreground">{capability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {isStrategyComplete && (
              <Card className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold text-green-500">Strategy Loaded</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Your brand strategy is active and will be used to create consistent, on-brand content.
                </p>
                <div className="space-y-1 text-xs">
                  <p><span className="font-medium">Brand:</span> {getAIContext().brand?.name}</p>
                  <p><span className="font-medium">Tone:</span> {getAIContext().brand?.tone}</p>
                  <p><span className="font-medium">Audience:</span> {getAIContext().audience?.name}</p>
                </div>
              </Card>
            )}
            
            {/* Saved Content Summary */}
            {savedAssets.length > 0 && (
              <Card className="p-3 lg:p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold text-green-500 text-sm lg:text-base">
                    Content Saved ({savedAssets.length})
                  </h3>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {savedAssets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between text-xs p-2 bg-black/10 rounded border border-border/10">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        {React.createElement(getAssetIcon(asset.type), { className: "w-3 h-3 text-primary flex-shrink-0" })}
                        <span className="truncate">{asset.title}</span>
                      </div>
                      {asset.type === "brief" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-xs"
                          onClick={() => navigate("/planning")}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-border/10">
                  <p className="text-xs text-muted-foreground">
                    Your content has been saved. Visit the respective sections to view and manage your creations.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;