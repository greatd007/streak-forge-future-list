
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainContent } from "@/components/MainContent";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white w-full">
      <SidebarProvider>
        <MainContent />
      </SidebarProvider>
    </div>
  );
};

export default Index;
