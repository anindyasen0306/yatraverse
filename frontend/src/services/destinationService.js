/**
 * Destination service.
 *
 * Phase 2: reads from local mock data so the UI is fully functional.
 * Phase 6: switch the implementations below to `client.get(...)` — the
 * component API stays identical.
 */

import { DESTINATIONS, findDestinationBySlug } from "@/data/destinations";

const simulateDelay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export async function listDestinations({
  search = "",
  category = "all",
  country = "all",
  budgetMax = null,
  minRating = 0,
  duration = "all",
  sort = "popularity",
} = {}) {
  await simulateDelay();

  let results = [...DESTINATIONS];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q)
    );
  }

  if (category !== "all") {
    results = results.filter((d) => d.category === category);
  }

  if (country !== "all") {
    results = results.filter((d) => d.country === country);
  }

  if (budgetMax != null) {
    results = results.filter((d) => d.budget <= budgetMax);
  }

  if (minRating > 0) {
    results = results.filter((d) => d.rating >= minRating);
  }

  if (duration !== "all") {
    const [min, max] = duration.split("-").map(Number);
    results = results.filter((d) => d.duration >= min && d.duration <= max);
  }

  switch (sort) {
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "price-asc":
      results.sort((a, b) => a.budget - b.budget);
      break;
    case "price-desc":
      results.sort((a, b) => b.budget - a.budget);
      break;
    default:
      results.sort((a, b) => b.reviews - a.reviews);
  }

  return results;
}

export async function getDestination(slug) {
  await simulateDelay(150);
  const dest = findDestinationBySlug(slug);
  if (!dest) throw new Error("Destination not found");
  return dest;
}

export async function listFeatured(limit = 6) {
  await simulateDelay(150);
  return [...DESTINATIONS].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export async function listTrending(limit = 4) {
  await simulateDelay(150);
  return [...DESTINATIONS].sort((a, b) => b.reviews - a.reviews).slice(0, limit);
}