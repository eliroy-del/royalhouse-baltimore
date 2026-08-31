import {
  Accessibility,
  ArrowRight,
  Baby,
  BookOpen,
  Calendar,
  Car,
  Church,
  Clock,
  Compass,
  Gift,
  Globe,
  GraduationCap,
  HandHeart,
  Handshake,
  Heart,
  HeartHandshake,
  Home,
  MapPin,
  Megaphone,
  MessageCircle,
  Mic,
  Music,
  Play,
  Shirt,
  Sparkles,
  Sprout,
  Sunrise,
  UserPlus,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

const registry: Record<IconName, LucideIcon> = {
  "arrow-right": ArrowRight,
  accessibility: Accessibility,
  baby: Baby,
  "book-open": BookOpen,
  calendar: Calendar,
  car: Car,
  church: Church,
  clock: Clock,
  compass: Compass,
  gift: Gift,
  globe: Globe,
  "graduation-cap": GraduationCap,
  "hand-heart": HandHeart,
  "hands-praying": HeartHandshake,
  handshake: Handshake,
  heart: Heart,
  home: Home,
  "map-pin": MapPin,
  megaphone: Megaphone,
  "message-circle": MessageCircle,
  mic: Mic,
  music: Music,
  play: Play,
  shirt: Shirt,
  sparkles: Sparkles,
  sprout: Sprout,
  sunrise: Sunrise,
  "user-plus": UserPlus,
  users: Users,
  video: Video,
};

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

/** Resolves a serialisable icon name from content into a Lucide component. */
export function Icon({ name, className, strokeWidth = 1.5 }: IconProps) {
  const Component = registry[name] ?? Sparkles;
  return <Component aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
