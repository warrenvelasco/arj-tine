"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { WEDDING } from "@/lib/wedding";

const W = 360;
const H = 240;
const LETTER_W = 300;
const LETTER_H = 188;
const LETTER_TOP = 42;
const FRONT = "#9fb293";
const FLAP = "#aebfa2";
const BODY = "#7c9070";
const SEAL = "#c2a06a";

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
        src="/images/1.png"
        alt=""
        width={660}
        height={620}
        priority
        className="pointer-events-none absolute -left-10 -top-6 w-40 select-none opacity-90 sm:w-64"
      />
      <Image
        src="/images/2.png"
        alt=""
        width={330}
        height={530}
        className="pointer-events-none absolute -right-6 bottom-0 w-32 select-none opacity-90 sm:w-52"
      />

      <button
        onClick={handleOpen}
        aria-label="Open the wedding invitation"
        className="relative cursor-pointer bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
      >
        <div
          className="relative"
          style={{ width: W, height: H, isolation: "isolate" }}
        >
          {/* Envelope back / interior */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background: BODY,
              zIndex: 1,
              boxShadow:
                "0 30px 60px -15px rgba(60,70,55,0.45), 0 18px 36px -18px rgba(60,70,55,0.35), 0 6px 12px rgba(60,70,55,0.18)",
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

          {/* Front pocket: covers the letter (left, right and bottom panels), V-notch at top */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background: FRONT,
              clipPath: "polygon(0% 0%, 50% 34%, 100% 0%, 100% 100%, 0% 100%)",
              boxShadow: "inset 0 2px 6px rgba(90,84,76,0.12)",
              zIndex: 5,
            }}
          />

          {/* Top flap that opens */}
          <motion.div
            className="absolute left-0 top-0 w-full"
            style={{
              height: H / 2,
              background: FLAP,
              clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
              transformOrigin: "top",
              transformPerspective: 1400,
              backfaceVisibility: "hidden",
              zIndex: 6,
              boxShadow: "0 2px 6px rgba(90,84,76,0.08)",
            }}
            animate={
              animate
                ? { rotateX: -180, transformPerspective: 1400, zIndex: 1 }
                : { rotateX: 0, transformPerspective: 1400, zIndex: 6 }
            }
            transition={{ duration: 0.55, ease: "easeInOut" }}
          />

          {/* Wax seal */}
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-full font-script text-xl text-cream shadow-md"
            style={{
              marginLeft: -32,
              marginTop: -32,
              background: SEAL,
              zIndex: 7,
            }}
            animate={
              opening
                ? { scale: 1.6, opacity: 0 }
                : reducedMotion
                  ? { scale: 1, opacity: 1 }
                  : { scale: [1, 1.07, 1] }
            }
            transition={
              opening
                ? { duration: 0.4, ease: "easeOut" }
                : reducedMotion
                  ? { duration: 0 }
                  : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            A &amp; T
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
