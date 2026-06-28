"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { WEDDING } from "@/lib/wedding";

const W = 360;
const H = 248;
const LETTER_W = 300;
const LETTER_H = 188;
const LETTER_TOP = 44;

/** Muted sage, close to uniform like the reference, with gentle top lighting. */
const BODY = "#6c7a58";
const FLAP_TOP = "#8c9c73";
const FLAP_TOP_LOW = "#7e8e69";
const PANEL_BOTTOM = "#7d8c68";
const PANEL_LEFT = "#788868";
const PANEL_RIGHT = "#869572";

/** How far below centre the top flap point dips (% of envelope height). */
const FLAP_TIP = 55;

/** Subtle fibrous paper grain, blended softly over each sage panel. */
const PAPER =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")";
const PAPER_SIZE = "180px 180px, auto";
const PAPER_BLEND = "soft-light";

type Props = {
  onOpen: () => void;
  reducedMotion?: boolean;
};

export default function EnvelopeIntro({
  onOpen,
  reducedMotion = false,
}: Props) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reducedMotion ? 60 : 1650);
    // Start the background music 2.3 seconds after the seal is clicked.
    window.setTimeout(() => {
      window.dispatchEvent(new Event("wedding:play-audio"));
    }, 2300);
  };

  const animate = opening && !reducedMotion;

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-cream"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Image
        src="/images/gold1.png"
        alt=""
        width={660}
        height={620}
        priority
        className="pointer-events-none absolute -left-10 -top-6 w-60 lg:w-[384px]! select-none opacity-90 sm:w-64"
      />
      <Image
        src="/images/gold2.png"
        alt=""
        width={330}
        height={530}
        className="pointer-events-none absolute -right-6 bottom-0 w-32 lg:w-[300px]! select-none opacity-90 sm:w-52"
      />

      {/* Hand-lettered couple names above the envelope */}
      <motion.h1
        className="relative z-10 mb-4 select-none font-script text-5xl text-sage-deep sm:text-6xl"
        animate={animate ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {WEDDING.groom}{" "}
        <span className="font-serif text-3xl italic text-ink/70 sm:text-4xl">
          &amp;
        </span>{" "}
        {WEDDING.bride}
      </motion.h1>

      <button
        onClick={handleOpen}
        aria-label="Open the wedding invitation"
        className="relative cursor-pointer rounded-md bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
      >
        <div
          className="relative"
          style={{ width: W, height: H, isolation: "isolate" }}
        >
          {/* Envelope interior / back */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background: BODY,
              zIndex: 1,
              boxShadow:
                "0 34px 60px -18px rgba(55,65,48,0.5), 0 18px 34px -18px rgba(55,65,48,0.4), 0 6px 12px rgba(55,65,48,0.18)",
            }}
          />

          {/* Letter tucked inside the envelope */}
          <motion.div
            className="absolute left-1/2 flex flex-col items-center justify-center rounded-sm bg-cream px-6 text-center shadow-md"
            style={{
              width: LETTER_W,
              height: LETTER_H,
              marginLeft: -LETTER_W / 2,
              top: LETTER_TOP,
              zIndex: 2,
            }}
            animate={
              animate
                ? {
                    y: [0, -(H + 30), -(H + 30)],
                    scale: [1, 1, 7],
                    opacity: [0, 1, 0],
                    zIndex: [2, 2, 60],
                  }
                : { y: 0, scale: 1, opacity: 0, zIndex: 2 }
            }
            transition={{
              duration: 1.3,
              delay: 0.6,
              times: [0, 0.55, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="font-script text-2xl text-sage-deep">
              You&apos;re Invited
            </p>
            <p className="mt-1 font-serif text-3xl font-medium text-ink">
              {WEDDING.groom} &amp; {WEDDING.bride}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted">
              {WEDDING.dateLabel}
            </p>
          </motion.div>

          {/* Bottom pocket flap (points up to centre) */}
          <div
            className="absolute inset-0 rounded-b-md"
            style={{
              background: `${PAPER}, ${PANEL_BOTTOM}`,
              backgroundSize: PAPER_SIZE,
              backgroundBlendMode: PAPER_BLEND,
              clipPath: "polygon(0% 100%, 100% 100%, 50% 50%)",
              zIndex: 5,
            }}
          />
          {/* Left pocket flap */}
          <div
            className="absolute inset-0 rounded-l-md"
            style={{
              background: `${PAPER}, ${PANEL_LEFT}`,
              backgroundSize: PAPER_SIZE,
              backgroundBlendMode: PAPER_BLEND,
              clipPath: "polygon(0% 0%, 0% 100%, 50% 50%)",
              boxShadow: "inset 0 0 12px rgba(60,70,50,0.12)",
              zIndex: 5,
            }}
          />
          {/* Right pocket flap */}
          <div
            className="absolute inset-0 rounded-r-md"
            style={{
              background: `${PAPER}, ${PANEL_RIGHT}`,
              backgroundSize: PAPER_SIZE,
              backgroundBlendMode: PAPER_BLEND,
              clipPath: "polygon(100% 0%, 100% 100%, 50% 50%)",
              zIndex: 5,
            }}
          />

          {/* Cast shadow of the lifted top flap — a blurred copy nudged down,
              so a clear shadow band shows below the flap's V edges. */}
          <motion.div
            className="absolute left-0 top-0 w-full"
            style={{
              height: H,
              background: "rgba(22,30,14,0.7)",
              clipPath: `polygon(0% 0%, 100% 0%, 50% ${FLAP_TIP}%)`,
              transform: "translateY(4px)",
              filter: "blur(30px)",
              zIndex: 5,
            }}
            animate={animate ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {/* Top flap that opens (points down past centre) */}
          <motion.div
            className="absolute left-0 top-0 w-full rounded-t-md"
            style={{
              height: H,
              background: `${PAPER}, linear-gradient(170deg, ${FLAP_TOP} 0%, ${FLAP_TOP_LOW} 100%)`,
              backgroundSize: PAPER_SIZE,
              backgroundBlendMode: PAPER_BLEND,
              clipPath: `polygon(0% 0%, 100% 0%, 50% ${FLAP_TIP}%)`,
              transformOrigin: "top",
              transformPerspective: 1600,
              backfaceVisibility: "hidden",
              filter: "drop-shadow(0 2px 2px rgba(32,42,24,0.3))",
              zIndex: 6,
            }}
            animate={
              animate
                ? { rotateX: -180, transformPerspective: 1600, zIndex: 1 }
                : { rotateX: 0, transformPerspective: 1600, zIndex: 6 }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Wax seal */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ marginLeft: -39, marginTop: -39, zIndex: 7 }}
            animate={
              opening
                ? { scale: 1.5, opacity: 0 }
                : reducedMotion
                  ? { scale: 1, opacity: 1 }
                  : { scale: [1, 1.04, 1] }
            }
            transition={
              opening
                ? { duration: 0.4, ease: "easeOut" }
                : reducedMotion
                  ? { duration: 0 }
                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {/* Wax blob — warm gold, lit from upper-left, organic edge */}
            <div
              className="flex h-[78px] w-[78px] items-center justify-center"
              style={{
                borderRadius: "47% 53% 51% 49% / 52% 48% 53% 47%",
                background:
                  "radial-gradient(circle at 35% 28%, rgba(255,250,234,0.6), rgba(255,250,234,0) 40%), radial-gradient(circle at 70% 76%, rgba(74,52,22,0.42), rgba(74,52,22,0) 52%), radial-gradient(circle at 48% 46%, #dabf82 0%, #c4a263 52%, #a37f48 100%)",
                boxShadow:
                  "inset 0 3px 4px rgba(255,250,232,0.5), inset 0 -5px 7px rgba(74,52,22,0.42), 0 7px 13px rgba(45,35,18,0.4), 0 2px 4px rgba(45,35,18,0.3)",
              }}
            >
              {/* Engraved inner ring */}
              <div
                className="flex h-[60px] w-[60px] items-center justify-center"
                style={{
                  borderRadius: "50% 49% 51% 50% / 50% 51% 49% 50%",
                  border: "1.5px solid rgba(96,70,32,0.32)",
                  boxShadow:
                    "inset 0 1px 2px rgba(74,52,22,0.5), inset 0 -1px 2px rgba(255,250,232,0.45)",
                }}
              >
                <span
                  className="font-serif text-[15px] font-semibold"
                  style={{
                    letterSpacing: "0.04em",
                    color: "#6f5226",
                    textShadow:
                      "0 1px 0 rgba(255,250,232,0.4), 0 -0.5px 0 rgba(74,52,22,0.3)",
                  }}
                >
                  {WEDDING.groom[0]} &amp; {WEDDING.bride[0]}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </button>

      {!opening && (
        <motion.p
          className="mt-12 text-xs uppercase tracking-[0.25em] text-muted"
          animate={reducedMotion ? { y: 0 } : { y: [0, -5, 0] }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
        >
          Tap to open the invitation
        </motion.p>
      )}
    </motion.div>
  );
}
