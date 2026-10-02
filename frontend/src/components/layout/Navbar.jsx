import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Plane, User, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/explore", label: "Explore" },
  { to: "/plan", label: "Plan a Trip" },
  { to: "/ai-planner", label: "AI Planner" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close the mobile drawer on route change.
  useEffect(() => setOpen(false), [location.pathname]);

  // Add elevation once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md transition-shadow dark:bg-slate-950/80",
        scrolled
          ? "border-surface-border shadow-soft dark:border-slate-800"
          : "border-transparent"
      )}
    >
      <div className="container-app flex h-[var(--navbar-height)] items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-3.5 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300"
                    : "text-ink-muted hover:bg-slate-100 hover:text-ink dark:hover:bg-slate-800"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Link
            to="/favorites"
            aria-label="Favorites"
            className="hidden h-9 w-9 place-items-center rounded-xl text-ink-muted transition hover:bg-slate-100 hover:text-ink sm:grid dark:hover:bg-slate-800"
          >
            <Heart className="h-4.5 w-4.5" />
          </Link>

          <Link
            to="/login"
            className="btn-secondary hidden md:inline-flex !px-4 !py-2 text-xs"
          >
            <User className="h-3.5 w-3.5" />
            Sign in
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-xl text-ink-muted transition hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-surface-border bg-white md:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <nav className="container-app flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300"
                        : "text-ink-muted hover:bg-slate-100 dark:hover:bg-slate-800"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-surface-border pt-3 dark:border-slate-800">
                <Link to="/favorites" className="btn-ghost !justify-start">
                  <Heart className="h-4 w-4" /> Favorites
                </Link>
                <Link to="/login" className="btn-primary">
                  <Plane className="h-4 w-4" /> Sign in
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}