/**
 * Application-wide constants.
 * Keeping these in one place avoids magic strings drifting across the app.
 */

export const APP_NAME = import.meta.env.VITE_APP_NAME || "YatraVerse";

export const APP_TAGLINE = "Your Journey. Your Story. Your Yatra.";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

/** localStorage keys — namespaced to avoid collisions. */
export const STORAGE_KEYS = Object.freeze({
  ACCESS_TOKEN: "yatraverse.access_token",
  USER: "yatraverse.user",
  THEME: "yatraverse.theme",
});

/** Travel styles offered in the trip planner. */
export const TRAVEL_STYLES = [
  { value: "budget", label: "Budget", icon: "Wallet" },
  { value: "backpacker", label: "Backpacker", icon: "Backpack" },
  { value: "couple", label: "Couple", icon: "Heart" },
  { value: "family", label: "Family", icon: "Users" },
  { value: "luxury", label: "Luxury", icon: "Crown" },
  { value: "adventure", label: "Adventure", icon: "Mountain" },
];

/** Interests offered in the trip planner. */
export const INTERESTS = [
  "Food",
  "History",
  "Nature",
  "Shopping",
  "Adventure",
  "Photography",
  "Nightlife",
  "Culture",
];

/** Destination categories used on the Explore page. */
export const DESTINATION_CATEGORIES = [
  { value: "mountains", label: "Mountains", icon: "Mountain" },
  { value: "beaches", label: "Beaches", icon: "Waves" },
  { value: "historical", label: "Historical", icon: "Landmark" },
  { value: "adventure", label: "Adventure", icon: "Compass" },
  { value: "nature", label: "Nature", icon: "Trees" },
  { value: "religious", label: "Religious", icon: "Church" },
  { value: "romantic", label: "Romantic", icon: "Heart" },
  { value: "family", label: "Family", icon: "Users" },
  { value: "backpacking", label: "Backpacking", icon: "Backpack" },
  { value: "luxury", label: "Luxury", icon: "Crown" },
];

/** Sort options on the Explore page. */
export const SORT_OPTIONS = [
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const TRIP_STATUS = Object.freeze({
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed",
});