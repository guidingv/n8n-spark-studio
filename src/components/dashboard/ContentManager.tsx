import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, RefreshCw, Download, Eye, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const contentAssets = [
  {
    id: 1,
    title: "Spring Campaign Hero Video",
    type: "video",
    source: "Final Production",
    status: "published",
    lastSync: "2 hours ago",
    fileSize: "45.2 MB",
    format: "MP4",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    publishedOn: ["YouTube", "LinkedIn", "Website"],
    performance: { views: "12.5K", engagement: "8.2%" }
  },
  {
    id: 2,
    title: "Product Launch Blog Article",
    type: "article",
    source: "Content Editor",
    status: "review",
    lastSync: "1 day ago",
    wordCount: "1,200 words",
    format: "HTML",
    preview: "Discover how our latest AI-powered features are revolutionizing content creation for marketing teams worldwide...",
    assignedTo: "Sarah Chen",
    reviewDeadline: "2024-03-16"
  },
  {
    id: 3,
    title: "Social Media Asset Pack",
    type: "design",
    source: "Design System",
    status: "approved",
    lastSync: "3 hours ago",
    fileSize: "8.7 MB",
    format: "ZIP",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    assets: ["Instagram posts", "LinkedIn banners", "Twitter cards"],
    brandCompliance: "100%"
  },
  {
    id: 4,
    title: "Customer Success Case Study",
    type: "document",
    source: "Research Team",
    status: "draft",
    lastSync: "5 hours ago",
    wordCount: "800 words",
    format: "PDF",
    preview: "TechCorp increased their content output by 300% while reducing production time by 50% using our platform...",
    nextReview: "2024-03-18"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "published": return "bg-green-500/20 text-green-500 border-green-500/30";
    case "approved": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    case "review": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "draft": return "bg-purple-500/20 text-purple-500 border-purple-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

export const ContentManager = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return "🎥";
      case "article": return "📝";
      case "design": return "🎨";
      case "document": return "📄";
      default: return "📁";
    }
  };

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-n8n-secondary" />
          <h2 className="text-xl font-semibold text-foreground">Content Assets & Library</h2>
          <Badge className="bg-n8n-primary/20 text-n8n-primary border-n8n-primary/30">
            Library Active
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/assets')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Sync Library
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentAssets.map((asset) => (
          <div key={asset.id} className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-border/20 rounded-xl overflow-hidden hover:shadow-glass transition-all duration-300">
            {/* Asset Preview */}
            <div className="aspect-video relative overflow-hidden">
              {asset.thumbnail ? (
                <img 
                  src={asset.thumbnail} 
                  alt={asset.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-4xl">{getTypeIcon(asset.type)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <Badge className={`absolute top-3 right-3 ${getStatusColor(asset.status)}`}>
                {asset.status}
              </Badge>
              <Badge variant="secondary" className="absolute top-3 left-3 text-xs">
                {asset.type}
              </Badge>
            </div>
            
            {/* Asset Details */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{asset.title}</h3>
                <p className="text-sm text-muted-foreground">{asset.source}</p>
              </div>

              {/* Asset Metadata */}
              <div className="space-y-1 text-xs text-muted-foreground">
                {asset.fileSize && (
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span>{asset.fileSize}</span>
                  </div>
                )}
                {asset.wordCount && (
                  <div className="flex justify-between">
                    <span>Length:</span>
                    <span>{asset.wordCount}</span>
                  </div>
                )}
                {asset.format && (
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-mono">{asset.format}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Updated:</span>
                  <span>{asset.lastSync}</span>
                </div>
              </div>

              {/* Performance/Additional Info */}
              {asset.performance && (
                <div className="pt-2 border-t border-border/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views:</span>
                    <span className="text-green-400">{asset.performance.views}</span>
                  </div>
                </div>
              )}

              {asset.preview && (
                <div className="pt-2 border-t border-border/10">
                  <p className="text-xs text-muted-foreground line-clamp-2">{asset.preview}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate(`/editor/${asset.id}?mode=preview`)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};