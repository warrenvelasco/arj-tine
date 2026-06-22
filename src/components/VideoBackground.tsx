"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "P4mskkInY_s";
const VOLUME = 55;
/** Extra zoom to crop YouTube embed letterboxing */
const COVER_SCALE = 1.45;

function applyCoverStyles(iframe: HTMLIFrameElement) {
  Object.assign(iframe.style, {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100vw",
    height: "56.25vw",
    minHeight: "100svh",
    minWidth: "177.78vh",
    transform: `translate(-50%, -50%) scale(${COVER_SCALE})`,
    border: "0",
    pointerEvents: "none",
  });
}

type YTPlayer = {
  mute: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
  playVideo: () => void;
  destroy?: () => void;
  getIframe?: () => HTMLIFrameElement;
};

type YTPlayerConfig = {
  videoId?: string;
  playerVars?: Record<string, number | string>;
  events?: { onReady?: (e: { target: YTPlayer }) => void };
};

declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, config: YTPlayerConfig) => YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };

    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  });
}

function unmutePlayer(player: YTPlayer) {
  if (typeof player.unMute !== "function") return false;
  player.unMute();
  player.setVolume(VOLUME);
  player.playVideo();
  return true;
}

function mutePlayer(player: YTPlayer) {
  if (typeof player.mute !== "function") return false;
  player.mute();
  return true;
}

export default function VideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const wantSoundRef = useRef(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const applySoundPreference = () => {
      const player = playerRef.current;
      if (!player) return;

      if (wantSoundRef.current) {
        if (unmutePlayer(player)) setMuted(false);
      } else {
        if (mutePlayer(player)) setMuted(true);
      }
    };

    const initPlayer = async () => {
      await loadYouTubeApi();
      if (cancelled || !containerRef.current || !window.YT?.Player) return;

      new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          disablekb: 1,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return;

            // Only e.target has the full player API (mute/unMute/etc.).
            playerRef.current = e.target;

            const iframe = e.target.getIframe?.();
            if (iframe) {
              applyCoverStyles(iframe);
              iframe.setAttribute("tabindex", "-1");

              const wrapper = iframe.parentElement;
              if (wrapper && wrapper !== containerRef.current) {
                Object.assign(wrapper.style, {
                  position: "absolute",
                  inset: "0",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  pointerEvents: "none",
                });
              }
            }

            e.target.mute();
            e.target.playVideo();
            applySoundPreference();
          },
        },
      });
    };

    initPlayer();

    const onFirstGesture = () => {
      wantSoundRef.current = true;
      applySoundPreference();
      document.removeEventListener("pointerdown", onFirstGesture);
      document.removeEventListener("keydown", onFirstGesture);
    };
    document.addEventListener("pointerdown", onFirstGesture);
    document.addEventListener("keydown", onFirstGesture);

    return () => {
      cancelled = true;
      document.removeEventListener("pointerdown", onFirstGesture);
      document.removeEventListener("keydown", onFirstGesture);

      const player = playerRef.current;
      if (player?.destroy) player.destroy();
      playerRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    const player = playerRef.current;
    if (!player) {
      wantSoundRef.current = true;
      return;
    }

    if (muted) {
      wantSoundRef.current = true;
      if (unmutePlayer(player)) setMuted(false);
    } else {
      wantSoundRef.current = false;
      if (mutePlayer(player)) setMuted(true);
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 min-h-svh overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/40 to-black/65" />

      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Turn music on" : "Turn music off"}
        aria-pressed={!muted}
        className="pointer-events-auto absolute bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-sage-deep/80 text-cream shadow-lg ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-sage-deep"
      >
        {muted ? (
          <svg
            width="20"
            height="20"
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
            width="20"
            height="20"
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
    </div>
  );
}
