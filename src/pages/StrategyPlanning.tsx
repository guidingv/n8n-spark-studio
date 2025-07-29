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
  Users,
  Lightbulb,
  Tag,
  Palette,
  Save,
  Edit2,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useToast } from "@/hooks/use-toast";

interface ContentPillar {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface TargetAudience {
  id: string;
  name: string;
  demographics: string;
  psychographics: string;
  painPoints: string[];
  goals: string[];
}

interface ContentCategory {
  id: string;
  name: string;
  description: string;
  pillarId: string;
  contentTypes: string[];
}

interface BrandGuideline {
  id: string;
  element: string;
  specification: string;
  examples: string;
}

const StrategyPlanning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [ultimateGoal, setUltimateGoal] = useState("Increase brand awareness and drive qualified leads through compelling content marketing");
  const [contentPillars, setContentPillars] = useState<ContentPillar[]>([
    { id: "1", name: "Thought Leadership", description: "Establish expertise in AI and automation", color: "blue" },
    { id: "2", name: "Product Education", description: "Showcase features and benefits", color: "green" },
    { id: "3", name: "Customer Success", description: "Highlight real results and testimonials", color: "purple" }
  ]);
  const [targetAudiences, setTargetAudiences] = useState<TargetAudience[]>([
    {
      id: "1",
      name: "Tech-Savvy SMB Owners",
      demographics: "Ages 25-45, Business owners with 10-100 employees",
      psychographics: "Innovation-focused, efficiency-driven, budget-conscious",
      painPoints: ["Manual processes", "Limited resources", "Scaling challenges"],
      goals: ["Automate workflows", "Increase efficiency", "Reduce costs"]
    }
  ]);
  const [contentCategories, setContentCategories] = useState<ContentCategory[]>([
    {
      id: "1",
      name: "How-to Guides",
      description: "Step-by-step tutorials and educational content",
      pillarId: "2",
      contentTypes: ["Blog posts", "Video tutorials", "Infographics"]
    }
  ]);
  const [brandGuidelines, setBrandGuidelines] = useState<BrandGuideline[]>([
    { id: "1", element: "Brand Voice", specification: "Professional yet approachable, confident but not arrogant", examples: "We help you achieve more, rather than We're the best" },
    { id: "2", element: "Color Palette", specification: "Primary: Blue (#0066CC), Secondary: Green (#00AA44)", examples: "Use blue for CTAs, green for success states" }
  ]);

  const [editingItem, setEditingItem] = useState<{type: string, id: string} | null>(null);

  const handleSave = () => {
    toast({
      title: "Strategy Saved",
      description: "Your content strategy has been successfully saved.",
    });
  };

