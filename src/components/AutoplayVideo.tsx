"use client";

import { useEffect, useRef, useState } from "react";

type AutoplayVideoProps = {
  src: string;
  className?: string;
};

/** iOS Safari has no element fullscreen API; videos expose this instead. */
type IOSVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

/**
 * Portrait video that plays (muted) while in view and pauses off-screen.
 * Sound is opt-in via the overlaid speaker button.
 */
export default function AutoplayVideo({ src, className }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    const video = videoRef.current as IOSVideoElement | null;
    if (!container || !video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (container.requestFullscreen) {
      container.requestFullscreen();
    } else {
      video.webkitEnterFullscreen?.();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${
        fullscreen ? "bg-black" : ""
      } ${className ?? ""}`}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        preload="metadata"
        className={`h-full w-full ${
          fullscreen ? "object-contain" : "object-cover"
        }`}
      />

      <div className="absolute bottom-3 right-3 z-10 flex gap-2">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-deep/80 text-cream shadow-lg ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-sage-deep"
        >
          {muted ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? "Exit fullscreen" : "View fullscreen"}
          aria-pressed={fullscreen}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-deep/80 text-cream shadow-lg ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-sage-deep"
        >
          {fullscreen ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
