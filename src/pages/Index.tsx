import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICards } from "@/components/dashboard/KPICards";
import { ContentCalendar } from "@/components/dashboard/ContentCalendar";
import { ChatAgent } from "@/components/dashboard/ChatAgent";
import { ContentManager } from "@/components/dashboard/ContentManager";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-n8n-primary/5">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto">
        <KPICards />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-6 pb-6">
          <div className="xl:col-span-2 space-y-6">
            <ContentCalendar />
            <ContentManager />
          </div>
          
          <div className="xl:col-span-1">
            <ChatAgent />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
