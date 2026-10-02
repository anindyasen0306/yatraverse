import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Compass,
  MapPin,
  Search,
  Sparkles,
  Star,
  Ticket,
  Wallet,
} from "lucide-react";

import { Button, DestinationCardSkeleton } from "@/components/ui";
import { DestinationCard } from "@/components/destination/DestinationCard";
import { SearchBar } from "@/components/destination/SearchBar";
import { listFeatured, listTrending } from "@/services/destinationService";
import { DESTINATION_CATEGORIES, APP_TAGLINE } from "@/config/constants";

/* -------------------- Hero -------------------- */
function Hero({ onSearch }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://picsum.photos/seed/yatraverse-hero/1920/1080"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/60 to-primary-900/70" />
      </div>

      <div className="container-app py-24 sm:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="chip !border-white/20 !bg-white/10 !text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent-300" />
            AI-powered trip planning is here
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {APP_TAGLINE}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Discover destinations across India, build day-wise itineraries, and
            let our AI do the heavy lifting — so you can just pack and go.
          </p>

          <div className="mx-auto mt-9 max-w-xl">
            <SearchBar
              value=""
              onChange={onSearch}
              placeholder="Where do you want to go?"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/explore" className="btn-primary">
              <Compass className="h-4 w-4" />
              Explore Destinations
            </Link>
            <Link
              to="/plan"
              className="btn !border !border-white/20 !bg-white/10 !text-white backdrop-blur hover:!bg-white/20"
            >
              Plan a Trip
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- Section header -------------------- */
function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {eyebrow}
          </p>
        )}
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* -------------------- Sections -------------------- */
function FeaturedSection({ destinations, loading }) {
  return (
    <section className="container-app py-16 sm:py-20">
      <SectionHeader
        eyebrow="Handpicked"
        title="Featured destinations"
        subtitle="Highest-rated places our travellers can't stop talking about."
        action={
          <Link to="/explore" className="btn-ghost">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <DestinationCardSkeleton key={i} />)
          : destinations.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="container-app py-16 sm:py-20">
      <SectionHeader
        eyebrow="Browse by mood"
        title="Travel categories"
        subtitle="Whatever kind of trip you're dreaming of, there's a category for it."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {DESTINATION_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.value}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          >
            <Link
              to={`/explore?category=${cat.value}`}
              className="card card-hover flex flex-col items-center gap-3 p-5 text-center"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-ink">{cat.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Discover",
      body: "Search and filter destinations by budget, mood, season, and more.",
    },
    {
      icon: Ticket,
      title: "Plan",
      body: "Build day-wise itineraries with activities, timings, and costs.",
    },
    {
      icon: Bot,
      title: "Let AI assist",
      body: "Generate a full personalised trip in seconds — then tweak it.",
    },
    {
      icon: Wallet,
      title: "Track budget",
      body: "Estimate per-person cost and stay on top of your spend.",
    },
  ];

  return (
    <section className="container-app py-16 sm:py-20">
      <SectionHeader
        eyebrow="Simple by design"
        title="How YatraVerse works"
        subtitle="From inspiration to itinerary in four steps."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="card p-6"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-600 text-white">
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-5 font-display text-xs font-bold text-primary-600">
              STEP {i + 1}
            </p>
            <h3 className="mt-1 font-display text-base font-bold text-ink">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section className="container-app py-16 sm:py-20">
      <div className="card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600" />
        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          <div className="text-white">
            <span className="chip !border-white/20 !bg-white/10 !text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by AI
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Let AI plan your next trip in 30 seconds.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              Tell us your destination, dates, budget, and interests. Our AI
              builds a full day-wise itinerary with timings, activities, and
              estimated costs — editable and shareable.
            </p>
            <Link to="/ai-planner" className="btn mt-7 !bg-white !text-primary-700 hover:!bg-white/90">
              Try the AI Planner
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="card space-y-3 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary-600">
                <Bot className="h-4 w-4" /> Generating itinerary…
              </div>
              {["Day 1 · Arrival & local sightseeing", "Day 2 · Solang Valley adventure", "Day 3 · Old Manali & cafés"].map(
                (line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="rounded-xl border border-surface-border bg-surface-muted p-3 text-sm text-ink dark:border-slate-800 dark:bg-slate-900"
                  >
                    {line}
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendingSection({ destinations, loading }) {
  return (
    <section className="container-app py-16 sm:py-20">
      <SectionHeader
        eyebrow="Right now"
        title="Trending destinations"
        subtitle="Most-viewed destinations this week."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <DestinationCardSkeleton key={i} />)
          : destinations.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const items = [
    {
      name: "Priya Sharma",
      role: "Product Designer",
      quote:
        "Planned my entire Ladakh trip in one evening. The AI itinerary was shockingly good.",
    },
    {
      name: "Arjun Mehta",
      role: "Software Engineer",
      quote:
        "Finally a travel app that doesn't feel like a spreadsheet. Beautiful and fast.",
    },
    {
      name: "Neha Iyer",
      role: "Content Creator",
      quote:
        "The budget calculator alone saved me hours. Loved the clean UI.",
    },
  ];

  return (
    <section className="container-app py-16 sm:py-20">
      <SectionHeader
        eyebrow="Loved by travellers"
        title="What our users say"
        subtitle="Real feedback from people planning real trips."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card p-6"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-accent-400 text-accent-400" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink">“{t.quote}”</p>
            <div className="mt-5 flex items-center gap-3 border-t border-surface-border pt-4 dark:border-slate-800">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-100 font-semibold text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-ink-subtle">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="container-app py-16 sm:py-20">
      <div className="card bg-gradient-to-br from-accent-50 via-white to-primary-50 p-10 text-center sm:p-16 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Your next adventure is one click away.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted sm:text-base">
          Create a free account and start planning your dream trip today.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/register" className="btn-primary">
            Get started free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/explore" className="btn-secondary">
            Browse destinations
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Page -------------------- */
export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([listFeatured(6), listTrending(4)])
      .then(([f, t]) => {
        if (cancelled) return;
        setFeatured(f);
        setTrending(t);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Hero onSearch={(q) => (window.location.href = `/explore?q=${encodeURIComponent(q)}`)} />
      <FeaturedSection destinations={featured} loading={loading} />
      <CategoriesSection />
      <HowItWorksSection />
      <AISection />
      <TrendingSection destinations={trending} loading={loading} />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}