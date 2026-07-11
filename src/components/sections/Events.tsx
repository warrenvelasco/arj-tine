import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

type EventInfo = {
  title: string;
  time: string;
  venue: string;
  address: string;
  image: string;
};

const EVENTS: EventInfo[] = [
  {
    title: "The Ceremony",
    time: "12:30 PM",
    venue: "Our Lady of Peace and Good Voyage Parish",
    address: "Lodlod, Lipa City, Batangas",
    image: "/images/church.webp",
  },
  {
    title: "The Reception",
    time: "3:00 PM",
    venue: "Hacienda Solange",
    address: "Malagonlong, Lipa City, Batangas",
    image: "/images/event.webp",
  },
];

export default function Events() {
  return (
    <section id="events" className="relative overflow-hidden bg-cream py-24">
      <Image
        src="/images/shape3.png"
        alt=""
        width={540}
        height={520}
        className="pointer-events-none absolute -left-16 bottom-0 w-44 select-none opacity-60 sm:w-60"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <SectionTitle subtitle="Save The Date" title="When & Where" />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {EVENTS.map((event) => (
            <article
              key={event.title}
              className="overflow-hidden rounded-2xl bg-cream-deep shadow-2xl border-4 border-white"
            >
              <div
                className="bg-cover bg-center bg-no-repeat flex h-44 items-center justify-center bg-gray-300"
                style={{ backgroundImage: `url(${event.image})` }}
              ></div>
              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl font-medium text-ink">
                  {event.title}
                </h3>
                <p className="mt-3 text-lg uppercase tracking-[0.18em] text-blue-dust">
                  {event.time}
                </p>
                <p className="mt-4 font-serif text-lg text-ink">
                  {event.venue}
                </p>
                <p className="mt-1 text-foreground">{event.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${event.venue}, ${event.address}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-full border border-blue-dust px-6 py-2 text-sm uppercase tracking-[0.18em] text-blue-dust transition-colors hover:bg-blue-dust hover:text-white"
                >
                  Get Direction
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center font-serif text-lg text-foreground">
          We can&apos;t wait to celebrate this special day surrounded by the
          people we love most. See you there!
        </p>
      </div>
    </section>
  );
}
