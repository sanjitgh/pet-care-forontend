import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Router/Router.jsx";
import AuthProvaider from "./provaider/AuthProvaider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvaider/ThemeProvaider.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvaider>
          <ThemeProvider>
            <RouterProvider router={Router}></RouterProvider>
          </ThemeProvider>
        </AuthProvaider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
