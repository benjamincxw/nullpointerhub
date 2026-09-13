"use client";

import { useEffect, useRef } from "react";
import { Archivo } from "next/font/google";
import { Image as ImageIcon } from "lucide-react";
import { whatsappLink } from "@/lib/data/packages";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
});

const ONLOAD_LINES = ["<body>", "  <nav/>", "  <h1>"];

interface ScrollStep {
  line: string;
  range: [number, number];
}

const SCROLL_STEPS: ScrollStep[] = [
  { line: "  <p>", range: [0, 12] },
  { line: "  <a.cta/>", range: [8, 20] },
  { line: "  <figure/>", range: [16, 30] },
  { line: "  <section>", range: [26, 36] },
  { line: "    <card×3/>", range: [32, 52] },
  { line: "  <figure/>", range: [46, 62] },
  { line: "  <section>", range: [58, 68] },
  { line: "    <photo×4/>", range: [64, 86] },
  { line: "  <footer/>", range: [80, 96] },
  { line: "</body>", range: [92, 104] },
];

const CHAR_MS = 55;
const LINE_GAP_MS = 160;
const INTRO_MS = 900;

interface TimedLine {
  line: string;
  start: number;
  duration: number;
  end: number;
}

function withTiming(lines: string[], startAt: number): TimedLine[] {
  let cursor = startAt;
  return lines.map((line) => {
    const duration = Math.max(line.trim().length, 1) * CHAR_MS;
    const start = cursor;
    cursor = start + duration + LINE_GAP_MS;
    return { line, start, duration, end: start + duration };
  });
}

const onloadTimed = withTiming(ONLOAD_LINES, INTRO_MS);

