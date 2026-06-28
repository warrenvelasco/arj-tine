import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

type Swatch = { name: string; hex: string };

const PALETTE: Swatch[] = [
  { name: "Sage Hint", hex: "#DCE7D8" },
  { name: "Mint", hex: "#BFCFBB" },
  { name: "Sage", hex: "#8EA58C" },
  { name: "Moss", hex: "#738A6E" },
  { name: "Evergreen", hex: "#344C3D" },
];

export default function DressCode() {
  return (
    <section id="dress-code" className="relative overflow-hidden bg-cream-deep py-24">
      <Image
        src="/images/shape4.png"
        alt=""
        width={540}
        height={520}
        className="pointer-events-none absolute -right-16 top-0 w-44 select-none opacity-60 sm:w-56"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <SectionTitle subtitle="Dress Code" title="What to Wear" />

        <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-lg leading-relaxed text-foreground">
          For our dress code, we kindly ask that guests reserve wearing plain
          white exclusively for the bride. Thank you for your understanding and
          respect.
        </p>

        {/* Guest attire inspiration alongside the palette */}
        <div className="mt-14 flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-14">
          <Image
            src="/images/attire.png"
            alt="Guest attire inspiration — sage green dress and shirt"
            width={1536}
            height={1024}
            className="h-auto w-full max-w-md select-none rounded-2xl md:max-w-lg md:flex-1"
          />

          {/* Colour palette */}
          <div className="md:flex-shrink-0">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-muted md:text-left">
              Our Sage Green Palette
            </p>
            <div className="mt-7 flex flex-wrap items-start justify-center gap-5 sm:gap-7 md:justify-start">
              {PALETTE.map((swatch) => (
                <div key={swatch.name} className="flex flex-col items-center">
                  <span
                    className="block h-32 w-12 rounded-full shadow-md ring-1 ring-black/5 sm:h-40 sm:w-14"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-ink">
                    {swatch.name}
                  </span>
                  <span className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-muted">
                    {swatch.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
