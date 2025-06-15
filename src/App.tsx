
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ProductionReports from "./pages/ProductionReports";
import Attendance from "./pages/Attendance";
import WorkHours from "./pages/WorkHours";
import HRIssues from "./pages/HRIssues";
import Profile from "./pages/Profile";
import Announcements from "./pages/Announcements";
import AnnouncementAdmin from "./pages/AnnouncementAdmin";
import UserRegistration from "./pages/UserRegistration";
import UserSettings from "./pages/UserSettings";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/production-reports" element={<ProductionReports />} />
            <Route path="/production-reports/*" element={<ProductionReports />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/work-hours" element={<WorkHours />} />
            <Route path="/hr-issues" element={<HRIssues />} />
            <Route path="/user-settings" element={<UserSettings />} />
            <Route path="/user-registration" element={<UserRegistration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/announcements/admin" element={<AnnouncementAdmin />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
