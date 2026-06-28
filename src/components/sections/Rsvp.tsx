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

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

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
            <span className="font-medium text-sage-deep">August 15, 2026</span>.
          </p>
        </div>
        {/* overflow-hidden clips the iframe's internal scrollbar, which we push
            off the right edge by making the iframe wider than its container */}
        <div className="mt-8 w-full overflow-hidden">
          <iframe
            title="RSVP form"
            className="block w-[calc(100%+22px)] sm:mx-auto sm:w-[662px] max-sm:relative max-sm:-left-2"
            src="https://docs.google.com/forms/d/e/1FAIpQLSf9SKUtZd6xX0B1P8kTBeVvzyemn3Bsu9ddsGGKvpAP_lYP2w/viewform?embedded=true"
            width="640"
            height="1200"
          >
            Loading…
          </iframe>
        </div>
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
