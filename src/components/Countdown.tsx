"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

export default function Countdown({
  date,
  tone = "dark",
}: {
  date: string;
  tone?: "dark" | "light";
}) {
  const target = new Date(date).getTime();
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hours", value: time?.hours ?? 0 },
    { label: "Mins", value: time?.minutes ?? 0 },
    { label: "Secs", value: time?.seconds ?? 0 },
  ];

  const isLight = tone === "light";

  return (
    <div className="flex items-start justify-center gap-4 sm:gap-8">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span
            className={`font-serif text-4xl font-semibold tabular-nums sm:text-5xl ${
              isLight
                ? "text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]"
                : "text-ink"
            }`}
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span
            className={`mt-1 text-xs uppercase tracking-[0.2em] ${
              isLight
                ? "text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
                : "text-muted"
            }`}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
