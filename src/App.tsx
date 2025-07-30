import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { ProjectProvider } from "./contexts/ProjectContext";
import { StrategyProvider } from "./contexts/StrategyContext";
import Index from "./pages/Index";
import ContentCalendar from "./pages/ContentCalendar";
import ContentPlanning from "./pages/ContentPlanning";
import ContentBrief from "./pages/ContentBrief";
import StrategyPlanning from "./pages/StrategyPlanning";
import AssetHub from "./pages/AssetHub";
import CreateCampaign from "./pages/CreateCampaign";
import ContentEditor from "./pages/ContentEditor";
import ProjectSelector from "./components/ProjectSelector";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  console.log("App component rendering");
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <ProjectProvider>
          <StrategyProvider>
            <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<ProjectSelector />} />
              <Route path="/calendar" element={<ContentCalendar />} />
              <Route path="/planning" element={<ContentPlanning />} />
              <Route path="/planning/:id" element={<ContentBrief />} />
              <Route path="/strategy" element={<StrategyPlanning />} />
              <Route path="/assets" element={<AssetHub />} />
              <Route path="/create" element={<CreateCampaign />} />
              <Route path="/editor/:id?" element={<ContentEditor />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </StrategyProvider>
      </ProjectProvider>
    </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
