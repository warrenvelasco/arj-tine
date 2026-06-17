import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

type EventInfo = {
  title: string;
  time: string;
  venue: string;
  address: string;
};

const EVENTS: EventInfo[] = [
  {
    title: "The Ceremony",
    time: "1:00 PM",
    venue: "Our Lady of Peace and Good Voyage Parish",
    address: "Lodlod, Lipa City, Batangas",
  },
  {
    title: "The Reception",
    time: "3:00 PM",
    venue: "Hacienda Solange",
    address: "Malagonlong, Lipa City, Batangas",
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
              className="overflow-hidden rounded-2xl bg-cream-deep shadow-[0_10px_40px_rgba(90,84,76,0.06)]"
            >
              <div className="flex h-44 items-center justify-center bg-gray-300">
                <span className="text-xs uppercase tracking-widest text-gray-500">
                  Venue Photo
                </span>
              </div>
              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl font-medium text-ink">
                  {event.title}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-blue-dust">
                  {event.time}
                </p>
                <p className="mt-4 font-serif text-lg text-ink">
                  {event.venue}
                </p>
                <p className="mt-1 text-foreground">{event.address}</p>
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
