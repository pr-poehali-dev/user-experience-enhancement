
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { SiteHeader } from "./components/SiteHeader";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Index from "./pages/Index";

const Catalog = lazy(() => import("./pages/Catalog"));
const Contacts = lazy(() => import("./pages/Contacts"));
const About = lazy(() => import("./pages/About"));
const Delivery = lazy(() => import("./pages/Delivery"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Favorites = lazy(() => import("./pages/Favorites"));
const PopularAll = lazy(() => import("./pages/PopularAll"));
const Order = lazy(() => import("./pages/Order"));
const CatalogSub = lazy(() => import("./pages/CatalogSub"));
const CompositionDetail = lazy(() => import("./pages/CompositionDetail"));
const AdminPrices = lazy(() => import("./pages/AdminPrices"));
const AdminBallPrices = lazy(() => import("./pages/AdminBallPrices"));

const queryClient = new QueryClient();

function PageFallback() {
  return (
    <div style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 40 }}>🎈</div>
    </div>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FavoritesProvider>
        <BrowserRouter>
          <SiteHeader />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/about" element={<About />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/popular" element={<PopularAll />} />
              <Route path="/order" element={<Order />} />
              <Route path="/catalog/:sub" element={<CatalogSub />} />
              <Route path="/composition" element={<CompositionDetail />} />
              <Route path="/admin-prices" element={<AdminPrices />} />
              <Route path="/admin-ball-prices" element={<AdminBallPrices />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        </FavoritesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
