import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
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
  Wand2
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
  type: "image" | "text" | "calendar";
  title: string;
  content: string;
  metadata?: any;
}

const CreateCampaign = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your campaign creation assistant. Tell me about the campaign you'd like to create. What's your goal, target audience, and key message?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateContent = async (userMessage: string): Promise<GeneratedAsset[]> => {
    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const assets: GeneratedAsset[] = [];
    
    // Determine what type of content to generate based on user input
    if (userMessage.toLowerCase().includes("image") || userMessage.toLowerCase().includes("visual")) {
      assets.push({
        id: crypto.randomUUID(),
        type: "image",
        title: "Campaign Hero Image",
        content: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        metadata: { dimensions: "800x600", format: "JPG" }
      });
    }
    
    if (userMessage.toLowerCase().includes("copy") || userMessage.toLowerCase().includes("text") || userMessage.toLowerCase().includes("description")) {
      assets.push({
        id: crypto.randomUUID(),
        type: "text",
        title: "Campaign Copy",
        content: "Transform your business with our innovative solution. Join thousands of satisfied customers who have already experienced the difference. Limited time offer - act now!",
        metadata: { wordCount: 28, tone: "professional" }
      });
    }
    
    if (userMessage.toLowerCase().includes("schedule") || userMessage.toLowerCase().includes("calendar") || userMessage.toLowerCase().includes("plan")) {
      assets.push({
        id: crypto.randomUUID(),
        type: "calendar",
        title: "Campaign Schedule",
        content: "Week 1: Launch announcement\nWeek 2: Feature highlights\nWeek 3: Customer testimonials\nWeek 4: Final call to action",
        metadata: { duration: "4 weeks", platforms: ["Instagram", "Facebook", "Email"] }
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
      default: return FileText;
    }
  };

  const saveAsset = (asset: GeneratedAsset) => {
    // Here you would integrate with your data management system
    console.log("Saving asset:", asset);
    // For now, just show a success message
    alert(`${asset.title} saved successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      
      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Create Campaign
            </h1>
          </div>
          <p className="text-muted-foreground">Chat with AI to generate your campaign content, images, and schedule</p>
        </div>

        {/* Campaign Name Input */}
        <Card className="p-4 mb-6 bg-gradient-glass backdrop-blur-xl border-border/10">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium whitespace-nowrap">Campaign Name:</label>
            <Input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter your campaign name..."
              className="flex-1"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col bg-gradient-glass backdrop-blur-xl border-border/10">
              {/* Chat Header */}
              <div className="p-4 border-b border-border/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Campaign Assistant</h3>
                    <p className="text-xs text-muted-foreground">Powered by AI content generation</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30 ml-auto">
                    Online
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.sender === "user" 
                          ? "bg-primary" 
                          : "bg-gradient-primary"
                      }`}>
                        {message.sender === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-xl p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/10 border border-border/20"
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        
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
                                      <Download className="w-3 h-3 mr-1" />
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
              <div className="p-4 border-t border-border/10">
                <div className="flex space-x-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe what you need for your campaign..."
                    className="flex-1 min-h-[60px] resize-none"
                    disabled={isGenerating}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputValue.trim() || isGenerating}
                    className="px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-6">
            <Card className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
              <h3 className="font-semibold mb-3">Quick Start Examples</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-left"
                  onClick={() => setInputValue("Create a hero image for a tech product launch")}
                >
                  "Create a hero image for a tech product"
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-left"
                  onClick={() => setInputValue("Write compelling copy for a spring sale campaign")}
                >
                  "Write copy for a spring sale"
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-left"
                  onClick={() => setInputValue("Plan a 4-week social media campaign schedule")}
                >
                  "Plan a 4-week social campaign"
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
              <h3 className="font-semibold mb-3">What I Can Generate</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Image className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Visual Content</p>
                    <p className="text-xs text-muted-foreground">Hero images, social posts, banners</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Written Content</p>
                    <p className="text-xs text-muted-foreground">Copy, headlines, descriptions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-sm">Campaign Schedule</p>
                    <p className="text-xs text-muted-foreground">Timeline, posting schedule</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;