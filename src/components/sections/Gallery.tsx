"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/SectionTitle";

type GalleryItem = {
  id: number;
  // Optional image source — leave undefined to show a gray placeholder.
  src?: string;
};

const GALLERY: GalleryItem[] = [
  "DSC05207",
  "DSC05218",
  "DSC05744",
  "DSC05747",
  "DSC05752",
  "DSC05759",
  "DSC05821",
  "DSC05957",
  "DSC05990",
  "DSC06005",
  "DSC06007",
  "DSC06041",
  "DSC06054",
  "DSC06065",
  "DSC06071",
  "DSC06121",
  "DSC06268",
].map((name, i) => ({ id: i + 1, src: `/images/gallery/${name}.webp` }));

const AUTO_ADVANCE_MS = 3500;
/** Horizontal drag distance (px) needed to switch to the next/previous photo. */
const SWIPE_THRESHOLD = 60;

type SlidePosition = {
  x: number;
  rot: number;
  scale: number;
  opacity: number;
  z: number;
};

/**
 * Transform presets keyed by signed distance from the active slide.
 * Positive rotateY angles the left slides inward (concave, curved-screen
 * look); negative does the same for the right side.
 */
const POSITIONS: Record<number, SlidePosition> = {
  [-2]: { x: -160, rot: 42, scale: 0.78, opacity: 0.55, z: 10 },
  [-1]: { x: -88, rot: 32, scale: 0.88, opacity: 0.8, z: 20 },
  [0]: { x: 0, rot: 0, scale: 1, opacity: 1, z: 30 },
  [1]: { x: 88, rot: -32, scale: 0.88, opacity: 0.8, z: 20 },
  [2]: { x: 160, rot: -42, scale: 0.78, opacity: 0.55, z: 10 },
};

const HIDDEN_LEFT: SlidePosition = { x: -230, rot: 45, scale: 0.7, opacity: 0, z: 0 };
const HIDDEN_RIGHT: SlidePosition = { x: 230, rot: -45, scale: 0.7, opacity: 0, z: 0 };

/** Shortest signed distance from the active slide, wrapping around. */
function slideOffset(index: number, active: number, count: number) {
  let d = (index - active + count) % count;
  if (d > count / 2) d -= count;
  return d;
}

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragStartX = useRef(0);
  // Set once a drag moves far enough that the release shouldn't count as a click.
  const dragMoved = useRef(false);

  const close = useCallback(() => setLightboxOpen(false), []);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + GALLERY.length) % GALLERY.length),
    [],
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % GALLERY.length),
    [],
  );

  // Auto-rotate the carousel; pause on hover, drag, or while the lightbox is open.
  useEffect(() => {
    if (paused || dragging || lightboxOpen) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, dragging, lightboxOpen, next]);

  // Follow the pointer while dragging; on release, swipe if past the threshold.
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 8) dragMoved.current = true;
      setDragX(dx);
    };
    const onUp = (e: PointerEvent) => {
      setDragging(false);
      const dx = e.clientX - dragStartX.current;
      if (dx <= -SWIPE_THRESHOLD) next();
      else if (dx >= SWIPE_THRESHOLD) prev();
      setDragX(0);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, next, prev]);

  useEffect(() => {
    if (!lightboxOpen) return;
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
  }, [lightboxOpen, close, prev, next]);

  const current = GALLERY[active];

  return (
    <section id="gallery" className="relative overflow-hidden bg-white py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionTitle subtitle="Capture Moment" title="Our Gallery" />

        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className={`relative h-96 touch-pan-y select-none sm:h-[30rem] lg:h-[36rem] ${
              dragging ? "cursor-grabbing" : "cursor-grab transition-transform duration-300"
            }`}
            style={{
              perspective: "1400px",
              transform: `translateX(${dragX * 0.35}px)`,
            }}
            onPointerDown={(e) => {
              dragStartX.current = e.clientX;
              dragMoved.current = false;
              setDragging(true);
            }}
          >
            {GALLERY.map((item, index) => {
              const offset = slideOffset(index, active, GALLERY.length);
              const pos =
                POSITIONS[offset] ?? (offset < 0 ? HIDDEN_LEFT : HIDDEN_RIGHT);
              const isActive = offset === 0;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (dragMoved.current) return;
                    if (isActive) setLightboxOpen(true);
                    else setActive(index);
                  }}
                  aria-label={
                    isActive ? `Open photo ${item.id}` : `Show photo ${item.id}`
                  }
                  className="absolute left-1/2 top-1/2 aspect-[2/3] h-[88%] overflow-hidden rounded-2xl bg-gray-300 shadow-xl ring-1 ring-black/5 transition-all duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${pos.x}%) rotateY(${pos.rot}deg) scale(${pos.scale})`,
                    opacity: pos.opacity,
                    zIndex: pos.z,
                    pointerEvents: pos.opacity === 0 ? "none" : undefined,
                  }}
                >
                  {item.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.src}
                      alt={`Wedding photo ${item.id}`}
                      draggable={false}
                      className="h-full w-full object-cover object-[50%_30%]"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-gray-500">
                      Photo {item.id}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/5 text-2xl text-ink transition hover:bg-ink/15 sm:left-2"
          >
            &#8249;
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/5 text-2xl text-ink transition hover:bg-ink/15 sm:right-2"
          >
            &#8250;
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {GALLERY.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                aria-label={`Go to photo ${item.id}`}
                aria-current={index === active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === active ? "w-6 bg-sage-deep" : "w-2 bg-ink/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
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
              {active + 1} / {GALLERY.length}
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
