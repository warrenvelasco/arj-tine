import Image from "next/image";
import Countdown from "@/components/Countdown";
import VideoBackground from "@/components/VideoBackground";
import { WEDDING } from "@/lib/wedding";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-black pt-24 pb-16"
    >
      <VideoBackground />

      <Image
        src="/images/gold1.png"
        alt=""
        width={660}
        height={620}
        priority
        className="pointer-events-none absolute -left-10 -top-6 z-10 w-44 select-none opacity-80 mix-blend-screen sm:w-72 lg:w-96"
      />
      <Image
        src="/images/gold2.png"
        alt=""
        width={330}
        height={530}
        className="pointer-events-none absolute -right-6 bottom-0 z-10 w-32 select-none opacity-80 mix-blend-screen sm:w-48 lg:w-64"
      />

      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <p className="font-script text-3xl text-cream [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] sm:text-4xl">
          We&apos;re getting married
        </p>

        <h1 className="mt-2 font-serif text-6xl font-medium tracking-wide text-white [text-shadow:0_3px_18px_rgba(0,0,0,0.6)] sm:text-7xl lg:text-8xl">
          {"Arj"} <span className="text-blue-dust">&amp;</span> {WEDDING.bride}
        </h1>

        <div className="mt-5 flex items-center gap-4 text-sm uppercase tracking-[0.22em] text-cream/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          <span className="h-px w-8 bg-cream/50" />
          <span>{WEDDING.dateLabel}</span>
          <span className="h-px w-8 bg-cream/50" />
        </div>

        <div className="relative mt-10">
          <div
            className="bg-cover bg-top bg-no-repeat flex h-60 w-72 items-center justify-center overflow-hidden rounded-2xl bg-gray-300 ring-8 ring-white/20 sm:h-80 sm:w-104 border-8 border-white shadow-2xl"
            style={{
              backgroundImage: `url(/images/coups.jpg)`,
            }}
          ></div>
        </div>

        <div className="mt-10">
          <Countdown date={WEDDING.date} tone="light" />
        </div>

        <a
          href="#rsvp"
          className="mt-10 rounded-full bg-sage-deep px-9 py-3 text-sm font-medium uppercase tracking-[0.18em] text-cream shadow-lg ring-1 ring-white/20 transition-colors hover:bg-sage"
        >
          RSVP Now
        </a>
      </div>
    </section>
  );
}
