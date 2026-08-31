"use client";

import { useEffect, useState } from "react";
import { Badge, LiveDot } from "@/components/ui/Badge";
import type { ServiceTime, Weekday } from "@/types";

const WEEKDAYS: Weekday[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface Countdown {
  label: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Parses "10:00 AM" / "6:30 PM" into minutes from midnight. Returns null if unparseable. */
function minutesFromLabel(time: string): number | null {
  const match = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i.exec(time.trim());
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  if (hours > 23 || minutes > 59) return null;

  return hours * 60 + minutes;
}

function nextOccurrence(service: ServiceTime, from: Date): Date | null {
  const minutes = minutesFromLabel(service.time);
  if (minutes === null) return null;

  const targetDay = WEEKDAYS.indexOf(service.day);
  if (targetDay === -1) return null;

  const candidate = new Date(from);
  candidate.setHours(0, 0, 0, 0);
  candidate.setMinutes(minutes);

  let delta = (targetDay - candidate.getDay() + 7) % 7;
  if (delta === 0 && candidate.getTime() <= from.getTime()) delta = 7;
  candidate.setDate(candidate.getDate() + delta);

  return candidate;
}

function computeCountdown(services: ServiceTime[], now: Date): Countdown | null {
  const next = services
    .map((service) => ({ service, at: nextOccurrence(service, now) }))
    .filter((entry): entry is { service: ServiceTime; at: Date } => entry.at !== null)
    .sort((a, b) => a.at.getTime() - b.at.getTime())[0];

  if (!next) return null;

  const diff = Math.max(0, next.at.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    label: `${next.service.label || next.service.day} · ${next.service.time}`,
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

interface LiveStatusProps {
  isLiveNow: boolean;
  serviceTimes: ServiceTime[];
  /** Shown when there are no configured service times to count down to. */
  fallbackMessage: string;
}

/**
 * Live badge plus a countdown to the next gathering. The countdown mounts on the
 * client only, so the server render never disagrees with the browser clock.
 */
export function LiveStatus({ isLiveNow, serviceTimes, fallbackMessage }: LiveStatusProps) {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    if (serviceTimes.length === 0) return;

    let interval = 0;
    const tick = () => setCountdown(computeCountdown(serviceTimes, new Date()));
    // The first tick is deferred a frame so the clock is only read on the client.
    const frame = requestAnimationFrame(() => {
      tick();
      interval = window.setInterval(tick, 1000);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, [serviceTimes]);

  if (isLiveNow) {
    return (
      <div className="flex flex-col items-start gap-4">
        <Badge variant="live" size="md">
          <LiveDot />
          Live now
        </Badge>
        <p className="text-[1.0625rem] leading-relaxed text-white/75">
          We are on air right now. Come as you are. The stream is below.
        </p>
      </div>
    );
  }

  if (!countdown) {
    return (
      <div className="flex flex-col items-start gap-4">
        <Badge variant="outline-light" size="md">
          Next gathering
        </Badge>
        <p className="text-[1.0625rem] leading-relaxed text-white/75">{fallbackMessage}</p>
      </div>
    );
  }

  const units = [
    { value: countdown.days, label: countdown.days === 1 ? "day" : "days" },
    { value: countdown.hours, label: "hrs" },
    { value: countdown.minutes, label: "min" },
    { value: countdown.seconds, label: "sec" },
  ];

  return (
    <div className="flex flex-col items-start gap-5">
      <Badge variant="outline-light" size="md">
        Next service · {countdown.label}
      </Badge>
      <div
        role="timer"
        aria-live="off"
        className="flex items-end gap-3 sm:gap-5"
        aria-label={`Next service begins in ${countdown.days} days, ${countdown.hours} hours and ${countdown.minutes} minutes`}
      >
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <span className="font-display text-[clamp(2rem,5vw,2.375rem)] leading-none figures-lining text-white">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-2 eyebrow text-white/60">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
