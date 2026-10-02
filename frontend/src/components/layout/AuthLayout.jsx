import { Outlet, Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { APP_NAME } from "@/config/constants";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col p-6 sm:p-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-600 text-white">
            <Compass className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold text-ink">
            {APP_NAME}
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Right: visual */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-500 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div />
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-tight">
              Discover places.
              <br />
              Plan smarter.
              <br />
              Travel better.
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/80">
              Join thousands of travellers who plan their journeys with
              YatraVerse.
            </p>
          </div>
          <p className="text-xs text-white/60">© {new Date().getFullYear()} {APP_NAME}</p>
        </div>
      </div>
    </div>
  );
}