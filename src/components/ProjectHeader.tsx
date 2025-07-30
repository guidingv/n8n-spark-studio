import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useProject } from "@/contexts/ProjectContext";
import { Target, FileText, Calendar, Users, Settings, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function ProjectHeader() {
  const { currentProject } = useProject();

  if (!currentProject) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign': return Target;
      case 'content-series': return FileText;
      case 'brand-awareness': return Users;
      case 'product-launch': return Calendar;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const TypeIcon = getTypeIcon(currentProject.type);

  return (
    <Card className="border-b rounded-none bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link to="/projects">
                <ArrowLeft className="h-4 w-4" />
                All Projects
              </Link>
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <TypeIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{currentProject.name}</h2>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs capitalize ${getStatusColor(currentProject.status)}`}
                  >
                    {currentProject.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {currentProject.type.replace('-', ' ')}
                  </span>
                  {currentProject.deadline && (
                    <span className="text-xs text-muted-foreground">
                      • Due {new Date(currentProject.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}