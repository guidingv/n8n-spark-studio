import React, { useState, useEffect } from "react";
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
  Eye,
  Users,
  Lightbulb,
  Tag,
  Upload,
  Image,
  X
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useToast } from "@/hooks/use-toast";
import { useStrategyContext, BrandDnaProfile, ContentPillar, TargetAudience, ContentCategory } from "@/contexts/StrategyContext";

const StrategyPlanning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    strategy, 
    updateBrandProfile, 
    updateContentPillars, 
    updateTargetAudiences, 
    updateContentCategories 
  } = useStrategyContext();
  
  // Local state management - sync with context
  const [brandDnaProfile, setBrandDnaProfile] = useState<BrandDnaProfile>(strategy.brandDnaProfile);
  const [contentPillars, setContentPillars] = useState<ContentPillar[]>(strategy.contentPillars);
  const [targetAudiences, setTargetAudiences] = useState<TargetAudience[]>(strategy.targetAudiences);
  const [contentCategories, setContentCategories] = useState<ContentCategory[]>(strategy.contentCategories);

  // Sync local state with context when context changes
  useEffect(() => {
    setBrandDnaProfile(strategy.brandDnaProfile);
    setContentPillars(strategy.contentPillars);
    setTargetAudiences(strategy.targetAudiences);
    setContentCategories(strategy.contentCategories);
  }, [strategy]);

  const generateContextProfile = () => {
    return {
      brandDnaProfile,
      contentPillars,
      targetAudiences,
      contentCategories,
      ultimateGoal: "Create compelling, brand-aligned content that resonates with target audiences and supports business objectives"
    };
  };

  const handleSave = () => {
    // Update context with current local state
    updateBrandProfile(brandDnaProfile);
    updateContentPillars(contentPillars);
    updateTargetAudiences(targetAudiences);
    updateContentCategories(contentCategories);
    
    const completeStrategy = generateContextProfile();
    console.log("Complete Strategy Profile:", JSON.stringify(completeStrategy, null, 2));
    toast({
      title: "Complete Strategy Saved",
      description: "Your comprehensive content strategy has been saved and will guide all content creation.",
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

  // Reference Images Management
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            url: e.target?.result as string,
            description: ""
          };
          
          setBrandDnaProfile(prev => ({
            ...prev,
            visualStyle: {
              ...prev.visualStyle,
              referenceImages: [...prev.visualStyle.referenceImages, newImage]
            }
          }));
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Reset input
    event.target.value = '';
  };

  const removeReferenceImage = (imageId: string) => {
    setBrandDnaProfile(prev => ({
      ...prev,
      visualStyle: {
        ...prev.visualStyle,
        referenceImages: prev.visualStyle.referenceImages.filter(img => img.id !== imageId)
      }
    }));
  };

  const updateImageDescription = (imageId: string, description: string) => {
    setBrandDnaProfile(prev => ({
      ...prev,
      visualStyle: {
        ...prev.visualStyle,
        referenceImages: prev.visualStyle.referenceImages.map(img => 
          img.id === imageId ? { ...img, description } : img
        )
      }
    }));
  };

  // Content Pillars Management
  const addContentPillar = () => {
    const newPillar: ContentPillar = {
      id: Date.now().toString(),
      name: "New Content Pillar",
      description: "Describe this content pillar",
      color: "gray"
    };
    setContentPillars([...contentPillars, newPillar]);
  };

  const deleteContentPillar = (id: string) => {
    setContentPillars(contentPillars.filter(p => p.id !== id));
  };

  // Target Audience Management
  const addTargetAudience = () => {
    const newAudience: TargetAudience = {
      id: Date.now().toString(),
      name: "New Audience Segment",
      demographics: "",
      psychographics: "",
      painPoints: [],
      goals: []
    };
    setTargetAudiences([...targetAudiences, newAudience]);
  };

  const deleteTargetAudience = (id: string) => {
    setTargetAudiences(targetAudiences.filter(a => a.id !== id));
  };

  const addPainPoint = (audienceId: string, painPoint: string) => {
    if (!painPoint.trim()) return;
    setTargetAudiences(targetAudiences.map(a => 
      a.id === audienceId ? {...a, painPoints: [...a.painPoints, painPoint]} : a
    ));
  };

  const removePainPoint = (audienceId: string, index: number) => {
    setTargetAudiences(targetAudiences.map(a => 
      a.id === audienceId ? {...a, painPoints: a.painPoints.filter((_, i) => i !== index)} : a
    ));
  };

  const addGoal = (audienceId: string, goal: string) => {
    if (!goal.trim()) return;
    setTargetAudiences(targetAudiences.map(a => 
      a.id === audienceId ? {...a, goals: [...a.goals, goal]} : a
    ));
  };

  const removeGoal = (audienceId: string, index: number) => {
    setTargetAudiences(targetAudiences.map(a => 
      a.id === audienceId ? {...a, goals: a.goals.filter((_, i) => i !== index)} : a
    ));
  };

  // Content Categories Management
  const addContentCategory = () => {
    const newCategory: ContentCategory = {
      id: Date.now().toString(),
      name: "New Content Category",
      description: "",
      pillarId: contentPillars[0]?.id || "",
      contentTypes: []
    };
    setContentCategories([...contentCategories, newCategory]);
  };

  const deleteContentCategory = (id: string) => {
    setContentCategories(contentCategories.filter(c => c.id !== id));
  };

  const addContentType = (categoryId: string, contentType: string) => {
    if (!contentType.trim()) return;
    setContentCategories(contentCategories.map(c => 
      c.id === categoryId ? {...c, contentTypes: [...c.contentTypes, contentType]} : c
    ));
  };

  const removeContentType = (categoryId: string, index: number) => {
    setContentCategories(contentCategories.map(c => 
      c.id === categoryId ? {...c, contentTypes: c.contentTypes.filter((_, i) => i !== index)} : c
    ));
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
                Content Strategy Hub
              </h1>
            </div>
            <p className="text-muted-foreground">Define your comprehensive content strategy that will guide all content creation</p>
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Strategy
          </Button>
        </div>

        {/* Strategy Tabs */}
        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="brand">Brand Identity</TabsTrigger>
            <TabsTrigger value="voice">Voice & Tone</TabsTrigger>
            <TabsTrigger value="visual">Visual Style</TabsTrigger>
            <TabsTrigger value="pillars">Content Pillars</TabsTrigger>
            <TabsTrigger value="audience">Target Audience</TabsTrigger>
            <TabsTrigger value="categories">Content Categories</TabsTrigger>
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
                  
                  {/* Reference Images Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Reference Images</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button 
                          onClick={() => document.getElementById('image-upload')?.click()}
                          size="sm" 
                          variant="outline"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Images
                        </Button>
                      </div>
                    </div>
                    
                    {brandDnaProfile.visualStyle.referenceImages.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {brandDnaProfile.visualStyle.referenceImages.map((image) => (
                          <div key={image.id} className="group relative">
                            <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeReferenceImage(image.id)}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs font-medium truncate">{image.name}</p>
                              <Textarea
                                value={image.description}
                                onChange={(e) => updateImageDescription(image.id, e.target.value)}
                                placeholder="Describe this reference image..."
                                className="mt-1 min-h-[60px] text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                        <Image className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="text-sm text-muted-foreground mb-2">No reference images uploaded yet</p>
                        <p className="text-xs text-muted-foreground">Upload images that represent your desired visual style and brand aesthetic</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  This visual style guide and reference images will ensure consistent branding across all content assets.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Content Pillars Tab */}
          <TabsContent value="pillars" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Content Pillars</h3>
              </div>
              <Button onClick={addContentPillar} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Pillar
              </Button>
            </div>
            
            <div className="grid gap-4">
              {contentPillars.map((pillar) => (
                <Card key={pillar.id} className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${pillar.color}-500`} />
                        <Input
                          value={pillar.name}
                          onChange={(e) => {
                            setContentPillars(contentPillars.map(p => 
                              p.id === pillar.id ? {...p, name: e.target.value} : p
                            ));
                          }}
                          className="font-medium border-none bg-transparent p-0 h-auto"
                        />
                      </div>
                      <Textarea
                        value={pillar.description}
                        onChange={(e) => {
                          setContentPillars(contentPillars.map(p => 
                            p.id === pillar.id ? {...p, description: e.target.value} : p
                          ));
                        }}
                        placeholder="Describe this content pillar..."
                        className="border-none bg-transparent p-0 min-h-[60px] resize-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteContentPillar(pillar.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Target Audience Tab */}
          <TabsContent value="audience" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Target Audiences</h3>
              </div>
              <Button onClick={addTargetAudience} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Audience
              </Button>
            </div>
            
            <div className="grid gap-4">
              {targetAudiences.map((audience) => (
                <Card key={audience.id} className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Input
                        value={audience.name}
                        onChange={(e) => {
                          setTargetAudiences(targetAudiences.map(a => 
                            a.id === audience.id ? {...a, name: e.target.value} : a
                          ));
                        }}
                        className="font-medium text-lg border-none bg-transparent p-0 h-auto"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTargetAudience(audience.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Demographics</Label>
                        <Textarea
                          value={audience.demographics}
                          onChange={(e) => {
                            setTargetAudiences(targetAudiences.map(a => 
                              a.id === audience.id ? {...a, demographics: e.target.value} : a
                            ));
                          }}
                          placeholder="Age, location, job title, income level..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Psychographics</Label>
                        <Textarea
                          value={audience.psychographics}
                          onChange={(e) => {
                            setTargetAudiences(targetAudiences.map(a => 
                              a.id === audience.id ? {...a, psychographics: e.target.value} : a
                            ));
                          }}
                          placeholder="Values, interests, behaviors, motivations..."
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Pain Points</Label>
                        <div className="flex flex-wrap gap-2 mt-2 mb-2">
                          {audience.painPoints.map((point, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {point}
                              <button 
                                onClick={() => removePainPoint(audience.id, index)}
                                className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-3 h-3 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add pain point..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addPainPoint(audience.id, e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Goals</Label>
                        <div className="flex flex-wrap gap-2 mt-2 mb-2">
                          {audience.goals.map((goal, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {goal}
                              <button 
                                onClick={() => removeGoal(audience.id, index)}
                                className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-3 h-3 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add goal..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addGoal(audience.id, e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Content Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Content Categories</h3>
              </div>
              <Button onClick={addContentCategory} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
            
            <div className="grid gap-4">
              {contentCategories.map((category) => (
                <Card key={category.id} className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Input
                        value={category.name}
                        onChange={(e) => {
                          setContentCategories(contentCategories.map(c => 
                            c.id === category.id ? {...c, name: e.target.value} : c
                          ));
                        }}
                        className="font-medium text-lg border-none bg-transparent p-0 h-auto"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteContentCategory(category.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={category.description}
                          onChange={(e) => {
                            setContentCategories(contentCategories.map(c => 
                              c.id === category.id ? {...c, description: e.target.value} : c
                            ));
                          }}
                          placeholder="Describe this content category..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Related Content Pillar</Label>
                        <select 
                          value={category.pillarId}
                          onChange={(e) => {
                            setContentCategories(contentCategories.map(c => 
                              c.id === category.id ? {...c, pillarId: e.target.value} : c
                            ));
                          }}
                          className="w-full mt-1 p-2 border rounded-md bg-background"
                        >
                          {contentPillars.map(pillar => (
                            <option key={pillar.id} value={pillar.id}>{pillar.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Content Types</Label>
                      <div className="flex flex-wrap gap-2 mt-2 mb-2">
                        {category.contentTypes.map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {type}
                            <button 
                              onClick={() => removeContentType(category.id, index)}
                              className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-3 h-3 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add content type..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addContentType(category.id, e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StrategyPlanning;