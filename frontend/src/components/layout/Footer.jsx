import { Link } from "react-router-dom";
import { Compass, Github, Instagram, Twitter } from "lucide-react";
import { APP_NAME } from "@/config/constants";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Explore", to: "/explore" },
      { label: "Plan a Trip", to: "/plan" },
      { label: "AI Planner", to: "/ai-planner" },
      { label: "Budget Calculator", to: "/budget" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", to: "/login" },
      { label: "Register", to: "/register" },
      { label: "My Trips", to: "/trips" },
      { label: "Favorites", to: "/favorites" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-surface-border bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-app py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-600 text-white">
                <Compass className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-extrabold text-ink">
                {APP_NAME}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              Your journey, your story, your Yatra. Discover destinations,
              build itineraries, and let AI plan the rest.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-surface-border text-ink-muted transition hover:border-primary-300 hover:text-primary-600 dark:border-slate-800"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ink-muted transition hover:text-primary-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-surface-border pt-6 sm:flex-row dark:border-slate-800">
          <p className="text-xs text-ink-subtle">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-ink-subtle">Built with React · FastAPI · PostgreSQL</p>
        </div>
      </div>
    </footer>
  );
}