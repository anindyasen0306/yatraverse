import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Compass, Search } from "lucide-react";

import { Button, DestinationCardSkeleton, EmptyState, Modal } from "@/components/ui";
import { DestinationCard } from "@/components/destination/DestinationCard";
import { SearchBar } from "@/components/destination/SearchBar";
import { FilterPanel, MobileFilterBar } from "@/components/destination/FilterPanel";
import { CategoryPills } from "@/components/destination/CategoryPills";
import { useDebounce } from "@/hooks/useDebounce";
import { listDestinations } from "@/services/destinationService";

const DEFAULT_FILTERS = {
  category: "all",
  duration: "all",
  budgetMax: null,
  minRating: 0,
  sort: "popularity",
};

export default function Explore() {
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get("q") || "");
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    category: params.get("category") || "all",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  // Sync category pill + URL
  useEffect(() => {
    const next = new URLSearchParams(params);
    if (filters.category === "all") next.delete("category");
    else next.set("category", filters.category);
    if (debouncedSearch) next.set("q", debouncedSearch);
    else next.delete("q");
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, debouncedSearch]);

  // Fetch on filter change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listDestinations({ ...filters, search: debouncedSearch })
      .then((r) => !cancelled && setResults(r))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [filters, debouncedSearch]);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filters.category !== "all") n++;
    if (filters.duration !== "all") n++;
    if (filters.budgetMax != null) n++;
    if (filters.minRating > 0) n++;
    return n;
  }, [filters]);

  return (
    <>
      {/* Header */}
      <section className="border-b border-surface-border bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="container-app py-10 sm:py-14">
          <h1 className="section-title">Explore destinations</h1>
          <p className="section-subtitle">
            {results.length} destination{results.length !== 1 && "s"} match your search.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBar
              value={search}
              onChange={setSearch}
              className="flex-1"
              placeholder="Search by name, state, or vibe…"
            />
            <MobileFilterBar
              activeCount={activeFilterCount}
              onOpen={() => setMobileFiltersOpen(true)}
            />
          </div>

          <div className="mt-6">
            <CategoryPills
              active={filters.category}
              onChange={(v) => setFilters((f) => ({ ...f, category: v }))}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-app py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop filters */}
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            className="hidden h-fit lg:block"
          />

          {/* Results */}
          <div>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <DestinationCardSkeleton key={i} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <EmptyState
                icon={Compass}
                title="No destinations found"
                description="Try adjusting your filters or search term — or reset them to see everything."
                action={
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSearch("");
                      setFilters(DEFAULT_FILTERS);
                    }}
                  >
                    Reset all filters
                  </Button>
                }
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((d, i) => (
                  <DestinationCard key={d.id} destination={d} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter modal */}
      <Modal
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filters"
      >
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
          className="!border-0 !p-0 !shadow-none"
        />
        <div className="mt-6 flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => {
              setSearch("");
              setFilters(DEFAULT_FILTERS);
            }}
          >
            Reset
          </Button>
          <Button className="flex-1" onClick={() => setMobileFiltersOpen(false)}>
            Apply
          </Button>
        </div>
      </Modal>
    </>
  );
}