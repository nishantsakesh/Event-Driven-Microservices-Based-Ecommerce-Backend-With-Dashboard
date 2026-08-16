import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  const num = parseFloat(price);
  if (isNaN(num)) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(num);
}

export function formatDate(dateInput) {
  if (!dateInput) return "—";
  let date;
  if (Array.isArray(dateInput)) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateInput;
    date = new Date(year, month - 1, day, hour, minute, second);
  } else {
    date = new Date(dateInput);
  }
  if (isNaN(date.getTime())) return "Invalid Date";
  
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str, len = 80) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "…" : str;
}
