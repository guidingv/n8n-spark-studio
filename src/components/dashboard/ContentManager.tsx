import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, RefreshCw, Download, Eye } from "lucide-react";
import { useState } from "react";

const contentAssets = [
  {
    id: 1,
    title: "Spring Campaign Hero Image",
    type: "image",
    source: "DB Query: Image Generator",
    status: "ready",
    lastSync: "5 minutes ago",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Product Description Copy",
    type: "text",
    source: "DB Query: Content Writer",
    status: "processing",
    lastSync: "12 minutes ago",
    preview: "Discover our latest innovation that transforms the way you work. With cutting-edge technology and intuitive design..."
  },
  {
    id: 3,
    title: "Social Media Templates",
    type: "image",
    source: "DB Query: Template Generator",
    status: "ready",
    lastSync: "1 hour ago",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Email Newsletter Content",
    type: "text",
    source: "DB Query: Newsletter AI",
    status: "ready",
    lastSync: "2 hours ago",
    preview: "This week in tech: Breakthrough innovations that are reshaping industries and creating new opportunities..."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "ready": return "bg-green-500/20 text-green-500 border-green-500/30";
    case "processing": return "bg-n8n-accent/20 text-n8n-accent border-n8n-accent/30";
    case "error": return "bg-red-500/20 text-red-500 border-red-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

export const ContentManager = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-n8n-secondary" />
          <h2 className="text-xl font-semibold text-foreground">Content Manager</h2>
          <Badge className="bg-n8n-primary/20 text-n8n-primary border-n8n-primary/30">
            Database Connected
          </Badge>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          className="border-border/30 hover:bg-white/5"
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Sync Database
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contentAssets.map((asset) => (
          <div key={asset.id} className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-border/20 rounded-xl p-4 hover:shadow-glass transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{asset.title}</h3>
                <p className="text-sm text-n8n-secondary mb-2">{asset.source}</p>
                <p className="text-xs text-muted-foreground">Last sync: {asset.lastSync}</p>
              </div>
              <Badge className={getStatusColor(asset.status)}>
                {asset.status}
              </Badge>
            </div>

            {asset.type === "image" && asset.thumbnail && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={asset.thumbnail} 
                  alt={asset.title}
                  className="w-full h-32 object-cover"
                />
              </div>
            )}

            {asset.type === "text" && asset.preview && (
              <div className="mb-4 p-3 bg-black/20 rounded-lg border border-border/10">
                <p className="text-sm text-foreground line-clamp-3">{asset.preview}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" size="sm" className="border-border/30 hover:bg-white/5 flex-1">
                <Eye className="w-3 h-3 sm:mr-2" />
                <span className="hidden sm:inline">Preview</span>
              </Button>
              <Button variant="outline" size="sm" className="border-border/30 hover:bg-white/5 flex-1">
                <Download className="w-3 h-3 sm:mr-2" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-n8n-primary/10 to-n8n-secondary/10 border border-n8n-primary/20 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground mb-1">Database Integration Status</h4>
            <p className="text-sm text-muted-foreground">4 active queries • Last sync: 3 minutes ago</p>
          </div>
          <Button variant="outline" size="sm" className="border-n8n-primary/30 hover:bg-n8n-primary/5">
            Configure Database
          </Button>
        </div>
      </div>
    </Card>
  );
};