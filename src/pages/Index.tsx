
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MainContent } from "@/components/MainContent";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white w-full">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          <MainContent />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
