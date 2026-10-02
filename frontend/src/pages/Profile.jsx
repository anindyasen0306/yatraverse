import { EmptyState } from "@/components/ui";
import { User } from "lucide-react";

export default function Profile() {
  return (
    <div className="container-app py-16">
      <h1 className="section-title">Profile</h1>
      <p className="section-subtitle">Manage your travel preferences and account.</p>
      <div className="mt-10">
        <EmptyState
          icon={User}
          title="Profile arrives in Phase 10"
          description="Edit name, photo, preferences, and view trip stats."
        />
      </div>
    </div>
  );
}