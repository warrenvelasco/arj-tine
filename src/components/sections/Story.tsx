import SectionTitle from "@/components/SectionTitle";

type Milestone = {
  date: string;
  title: string;
  text: string;
};

const MILESTONES: Milestone[] = [
  {
    date: "June 2019",
    title: "How We Met",
    text: "A rainy afternoon, a crowded coffee shop, and one shared umbrella. We talked until the cafe closed and knew this was the start of something special.",
  },
  {
    date: "February 2020",
    title: "Our First Trip",
    text: "Two backpacks and a map we never followed. Getting lost together turned out to be our favorite way to find each other.",
  },
  {
    date: "December 2024",
    title: "The Proposal",
    text: "Under a sky full of stars, with shaking hands and a full heart, the question was asked — and answered with happy tears and a resounding yes.",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-cream py-24">
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
                  i % 2 === 0 ? "md:order-1 md:pr-12 md:text-right" : "md:order-3 md:pl-12"
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
                <div className="ml-12 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gray-300 md:ml-0">
                  <span className="text-xs uppercase tracking-widest text-gray-500">
                    Photo
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
