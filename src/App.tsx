
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = lazy(() => import("./pages/Index"));
const ChineseIndex = lazy(() => import("./pages/ChineseIndex"));
const DepartmentPage = lazy(() => import("./pages/DepartmentPage"));
const DocumentPage = lazy(() => import("./pages/DocumentPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ChineseIndex />} />
              <Route path="/en" element={<Index />} />
              <Route path="/departments/:deptId" element={<DepartmentPage />} />
              <Route path="/documents/:docId" element={<DocumentPage />} />
              <Route path="/projects/:projectId" element={<DocumentPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
