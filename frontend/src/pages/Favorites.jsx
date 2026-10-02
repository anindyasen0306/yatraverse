import { EmptyState, Button } from "@/components/ui";
import { Heart } from "lucide-react";

export default function Favorites() {
  return (
    <div className="container-app py-16">
      <h1 className="section-title">Favorites</h1>
      <p className="section-subtitle">Destinations you've saved.</p>
      <div className="mt-10">
        <EmptyState
          icon={Heart}
          title="Favorites arrive in Phase 10"
          description="Save destinations and add them to trips from here."
          action={<Button variant="secondary">Coming soon</Button>}
        />
      </div>
    </div>
  );
}