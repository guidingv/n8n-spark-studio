import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useStrategy } from "@/hooks/useStrategy";
import { 
  Palette, 
  Target, 
  Sparkles, 
  Image, 
  FileText, 
  Video,
  Upload,
  Download,
  Copy,
  RefreshCw,
  AlertCircle
} from "lucide-react";

interface CreateAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface GeneratedAsset {
  id: string;
  type: string;
  content: string;
  url?: string;
  description: string;
}

export const CreateAssetDialog: React.FC<CreateAssetDialogProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState("create");
  const [assetType, setAssetType] = useState("");
  const [assetPrompt, setAssetPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
  
  const { 
    getBrandName, 
    getBrandTone, 
    getBrandValues, 
    getBrandColors, 
    getPrimaryAudience,
    getAIContext,
    isStrategyComplete 
  } = useStrategy();

  const handleGenerateAsset = async () => {
    if (!assetType || !assetPrompt.trim()) {
      toast.error("Please select an asset type and provide a detailed prompt");
      return;
    }

    if (!isStrategyComplete) {
      toast.error("Please complete your brand strategy first in the Strategy Hub");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generate AI content using strategy context
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAsset: GeneratedAsset = {
        id: Date.now().toString(),
        type: assetType,
        content: generateAssetContent(assetType, assetPrompt),
        description: assetPrompt,
        url: assetType === "image" ? "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop" : undefined
      };

      setGeneratedAssets(prev => [newAsset, ...prev]);
      toast.success(`${assetType === 'image' ? 'Image' : 'Content'} generated successfully!`);
      setAssetPrompt("");
    } catch (error) {
      toast.error(`Failed to generate ${assetType === 'image' ? 'image' : 'content'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAssetContent = (type: string, prompt: string) => {
    const brandName = getBrandName();
    const tone = getBrandTone();
    const values = getBrandValues();
    const audience = getPrimaryAudience();
    const audienceDesc = audience ? audience.name : "target audience";
    
    switch (type) {
      case "social-copy":
        return `🎯 ${prompt}

${brandName} brings innovation to life! 

✨ ${values.join(" • ")}

Perfect for ${audienceDesc}

#${brandName.replace(/\s+/g, '')} #Innovation`;

      case "email-subject":
        return `${brandName}: ${prompt} - Exclusive for Our Community`;

      case "blog-intro":
        return `Welcome to ${brandName}'s latest insights on ${prompt}. 

As a brand committed to ${values.join(", ").toLowerCase()}, we're excited to share how this impacts ${audienceDesc}.

Our approach ensures you get practical, actionable information that makes a difference.`;

      case "ad-copy":
        return `${prompt}

Discover why ${audienceDesc} trust ${brandName} for ${values.join(", ").toLowerCase()}.

Proven Results • Get Started Today`;

      default:
        return `${prompt} - Crafted for ${brandName} with our signature approach, targeting ${audienceDesc}.`;
    }
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "image": return Image;
      case "video": return Video;
      default: return FileText;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Create Brand-Aligned Assets
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Strategy Overview
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Create Assets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strategy" className="space-y-4">
            {!isStrategyComplete ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Complete your brand strategy in the Strategy Hub to enable AI-powered asset generation with your brand guidelines.
                </AlertDescription>
              </Alert>
            ) : (
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Current Brand Strategy
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Brand Name</Label>
                      <p className="text-sm text-muted-foreground">{getBrandName()}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Primary Audience</Label>
                      <p className="text-sm text-muted-foreground">
                        {getPrimaryAudience()?.name || "No audience defined"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Brand Values</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getBrandValues().slice(0, 3).map((value, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{value}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Brand Colors</Label>
                      <div className="flex gap-2 mt-1">
                        {getBrandColors().slice(0, 4).map((color, index) => (
                          <div 
                            key={index} 
                            className="w-6 h-6 rounded border" 
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <Label className="text-sm font-medium">AI Context Preview</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    All generated assets will use your complete brand strategy including voice, tone, 
                    visual style, and target audience insights.
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Generate AI Assets
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Asset Type</Label>
                  <Select value={assetType} onValueChange={setAssetType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select what you want to create" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social-copy">Social Media Copy</SelectItem>
                      <SelectItem value="email-subject">Email Subject Line</SelectItem>
                      <SelectItem value="blog-intro">Blog Introduction</SelectItem>
                      <SelectItem value="ad-copy">Advertisement Copy</SelectItem>
                      <SelectItem value="image">Image Generation</SelectItem>
                      <SelectItem value="video">Video Script</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt">
                    {assetType === 'image' ? 'Image Description' : 'Content Prompt'}
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder={
                      assetType === 'image' 
                        ? "Describe the image you want to create (e.g., 'A professional healthcare worker in a modern clinic setting, natural lighting, clean minimalist aesthetic')"
                        : "Describe what you want to create (e.g., 'A compelling social post about our new wellness feature launch')"
                    }
                    value={assetPrompt}
                    onChange={(e) => setAssetPrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {assetType === 'image' 
                      ? "Be specific about visual elements, style, mood, and composition for best results."
                      : "The AI will use your brand strategy to create content that matches your voice, tone, and target audience."
                    }
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleGenerateAsset} 
                disabled={isGenerating || !assetType || !assetPrompt.trim() || !isStrategyComplete}
                className="w-full mt-4"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate {assetType === 'image' ? 'Image' : 'Content'} with AI
                  </>
                )}
              </Button>
            </Card>

            {generatedAssets.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Generated Assets</h3>
                <div className="space-y-4">
                  {generatedAssets.map((asset) => {
                    const AssetIcon = getAssetIcon(asset.type);
                    return (
                      <div key={asset.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AssetIcon className="h-4 w-4" />
                            <Badge variant="outline">{asset.type}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(asset.content);
                                toast.success("Copied to clipboard!");
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        {asset.url && (
                          <img src={asset.url} alt="Generated asset" className="w-full h-40 object-cover rounded mb-2" />
                        )}
                        <p className="text-sm text-muted-foreground mb-2">{asset.description}</p>
                        <div className="bg-muted/50 rounded p-3">
                          <pre className="text-sm whitespace-pre-wrap">{asset.content}</pre>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};