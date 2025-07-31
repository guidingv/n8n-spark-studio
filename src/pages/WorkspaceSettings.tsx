import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectHeader } from '@/components/ProjectHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useProject } from '@/contexts/ProjectContext';
import { useGlobalSettings } from '@/contexts/GlobalSettingsContext';
import { ArrowLeft, MessageSquare, Users, PenTool, FileText } from 'lucide-react';

const WorkspaceSettings = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const {
    brandVoices,
    targetAudiences,
    writingStyles,
    contentStructures,
    getWorkspaceSettings,
    updateWorkspaceSettings
  } = useGlobalSettings();

  const [selectedSettings, setSelectedSettings] = useState(() => {
    return workspaceId ? getWorkspaceSettings(workspaceId) : {
      brandVoiceIds: [],
      targetAudienceIds: [],
      writingStyleIds: [],
      contentStructureIds: []
    };
  });

  useEffect(() => {
    if (workspaceId) {
      setSelectedSettings(getWorkspaceSettings(workspaceId));
    }
  }, [workspaceId, getWorkspaceSettings]);

  const handleSave = () => {
    if (workspaceId) {
      updateWorkspaceSettings(workspaceId, selectedSettings);
      navigate('/');
    }
  };

  const toggleSelection = (type: keyof typeof selectedSettings, id: string) => {
    setSelectedSettings(prev => {
      const currentIds = prev[type];
      const newIds = currentIds.includes(id)
        ? currentIds.filter(existingId => existingId !== id)
        : [...currentIds, id];
      
      return {
        ...prev,
        [type]: newIds
      };
    });
  };

  if (!currentProject) {
    return <div>Workspace not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workspace
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Workspace Settings: {currentProject.name}
          </h1>
          <p className="text-muted-foreground">
            Configure the brand voices, target audiences, writing styles, and content structures for this workspace.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Brand Voices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Brand Voices
              </CardTitle>
            </CardHeader>
            <CardContent>
              {brandVoices.length === 0 ? (
                <p className="text-muted-foreground">No brand voices available. Create some in Global Settings first.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brandVoices.map((voice) => (
                    <div
                      key={voice.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSettings.brandVoiceIds.includes(voice.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      }`}
                      onClick={() => toggleSelection('brandVoiceIds', voice.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedSettings.brandVoiceIds.includes(voice.id)}
                          onChange={() => toggleSelection('brandVoiceIds', voice.id)}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{voice.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{voice.description}</p>
                          <Badge variant="secondary" className="mt-2">{voice.tone}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Target Audiences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Target Audiences
              </CardTitle>
            </CardHeader>
            <CardContent>
              {targetAudiences.length === 0 ? (
                <p className="text-muted-foreground">No target audiences available. Create some in Global Settings first.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {targetAudiences.map((audience) => (
                    <div
                      key={audience.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSettings.targetAudienceIds.includes(audience.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      }`}
                      onClick={() => toggleSelection('targetAudienceIds', audience.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedSettings.targetAudienceIds.includes(audience.id)}
                          onChange={() => toggleSelection('targetAudienceIds', audience.id)}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{audience.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{audience.description}</p>
                          <div className="flex gap-1 mt-2">
                            <Badge variant="outline" className="text-xs">{audience.demographics.ageRange}</Badge>
                            <Badge variant="outline" className="text-xs">{audience.demographics.jobTitle}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Writing Styles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5" />
                Writing Styles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {writingStyles.length === 0 ? (
                <p className="text-muted-foreground">No writing styles available. Create some in Global Settings first.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {writingStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSettings.writingStyleIds.includes(style.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      }`}
                      onClick={() => toggleSelection('writingStyleIds', style.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedSettings.writingStyleIds.includes(style.id)}
                          onChange={() => toggleSelection('writingStyleIds', style.id)}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{style.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{style.description}</p>
                          <Badge variant="secondary" className="mt-2">{style.voiceTone}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Structures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Content Structures
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contentStructures.length === 0 ? (
                <p className="text-muted-foreground">No content structures available. Create some in Global Settings first.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contentStructures.map((structure) => (
                    <div
                      key={structure.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSettings.contentStructureIds.includes(structure.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      }`}
                      onClick={() => toggleSelection('contentStructureIds', structure.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedSettings.contentStructureIds.includes(structure.id)}
                          onChange={() => toggleSelection('contentStructureIds', structure.id)}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{structure.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{structure.description}</p>
                          <div className="flex gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">{structure.type}</Badge>
                            <Badge variant="outline" className="text-xs">{structure.sections.length} sections</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              Save Workspace Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSettings;