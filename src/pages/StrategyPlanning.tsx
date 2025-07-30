import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Plus, 
  ArrowLeft,
  Save,
  Trash2,
  Palette,
  Mic,
  Eye
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useToast } from "@/hooks/use-toast";

interface BrandDnaProfile {
  brandName: string;
  tagline: string;
  voiceAndTone: {
    adjectives: string[];
    description: string;
  };
  visualStyle: {
    name: string;
    description: string;
    keyPrinciples: string[];
    colorPalette: {
      base: string[];
      primary_accents: string[];
    };
  };
}

const StrategyPlanning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management using Brand DNA Profile structure
  const [brandDnaProfile, setBrandDnaProfile] = useState<BrandDnaProfile>({
    brandName: "Healthiera",
    tagline: "Clarity in Wellness.",
    voiceAndTone: {
      adjectives: ["Clear", "Supportive", "Trustworthy", "Professional", "Refined"],
      description: "The brand speaks like a trusted health professional or a knowledgeable concierge. The tone is calm, clear, and reassuring. It avoids hype and jargon, focusing on providing straightforward, helpful information to busy individuals who value efficiency and expertise. It's supportive and empowering, building confidence through clarity."
    },
    visualStyle: {
      name: "Refined Scientific Minimalism",
      description: "A clean, high-end aesthetic that blends scientific precision with a warm, approachable feel. This style prioritizes clarity, trustworthiness, and elegance to appeal to discerning, health-conscious professionals.",
      keyPrinciples: [
        "Elegant Typography: A balanced use of classic serif (like on the 'HEALTHIERA' logo) and clean sans-serif fonts to create a hierarchy that is both beautiful and highly legible.",
        "Meaningful Iconography: Simple, stylized icons, like the sun emblem, are used sparingly to represent key benefits or ingredients in a refined, symbolic way.",
        "Structured, Uncluttered Layouts: A strong reliance on grids and ample white space to present information clearly and efficiently, respecting the user's time and attention.",
        "Warm, Natural Palette: The color scheme is grounded in natural, premium tones, avoiding overly bright or synthetic colors to create a sense of calm and quality.",
        "High-Fidelity Photography: Product and lifestyle imagery is bright, clean, and professionally shot, with a focus on natural light and textures to emphasize the quality of the product."
      ],
      colorPalette: {
        base: ["Parchment Cream #F5F1E9", "Clean White #FFFFFF"],
        primary_accents: ["Amber Brown #994A00", "Golden Sun #F2C34E", "Charcoal Black #2C2C2C"]
      }
    }
  });

  const handleSave = () => {
    // Here you would typically save to your backend/database
    console.log("Brand DNA Profile:", JSON.stringify(brandDnaProfile, null, 2));
    toast({
      title: "Brand DNA Profile Saved",
      description: "Your brand DNA profile has been successfully saved and will guide all content creation.",
    });
  };

  const addAdjective = () => {
    setBrandDnaProfile(prev => ({
      ...prev,
      voiceAndTone: {
        ...prev.voiceAndTone,
        adjectives: [...prev.voiceAndTone.adjectives, "New Adjective"]
      }
    }));
  };

  const removeAdjective = (index: number) => {
    setBrandDnaProfile(prev => ({
      ...prev,
      voiceAndTone: {
        ...prev.voiceAndTone,
        adjectives: prev.voiceAndTone.adjectives.filter((_, i) => i !== index)
      }
    }));
  };

  const updateAdjective = (index: number, value: string) => {
    setBrandDnaProfile(prev => ({
      ...prev,
      voiceAndTone: {
        ...prev.voiceAndTone,
        adjectives: prev.voiceAndTone.adjectives.map((adj, i) => i === index ? value : adj)
      }
    }));
  };

  const addKeyPrinciple = () => {
    setBrandDnaProfile(prev => ({
      ...prev,
      visualStyle: {
        ...prev.visualStyle,
        keyPrinciples: [...prev.visualStyle.keyPrinciples, "New Design Principle: Description here"]
      }
    }));
  };

  const removeKeyPrinciple = (index: number) => {
    setBrandDnaProfile(prev => ({
      ...prev,
      visualStyle: {
        ...prev.visualStyle,
        keyPrinciples: prev.visualStyle.keyPrinciples.filter((_, i) => i !== index)
      }
    }));
  };

  const updateKeyPrinciple = (index: number, value: string) => {
    setBrandDnaProfile(prev => ({
      ...prev,
      visualStyle: {
        ...prev.visualStyle,
        keyPrinciples: prev.visualStyle.keyPrinciples.map((principle, i) => i === index ? value : principle)
      }
    }));
  };

  const addColor = (type: 'base' | 'primary_accents') => {
    setBrandDnaProfile(prev => ({
      ...prev,
      visualStyle: {
        ...prev.visualStyle,
        colorPalette: {
          ...prev.visualStyle.colorPalette,
          [type]: [...prev.visualStyle.colorPalette[type], "New Color #000000"]
        }
      }
    }));
  };

  const removeColor = (type: 'base' | 'primary_accents', index: number) => {
    setBrandDnaProfile(prev => ({
      ...prev,
      visualStyle: {
        ...prev.visualStyle,
        colorPalette: {
          ...prev.visualStyle.colorPalette,
          [type]: prev.visualStyle.colorPalette[type].filter((_, i) => i !== index)
        }
      }
    }));
  };

  const updateColor = (type: 'base' | 'primary_accents', index: number, value: string) => {
    setBrandDnaProfile(prev => ({
      ...prev,
      visualStyle: {
        ...prev.visualStyle,
        colorPalette: {
          ...prev.visualStyle.colorPalette,
          [type]: prev.visualStyle.colorPalette[type].map((color, i) => i === index ? value : color)
        }
      }
    }));
  };

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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Target className="w-8 h-8 text-primary" />
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Brand DNA Profile
              </h1>
            </div>
            <p className="text-muted-foreground">Define your brand's core identity that will guide all content creation</p>
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Profile
          </Button>
        </div>

        {/* Strategy Tabs */}
        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="brand">Brand Identity</TabsTrigger>
            <TabsTrigger value="voice">Voice & Tone</TabsTrigger>
            <TabsTrigger value="visual">Visual Style</TabsTrigger>
          </TabsList>

          {/* Brand Identity Tab */}
          <TabsContent value="brand" className="space-y-4">
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Brand Identity</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input
                      id="brandName"
                      value={brandDnaProfile.brandName}
                      onChange={(e) => setBrandDnaProfile(prev => ({
                        ...prev,
                        brandName: e.target.value
                      }))}
                      placeholder="Enter your brand name..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tagline">Brand Tagline</Label>
                    <Input
                      id="tagline"
                      value={brandDnaProfile.tagline}
                      onChange={(e) => setBrandDnaProfile(prev => ({
                        ...prev,
                        tagline: e.target.value
                      }))}
                      placeholder="Enter your brand tagline..."
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Your brand identity forms the foundation of all content creation and messaging.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Voice & Tone Tab */}
          <TabsContent value="voice" className="space-y-4">
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mic className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Voice & Tone</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Brand Voice Adjectives</Label>
                      <Button onClick={addAdjective} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Adjective
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {brandDnaProfile.voiceAndTone.adjectives.map((adjective, index) => (
                        <div key={index} className="flex items-center gap-1 bg-primary/10 rounded-lg px-3 py-1">
                          <Input
                            value={adjective}
                            onChange={(e) => updateAdjective(index, e.target.value)}
                            className="border-none bg-transparent p-0 h-auto text-sm font-medium"
                          />
                          <button
                            onClick={() => removeAdjective(index)}
                            className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="voiceDescription">Voice & Tone Description</Label>
                    <Textarea
                      id="voiceDescription"
                      value={brandDnaProfile.voiceAndTone.description}
                      onChange={(e) => setBrandDnaProfile(prev => ({
                        ...prev,
                        voiceAndTone: {
                          ...prev.voiceAndTone,
                          description: e.target.value
                        }
                      }))}
                      placeholder="Describe your brand's voice and tone..."
                      className="min-h-[120px] mt-1"
                    />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  This voice and tone guide will ensure consistency across all content creation.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Visual Style Tab */}
          <TabsContent value="visual" className="space-y-4">
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Visual Style</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="styleName">Visual Style Name</Label>
                    <Input
                      id="styleName"
                      value={brandDnaProfile.visualStyle.name}
                      onChange={(e) => setBrandDnaProfile(prev => ({
                        ...prev,
                        visualStyle: {
                          ...prev.visualStyle,
                          name: e.target.value
                        }
                      }))}
                      placeholder="Name your visual style..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="styleDescription">Visual Style Description</Label>
                    <Textarea
                      id="styleDescription"
                      value={brandDnaProfile.visualStyle.description}
                      onChange={(e) => setBrandDnaProfile(prev => ({
                        ...prev,
                        visualStyle: {
                          ...prev.visualStyle,
                          description: e.target.value
                        }
                      }))}
                      placeholder="Describe your visual style approach..."
                      className="min-h-[100px] mt-1"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Key Design Principles</Label>
                      <Button onClick={addKeyPrinciple} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Principle
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {brandDnaProfile.visualStyle.keyPrinciples.map((principle, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-secondary/20 rounded-lg">
                          <Textarea
                            value={principle}
                            onChange={(e) => updateKeyPrinciple(index, e.target.value)}
                            className="border-none bg-transparent p-0 min-h-[60px] resize-none"
                            placeholder="Design principle: Description..."
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeKeyPrinciple(index)}
                            className="mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label>Base Colors</Label>
                        <Button onClick={() => addColor('base')} size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Color
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {brandDnaProfile.visualStyle.colorPalette.base.map((color, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div 
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: color.split(' ').pop()}}
                            />
                            <Input
                              value={color}
                              onChange={(e) => updateColor('base', index, e.target.value)}
                              placeholder="Color Name #HEXCODE"
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeColor('base', index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label>Primary Accent Colors</Label>
                        <Button onClick={() => addColor('primary_accents')} size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Color
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {brandDnaProfile.visualStyle.colorPalette.primary_accents.map((color, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div 
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: color.split(' ').pop()}}
                            />
                            <Input
                              value={color}
                              onChange={(e) => updateColor('primary_accents', index, e.target.value)}
                              placeholder="Color Name #HEXCODE"
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeColor('primary_accents', index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  This visual style guide will ensure consistent branding across all content assets.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StrategyPlanning;