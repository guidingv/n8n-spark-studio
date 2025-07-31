import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProject, Project } from "@/contexts/ProjectContext";
import { Plus, Target, FileText, Calendar, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectSelector = () => {
  const { projects, currentProject, setCurrentProject, addProject } = useProject();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'campaign' as Project['type'],
    status: 'active' as Project['status'],
    deadline: ''
  });

  const handleCreateProject = () => {
    if (!newProject.name) return;
    
    addProject({
      name: newProject.name,
      description: newProject.description,
      type: newProject.type,
      status: newProject.status,
      deadline: newProject.deadline || undefined
    });

    setNewProject({ name: '', description: '', type: 'campaign', status: 'active', deadline: '' });
    setIsCreateDialogOpen(false);
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: Project['type']) => {
    switch (type) {
      case 'campaign': return Target;
      case 'content-series': return FileText;
      case 'brand-awareness': return Users;
      case 'product-launch': return Calendar;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Workspaces</h1>
            <p className="text-muted-foreground mt-2">Manage your content projects and collaborate with your team</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Workspace
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Enter project name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe your project"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Project Type</Label>
                  <Select value={newProject.type} onValueChange={(value: Project['type']) => setNewProject({ ...newProject, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="campaign">Marketing Campaign</SelectItem>
                      <SelectItem value="content-series">Content Series</SelectItem>
                      <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                      <SelectItem value="product-launch">Product Launch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="deadline">Deadline (Optional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateProject} className="flex-1">
                    Create Project
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search workspaces..." 
              className="pl-10 bg-card border-border/20"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const TypeIcon = getTypeIcon(project.type);
            const isCurrentProject = currentProject?.id === project.id;
            
            return (
              <Card 
                key={project.id} 
                className="bg-card border-border/20 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  setCurrentProject(project);
                }}
              >
                <CardContent className="p-6">
                  {/* Header with colored dot and title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                      <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Status and timestamp */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant={project.status === 'active' ? 'default' : 'secondary'} 
                      className={`text-xs capitalize ${
                        project.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/20' 
                          : project.status === 'paused'
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/20'
                      }`}
                    >
                      {project.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Updated {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* Bottom stats and open button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>4</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>12</span>
                      </div>
                    </div>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                      className="border-border/20 hover:bg-accent"
                    >
                      <Link to="/">Open</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 rounded-full bg-muted w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">Create your first content marketing project to get started</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSelector;