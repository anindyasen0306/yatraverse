import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Cloud,
  Heart,
  IndianRupee,
  MapPin,
  Plus,
  Share2,
  Star,
} from "lucide-react";

import { Badge, Button, EmptyState, LoadingSpinner, Rating } from "@/components/ui";
import { DestinationCard } from "@/components/destination/DestinationCard";
import { getDestination, listDestinations } from "@/services/destinationService";
import { formatINR } from "@/utils/format";

export default function DestinationDetails() {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getDestination(slug)
      .then((d) => {
        if (cancelled) return;
        setDestination(d);
        return listDestinations({});
      })
      .then((all) => {
        if (cancelled || !all) return;
        setNearby(
          all.filter((d) => d.slug !== slug && d.category === destination?.category).slice(0, 3)
        );
      })
      .catch((e) => !cancelled && setError(e.message || "Failed to load"))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <LoadingSpinner size="lg" label="Loading destination…" />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="container-app py-20">
        <EmptyState
          icon={MapPin}
          title="Destination not found"
          description="We couldn't find this destination. It may have been moved."
          action={
            <Link to="/explore" className="btn-primary">
              Back to Explore
            </Link>
          }
        />
      </div>
    );
  }

  const d = destination;
  const gallery = [d.image, ...(d.gallery || [])];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={gallery[activeImage]} alt={d.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20" />
        </div>

        <div className="container-app py-20 sm:py-28">
          <Link
            to="/explore"
            className="chip !border-white/20 !bg-white/10 !text-white backdrop-blur"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Explore
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 max-w-3xl text-white"
          >
            <Badge variant="primary" className="!bg-white/15 !text-white backdrop-blur">
              {d.category}
            </Badge>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">{d.name}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-white/80">
              <MapPin className="h-4 w-4" />
              {d.state}, {d.country}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/90">
              <Rating value={d.rating} count={d.reviews} />
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {d.duration} days
              </span>
              <span className="flex items-center gap-1.5">
                <IndianRupee className="h-4 w-4" /> From {formatINR(d.budget)}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {d.bestTime}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                onClick={() => alert("Phase 7: Add to trip")}
                className="!bg-white !text-primary-700 hover:!bg-white/90"
              >
                <Plus className="h-4 w-4" /> Add to trip
              </Button>
              <button className="btn !border !border-white/20 !bg-white/10 !text-white backdrop-blur hover:!bg-white/20">
                <Heart className="h-4 w-4" /> Save
              </button>
              <button className="btn !border !border-white/20 !bg-white/10 !text-white backdrop-blur hover:!bg-white/20">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Thumbnails */}
      <section className="container-app -mt-10 relative z-10">
        <div className="card flex gap-3 overflow-x-auto p-3">
          {gallery.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                activeImage === i ? "border-primary-600" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="container-app py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            {/* About */}
            <div className="card p-7">
              <h2 className="font-display text-xl font-bold text-ink">About {d.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{d.description}</p>
            </div>

            {/* Attractions */}
            <div className="card mt-6 p-7">
              <h2 className="font-display text-xl font-bold text-ink">Popular attractions</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {d.attractions.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-3 rounded-xl border border-surface-border p-3 dark:border-slate-800"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
                      <Star className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-ink">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Things to do */}
            <div className="card mt-6 p-7">
              <h2 className="font-display text-xl font-bold text-ink">Things to do</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.activities.map((a) => (
                  <span key={a} className="chip">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display text-base font-bold text-ink">Quick facts</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Row icon={Calendar} label="Best time" value={d.bestTime} />
                <Row icon={Clock} label="Recommended" value={`${d.duration} days`} />
                <Row icon={IndianRupee} label="Avg. budget" value={formatINR(d.budget)} />
                <Row icon={MapPin} label="Region" value={`${d.state}, ${d.country}`} />
              </dl>
            </div>

            <div className="card p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-ink">
                <Cloud className="h-4 w-4" /> Weather
              </h3>
              <p className="mt-2 text-xs text-ink-subtle">
                Live weather arrives in Phase 9. Showing placeholder.
              </p>
              <div className="mt-4 rounded-xl bg-surface-muted p-4 dark:bg-slate-900">
                <p className="font-display text-2xl font-bold text-ink">22°C</p>
                <p className="text-xs text-ink-muted">Partly cloudy · Feels like 21°C</p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-display text-base font-bold text-ink">Travel tips</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>• Carry layered clothing — evenings get cold.</li>
                <li>• Book stays 2–3 weeks ahead in peak season.</li>
                <li>• Cash is handy for local markets and taxis.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Nearby */}
      {nearby.length > 0 && (
        <section className="container-app pb-20">
          <h2 className="section-title">You might also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((nd, i) => (
              <DestinationCard key={nd.id} destination={nd} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="flex items-center gap-2 text-ink-muted">
        <Icon className="h-4 w-4" />
        {label}
      </dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}