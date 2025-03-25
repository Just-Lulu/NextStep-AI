import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Assessments from "@/pages/Assessments";
import CareerPaths from "@/pages/CareerPaths";
import SkillDevelopment from "@/pages/SkillDevelopment";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/assessments" component={Assessments} />
      <Route path="/career-paths" component={CareerPaths} />
      <Route path="/skill-development" component={SkillDevelopment} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
