import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FolderOpen, 
  Upload, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Image, 
  FileText, 
  Video, 
  Download,
  Eye,
  Edit,
  Trash2,
  Star
} from "lucide-react";

const assets = [
  {
    id: 1,
    name: "Spring Campaign Hero",
    type: "image",
    size: "2.4 MB",
    format: "JPG",
    dimensions: "1920x1080",
    created: "2024-03-10",
    tags: ["campaign", "hero", "spring"],
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    favorite: true
  },
  {
    id: 2,
    name: "Product Demo Video",
    type: "video",
    size: "45.2 MB",
    format: "MP4",
    duration: "2:30",
    created: "2024-03-08",
    tags: ["product", "demo", "video"],
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    favorite: false
  },
  {
    id: 3,
    name: "Brand Guidelines",
    type: "document",
    size: "1.8 MB",
    format: "PDF",
    pages: "24",
    created: "2024-03-05",
    tags: ["brand", "guidelines", "document"],
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    favorite: false
  },
  {
    id: 4,
    name: "Social Media Templates",
    type: "image",
    size: "3.1 MB",
    format: "PNG",
    dimensions: "1080x1080",
    created: "2024-03-03",
    tags: ["social", "template", "instagram"],
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    favorite: true
  },
  {
    id: 5,
    name: "Email Newsletter Copy",
    type: "document",
    size: "0.5 MB",
    format: "DOCX",
    words: "1,200",
    created: "2024-03-01",
    tags: ["email", "newsletter", "copy"],
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
    favorite: false
  },
  {
    id: 6,
    name: "Product Photography",
    type: "image",
    size: "4.2 MB",
    format: "RAW",
    dimensions: "4000x3000",
    created: "2024-02-28",
    tags: ["product", "photography", "high-res"],
    thumbnail: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=300&fit=crop",
    favorite: false
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "image": return Image;
    case "video": return Video;
    case "document": return FileText;
    default: return FileText;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "image": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    case "video": return "bg-red-500/20 text-red-500 border-red-500/30";
    case "document": return "bg-green-500/20 text-green-500 border-green-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};

const AssetHub = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <FolderOpen className="w-8 h-8 text-primary" />
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Asset Hub
            </h1>
          </div>
          <p className="text-muted-foreground">Manage your marketing assets and resources</p>
        </div>

        {/* Controls */}
        <Card className="p-4 mb-6 bg-gradient-glass backdrop-blur-xl border-border/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="image">Images</TabsTrigger>
                  <TabsTrigger value="video">Videos</TabsTrigger>
                  <TabsTrigger value="document">Docs</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              
              <div className="flex items-center border border-border/20 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </Card>

        {/* Assets Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAssets.map((asset) => {
              const TypeIcon = getTypeIcon(asset.type);
              return (
                <Card key={asset.id} className="group overflow-hidden bg-gradient-glass backdrop-blur-xl border-border/10 hover:shadow-glass transition-all duration-300">
                  <div className="relative">
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Button variant="secondary" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    {asset.favorite && (
                      <Star className="absolute top-2 right-2 w-5 h-5 text-yellow-400 fill-current" />
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm truncate flex-1">{asset.name}</h3>
                      <TypeIcon className="w-4 h-4 text-muted-foreground ml-2 shrink-0" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getTypeColor(asset.type)}>
                        {asset.format}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{asset.size}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {asset.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                      {asset.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{asset.tags.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground">{asset.created}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-gradient-glass backdrop-blur-xl border-border/10">
            <div className="divide-y divide-border/10">
              {filteredAssets.map((asset) => {
                const TypeIcon = getTypeIcon(asset.type);
                return (
                  <div key={asset.id} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <img
                          src={asset.thumbnail}
                          alt={asset.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium truncate">{asset.name}</h3>
                            {asset.favorite && (
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {asset.format}
                            </span>
                            <span>{asset.size}</span>
                            <span>{asset.created}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(asset.type)}>
                          {asset.type}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Stats Footer */}
        <Card className="mt-6 p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredAssets.length} assets shown</span>
            <span>Total storage: 57.2 MB used</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AssetHub;