function renderCodeLine(line: string) {
  return line.split(/([<>/])/).map((part, i) =>
    part === "<" || part === ">" || part === "/" ? (
      <span key={i} className="np-punct">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function rangeVars(range: [number, number]) {
  return { "--range-start": `${range[0]}vh`, "--range-end": `${range[1]}vh` } as React.CSSProperties;
}

function Photo({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <div className={`np-photo ${className}`} style={style}>
      <ImageIcon strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}

export function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const ghost = ghostRef.current;
    if (!frame || !ghost) return;

    function handleMove(e: PointerEvent) {
      const rect = frame!.getBoundingClientRect();
      ghost!.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
    }
    function show() {
      ghost!.style.opacity = "1";
    }
    function hide() {
      ghost!.style.opacity = "0";
    }

    frame.addEventListener("pointermove", handleMove);
    frame.addEventListener("pointerenter", show);
    frame.addEventListener("pointerleave", hide);
    return () => {
      frame.removeEventListener("pointermove", handleMove);
      frame.removeEventListener("pointerenter", show);
      frame.removeEventListener("pointerleave", hide);
    };
  }, []);

  const [pStep, ctaStep, figure1Step, section1Step, cardsStep, figure2Step, section2Step, galleryStep, footerStep, closeStep] =
    SCROLL_STEPS;

  return (
    <section id="hero" aria-labelledby="hero-heading" className={`${archivo.variable} np-hero`}>
     <div className="np-hero-sticky">
      <div className="np-left">
        <p className="np-kicker">Web design for Malaysian SMEs</p>
        <h1 id="hero-heading" className="np-headline">
          Every website starts as <span className="np-red">null.</span>
          <span className="np-caret" aria-hidden="true" />
        </h1>
        <p className="np-copy">
          We start from nothing and ship something real: a working website
          built fast, priced fairly, and made to earn its keep.
        </p>
        <div className="np-actions">
          <a
            className="np-btn np-btn-primary"
            href={whatsappLink("Hi, I'd like a free mockup for my business website.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get a free mockup
          </a>
          <a className="np-btn np-btn-outline" href="#work">
            See how it works
          </a>
        </div>
        <div className="np-rule-h" aria-hidden="true" />
        <p className="np-note">
          <span className="np-note-num">01</span> — Free mockup first.
        </p>
      </div>

      <div className="np-rule-v" aria-hidden="true" />

      <div
        className="np-right"
        aria-label="Animated demo: a code editor writes a website's markup while a live preview builds itself to match, first on load, then as you scroll."
      >
        <div className="np-grid-bg" aria-hidden="true" />
        <div className="np-null-mark" aria-hidden="true">
          null
        </div>

        <div className="np-frame" ref={frameRef} aria-hidden="true">
          <div className="np-pane np-pane-code">
            <div className="np-pane-header">
              <span className="np-dot np-dot-r" />
              <span className="np-dot np-dot-y" />
              <span className="np-dot np-dot-g" />
              <span className="np-tab">index.html</span>
            </div>

            <div className="np-code">
              {onloadTimed.map(({ line, start, duration }, i) => (
                <div
                  key={`o${i}`}
                  className="np-line"
                  style={
                    {
                      "--start": `${start}ms`,
                      "--dur": `${duration}ms`,
                      "--chars": line.length,
                    } as React.CSSProperties
                  }
                >
                  {renderCodeLine(line)}
                </div>
              ))}
              {SCROLL_STEPS.map((step, i) => (
                <div
                  key={`s${i}`}
                  className="np-line np-line-scroll"
                  style={{ "--chars": step.line.length, ...rangeVars(step.range) } as React.CSSProperties}
                >
                  {renderCodeLine(step.line)}
                </div>
              ))}
            </div>

            <div className="np-progress-track">
              <div className="np-progress-fill" style={rangeVars([0, 104])} />
            </div>
          </div>

          <div className="np-pane np-pane-preview">
            <div className="np-scanline" />

            <div className="np-p-nav" style={{ "--start": `${onloadTimed[1].end}ms` } as React.CSSProperties}>
              <span className="np-p-logo" />
              <span className="np-p-pill" />
              <span className="np-p-pill" />
            </div>

            <div className="np-p-h1" style={{ "--start": `${onloadTimed[2].end}ms` } as React.CSSProperties}>
              Appointments, booked online.
            </div>

            <div className="np-p-text np-p-scroll" style={rangeVars(pStep.range)}>
              <span className="np-bar" />
              <span className="np-bar np-bar-short" />
            </div>

            <div className="np-p-cta np-p-scroll" style={rangeVars(ctaStep.range)}>
              Book now
            </div>

            <Photo className="np-p-figure np-p-scroll" style={rangeVars(figure1Step.range)} />

            <div className="np-p-label np-p-scroll" style={rangeVars(section1Step.range)}>
              Our services
            </div>

            <div className="np-p-cards">
              {[0, 1, 2].map((i) => {
                const [start, end] = cardsStep.range;
                const span = (end - start) / 3;
                const cardRange: [number, number] = [start + i * span, start + i * span + span * 1.4];
                return (
                  <div key={i} className="np-p-card np-p-scroll" style={rangeVars(cardRange)}>
                    <Photo className="np-p-card-photo" />
                    <span className="np-p-card-line" />
                    <span className="np-p-card-line np-p-card-line-short" />
                  </div>
                );
              })}
            </div>

            <Photo className="np-p-figure-wide np-p-scroll" style={rangeVars(figure2Step.range)} />

            <div className="np-p-label np-p-scroll" style={rangeVars(section2Step.range)}>
              Gallery
            </div>

            <div className="np-p-gallery">
              {[0, 1, 2, 3].map((i) => {
                const [start, end] = galleryStep.range;
                const span = (end - start) / 4;
                const photoRange: [number, number] = [start + i * span, start + i * span + span * 1.6];
                return <Photo key={i} className="np-p-gallery-item np-p-scroll" style={rangeVars(photoRange)} />;
              })}
            </div>

            <div className="np-p-footer np-p-scroll" style={rangeVars(footerStep.range)} />

            <div className="np-p-done np-p-scroll" style={rangeVars(closeStep.range)} aria-hidden="true" />
          </div>

          <div className="np-ghost" ref={ghostRef} aria-hidden="true" />
        </div>

        <div className="np-scroll-hint" aria-hidden="true">
          SCROLL TO BUILD ↓
        </div>
      </div>
     </div>

      <style jsx>{`
        .np-hero {
          --ground: #f3f2f2;
          --ink: #201e1d;
          --red: #1fa971;
          position: relative;
          height: 230vh;
          background: var(--ground);
          color: var(--ink);
          font-family: var(--font-archivo), Arial, sans-serif;
        }

        .np-hero-sticky {
          position: sticky;
          top: 0;
          display: grid;
          grid-template-columns: 1fr 2px 1fr;
          height: 100vh;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .np-hero {
            height: auto;
          }
          .np-hero-sticky {
            position: static;
            grid-template-columns: 1fr;
            height: auto;
          }
        }

        .np-rule-v {
          background: var(--ink);
          width: 2px;
        }
        @media (max-width: 900px) {
          .np-rule-v {
            display: none;
          }
        }

        .np-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(104px, 15vw, 148px) clamp(24px, 6vw, 80px) clamp(48px, 6vw, 80px);
        }

        .np-kicker {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 12px;
          font-weight: 700;
          margin: 0 0 22px;
        }

        .np-headline {
          font-size: clamp(2.6rem, 5.2vw, 4.75rem);
          line-height: 0.98;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 26px;
        }
        .np-red {
          color: var(--red);
        }
        .np-caret {
          display: inline-block;
          width: 0.5ch;
          height: 0.85em;
          background: var(--red);
          margin-left: 4px;
          vertical-align: -0.08em;
          animation: npBlink 1s steps(1) infinite;
        }
        @keyframes npBlink {
          50% {
            opacity: 0;
          }
        }

        .np-copy {
          font-size: 17px;
          line-height: 1.55;
          max-width: 46ch;
          color: #3a3735;
          margin: 0 0 34px;
        }

        .np-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 44px;
        }
        .np-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 28px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          border-radius: 0;
        }
        .np-btn-primary {
          background: var(--red);
          color: var(--ink);
          transition: background-color 150ms ease;
        }
        .np-btn-primary:hover {
          background: #17935f;
        }
        .np-btn-outline {
          border: 2px solid var(--ink);
          color: var(--ink);
          background: transparent;
          transition:
            background-color 150ms ease,
            color 150ms ease;
        }
        .np-btn-outline:hover {
          background: var(--ink);
          color: var(--ground);
        }

        .np-rule-h {
          height: 2px;
          background: var(--ink);
          opacity: 0.15;
          margin-bottom: 20px;
          max-width: 420px;
        }
        .np-note {
          font-size: 14px;
          color: #3a3735;
          margin: 0;
        }
        .np-note-num {
          color: var(--red);
          font-weight: 700;
          font-family: ui-monospace, Menlo, Consolas, monospace;
        }

        .np-right {
          position: relative;
          overflow: hidden;
          background: #eae8e7;
          min-height: 520px;
        }

        .np-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(0deg, rgba(32, 30, 29, 0.06) 0 1px, transparent 1px 64px),
            repeating-linear-gradient(90deg, rgba(32, 30, 29, 0.06) 0 1px, transparent 1px 64px);
        }

        .np-null-mark {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
          font-size: clamp(4rem, 11vw, 9rem);
          color: var(--ink);
          z-index: 2;
          animation: npNullOut 0.7s ease forwards;
          animation-delay: 0.05s;
        }
        @keyframes npNullOut {
          to {
            opacity: 0;
            transform: scale(0.3);
          }
        }

        .np-frame {
          position: absolute;
          top: clamp(104px, 15vw, 148px);
          right: clamp(24px, 5vw, 64px);
          bottom: clamp(24px, 5vw, 64px);
          left: clamp(24px, 5vw, 64px);
          display: flex;
          border: 2px solid var(--ink);
          background: #fff;
          z-index: 1;
          opacity: 0;
          transform: scale(0.96);
          animation: npFrameIn 0.6s ease forwards;
          animation-delay: 0.35s;
        }
        @keyframes npFrameIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .np-pane {
          flex: 1 1 50%;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .np-pane-code {
          background: var(--ink);
          color: #cfcac7;
          position: relative;
          border-right: 2px solid var(--ink);
        }
        .np-pane-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }
        .np-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
        }
        .np-dot-r {
          background: #ec3013;
        }
        .np-dot-y {
          background: #d9c94a;
        }
        .np-dot-g {
          background: #5fae65;
        }
        .np-tab {
          margin-left: 8px;
          font-size: 11px;
          color: #8a8582;
          font-family: ui-monospace, monospace;
        }

        .np-code {
          padding: 14px 16px;
          font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
          font-size: 12.5px;
          line-height: 1.75;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1px;
          overflow: hidden;
        }
        .np-line {
          display: inline-block;
          white-space: pre;
          overflow: hidden;
          width: 0;
          animation-name: npType;
          animation-duration: var(--dur);
          animation-delay: var(--start);
          animation-timing-function: steps(var(--chars));
          animation-fill-mode: forwards;
        }
        @keyframes npType {
          to {
            width: calc(var(--chars) * 1ch);
          }
        }
        .np-punct {
          color: var(--red);
        }
        .np-line-scroll {
          width: calc(var(--chars) * 1ch);
        }

        .np-progress-track {
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          position: relative;
          flex-shrink: 0;
        }
        .np-progress-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: var(--red);
        }

        .np-pane-preview {
          background: #fff;
          position: relative;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
        }

        .np-scanline {
          position: absolute;
          left: 0;
          right: 0;
          top: -30%;
          height: 30%;
          background: linear-gradient(180deg, transparent, rgba(31, 169, 113, 0.16), transparent);
          animation: npScan 4.5s linear infinite;
          pointer-events: none;
        }
        @keyframes npScan {
          from {
            transform: translateY(0%);
          }
          to {
            transform: translateY(430%);
          }
        }

        .np-p-nav {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--ink);
          flex-shrink: 0;
        }
        .np-p-logo {
          width: 16px;
          height: 16px;
          background: var(--ink);
          flex-shrink: 0;
        }
        .np-p-pill {
          width: 54px;
          height: 8px;
          background: #d8d5d3;
        }

        .np-p-h1 {
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 800;
          line-height: 1.2;
          flex-shrink: 0;
        }
        .np-p-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-shrink: 0;
        }
        .np-bar {
          display: block;
          height: 7px;
          background: #d8d5d3;
          width: 100%;
        }
        .np-bar-short {
          width: 60%;
        }
        .np-p-cta {
          align-self: flex-start;
          background: var(--red);
          color: var(--ink);
          font-weight: 700;
          font-size: 12px;
          padding: 9px 16px;
          flex-shrink: 0;
        }

        :global(.np-photo) {
          background: linear-gradient(135deg, #e6e4e2, #cdd3cb);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(32, 30, 29, 0.32);
        }
        :global(.np-photo svg) {
          width: 26%;
          height: 26%;
          min-width: 14px;
          min-height: 14px;
        }

        :global(.np-p-figure) {
          height: 62px;
          flex-shrink: 0;
        }
        :global(.np-p-figure-wide) {
          height: 54px;
          flex-shrink: 0;
        }

        .np-p-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8a8582;
          flex-shrink: 0;
        }

        .np-p-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          flex-shrink: 0;
        }
        .np-p-card {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        :global(.np-p-card-photo) {
          height: 30px;
        }
        .np-p-card-line {
          display: block;
          height: 5px;
          background: #d8d5d3;
          width: 100%;
        }
        .np-p-card-line-short {
          width: 65%;
        }

        .np-p-gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          flex-shrink: 0;
        }
        :global(.np-p-gallery-item) {
          height: 40px;
        }

        .np-p-footer {
          height: 24px;
          background: #f1efee;
          border-top: 2px solid var(--ink);
          flex-shrink: 0;
        }
        .np-p-done {
          height: 0;
        }

        .np-ghost {
          position: absolute;
          top: 0;
          left: 0;
          width: 14px;
          height: 14px;
          margin: -7px 0 0 -7px;
          border: 2px solid var(--red);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition:
            transform 90ms linear,
            opacity 150ms ease;
          z-index: 5;
        }

        .np-scroll-hint {
          position: absolute;
          left: 20px;
          bottom: 16px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--ink);
          opacity: 0.7;
          z-index: 2;
        }

        @supports (animation-timeline: scroll()) {
          .np-line-scroll {
            width: 0;
            animation-name: npType;
            animation-duration: 1ms;
            animation-fill-mode: both;
            animation-timing-function: steps(var(--chars));
            animation-timeline: scroll(root);
            animation-range: var(--range-start) var(--range-end);
          }
          .np-progress-fill {
            width: 0%;
            animation-name: npProgress;
            animation-duration: 1ms;
            animation-fill-mode: both;
            animation-timeline: scroll(root);
            animation-range: var(--range-start) var(--range-end);
          }
          :global(.np-p-scroll) {
            opacity: 0;
            transform: translateY(14px);
            animation-name: npReveal;
            animation-duration: 1ms;
            animation-fill-mode: both;
            animation-timeline: scroll(root);
            animation-range: var(--range-start) var(--range-end);
          }
          .np-scroll-hint {
            animation-name: npHintOut;
            animation-duration: 1ms;
            animation-fill-mode: both;
            animation-timeline: scroll(root);
            animation-range: 0vh 12vh;
          }
        }
        @keyframes npProgress {
          to {
            width: 100%;
          }
        }
        @keyframes npReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes npHintOut {
          to {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .np-null-mark {
            display: none;
          }
          .np-frame {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
          .np-line,
          .np-line-scroll {
            width: calc(var(--chars) * 1ch) !important;
            animation: none !important;
          }
          .np-progress-fill {
            width: 100% !important;
            animation: none !important;
          }
          .np-p-nav,
          .np-p-h1,
          .np-p-text,
          .np-p-cta,
          :global(.np-p-scroll) {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
          .np-scanline {
            animation: none !important;
            opacity: 0 !important;
          }
          .np-caret {
            animation: none !important;
          }
          .np-scroll-hint {
            display: none !important;
          }
          .np-ghost {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
