"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Nuclei carry orbiting electrons. */
  nucleus: boolean;
  orbit: number;
  phase: number;
  tilt: number;
}

const LINK_DISTANCE = 150;

/**
 * Canvas background: drifting nodes joined by lines that fade with distance,
 * with a few nodes acting as atoms (a nucleus with orbiting electrons).
 * Draws one static frame when the visitor prefers reduced motion.
 */
export default function AtomicField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const parent = canvas?.parentElement;
    if (!canvas || !ctx || !parent) return;

    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-cream")
      .trim();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;

    const seed = () => {
      const count = Math.max(24, Math.min(70, Math.round((width * height) / 20000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        nucleus: i % 5 === 0,
        orbit: 16 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
        tilt: Math.random() * Math.PI,
      }));
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK_DISTANCE) continue;
          ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.28;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.globalAlpha = n.nucleus ? 0.8 : 0.45;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.nucleus ? 3 : 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (!n.nucleus) continue;
        ctx.globalAlpha = 0.18;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(n.x, n.y, n.orbit, n.orbit * 0.4, n.tilt, 0, Math.PI * 2);
        ctx.stroke();

        const angle = n.phase + time * 0.0015;
        const ex = Math.cos(angle) * n.orbit;
        const ey = Math.sin(angle) * n.orbit * 0.4;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(
          n.x + ex * Math.cos(n.tilt) - ey * Math.sin(n.tilt),
          n.y + ex * Math.sin(n.tilt) + ey * Math.cos(n.tilt),
          1.8,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      if (visible) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
        draw(time);
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(canvas);
    if (!reduceMotion) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className ?? ""}`}
    />
  );
}
