import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoadingSpinner } from "@/components/ui";

/* ---------- Lazy-loaded pages ---------- */
const Home = lazy(() => import("@/pages/Home"));
const Explore = lazy(() => import("@/pages/Explore"));
const DestinationDetails = lazy(() => import("@/pages/DestinationDetails"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));

const MyTrips = lazy(() => import("@/pages/trips/MyTrips"));
const TripPlanner = lazy(() => import("@/pages/trips/TripPlanner"));
const AIPlanner = lazy(() => import("@/pages/trips/AIPlanner"));

const Favorites = lazy(() => import("@/pages/Favorites"));
const Profile = lazy(() => import("@/pages/Profile"));
const BudgetCalculator = lazy(() => import("@/pages/BudgetCalculator"));

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <LoadingSpinner size="lg" label="Loading…" />
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ---------- Auth ---------- */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ---------- Main ---------- */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:slug" element={<DestinationDetails />} />
          <Route path="/plan" element={<TripPlanner />} />
          <Route path="/ai-planner" element={<AIPlanner />} />
          <Route path="/budget" element={<BudgetCalculator />} />

          {/* Protected */}
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <MyTrips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}