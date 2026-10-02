import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-app grid min-h-[70vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-7xl font-extrabold text-primary-600">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">
          This path doesn't exist.
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          The page you're looking for may have moved, or never existed.
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          <Compass className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}