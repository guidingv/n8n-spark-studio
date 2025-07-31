import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BrandVoice {
  id: string;
  name: string;
  description: string;
  tone: string;
  adjectives: string[];
  writingStyle: string;
  doAndDonts: {
    do: string[];
    dont: string[];
  };
  examples: string[];
  createdAt: string;
}

export interface TargetAudience {
  id: string;
  name: string;
  description: string;
  demographics: {
    ageRange: string;
    location: string;
    income: string;
    education: string;
    jobTitle: string;
  };
  psychographics: {
    interests: string[];
    values: string[];
    lifestyle: string;
    personality: string[];
  };
  painPoints: string[];
  goals: string[];
  preferredChannels: string[];
  contentPreferences: string[];
  createdAt: string;
}

export interface WritingStyle {
  id: string;
  name: string;
  description: string;
  voiceTone: string;
  sentenceStructure: string;
  vocabulary: string;
  punctuation: string;
  formatting: {
    headings: string;
    paragraphs: string;
    lists: string;
  };
  examples: string[];
  createdAt: string;
}

export interface ContentStructure {
  id: string;
  name: string;
  description: string;
  type: 'blog-post' | 'social-media' | 'email' | 'video-script' | 'landing-page' | 'newsletter' | 'custom';
  sections: {
    name: string;
    description: string;
    wordCount?: string;
    required: boolean;
  }[];
  guidelines: string[];
  examples: string[];
  createdAt: string;
}

export interface WorkspaceSettings {
  brandVoiceIds: string[];
  targetAudienceIds: string[];
  writingStyleIds: string[];
  contentStructureIds: string[];
}

interface GlobalSettingsContextType {
  brandVoices: BrandVoice[];
  targetAudiences: TargetAudience[];
  writingStyles: WritingStyle[];
  contentStructures: ContentStructure[];
  workspaceSettings: Record<string, WorkspaceSettings>;
  
  // Brand Voice methods
  addBrandVoice: (voice: Omit<BrandVoice, 'id' | 'createdAt'>) => void;
  updateBrandVoice: (id: string, voice: Partial<BrandVoice>) => void;
  deleteBrandVoice: (id: string) => void;
  
  // Target Audience methods
  addTargetAudience: (audience: Omit<TargetAudience, 'id' | 'createdAt'>) => void;
  updateTargetAudience: (id: string, audience: Partial<TargetAudience>) => void;
  deleteTargetAudience: (id: string) => void;
  
  // Writing Style methods
  addWritingStyle: (style: Omit<WritingStyle, 'id' | 'createdAt'>) => void;
  updateWritingStyle: (id: string, style: Partial<WritingStyle>) => void;
  deleteWritingStyle: (id: string) => void;
  
  // Content Structure methods
  addContentStructure: (structure: Omit<ContentStructure, 'id' | 'createdAt'>) => void;
  updateContentStructure: (id: string, structure: Partial<ContentStructure>) => void;
  deleteContentStructure: (id: string) => void;
  
  // Workspace Settings methods
  updateWorkspaceSettings: (workspaceId: string, settings: Partial<WorkspaceSettings>) => void;
  getWorkspaceSettings: (workspaceId: string) => WorkspaceSettings;
}

const GlobalSettingsContext = createContext<GlobalSettingsContextType | undefined>(undefined);

const defaultWorkspaceSettings: WorkspaceSettings = {
  brandVoiceIds: [],
  targetAudienceIds: [],
  writingStyleIds: [],
  contentStructureIds: []
};

