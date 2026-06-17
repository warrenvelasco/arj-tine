"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import EnvelopeIntro from "./EnvelopeIntro";

export default function IntroGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <EnvelopeIntro
            key="intro"
            onOpen={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
              setOpened(true);
            }}
            reducedMotion={!!reduce}
          />
        )}
      </AnimatePresence>

      {revealed ? (
        children
      ) : (
        <motion.div
          initial={false}
          animate={
            opened
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: reduce ? 1 : 0.92, y: reduce ? 0 : 16 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
          onAnimationComplete={() => {
            if (opened) setRevealed(true);
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
