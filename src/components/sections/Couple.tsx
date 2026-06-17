import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

type Person = {
  name: string;
  role: string;
  bio: string;
};

const PEOPLE: Person[] = [
  {
    name: "Arj",
    role: "The Groom",
    bio: "Kind-hearted, endlessly curious, and the calm in every storm. He proposed under the stars and has been counting down the days ever since.",
  },
  {
    name: "Tine",
    role: "The Bride",
    bio: "Warm, radiant, and full of laughter. She turns ordinary moments into memories and is ready to say yes to forever.",
  },
];

export default function Couple() {
  return (
    <section
      id="couple"
      className="relative overflow-hidden bg-cream-deep py-24"
    >
      <Image
        src="/images/shape3.png"
        alt=""
        width={540}
        height={520}
        className="pointer-events-none absolute -right-12 -top-10 w-40 select-none opacity-70 sm:w-56"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <SectionTitle subtitle="The Happy Couple" title="Bride & Groom" />

        <div className="mt-14 grid items-stretch gap-8 md:grid-cols-2">
          {PEOPLE.map((person) => (
            <article
              key={person.name}
              className="flex flex-col items-center rounded-2xl bg-cream p-8 text-center shadow-[0_10px_40px_rgba(90,84,76,0.06)]"
            >
              <div className="flex h-48 w-56 items-center justify-center overflow-hidden rounded-2xl bg-gray-300 ring-4 ring-cream-deep">
                <span className="text-xs uppercase tracking-widest text-gray-500">
                  Photo
                </span>
              </div>
              <h3 className="mt-6 font-script text-4xl text-sage-deep">
                {person.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                {person.role}
              </p>
              <p className="mt-4 max-w-sm font-serif text-lg leading-relaxed text-foreground">
                {person.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
