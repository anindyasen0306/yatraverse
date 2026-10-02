import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { APP_NAME } from "@/config/constants";

export function Logo({ compact = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-600 text-white shadow-sm transition group-hover:scale-105">
        <Compass className="h-5 w-5" />
      </span>
      {!compact && (
        <span className="font-display text-lg font-extrabold tracking-tight text-ink">
          {APP_NAME}
        </span>
      )}
    </Link>
  );
}