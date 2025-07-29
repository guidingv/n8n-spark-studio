import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Info, Lightbulb, RefreshCw } from "lucide-react";
import { pipeline } from "@huggingface/transformers";

interface BiasIssue {
  type: "gender" | "racial" | "political" | "religious" | "age" | "general";
  severity: "low" | "medium" | "high";
  text: string;
  suggestion: string;
  position: number;
}

interface BiasCheckProps {
  content: string;
  isAnalyzing?: boolean;
}

export const BiasCheck = ({ content, isAnalyzing = false }: BiasCheckProps) => {
  const [issues, setIssues] = useState<BiasIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [overallScore, setOverallScore] = useState(100);
  const [analyzer, setAnalyzer] = useState<any>(null);

  // Initialize the AI model
  useEffect(() => {
    const initializeAnalyzer = async () => {
      try {
        // Use a lightweight text classification model for bias detection
        const classifier = await pipeline(
          "text-classification",
          "unitary/toxic-bert",
          { device: "cpu" }
        );
        setAnalyzer(classifier);
      } catch (error) {
        console.error("Failed to initialize bias analyzer:", error);
      }
    };

    initializeAnalyzer();
  }, []);

  // Analyze content for bias
  const analyzeContent = async (text: string) => {
    if (!analyzer || !text.trim()) {
      setIssues([]);
      setOverallScore(100);
      return;
    }

    setIsLoading(true);
    
    try {
      // Remove HTML tags and get plain text
      const plainText = text.replace(/<[^>]*>/g, "").trim();
      
      if (plainText.length < 10) {
        setIssues([]);
        setOverallScore(100);
        setIsLoading(false);
        return;
      }

      // Split text into sentences for analysis
      const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const detectedIssues: BiasIssue[] = [];

      // Basic bias detection patterns
      const biasPatterns = [
        {
          type: "gender" as const,
          patterns: [
            /\b(all men|all women|typical woman|typical man|guys like|girls always)\b/gi,
            /\b(man up|woman's work|acting like a girl|throw like a girl)\b/gi,
          ],
          suggestions: [
            "Consider using gender-neutral language or avoid generalizations about gender.",
            "Replace gendered assumptions with inclusive alternatives."
          ]
        },
        {
          type: "age" as const,
          patterns: [
            /\b(old people|young people always|millennials are|boomers are)\b/gi,
            /\b(too old|too young|act your age)\b/gi,
          ],
          suggestions: [
            "Avoid age-based generalizations and stereotypes.",
            "Focus on specific behaviors rather than age groups."
          ]
        },
        {
          type: "general" as const,
          patterns: [
            /\b(everyone knows|obviously|clearly|it's common sense)\b/gi,
            /\b(normal people|weird|strange|bizarre)\b/gi,
          ],
          suggestions: [
            "Avoid assumptions about what everyone knows or considers normal.",
            "Use more inclusive language that doesn't marginalize different perspectives."
          ]
        }
      ];

      // Check for bias patterns
      sentences.forEach((sentence, index) => {
        biasPatterns.forEach(({ type, patterns, suggestions }) => {
          patterns.forEach((pattern, patternIndex) => {
            const matches = sentence.match(pattern);
            if (matches) {
              matches.forEach(match => {
                detectedIssues.push({
                  type,
                  severity: "medium",
                  text: match,
                  suggestion: suggestions[patternIndex % suggestions.length],
                  position: index
                });
              });
            }
          });
        });
      });

      // Try AI analysis for toxicity/bias
      try {
        for (const sentence of sentences.slice(0, 5)) { // Limit to 5 sentences for performance
          if (sentence.trim().length > 20) {
            const result = await analyzer(sentence.trim());
            
            if (result && result[0] && result[0].score > 0.7) {
              const label = result[0].label.toLowerCase();
              
              if (label.includes('toxic') || label.includes('hate')) {
                detectedIssues.push({
                  type: "general",
                  severity: "high",
                  text: sentence.trim().substring(0, 50) + "...",
                  suggestion: "This content may contain biased or potentially harmful language. Consider revising for more inclusive tone.",
                  position: sentences.indexOf(sentence)
                });
              }
            }
          }
        }
      } catch (aiError) {
        console.error("AI analysis failed:", aiError);
        // Continue with pattern-based detection only
      }

      setIssues(detectedIssues);
      
      // Calculate overall score
      const maxPenalty = detectedIssues.length * 15;
      const severityMultiplier = detectedIssues.reduce((acc, issue) => {
        return acc + (issue.severity === "high" ? 2 : issue.severity === "medium" ? 1.5 : 1);
      }, 0);
      
      const finalScore = Math.max(0, 100 - (maxPenalty * severityMultiplier / detectedIssues.length || 0));
      setOverallScore(Math.round(finalScore));
      
    } catch (error) {
      console.error("Bias analysis failed:", error);
      setIssues([]);
      setOverallScore(100);
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze content when it changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (content && !isAnalyzing) {
        analyzeContent(content);
      }
    }, 1000); // Debounce analysis

    return () => clearTimeout(timeoutId);
  }, [content, isAnalyzing, analyzer]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500/20 text-red-500 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "low": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Needs Attention";
    return "Poor";
  };

  if (!analyzer) {
    return (
      <Card className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
        <div className="flex items-center gap-2 text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading bias detection AI...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-n8n-primary" />
            <h3 className="font-semibold text-foreground">Bias Check</h3>
            {isLoading && <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Score:</span>
            <span className={`font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}/100
            </span>
            <Badge className={`${
              overallScore >= 90 ? "bg-green-500/20 text-green-500 border-green-500/30" :
              overallScore >= 70 ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" :
              "bg-red-500/20 text-red-500 border-red-500/30"
            }`}>
              {getScoreLabel(overallScore)}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={overallScore} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Higher scores indicate more inclusive and unbiased content
          </p>
        </div>

        {/* Issues List */}
        {issues.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Info className="h-4 w-4" />
              Potential Issues Found ({issues.length})
            </h4>
            
            <div className="space-y-2">
              {issues.map((issue, index) => (
                <div key={index} className="p-3 bg-black/20 rounded-lg border border-border/10">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={getSeverityColor(issue.severity)}>
                      {issue.severity} • {issue.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-foreground mb-2">
                    <span className="font-medium">Found:</span> "{issue.text}"
                  </p>
                  
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-n8n-accent mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      {issue.suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">No bias issues detected. Great job!</span>
          </div>
        )}

        {/* Action Button */}
        {content && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => analyzeContent(content)}
            disabled={isLoading}
            className="w-full"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Re-analyze Content
          </Button>
        )}
      </div>
    </Card>
  );
};