  const addContentPillar = () => {
    const newPillar: ContentPillar = {
      id: Date.now().toString(),
      name: "New Content Pillar",
      description: "Describe this content pillar",
      color: "gray"
    };
    setContentPillars([...contentPillars, newPillar]);
    setEditingItem({type: "pillar", id: newPillar.id});
  };

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
    setEditingItem({type: "audience", id: newAudience.id});
  };

  const addContentCategory = () => {
    const newCategory: ContentCategory = {
      id: Date.now().toString(),
      name: "New Content Category",
      description: "",
      pillarId: contentPillars[0]?.id || "",
      contentTypes: []
    };
    setContentCategories([...contentCategories, newCategory]);
    setEditingItem({type: "category", id: newCategory.id});
  };

  const addBrandGuideline = () => {
    const newGuideline: BrandGuideline = {
      id: Date.now().toString(),
      element: "New Brand Element",
      specification: "",
      examples: ""
    };
    setBrandGuidelines([...brandGuidelines, newGuideline]);
    setEditingItem({type: "guideline", id: newGuideline.id});
  };

  const deleteItem = (type: string, id: string) => {
    switch(type) {
      case "pillar":
        setContentPillars(contentPillars.filter(p => p.id !== id));
        break;
      case "audience":
        setTargetAudiences(targetAudiences.filter(a => a.id !== id));
        break;
      case "category":
        setContentCategories(contentCategories.filter(c => c.id !== id));
        break;
      case "guideline":
        setBrandGuidelines(brandGuidelines.filter(g => g.id !== id));
        break;
    }
    setEditingItem(null);
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
                Content Strategy Planning
              </h1>
            </div>
            <p className="text-muted-foreground">Define your content strategy foundation that will guide all content creation</p>
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Strategy
          </Button>
        </div>

        {/* Strategy Tabs */}
        <Tabs defaultValue="goal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="goal">Ultimate Goal</TabsTrigger>
            <TabsTrigger value="pillars">Content Pillars</TabsTrigger>
            <TabsTrigger value="audience">Target Audience</TabsTrigger>
            <TabsTrigger value="categories">Content Categories</TabsTrigger>
            <TabsTrigger value="brand">Brand Guidelines</TabsTrigger>
          </TabsList>

          {/* Ultimate Goal Tab */}
          <TabsContent value="goal" className="space-y-4">
            <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Ultimate Marketing Goal</h3>
                </div>
                <Label htmlFor="goal">What is your primary marketing objective?</Label>
                <Textarea
                  id="goal"
                  value={ultimateGoal}
                  onChange={(e) => setUltimateGoal(e.target.value)}
                  placeholder="Define your overarching marketing goal..."
                  className="min-h-[120px]"
                />
                <p className="text-sm text-muted-foreground">
                  This goal will guide all your content decisions and help ensure alignment across your strategy.
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
                        onClick={() => deleteItem("pillar", pillar.id)}
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
                        onClick={() => deleteItem("audience", audience.id)}
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
                          placeholder="Age, location, job title, company size..."
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
                        <div className="flex flex-wrap gap-2 mt-2">
                          {audience.painPoints.map((point, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {point}
                              <button 
                                onClick={() => {
                                  const newPainPoints = audience.painPoints.filter((_, i) => i !== index);
                                  setTargetAudiences(targetAudiences.map(a => 
                                    a.id === audience.id ? {...a, painPoints: newPainPoints} : a
                                  ));
                                }}
                                className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-3 h-3 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Goals</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {audience.goals.map((goal, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {goal}
                              <button 
                                onClick={() => {
                                  const newGoals = audience.goals.filter((_, i) => i !== index);
                                  setTargetAudiences(targetAudiences.map(a => 
                                    a.id === audience.id ? {...a, goals: newGoals} : a
                                  ));
                                }}
                                className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-3 h-3 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
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
                        onClick={() => deleteItem("category", category.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Textarea
                      value={category.description}
                      onChange={(e) => {
                        setContentCategories(contentCategories.map(c => 
                          c.id === category.id ? {...c, description: e.target.value} : c
                        ));
                      }}
                      placeholder="Describe this content category..."
                      className="min-h-[60px]"
                    />
                    
                    <div>
                      <Label>Associated Content Pillar</Label>
                      <select
                        value={category.pillarId}
                        onChange={(e) => {
                          setContentCategories(contentCategories.map(c => 
                            c.id === category.id ? {...c, pillarId: e.target.value} : c
                          ));
                        }}
                        className="w-full mt-1 p-2 border border-border rounded-md bg-background"
                      >
                        {contentPillars.map(pillar => (
                          <option key={pillar.id} value={pillar.id}>{pillar.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Brand Guidelines Tab */}
          <TabsContent value="brand" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Brand Guidelines</h3>
              </div>
              <Button onClick={addBrandGuideline} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Guideline
              </Button>
            </div>
            
            <div className="grid gap-4">
              {brandGuidelines.map((guideline) => (
                <Card key={guideline.id} className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Input
                        value={guideline.element}
                        onChange={(e) => {
                          setBrandGuidelines(brandGuidelines.map(g => 
                            g.id === guideline.id ? {...g, element: e.target.value} : g
                          ));
                        }}
                        className="font-medium text-lg border-none bg-transparent p-0 h-auto"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteItem("guideline", guideline.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Specification</Label>
                        <Textarea
                          value={guideline.specification}
                          onChange={(e) => {
                            setBrandGuidelines(brandGuidelines.map(g => 
                              g.id === guideline.id ? {...g, specification: e.target.value} : g
                            ));
                          }}
                          placeholder="Define the specification or rule..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Examples</Label>
                        <Textarea
                          value={guideline.examples}
                          onChange={(e) => {
                            setBrandGuidelines(brandGuidelines.map(g => 
                              g.id === guideline.id ? {...g, examples: e.target.value} : g
                            ));
                          }}
                          placeholder="Provide examples or usage notes..."
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Strategy Summary */}
        <Card className="mt-6 p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Strategy Overview</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Content Pillars:</span>
              <p>{contentPillars.length} defined</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Target Audiences:</span>
              <p>{targetAudiences.length} segments</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Content Categories:</span>
              <p>{contentCategories.length} categories</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Brand Guidelines:</span>
              <p>{brandGuidelines.length} elements</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StrategyPlanning;