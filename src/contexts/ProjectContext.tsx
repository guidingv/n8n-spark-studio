import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  type: 'campaign' | 'content-series' | 'brand-awareness' | 'product-launch';
  createdAt: string;
  deadline?: string;
  progress: number;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'progress'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const defaultProjects: Project[] = [
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
];

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [currentProject, setCurrentProject] = useState<Project | null>(() => {
    const saved = localStorage.getItem('currentProject');
    if (saved) {
      const projectId = saved;
      return projects.find(p => p.id === projectId) || projects[0] || null;
    }
    return projects[0] || null;
  });

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Save current project to localStorage whenever it changes
  useEffect(() => {
    if (currentProject) {
      localStorage.setItem('currentProject', currentProject.id);
    } else {
      localStorage.removeItem('currentProject');
    }
  }, [currentProject]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'progress'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      progress: 0
    };
    setProjects(prev => [newProject, ...prev]);
    setCurrentProject(newProject);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
    
    // Update current project if it's the one being updated
    if (currentProject?.id === id) {
      setCurrentProject(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    
    // If deleting current project, switch to another one
    if (currentProject?.id === id) {
      const remainingProjects = projects.filter(p => p.id !== id);
      setCurrentProject(remainingProjects[0] || null);
    }
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      setCurrentProject,
      addProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}