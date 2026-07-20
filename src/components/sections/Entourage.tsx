import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

type RoleGroup = {
  role: string;
  names: string[];
};

// Godparent couples — groom's side listed first, bride's side second.
const GODPARENTS: [string, string][] = [
  ["Mr. Hanz Othley Viola", "Mrs. Jean Karen Viola"],
  ["Mr. Kert Arsmel Fetalco", "Mrs. Mabeth Fetalco"],
  ["Mr. Christopher John Famadico", "Mrs. Angela Famadico"],
  ["Mr. Lester Pesa", "Mrs. Maricel Pesa"],
  ["Mr. Eric A. Africa", "Mrs. Ruzen M. Africa"],
  ["Mr. Maximo Macuha II", "Mrs. Lucia Macuha"],
  ["Mr. Joel Mosca", "Mrs. Leni Mosca"],
  ["Mr. Remigio Guinto Sr.", "Mrs. Nida Guinto"],
  ["Mr. Felipe C. Malabag", "Mrs. Felomena P. Malabag"],
  ["Mr. Roger Mosca", "Mrs. Bernadeth Mosca"],
  ["Mr. Blandy Martija", "Ms. Annina Estolano"],
];

const PARENTS: [RoleGroup, RoleGroup] = [
  { role: "Groom's Parent", names: ["Mr. Remegio E. Libera"] },
  { role: "Bride's Parent", names: ["Mrs. Lina C. Lajara"] },
];

const PAIRED_ROLES: [RoleGroup, RoleGroup][] = [
  [
    { role: "Best Man", names: ["Mr. Carlo Rafael Alix"] },
    { role: "Maid of Honor", names: ["Ms. Nikka Samantha Maranan"] },
  ],
  [
    { role: "Veil Sponsors", names: ["Mr. Patrick Africa", "Ms. Imee Canteras"] },
    {
      role: "Candle Sponsors",
      names: ["Mr. Christian Africa", "Mrs. Riel Dianne P. Regencia"],
    },
  ],
  [
    { role: "Groomsmen", names: ["Mr. Eric Mosca", "Mr. Jorace Mosca"] },
    {
      role: "Bridesmaids",
      names: ["Ms. Genesis Libera", "Ms. Juliana Del Rosario"],
    },
  ],
  [
    { role: "Ring Bearer", names: ["Mr. Chriztan Aldous De Torres"] },
    { role: "Arrhae Bearer", names: ["Mr. Vincent Lorenz Magabo"] },
  ],
];

const CORD_SPONSORS: RoleGroup = {
  role: "Cord Sponsors",
  names: ["Mr. Ron Antipolo", "Ms. Maria Carmela Silva"],
};

function RoleBlock({ role, names }: RoleGroup) {
  return (
    <div>
      <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-blue-dust">
        {role}
      </h3>
      <div className="mt-3 space-y-1.5">
        {names.map((name) => (
          <p key={name} className="font-serif text-lg text-ink">
            {name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function Entourage() {
  return (
    <section id="entourage" className="relative overflow-hidden bg-cream py-16">
      <Image
        src="/images/shape3.png"
        alt=""
        width={540}
        height={520}
        className="pointer-events-none absolute -left-16 -top-8 w-40 -scale-y-100 select-none opacity-60 sm:w-60"
      />
      <Image
        src="/images/shape4.png"
        alt=""
        width={330}
        height={510}
        className="pointer-events-none absolute -right-14 top-[18%] w-32 select-none opacity-60 sm:w-48"
      />
      <Image
        src="/images/shape4.png"
        alt=""
        width={330}
        height={510}
        className="pointer-events-none absolute -left-14 top-[52%] w-32 -scale-x-100 select-none opacity-60 sm:w-48"
      />
      <Image
        src="/images/shape3.png"
        alt=""
        width={540}
        height={520}
        className="pointer-events-none absolute -right-16 bottom-0 w-40 -scale-x-100 select-none opacity-60 sm:w-60"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <SectionTitle subtitle="With Love & Honor" title="The Entourage" />

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {PARENTS.map((group) => (
            <RoleBlock key={group.role} {...group} />
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-blue-dust">
            Life Godparents
          </h3>
          <div className="mt-6 space-y-3 sm:space-y-2.5">
            {GODPARENTS.map(([groomSide, brideSide]) => (
              <div
                key={groomSide}
                className="grid grid-cols-2 gap-4 sm:gap-10"
              >
                <p className="text-right font-serif text-base text-ink sm:text-lg">
                  {groomSide}
                </p>
                <p className="text-left font-serif text-base text-ink sm:text-lg">
                  {brideSide}
                </p>
              </div>
            ))}
          </div>
        </div>

        {PAIRED_ROLES.slice(0, 2).map(([left, right]) => (
          <div key={left.role} className="mt-16 grid gap-10 sm:grid-cols-2">
            <RoleBlock {...left} />
            <RoleBlock {...right} />
          </div>
        ))}

        <div className="mt-16">
          <RoleBlock {...CORD_SPONSORS} />
        </div>

        {PAIRED_ROLES.slice(2).map(([left, right]) => (
          <div key={left.role} className="mt-16 grid gap-10 sm:grid-cols-2">
            <RoleBlock {...left} />
            <RoleBlock {...right} />
          </div>
        ))}
      </div>
    </section>
  );
}
