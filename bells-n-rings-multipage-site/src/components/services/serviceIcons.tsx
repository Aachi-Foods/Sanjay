import {
  ClipboardList,
  MapPinned,
  Palette,
  Camera,
  UtensilsCrossed,
  Music4,
  Users,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { ServiceSlug } from "@/lib/content";

export const SERVICE_ICONS: Record<ServiceSlug, LucideIcon> = {
  "event-planning": ClipboardList,
  "venue-selection": MapPinned,
  "decoration-design": Palette,
  "photography-videography": Camera,
  "catering-beverages": UtensilsCrossed,
  entertainment: Music4,
  "guest-management": Users,
  "logistics-support": Truck,
};
