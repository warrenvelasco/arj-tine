import Image from "next/image";
import Countdown from "@/components/Countdown";
import { WEDDING } from "@/lib/wedding";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream pt-24 pb-16"
    >
      <Image
        src="/images/1.png"
        alt=""
        width={660}
        height={620}
        priority
        className="pointer-events-none absolute -left-10 -top-6 w-44 select-none opacity-90 sm:w-72 lg:w-96"
      />
      <Image
        src="/images/2.png"
        alt=""
        width={330}
        height={530}
        className="pointer-events-none absolute -right-6 bottom-0 w-32 select-none opacity-90 sm:w-48 lg:w-64"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="font-script text-3xl text-sage-deep sm:text-4xl">
          We&apos;re getting married
        </p>

        <h1 className="mt-2 font-serif text-6xl font-medium tracking-wide text-ink sm:text-7xl lg:text-8xl">
          {"Arjay"} <span className="text-blue-dust">&amp;</span>{" "}
          {WEDDING.bride}
        </h1>

        <div className="mt-5 flex items-center gap-4 text-sm uppercase tracking-[0.22em] text-muted">
          <span className="h-px w-8 bg-sage/50" />
          <span>{WEDDING.dateLabel}</span>
          <span className="h-px w-8 bg-sage/50" />
        </div>

        <div className="relative mt-10">
          <div
            className="bg-cover bg-bottom bg-no-repeat flex h-56 w-56 items-center justify-center overflow-hidden rounded-full bg-gray-300 ring-8 ring-cream sm:h-72 sm:w-72 border-8 border-white shadow-xl"
            style={{
              backgroundImage: `url(/images/coups.jpg)`,
            }}
          ></div>
        </div>

        <div className="mt-10">
          <Countdown date={WEDDING.date} />
        </div>

        <a
          href="#rsvp"
          className="mt-10 rounded-full bg-sage-deep px-9 py-3 text-sm font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-sage"
        >
          RSVP Now
        </a>
      </div>
    </section>
  );
}
