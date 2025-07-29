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
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
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
  RefreshCw
} from "lucide-react";

interface CreateAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BrandGuidelines {
  brandName: string;
  colors: string[];
  fonts: string[];
  tone: string;
  values: string[];
  targetAudience: string;
}

interface GeneratedAsset {
  id: string;
  type: string;
  content: string;
  url?: string;
  description: string;
}

const defaultBrandGuidelines: BrandGuidelines = {
  brandName: "",
  colors: ["#3B82F6", "#EF4444", "#10B981"],
  fonts: ["Inter", "Roboto"],
  tone: "Professional and approachable",
  values: ["Innovation", "Quality", "Trust"],
  targetAudience: "Tech-savvy professionals aged 25-45"
};

export const CreateAssetDialog: React.FC<CreateAssetDialogProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState("guidelines");
  const [brandGuidelines, setBrandGuidelines] = useState<BrandGuidelines>(defaultBrandGuidelines);
  const [assetType, setAssetType] = useState("");
  const [assetPrompt, setAssetPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);

  const handleGenerateAsset = async () => {
    if (!assetType || !assetPrompt.trim()) {
      toast.error("Please select an asset type and provide a description");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI generation with brand guidelines
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAsset: GeneratedAsset = {
        id: Date.now().toString(),
        type: assetType,
        content: generateAssetContent(assetType, assetPrompt, brandGuidelines),
        description: assetPrompt,
        url: assetType === "image" ? "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop" : undefined
      };

      setGeneratedAssets(prev => [newAsset, ...prev]);
      toast.success("Asset generated successfully!");
      setAssetPrompt("");
    } catch (error) {
      toast.error("Failed to generate asset");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAssetContent = (type: string, prompt: string, guidelines: BrandGuidelines) => {
    const brandContext = `Brand: ${guidelines.brandName}, Tone: ${guidelines.tone}, Values: ${guidelines.values.join(", ")}, Audience: ${guidelines.targetAudience}`;
    
    switch (type) {
      case "social-copy":
        return `🎯 ${prompt}

${guidelines.brandName} brings innovation to life! 

✨ ${guidelines.values.join(" • ")}

Perfect for ${guidelines.targetAudience}

#${guidelines.brandName.replace(/\s+/g, '')} #Innovation`;

      case "email-subject":
        return `${guidelines.brandName}: ${prompt} - Exclusive for Our Community`;

      case "blog-intro":
        return `Welcome to ${guidelines.brandName}'s latest insights on ${prompt}. 

As a brand committed to ${guidelines.values.join(", ").toLowerCase()}, we're excited to share how this impacts ${guidelines.targetAudience}.

Our ${guidelines.tone.toLowerCase()} approach ensures you get practical, actionable information that makes a difference.`;

      case "ad-copy":
        return `${prompt}

Discover why ${guidelines.targetAudience} trust ${guidelines.brandName} for ${guidelines.values.join(", ").toLowerCase()}.

${guidelines.tone} • Proven Results • Get Started Today`;

      default:
        return `${prompt} - Crafted for ${guidelines.brandName} with ${guidelines.tone.toLowerCase()} tone, targeting ${guidelines.targetAudience}.`;
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
            <TabsTrigger value="guidelines" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Brand Guidelines
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Create Assets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guidelines" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Brand Identity
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    value={brandGuidelines.brandName}
                    onChange={(e) => setBrandGuidelines(prev => ({ ...prev, brandName: e.target.value }))}
                    placeholder="Your brand name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Brand Tone</Label>
                  <Input
                    id="tone"
                    value={brandGuidelines.tone}
                    onChange={(e) => setBrandGuidelines(prev => ({ ...prev, tone: e.target.value }))}
                    placeholder="Professional, friendly, bold..."
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Textarea
                  id="audience"
                  value={brandGuidelines.targetAudience}
                  onChange={(e) => setBrandGuidelines(prev => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="Describe your target audience..."
                  rows={2}
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label>Brand Values</Label>
                <div className="flex flex-wrap gap-2">
                  {brandGuidelines.values.map((value, index) => (
                    <Badge key={index} variant="secondary">{value}</Badge>
                  ))}
                </div>
                <Input
                  placeholder="Add a value and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      setBrandGuidelines(prev => ({ 
                        ...prev, 
                        values: [...prev.values, e.currentTarget.value.trim()] 
                      }));
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label>Brand Colors</Label>
                <div className="flex flex-wrap gap-2">
                  {brandGuidelines.colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded border" 
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Generate Assets
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Asset Type</Label>
                  <Select value={assetType} onValueChange={setAssetType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social-copy">Social Media Copy</SelectItem>
                      <SelectItem value="email-subject">Email Subject Line</SelectItem>
                      <SelectItem value="blog-intro">Blog Introduction</SelectItem>
                      <SelectItem value="ad-copy">Advertisement Copy</SelectItem>
                      <SelectItem value="image">Image Concept</SelectItem>
                      <SelectItem value="video">Video Script</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Campaign Goal</Label>
                  <Input
                    placeholder="e.g., product launch, awareness..."
                    value={assetPrompt}
                    onChange={(e) => setAssetPrompt(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={handleGenerateAsset} 
                disabled={isGenerating || !assetType || !assetPrompt.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating Asset...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Brand-Aligned Asset
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