export function GlobalSettingsProvider({ children }: { children: ReactNode }) {
  const [brandVoices, setBrandVoices] = useState<BrandVoice[]>(() => {
    const saved = localStorage.getItem('brandVoices');
    return saved ? JSON.parse(saved) : [];
  });

  const [targetAudiences, setTargetAudiences] = useState<TargetAudience[]>(() => {
    const saved = localStorage.getItem('targetAudiences');
    return saved ? JSON.parse(saved) : [];
  });

  const [writingStyles, setWritingStyles] = useState<WritingStyle[]>(() => {
    const saved = localStorage.getItem('writingStyles');
    return saved ? JSON.parse(saved) : [];
  });

  const [contentStructures, setContentStructures] = useState<ContentStructure[]>(() => {
    const saved = localStorage.getItem('contentStructures');
    return saved ? JSON.parse(saved) : [];
  });

  const [workspaceSettings, setWorkspaceSettings] = useState<Record<string, WorkspaceSettings>>(() => {
    const saved = localStorage.getItem('workspaceSettings');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('brandVoices', JSON.stringify(brandVoices));
  }, [brandVoices]);

  useEffect(() => {
    localStorage.setItem('targetAudiences', JSON.stringify(targetAudiences));
  }, [targetAudiences]);

  useEffect(() => {
    localStorage.setItem('writingStyles', JSON.stringify(writingStyles));
  }, [writingStyles]);

  useEffect(() => {
    localStorage.setItem('contentStructures', JSON.stringify(contentStructures));
  }, [contentStructures]);

  useEffect(() => {
    localStorage.setItem('workspaceSettings', JSON.stringify(workspaceSettings));
  }, [workspaceSettings]);

  // Brand Voice methods
  const addBrandVoice = (voiceData: Omit<BrandVoice, 'id' | 'createdAt'>) => {
    const newVoice: BrandVoice = {
      ...voiceData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBrandVoices(prev => [newVoice, ...prev]);
  };

  const updateBrandVoice = (id: string, updates: Partial<BrandVoice>) => {
    setBrandVoices(prev => prev.map(voice => 
      voice.id === id ? { ...voice, ...updates } : voice
    ));
  };

  const deleteBrandVoice = (id: string) => {
    setBrandVoices(prev => prev.filter(voice => voice.id !== id));
    // Remove from all workspace settings
    setWorkspaceSettings(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(workspaceId => {
        updated[workspaceId] = {
          ...updated[workspaceId],
          brandVoiceIds: updated[workspaceId].brandVoiceIds.filter(voiceId => voiceId !== id)
        };
      });
      return updated;
    });
  };

  // Target Audience methods
  const addTargetAudience = (audienceData: Omit<TargetAudience, 'id' | 'createdAt'>) => {
    const newAudience: TargetAudience = {
      ...audienceData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setTargetAudiences(prev => [newAudience, ...prev]);
  };

  const updateTargetAudience = (id: string, updates: Partial<TargetAudience>) => {
    setTargetAudiences(prev => prev.map(audience => 
      audience.id === id ? { ...audience, ...updates } : audience
    ));
  };

  const deleteTargetAudience = (id: string) => {
    setTargetAudiences(prev => prev.filter(audience => audience.id !== id));
    // Remove from all workspace settings
    setWorkspaceSettings(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(workspaceId => {
        updated[workspaceId] = {
          ...updated[workspaceId],
          targetAudienceIds: updated[workspaceId].targetAudienceIds.filter(audienceId => audienceId !== id)
        };
      });
      return updated;
    });
  };

  // Writing Style methods
  const addWritingStyle = (styleData: Omit<WritingStyle, 'id' | 'createdAt'>) => {
    const newStyle: WritingStyle = {
      ...styleData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setWritingStyles(prev => [newStyle, ...prev]);
  };

  const updateWritingStyle = (id: string, updates: Partial<WritingStyle>) => {
    setWritingStyles(prev => prev.map(style => 
      style.id === id ? { ...style, ...updates } : style
    ));
  };

  const deleteWritingStyle = (id: string) => {
    setWritingStyles(prev => prev.filter(style => style.id !== id));
    // Remove from all workspace settings
    setWorkspaceSettings(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(workspaceId => {
        updated[workspaceId] = {
          ...updated[workspaceId],
          writingStyleIds: updated[workspaceId].writingStyleIds.filter(styleId => styleId !== id)
        };
      });
      return updated;
    });
  };

  // Content Structure methods
  const addContentStructure = (structureData: Omit<ContentStructure, 'id' | 'createdAt'>) => {
    const newStructure: ContentStructure = {
      ...structureData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setContentStructures(prev => [newStructure, ...prev]);
  };

  const updateContentStructure = (id: string, updates: Partial<ContentStructure>) => {
    setContentStructures(prev => prev.map(structure => 
      structure.id === id ? { ...structure, ...updates } : structure
    ));
  };

  const deleteContentStructure = (id: string) => {
    setContentStructures(prev => prev.filter(structure => structure.id !== id));
    // Remove from all workspace settings
    setWorkspaceSettings(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(workspaceId => {
        updated[workspaceId] = {
          ...updated[workspaceId],
          contentStructureIds: updated[workspaceId].contentStructureIds.filter(structureId => structureId !== id)
        };
      });
      return updated;
    });
  };

  // Workspace Settings methods
  const updateWorkspaceSettings = (workspaceId: string, settings: Partial<WorkspaceSettings>) => {
    setWorkspaceSettings(prev => ({
      ...prev,
      [workspaceId]: {
        ...defaultWorkspaceSettings,
        ...prev[workspaceId],
        ...settings
      }
    }));
  };

  const getWorkspaceSettings = (workspaceId: string): WorkspaceSettings => {
    return workspaceSettings[workspaceId] || defaultWorkspaceSettings;
  };

  return (
    <GlobalSettingsContext.Provider value={{
      brandVoices,
      targetAudiences,
      writingStyles,
      contentStructures,
      workspaceSettings,
      addBrandVoice,
      updateBrandVoice,
      deleteBrandVoice,
      addTargetAudience,
      updateTargetAudience,
      deleteTargetAudience,
      addWritingStyle,
      updateWritingStyle,
      deleteWritingStyle,
      addContentStructure,
      updateContentStructure,
      deleteContentStructure,
      updateWorkspaceSettings,
      getWorkspaceSettings
    }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

export function useGlobalSettings() {
  const context = useContext(GlobalSettingsContext);
  if (context === undefined) {
    throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider');
  }
  return context;
}