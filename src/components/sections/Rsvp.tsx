"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

const FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf9SKUtZd6xX0B1P8kTBeVvzyemn3Bsu9ddsGGKvpAP_lYP2w/formResponse";

/**
 * Google Form field IDs. If a question is edited/re-created in Google Forms,
 * refresh its ID via the form's ⋮ menu > "Get pre-filled link".
 */
const ENTRY = {
  attending: "entry.877086558",
  guestCount: "entry.1498135098",
  guestNames: "entry.608616563", // "List all the Guest Names" (paragraph)
};

/** Must match the Google Form choice strings exactly (incl. spacing). */
const ATTENDING_CHOICES = {
  yes: "Yes,  I'll be there",
  no: "Sorry, can't make it",
} as const;

const GUEST_CHOICES = ["1", "2", "3", "4", "5"];

/** ?guest=N from the invite link; anything outside 1–5 falls back to 1. */
function sanitizeGuestCount(value: string | null) {
  const v = value?.trim() ?? "";
  return GUEST_CHOICES.includes(v) ? v : "1";
}

type Status = "idle" | "submitting" | "done" | "error";

function RsvpForm() {
  const searchParams = useSearchParams();
  const guestCount = sanitizeGuestCount(searchParams.get("guest"));
  const seats = Number(guestCount);

  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [names, setNames] = useState<string[]>(Array(5).fill(""));
  const [status, setStatus] = useState<Status>("idle");

  const nameFields = attending === "yes" ? seats : 1;

  const updateName = (index: number, value: string) =>
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const body = new URLSearchParams();
    body.set(ENTRY.attending, ATTENDING_CHOICES[attending]);
    body.set(ENTRY.guestCount, guestCount);
    const nameList = names
      .slice(0, nameFields)
      .map((n) => n.trim())
      .filter(Boolean)
      .join("\n");
    if (nameList) body.set(ENTRY.guestNames, nameList);

    try {
      // Google doesn't send CORS headers, so the response is opaque; reaching
      // the endpoint without a network error is our success signal.
      await fetch(FORM_RESPONSE_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="mt-8 rounded-2xl border border-sage/30 bg-cream p-10 text-center">
        <p className="font-serif text-2xl text-sage-deep">
          Thank you for your response!
        </p>
        <p className="mt-3 text-foreground">
          {attending === "yes"
            ? "We can't wait to celebrate with you."
            : "We'll miss you — thank you for letting us know."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl border border-sage/30 bg-cream p-6 shadow-sm sm:p-10"
    >
      <fieldset>
        <legend className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted">
          Can you attend?
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(["yes", "no"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setAttending(option)}
              aria-pressed={attending === option}
              className={`rounded-lg border px-4 py-3 text-sm transition-colors ${
                attending === option
                  ? "border-sage-deep bg-sage-deep text-cream"
                  : "border-sage/30 bg-cream text-foreground hover:border-sage-deep"
              }`}
            >
              {ATTENDING_CHOICES[option]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted">
          Number of Guests
        </span>
        <div className="flex items-center justify-between rounded-lg border border-sage/30 bg-cream-deep/60 px-4 py-3">
          <span className="text-foreground">
            {guestCount} {seats > 1 ? "guests" : "guest"}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Reserved seats on your invitation
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {Array.from({ length: nameFields }, (_, i) => (
          <Field
            key={i}
            label={i === 0 ? "Your Name" : `Guest Name ${i + 1}`}
            htmlFor={`guest-name-${i}`}
          >
            <input
              id={`guest-name-${i}`}
              type="text"
              required={i === 0}
              value={names[i]}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder={i === 0 ? "Full name" : "Full name (optional)"}
              className={inputClass}
            />
          </Field>
        ))}
      </div>

      {status === "error" && (
        <p className="mt-4 text-center text-sm text-red-700">
          Something went wrong sending your response. Please check your
          connection and try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 w-full rounded-full bg-sage-deep px-9 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-cream shadow-lg transition-colors hover:bg-sage disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}

export default function Rsvp() {
  return (
    <section id="rsvp" className="relative overflow-hidden bg-cream-deep py-24">
      <Image
        src="/images/shape4.png"
        alt=""
        width={330}
        height={520}
        className="pointer-events-none absolute -left-8 top-10 w-32 select-none opacity-80 sm:w-44"
      />
      <Image
        src="/images/2.png"
        alt=""
        width={330}
        height={530}
        className="pointer-events-none absolute -right-8 bottom-6 w-32 select-none opacity-80 sm:w-44"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-5 sm:px-8">
        <SectionTitle subtitle="Be Our Guest" title="Will You Attend?" />

        <div className="mx-auto mt-4 max-w-md text-center text-foreground">
          <p>
            We would be honored to have you celebrate with us. Kindly let us
            know by{" "}
            <span className="font-medium text-sage-deep">August 15, 2026</span>.
          </p>
        </div>

        <Suspense fallback={null}>
          <RsvpForm />
        </Suspense>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-lg border border-sage/30 bg-cream px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-sage-deep";

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
