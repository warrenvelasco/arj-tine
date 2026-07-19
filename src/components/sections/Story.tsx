import SectionTitle from "@/components/SectionTitle";
import AutoplayVideo from "@/components/AutoplayVideo";

type Milestone = {
  date: string;
  title: string;
  text: string;
  media: {
    type: "photo" | "video";
    src: string;
  };
};

const MILESTONES: Milestone[] = [
  {
    date: "2011",
    title: "How We Met",
    media: { type: "photo", src: "/images/arjtine.png" },
    text: "Arj first noticed Tine during a jeepney ride back in high school and couldn't stop thinking about the pretty girl he had just seen. After finding out who she was through her cousin, he admired her from afar, convinced she was out of his league. (Tine says he was just too shy.) Fourteen years later, he finally made his move and asked if he could court her. The rest is their favorite love story.",
  },
  {
    date: "2020",
    title: "Our First Trip",
    media: { type: "photo", src: "/images/trip.png" },
    text: "Their first trip together was an unplanned drive to Tagaytay on a rainy afternoon. Tine was supposed to head to the gym, but Arj surprised her by picking her up instead. They spent the afternoon over coffee, talking and enjoying the cool weather. Little did they know, that spontaneous trip would become the first of many. To this day, Tagaytay remains their favorite place for a date.	",
  },
  {
    date: "December 9, 2025",
    title: "The Proposal",
    media: { type: "video", src: "/video/proposal.mp4" },
    text: "What started as a trip to Cebu quickly became one of the most unforgettable moments of their lives. Tine had no idea that Arj had been secretly planning a surprise all along. On one of Cebu's most breathtaking spots, a very nervous Arj got down on one knee and asked the easiest question of his life. She said yes—and the rest is forever.",
  },
  {
    date: "2024 - Present",
    title: "Miles Apart, Always Together",
    media: { type: "video", src: "/video/travel-apart.mp4" },
    text: "What started as a trip to Cebu quickly became one of the most unforgettable moments of their lives. Tine had no idea that Arj had been secretly planning a surprise all along. On one of Cebu's most breathtaking spots, a very nervous Arj got down on one knee and asked the easiest question of his life. She said yes—and the rest is forever.",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-cream py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionTitle subtitle="Our Journey" title="Our Love Story" />

        <ol className="relative mt-16">
          <span
            aria-hidden
            className="absolute left-[18px] top-2 bottom-2 w-px bg-sage/30 md:left-1/2 md:-translate-x-1/2"
          />
          {MILESTONES.map((m, i) => (
            <li
              key={m.title}
              className="relative mb-12 flex flex-col gap-6 last:mb-0 md:flex-row md:items-center md:gap-10"
            >
              <div
                className={`md:w-1/2 ${
                  i % 2 === 0
                    ? "md:order-1 md:pr-12 md:text-right"
                    : "md:order-3 md:pl-12"
                }`}
              >
                <div className="ml-12 md:ml-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-dust">
                    {m.date}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-medium text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-3 font-serif text-lg leading-relaxed text-foreground">
                    {m.text}
                  </p>
                </div>
              </div>

              <span
                aria-hidden
                className="absolute left-[11px] top-1.5 z-10 h-3.5 w-3.5 rounded-full bg-sage-deep ring-4 ring-cream md:static md:order-2 md:translate-x-0"
              />

              <div
                className={`md:w-1/2 ${
                  i % 2 === 0 ? "md:order-3 md:pl-12" : "md:order-1 md:pr-12"
                }`}
              >
                {m.media.type === "photo" ? (
                  <div className="ml-12 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-gray-300 bg-gray-300 md:ml-0 md:scale-[1.15]">
                    {m.media.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.media.src}
                        alt={m.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs uppercase tracking-widest text-gray-500">
                        Photo · Landscape
                      </span>
                    )}
                  </div>
                ) : (
                  <AutoplayVideo
                    src={m.media.src}
                    className={`ml-12 aspect-[9/16] max-w-full lg:max-w-[260px] rounded-2xl bg-gray-300 md:ml-0 ${
                      i % 2 === 0 ? "" : "md:ml-auto"
                    }`}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
