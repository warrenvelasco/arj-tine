import Image from "next/image";

type Props = {
  subtitle: string;
  title: string;
  className?: string;
};

export default function SectionTitle({ subtitle, title, className }: Props) {
  return (
    <div className={`flex flex-col items-center text-center ${className ?? ""}`}>
      <Image
        src="/images/section-title.png"
        alt=""
        width={70}
        height={40}
        className="mb-3 h-auto w-16 opacity-90"
      />
      <p className="font-script text-3xl text-sage-deep sm:text-4xl">
        {subtitle}
      </p>
      <h2 className="mt-1 font-serif text-3xl font-medium tracking-wide text-ink sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
