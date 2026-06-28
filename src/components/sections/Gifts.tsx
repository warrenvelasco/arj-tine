import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

const DARK = "#3a342e";

/** A decorative sample QR code (not a working payment link). */
function SampleQr() {
  const N = 25;
  const reserved = (r: number, c: number) =>
    (r < 8 && c < 8) || (r < 8 && c > N - 9) || (r > N - 9 && c < 8);

  const modules: { r: number; c: number }[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (reserved(r, c)) continue;
      if ((r * 5 + c * 3 + r * c * 7) % 7 < 3) modules.push({ r, c });
    }
  }

  const finders = [
    [0, 0],
    [0, N - 7],
    [N - 7, 0],
  ];

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5">
      <svg
        viewBox="-2 -2 29 29"
        className="h-44 w-44"
        role="img"
        aria-label="Sample QR code for sending a gift"
      >
        <rect x="-2" y="-2" width="29" height="29" fill="#ffffff" />
        {modules.map(({ r, c }) => (
          <rect
            key={`${r}-${c}`}
            x={c}
            y={r}
            width="1"
            height="1"
            fill={DARK}
          />
        ))}
        {finders.map(([fr, fc]) => (
          <g key={`${fr}-${fc}`}>
            <rect x={fc} y={fr} width="7" height="7" fill={DARK} />
            <rect x={fc + 1} y={fr + 1} width="5" height="5" fill="#ffffff" />
            <rect x={fc + 2} y={fr + 2} width="3" height="3" fill={DARK} />
          </g>
        ))}
      </svg>
      <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted">
        Scan to send a gift
      </p>
    </div>
  );
}

export default function Gifts() {
  return (
    <section id="gifts" className="relative overflow-hidden bg-cream py-24">
      <Image
        src="/images/shape2.png"
        alt=""
        width={540}
        height={520}
        className="pointer-events-none absolute -left-16 bottom-0 w-44 select-none opacity-60 sm:w-56"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        <SectionTitle subtitle="With Love" title="Wishing Well" />

        <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-lg leading-relaxed text-foreground">
          Your presence at our wedding is the greatest gift of all. However, if
          you wish to honor us with a gift, a contribution to our new beginning
          would be sincerely appreciated.
        </p>

        <div className="mt-14 flex flex-col items-center justify-center gap-12 sm:flex-row sm:gap-16">
          <Image
            src="/images/gift2.png"
            alt="A wedding gift wrapped with a sage ribbon and a 'To the Newlyweds' tag"
            width={1536}
            height={1024}
            className="h-auto w-full max-w-sm select-none rounded-2xl"
          />
          <SampleQr />
        </div>
      </div>
    </section>
  );
}
