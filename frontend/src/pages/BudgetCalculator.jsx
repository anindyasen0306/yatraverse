import { EmptyState } from "@/components/ui";
import { Wallet } from "lucide-react";

export default function BudgetCalculator() {
  return (
    <div className="container-app py-16">
      <h1 className="section-title">Budget Calculator</h1>
      <p className="section-subtitle">
        Estimate total, per-person, and daily costs for your trip.
      </p>
      <div className="mt-10">
        <EmptyState
          icon={Wallet}
          title="Budget calculator arrives in Phase 11"
          description="Interactive inputs with charts for transportation, stay, food, and more."
        />
      </div>
    </div>
  );
}