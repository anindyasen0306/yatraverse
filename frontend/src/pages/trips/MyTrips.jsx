import { EmptyState, Button } from "@/components/ui";
import { Plane } from "lucide-react";

export default function MyTrips() {
  return (
    <div className="container-app py-16">
      <h1 className="section-title">My Trips</h1>
      <p className="section-subtitle">Manage upcoming and past trips.</p>
      <div className="mt-10">
        <EmptyState
          icon={Plane}
          title="Trip management arrives in Phase 7"
          description="Create, edit, duplicate and delete trips — with a day-wise itinerary timeline."
          action={<Button variant="secondary">Coming soon</Button>}
        />
      </div>
    </div>
  );
}