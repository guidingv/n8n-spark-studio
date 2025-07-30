import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Target, FileText, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  type: 'campaign' | 'content-series' | 'brand-awareness' | 'product-launch';
  createdAt: string;
  deadline?: string;
  progress: number;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Q1 Product Launch Campaign',
      description: 'Comprehensive marketing campaign for our new AI-powered analytics tool',
      status: 'active',
      type: 'product-launch',
      createdAt: '2024-01-15',
      deadline: '2024-03-31',
      progress: 65
    },
    {
      id: '2',
      name: 'Weekly Tech Insights Series',
      description: 'Educational content series covering industry trends and best practices',
      status: 'active',
      type: 'content-series',
      createdAt: '2024-01-08',
      progress: 40
    },
    {
      id: '3',
      name: 'Brand Awareness Campaign',
      description: 'Multi-channel campaign to increase brand recognition in the enterprise market',
      status: 'paused',
      type: 'brand-awareness',
      createdAt: '2023-12-20',
      deadline: '2024-06-30',
      progress: 25
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'campaign' as Project['type'],
    deadline: ''
  });

  const handleCreateProject = () => {
    if (!newProject.name) return;
    
    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      status: 'active',
      type: newProject.type,
      createdAt: new Date().toISOString().split('T')[0],
      deadline: newProject.deadline || undefined,
      progress: 0
    };

    setProjects([project, ...projects]);
    setNewProject({ name: '', description: '', type: 'campaign', deadline: '' });
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
      case 'brand-awareness': return Target;
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
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-2">Manage your content marketing projects</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Project
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

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const TypeIcon = getTypeIcon(project.type);
            return (
              <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-6">{project.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs capitalize">
                            {project.type.replace('-', ' ')}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                            <span className="text-xs text-muted-foreground capitalize">{project.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Created</span>
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    {project.deadline && (
                      <div className="flex justify-between">
                        <span>Deadline</span>
                        <span>{new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/planning`}>View Details</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link to={`/editor`}>Create Content</Link>
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

export default Projects;