import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, IndianRupee, Heart } from "lucide-react";
import { Badge, Rating } from "@/components/ui";
import { formatINR } from "@/utils/format";

export function DestinationCard({ destination, index = 0 }) {
  const d = destination;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      className="group card card-hover overflow-hidden"
    >
      <Link to={`/destination/${d.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={d.image}
            alt={d.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <button
            onClick={(e) => e.preventDefault()}
            aria-label="Save to favorites"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-muted backdrop-blur transition hover:bg-white hover:text-rose-500"
          >
            <Heart className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-3">
            <Badge variant="primary" className="bg-white/90 backdrop-blur">
              {d.category}
            </Badge>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-base font-bold text-ink">
                {d.name}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
                <MapPin className="h-3 w-3" />
                {d.state}, {d.country}
              </p>
            </div>
            <Rating value={d.rating} />
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {d.tagline}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-4 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-sm">
              <IndianRupee className="h-3.5 w-3.5 text-ink-subtle" />
              <span className="font-semibold text-ink">{formatINR(d.budget)}</span>
              <span className="text-xs text-ink-subtle">/ person</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Clock className="h-3.5 w-3.5" />
              {d.duration} days
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}