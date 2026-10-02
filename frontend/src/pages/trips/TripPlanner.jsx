import { EmptyState } from "@/components/ui";
import { Compass } from "lucide-react";

export default function TripPlanner() {
  return (
    <div className="container-app py-16">
      <h1 className="section-title">Plan a Trip</h1>
      <p className="section-subtitle">
        Enter destination, dates, budget, and interests to build an itinerary.
      </p>
      <div className="mt-10">
        <EmptyState
          icon={Compass}
          title="Trip planner arrives in Phase 7"
          description="This will host the multi-step form for destination, travel style, and interests."
        />
      </div>
    </div>
  );
}