import { EmptyState } from "@/components/ui";
import { Bot } from "lucide-react";

export default function AIPlanner() {
  return (
    <div className="container-app py-16">
      <h1 className="section-title">AI Trip Planner</h1>
      <p className="section-subtitle">
        Describe your trip and let AI generate a full day-wise itinerary.
      </p>
      <div className="mt-10">
        <EmptyState
          icon={Bot}
          title="AI planner arrives in Phase 8"
          description="Provider-agnostic service with an offline mock so it works without an API key."
        />
      </div>
    </div>
  );
}