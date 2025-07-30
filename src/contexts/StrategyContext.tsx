import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BrandDnaProfile {
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
    referenceImages: {
      id: string;
      name: string;
      url: string;
      description: string;
    }[];
  };
}

export interface ContentPillar {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface TargetAudience {
  id: string;
  name: string;
  demographics: string;
  psychographics: string;
  painPoints: string[];
  goals: string[];
}

export interface ContentCategory {
  id: string;
  name: string;
  description: string;
  pillarId: string;
  contentTypes: string[];
}

export interface StrategyProfile {
  brandDnaProfile: BrandDnaProfile;
  contentPillars: ContentPillar[];
  targetAudiences: TargetAudience[];
  contentCategories: ContentCategory[];
  ultimateGoal: string;
}

interface StrategyContextType {
  strategy: StrategyProfile;
  updateBrandProfile: (profile: BrandDnaProfile) => void;
  updateContentPillars: (pillars: ContentPillar[]) => void;
  updateTargetAudiences: (audiences: TargetAudience[]) => void;
  updateContentCategories: (categories: ContentCategory[]) => void;
  updateStrategy: (strategy: StrategyProfile) => void;
  isStrategyComplete: boolean;
}

const defaultStrategy: StrategyProfile = {
  brandDnaProfile: {
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
      },
      referenceImages: []
    }
  },
  contentPillars: [
    { id: "1", name: "Thought Leadership", description: "Establish expertise in health and wellness", color: "blue" },
    { id: "2", name: "Product Education", description: "Showcase features and benefits", color: "green" },
    { id: "3", name: "Customer Success", description: "Highlight real results and testimonials", color: "purple" }
  ],
  targetAudiences: [
    {
      id: "1",
      name: "Health-Conscious Professionals",
      demographics: "Ages 28-45, Working professionals with disposable income",
      psychographics: "Wellness-focused, efficiency-driven, quality-conscious",
      painPoints: ["Time constraints", "Information overload", "Quality concerns"],
      goals: ["Optimize health", "Save time", "Trusted recommendations"]
    }
  ],
  contentCategories: [
    {
      id: "1",
      name: "Educational Guides",
      description: "In-depth wellness education and how-to content",
      pillarId: "2",
      contentTypes: ["Blog posts", "Video tutorials", "Infographics"]
    }
  ],
  ultimateGoal: "Create compelling, brand-aligned content that resonates with target audiences and supports business objectives"
};

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

const STORAGE_KEY = 'content-strategy-profile';

export const StrategyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get project-specific storage key
  const getStorageKey = () => {
    const currentProjectId = localStorage.getItem('currentProject');
    return currentProjectId ? `strategy_${currentProjectId}` : 'strategy_default';
  };

  const [strategy, setStrategy] = useState<StrategyProfile>(() => {
    try {
      const storageKey = getStorageKey();
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : defaultStrategy;
    } catch {
      return defaultStrategy;
    }
  });

  // Save strategy to localStorage whenever it changes (project-specific)
  useEffect(() => {
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(strategy));
  }, [strategy]);

  const updateBrandProfile = (profile: BrandDnaProfile) => {
    setStrategy(prev => ({ ...prev, brandDnaProfile: profile }));
  };

  const updateContentPillars = (pillars: ContentPillar[]) => {
    setStrategy(prev => ({ ...prev, contentPillars: pillars }));
  };

  const updateTargetAudiences = (audiences: TargetAudience[]) => {
    setStrategy(prev => ({ ...prev, targetAudiences: audiences }));
  };

  const updateContentCategories = (categories: ContentCategory[]) => {
    setStrategy(prev => ({ ...prev, contentCategories: categories }));
  };

  const updateStrategy = (newStrategy: StrategyProfile) => {
    setStrategy(newStrategy);
  };

  const isStrategyComplete = Boolean(
    strategy.brandDnaProfile.brandName &&
    strategy.brandDnaProfile.tagline &&
    strategy.brandDnaProfile.voiceAndTone.description &&
    strategy.contentPillars.length > 0 &&
    strategy.targetAudiences.length > 0
  );

  const value: StrategyContextType = {
    strategy,
    updateBrandProfile,
    updateContentPillars,
    updateTargetAudiences,
    updateContentCategories,
    updateStrategy,
    isStrategyComplete
  };

  return (
    <StrategyContext.Provider value={value}>
      {children}
    </StrategyContext.Provider>
  );
};

export const useStrategyContext = () => {
  const context = useContext(StrategyContext);
  if (context === undefined) {
    throw new Error('useStrategyContext must be used within a StrategyProvider');
  }
  return context;
};