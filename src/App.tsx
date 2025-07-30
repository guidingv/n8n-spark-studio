import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrategyProvider } from "./contexts/StrategyContext";
import Index from "./pages/Index";
import ContentCalendar from "./pages/ContentCalendar";
import ContentPlanning from "./pages/ContentPlanning";
import StrategyPlanning from "./pages/StrategyPlanning";
import AssetHub from "./pages/AssetHub";
import CreateCampaign from "./pages/CreateCampaign";
import ContentEditor from "./pages/ContentEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StrategyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calendar" element={<ContentCalendar />} />
              <Route path="/planning" element={<ContentPlanning />} />
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
    </QueryClientProvider>
  );
}

export default App;
