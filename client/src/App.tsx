import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Assessments from "@/pages/Assessments";
import CareerPaths from "@/pages/CareerPaths";
import SkillDevelopment from "@/pages/SkillDevelopment";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/assessments" component={Assessments} />
      <ProtectedRoute path="/career-paths" component={CareerPaths} />
      <ProtectedRoute path="/skill-development" component={SkillDevelopment} />
      <Route path="/auth" component={AuthPage} />
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
