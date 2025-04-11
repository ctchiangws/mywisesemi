
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import ChineseIndex from "./pages/ChineseIndex";
import DepartmentPage from "./pages/DepartmentPage";
import DocumentPage from "./pages/DocumentPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Home route component that redirects based on language
const HomeRoute = () => {
  const { language } = useLanguage();
  return language === 'zh' ? <ChineseIndex /> : <Index />;
};

const App = () => (
  <BrowserRouter>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/departments/:deptId" element={<DepartmentPage />} />
            <Route path="/documents/:docId" element={<DocumentPage />} />
            <Route path="/projects/:projectId" element={<DepartmentPage />} />
            <Route path="/projects/iso/:docId" element={<DocumentPage />} />
            <Route path="/tools/:toolId" element={<DocumentPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
