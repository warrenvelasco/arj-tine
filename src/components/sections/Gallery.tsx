"use client";

import { useCallback, useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";

type GalleryItem = {
  id: number;
  // Optional image source — leave undefined to show a gray placeholder.
  src?: string;
  // Tailwind grid-span classes to vary the tile size (masonry-like look).
  span?: string;
};

const GALLERY: GalleryItem[] = [
  { id: 1 },
  { id: 2, span: "md:row-span-2" },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length,
      ),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  const current = openIndex !== null ? GALLERY[openIndex] : null;

  return (
    <section id="gallery" className="relative overflow-hidden bg-white py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionTitle subtitle="Capture Moment" title="Our Gallery" />

        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-3">
          {GALLERY.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setOpenIndex(index)}
              aria-label={`Open photo ${item.id}`}
              className={`group relative overflow-hidden rounded-2xl bg-gray-300 ring-1 ring-black/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep ${item.span ?? ""}`}
            >
              {item.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={`Wedding photo ${item.id}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-gray-500">
                  Photo {item.id}
                </span>
              )}
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition group-hover:bg-ink/25 group-hover:opacity-100">
                <span className="rounded-full bg-cream/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-ink">
                  View
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {isOpen && current && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery viewer"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-2xl text-cream transition hover:bg-cream/30"
          >
            &times;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream/15 text-3xl text-cream transition hover:bg-cream/30 sm:left-8"
          >
            &#8249;
          </button>

          <figure
            className="flex max-h-[85vh] w-full max-w-3xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {current.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current.src}
                alt={`Wedding photo ${current.id}`}
                className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-gray-300 shadow-2xl">
                <span className="text-sm uppercase tracking-widest text-gray-500">
                  Photo {current.id}
                </span>
              </div>
            )}
            <figcaption className="mt-4 text-sm uppercase tracking-[0.2em] text-cream/80">
              {(openIndex ?? 0) + 1} / {GALLERY.length}
            </figcaption>
          </figure>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream/15 text-3xl text-cream transition hover:bg-cream/30 sm:right-8"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}
