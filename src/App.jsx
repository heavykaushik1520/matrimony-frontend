import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Matches from "./pages/Matches";
import ProfileDetails from "./pages/ProfileDetails";
import MyProfile from "./pages/MyProfile";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AppLayout from "@/components/AppLayout";
import { AppProvider } from "@/contexts/AppContext";
import React from "react";
import { useAppContext } from "@/contexts/AppContext";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  if (!isAuthenticated) {
    return <Index />;
  }
  return children;
};

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <AppLayout />
      </AppProvider>
    ),
    children: [
      { index: true, element: <Index /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "matches", element: (
        <RequireAuth>
          <Matches />
        </RequireAuth>
      ) },
      { path: "profiles/:id", element: (
        <RequireAuth>
          <ProfileDetails />
        </RequireAuth>
      ) },
      { path: "me", element: (
        <RequireAuth>
          <MyProfile />
        </RequireAuth>
      ) },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;


