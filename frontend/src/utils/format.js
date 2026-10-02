/** INR currency formatter with no decimals (compact travel budget display). */
export function formatINR(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Short duration label: 5 → "5 days" */
export function formatDays(days) {
  if (!days) return "—";
  return `${days} ${days === 1 ? "day" : "days"}`;
}

/** Title-case a slug: "manali-valley" → "Manali Valley" */
export function titleCase(str = "") {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}