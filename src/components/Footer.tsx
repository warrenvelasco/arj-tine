import Image from "next/image";
import { WEDDING } from "@/lib/wedding";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sage-deep py-16 text-center text-cream">
      <Image
        src="/images/shape2.png"
        alt=""
        width={420}
        height={110}
        className="pointer-events-none mx-auto mb-6 h-auto w-48 select-none opacity-40 invert"
      />
      <p className="font-script text-5xl">
        {WEDDING.groom} &amp; {WEDDING.bride}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.22em] text-cream/80">
        {WEDDING.dateLabel}
      </p>
      <p className="mt-1 text-sm uppercase tracking-[0.22em] text-cream/70">
        {WEDDING.location}
      </p>
      <p className="mt-6 font-serif text-lg text-cream/90">{WEDDING.hashtag}</p>
      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-cream/60">
        Made with love
      </p>
    </footer>
  );
}
