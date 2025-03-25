import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Dashboard from "@/pages/Dashboard";
import AuthPage from "@/pages/auth-page";
import Profile from "@/pages/Profile";
import Assessments from "@/pages/Assessments";
import CareerPaths from "@/pages/CareerPaths";
import SkillDevelopment from "@/pages/SkillDevelopment";
import NotFound from "@/pages/not-found";

// Components
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
      <Route path="/assessments" component={() => <ProtectedRoute component={Assessments} />} />
      <Route path="/career-paths" component={() => <ProtectedRoute component={CareerPaths} />} />
      <Route path="/skill-development" component={() => <ProtectedRoute component={SkillDevelopment} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;