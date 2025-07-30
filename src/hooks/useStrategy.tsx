import { useStrategyContext } from '@/contexts/StrategyContext';

// Hook for components that need easy access to strategy data
export const useStrategy = () => {
  const { strategy, isStrategyComplete } = useStrategyContext();
  
  // Helper functions to access common strategy data
  const getBrandColors = () => {
    const colors = [
      ...strategy.brandDnaProfile.visualStyle.colorPalette.base,
      ...strategy.brandDnaProfile.visualStyle.colorPalette.primary_accents
    ];
    return colors.map(color => {
      // Extract hex code from color strings like "Amber Brown #994A00"
      const match = color.match(/#[0-9A-Fa-f]{6}/);
      return match ? match[0] : color;
    });
  };

  const getBrandValues = () => {
    return strategy.brandDnaProfile.voiceAndTone.adjectives;
  };

  const getPrimaryAudience = () => {
    return strategy.targetAudiences[0] || null;
  };

  const getBrandTone = () => {
    return strategy.brandDnaProfile.voiceAndTone.description;
  };

  const getBrandName = () => {
    return strategy.brandDnaProfile.brandName;
  };

  const getTagline = () => {
    return strategy.brandDnaProfile.tagline;
  };

  const getContentPillars = () => {
    return strategy.contentPillars;
  };

  const getVisualStyle = () => {
    return strategy.brandDnaProfile.visualStyle;
  };

  // Generate a context string for AI content creation
  const getAIContext = () => {
    const audience = getPrimaryAudience();
    return {
      brand: {
        name: getBrandName(),
        tagline: getTagline(),
        tone: getBrandTone(),
        values: getBrandValues(),
        colors: getBrandColors(),
        visualStyle: getVisualStyle()
      },
      audience: audience ? {
        name: audience.name,
        demographics: audience.demographics,
        psychographics: audience.psychographics,
        painPoints: audience.painPoints,
        goals: audience.goals
      } : null,
      contentPillars: getContentPillars(),
      contentCategories: strategy.contentCategories,
      ultimateGoal: strategy.ultimateGoal
    };
  };

  return {
    strategy,
    isStrategyComplete,
    getBrandColors,
    getBrandValues,
    getPrimaryAudience,
    getBrandTone,
    getBrandName,
    getTagline,
    getContentPillars,
    getVisualStyle,
    getAIContext
  };
};