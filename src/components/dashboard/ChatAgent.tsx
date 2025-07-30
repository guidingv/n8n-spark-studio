import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, Lightbulb, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const chatSuggestions = [
  "Plan content for next week",
  "Generate social media ideas", 
  "Create a new campaign",
  "Design content brief"
];

const recentChats = [
  {
    id: 1,
    message: "Can you help me plan content for Valentine's Day campaign?",
    response: "I'd love to help you create a romantic Valentine's campaign! Let me guide you to the AI Content Creator where I can generate a complete campaign strategy with visuals, copy, and schedule.",
    timestamp: "2 hours ago",
    hasCreateSuggestion: true
  },
  {
    id: 2,
    message: "I need to create a content brief for our product launch",
    response: "Perfect! I can help you create a detailed content brief. Head to the Create section where I'll generate a comprehensive brief with objectives, deliverables, and success metrics.",
    timestamp: "Yesterday",
    hasCreateSuggestion: true
  }
];

export const ChatAgent = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Check if user is asking about content creation
    const contentKeywords = ["create", "generate", "campaign", "content", "brief", "post", "write", "design"];
    const isContentRequest = contentKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    
    if (isContentRequest) {
      // Guide user to Create section for content generation
      navigate("/create");
      return;
    }
    
    setIsTyping(true);
    // Simulate AI response for other queries
    setTimeout(() => setIsTyping(false), 2000);
    setMessage("");
  };

  const goToCreate = () => {
    navigate("/create");
  };

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10 h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-glow">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Content Planning Assistant</h2>
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30 mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            Online
          </Badge>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-n8n-accent" />
          <span className="text-sm font-medium text-foreground">Quick Suggestions</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-2">
          {chatSuggestions.map((suggestion, index) => {
            const isContentSuggestion = suggestion.includes("Create") || suggestion.includes("Generate") || suggestion.includes("Design");
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left border-border/30 hover:bg-white/10 hover:text-white hover:border-white/20 text-sm"
                onClick={() => isContentSuggestion ? goToCreate() : setMessage(suggestion)}
              >
                <Lightbulb className="w-3 h-3 mr-2 text-n8n-accent" />
                {suggestion}
                {isContentSuggestion && <ArrowRight className="w-3 h-3 ml-auto text-primary" />}
              </Button>
            );
          })}
        </div>
      </div>

        <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
        {recentChats.map((chat) => (
          <div key={chat.id} className="space-y-2">
            <div className="bg-n8n-primary/10 border border-n8n-primary/20 rounded-lg p-3">
              <p className="text-sm text-foreground">{chat.message}</p>
              <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-border/20 rounded-lg p-3">
              <p className="text-sm text-foreground">{chat.response}</p>
              {chat.hasCreateSuggestion && (
                <Button 
                  size="sm" 
                  className="mt-2 text-xs"
                  onClick={goToCreate}
                >
                  Go to Create <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-border/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-n8n-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-n8n-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-n8n-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-muted-foreground">AI is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder="Ask about content planning..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="bg-white/5 border-border/30 focus:border-n8n-primary"
        />
        <Button 
          onClick={handleSendMessage}
          className="bg-gradient-primary hover:opacity-90"
          disabled={!message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};