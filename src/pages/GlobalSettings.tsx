import React, { useState } from 'react';
import { ProjectHeader } from '@/components/ProjectHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Users, MessageSquare, PenTool, FileText } from 'lucide-react';
import { useGlobalSettings } from '@/contexts/GlobalSettingsContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GlobalSettings = () => {
  const {
    brandVoices,
    targetAudiences,
    writingStyles,
    contentStructures,
    addBrandVoice,
    addTargetAudience,
    addWritingStyle,
    addContentStructure,
    deleteBrandVoice,
    deleteTargetAudience,
    deleteWritingStyle,
    deleteContentStructure
  } = useGlobalSettings();

  const [activeTab, setActiveTab] = useState('brand-voices');

  const BrandVoiceForm = ({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      tone: '',
      adjectives: [''],
      writingStyle: '',
      doAndDonts: { do: [''], dont: [''] },
      examples: ['']
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        adjectives: formData.adjectives.filter(a => a.trim()),
        doAndDonts: {
          do: formData.doAndDonts.do.filter(d => d.trim()),
          dont: formData.doAndDonts.dont.filter(d => d.trim())
        },
        examples: formData.examples.filter(e => e.trim())
      });
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Brand Voice Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="tone">Tone</Label>
          <Input
            id="tone"
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
            placeholder="e.g., Professional, Friendly, Authoritative"
            required
          />
        </div>
        <div>
          <Label htmlFor="writingStyle">Writing Style</Label>
          <Textarea
            id="writingStyle"
            value={formData.writingStyle}
            onChange={(e) => setFormData({ ...formData, writingStyle: e.target.value })}
            placeholder="Describe the overall writing style"
            required
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Create Brand Voice</Button>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    );
  };

  const TargetAudienceForm = ({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      demographics: {
        ageRange: '',
        location: '',
        income: '',
        education: '',
        jobTitle: ''
      },
      psychographics: {
        interests: [''],
        values: [''],
        lifestyle: '',
        personality: ['']
      },
      painPoints: [''],
      goals: [''],
      preferredChannels: [''],
      contentPreferences: ['']
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        psychographics: {
          ...formData.psychographics,
          interests: formData.psychographics.interests.filter(i => i.trim()),
          values: formData.psychographics.values.filter(v => v.trim()),
          personality: formData.psychographics.personality.filter(p => p.trim())
        },
        painPoints: formData.painPoints.filter(p => p.trim()),
        goals: formData.goals.filter(g => g.trim()),
        preferredChannels: formData.preferredChannels.filter(c => c.trim()),
        contentPreferences: formData.contentPreferences.filter(c => c.trim())
      });
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Audience Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="ageRange">Age Range</Label>
          <Input
            id="ageRange"
            value={formData.demographics.ageRange}
            onChange={(e) => setFormData({ 
              ...formData, 
              demographics: { ...formData.demographics, ageRange: e.target.value }
            })}
            placeholder="e.g., 25-35"
          />
        </div>
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={formData.demographics.jobTitle}
            onChange={(e) => setFormData({ 
              ...formData, 
              demographics: { ...formData.demographics, jobTitle: e.target.value }
            })}
            placeholder="e.g., Marketing Manager"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Create Target Audience</Button>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    );
  };

  const WritingStyleForm = ({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      voiceTone: '',
      sentenceStructure: '',
      vocabulary: '',
      punctuation: '',
      formatting: {
        headings: '',
        paragraphs: '',
        lists: ''
      },
      examples: ['']
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        examples: formData.examples.filter(e => e.trim())
      });
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Writing Style Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="voiceTone">Voice & Tone</Label>
          <Input
            id="voiceTone"
            value={formData.voiceTone}
            onChange={(e) => setFormData({ ...formData, voiceTone: e.target.value })}
            placeholder="e.g., Conversational, Formal, Casual"
            required
          />
        </div>
        <div>
          <Label htmlFor="sentenceStructure">Sentence Structure</Label>
          <Input
            id="sentenceStructure"
            value={formData.sentenceStructure}
            onChange={(e) => setFormData({ ...formData, sentenceStructure: e.target.value })}
            placeholder="e.g., Short and punchy, Complex and detailed"
            required
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Create Writing Style</Button>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    );
  };

  const ContentStructureForm = ({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      type: 'blog-post' as const,
      sections: [{ name: '', description: '', wordCount: '', required: true }],
      guidelines: [''],
      examples: ['']
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        sections: formData.sections.filter(s => s.name.trim()),
        guidelines: formData.guidelines.filter(g => g.trim()),
        examples: formData.examples.filter(e => e.trim())
      });
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Structure Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Content Type</Label>
          <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blog-post">Blog Post</SelectItem>
              <SelectItem value="social-media">Social Media</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="video-script">Video Script</SelectItem>
              <SelectItem value="landing-page">Landing Page</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4">
          <Button type="submit">Create Content Structure</Button>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Global Settings</h1>
          <p className="text-muted-foreground">Manage your brand voices, target audiences, writing styles, and content structures that can be assigned to workspaces.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="brand-voices" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Brand Voices
            </TabsTrigger>
            <TabsTrigger value="target-audiences" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Target Audiences
            </TabsTrigger>
            <TabsTrigger value="writing-styles" className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Writing Styles
            </TabsTrigger>
            <TabsTrigger value="content-structures" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content Structures
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brand-voices" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Brand Voices</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Brand Voice
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Brand Voice</DialogTitle>
                  </DialogHeader>
                  <BrandVoiceForm 
                    onSubmit={addBrandVoice}
                    onClose={() => {}}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandVoices.map((voice) => (
                <Card key={voice.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{voice.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteBrandVoice(voice.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{voice.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="secondary">{voice.tone}</Badge>
                      <div className="flex flex-wrap gap-1">
                        {voice.adjectives.slice(0, 3).map((adj, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{adj}</Badge>
                        ))}
                        {voice.adjectives.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{voice.adjectives.length - 3} more</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="target-audiences" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Target Audiences</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Target Audience
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Target Audience</DialogTitle>
                  </DialogHeader>
                  <TargetAudienceForm 
                    onSubmit={addTargetAudience}
                    onClose={() => {}}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {targetAudiences.map((audience) => (
                <Card key={audience.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{audience.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTargetAudience(audience.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{audience.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Age:</span> {audience.demographics.ageRange}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Role:</span> {audience.demographics.jobTitle}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {audience.psychographics.interests.slice(0, 2).map((interest, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{interest}</Badge>
                        ))}
                        {audience.psychographics.interests.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{audience.psychographics.interests.length - 2} interests</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="writing-styles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Writing Styles</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Writing Style
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Writing Style</DialogTitle>
                  </DialogHeader>
                  <WritingStyleForm 
                    onSubmit={addWritingStyle}
                    onClose={() => {}}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {writingStyles.map((style) => (
                <Card key={style.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{style.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteWritingStyle(style.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{style.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="secondary">{style.voiceTone}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {style.sentenceStructure}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content-structures" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Content Structures</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Content Structure
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Content Structure</DialogTitle>
                  </DialogHeader>
                  <ContentStructureForm 
                    onSubmit={addContentStructure}
                    onClose={() => {}}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentStructures.map((structure) => (
                <Card key={structure.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{structure.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteContentStructure(structure.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{structure.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="secondary">{structure.type}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {structure.sections.length} sections
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GlobalSettings;