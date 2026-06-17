"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

type FormState = {
  name: string;
  email: string;
  guests: string;
  attending: "yes" | "no";
  message: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  guests: "1",
  attending: "yes",
  message: "",
};

export default function Rsvp() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const update = (
    field: keyof FormState,
    value: string,
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <span className="font-medium text-sage-deep">November 1, 2026</span>.
          </p>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-2xl bg-cream p-10 text-center shadow-[0_10px_40px_rgba(90,84,76,0.06)]">
            <p className="font-script text-4xl text-sage-deep">Thank you!</p>
            <p className="mt-3 font-serif text-lg text-foreground">
              {form.attending === "yes"
                ? `We can't wait to celebrate with you, ${form.name || "friend"}!`
                : `We'll miss you, ${form.name || "friend"}, but thank you for letting us know.`}
            </p>
            <button
              onClick={() => {
                setForm(INITIAL);
                setSubmitted(false);
              }}
              className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-sage-deep underline-offset-4 hover:underline"
            >
              Submit another response
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-2xl bg-cream p-8 shadow-[0_10px_40px_rgba(90,84,76,0.06)] sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" htmlFor="name">
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email" htmlFor="email">
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Number of Guests" htmlFor="guests">
                <select
                  id="guests"
                  value={form.guests}
                  onChange={(e) => update("guests", e.target.value)}
                  className={inputClass}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Will you attend?" htmlFor="attending">
                <select
                  id="attending"
                  value={form.attending}
                  onChange={(e) => update("attending", e.target.value)}
                  className={inputClass}
                >
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
              </Field>
            </div>

            <Field label="Message (optional)" htmlFor="message" className="mt-5">
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Share your wishes or any dietary notes..."
              />
            </Field>

            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-sage-deep px-9 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-sage"
            >
              Send RSVP
            </button>
          </form>
        )}
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
