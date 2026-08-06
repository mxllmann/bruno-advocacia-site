"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type LocationMapProps = {
  src: string;
  directionsHref: string;
};

export function LocationMap({ src, directionsHref }: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadMap(true);
        observer.disconnect();
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-72 overflow-hidden rounded-xl border border-border bg-surface sm:min-h-80"
      aria-busy={shouldLoadMap && !mapReady}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          mapReady ? "opacity-0" : "opacity-100",
        )}
        style={{
          backgroundImage:
            "linear-gradient(rgba(194,168,120,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(194,168,120,0.07) 1px, transparent 1px), radial-gradient(circle at 66% 44%, rgba(194,168,120,0.15), transparent 27%)",
          backgroundSize: "34px 34px, 34px 34px, auto",
        }}
      >
        <div className="absolute left-[17%] top-[29%] h-px w-[57%] bg-gold/20" />
        <div className="absolute left-[41%] top-[16%] h-[66%] w-px rotate-[33deg] bg-gold/15" />
        <div className="absolute left-[66%] top-[44%] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/35 bg-background/85 text-gold shadow-[0_0_0_10px_rgba(194,168,120,0.06)]">
          <MapPin className="h-5 w-5" strokeWidth={1.5} />
        </div>
      </div>

      {shouldLoadMap && (
        <iframe
          title="Localização — Ramos & Pereira Advocacia"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setMapReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full border-0 transition-opacity duration-700",
            mapReady ? "opacity-100" : "opacity-0",
          )}
          allowFullScreen
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-background/10" />

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
        <div className="pointer-events-none max-w-[13rem] border-l border-gold/60 pl-3 text-xs leading-relaxed text-foreground/90 drop-shadow-md">
          <p className="font-medium">Ramos & Pereira Advocacia</p>
          <p className="text-muted-foreground">Itacorubi, Florianópolis</p>
        </div>
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-gold/45 bg-background/90 px-4 text-xs font-medium text-gold shadow-lg backdrop-blur-sm transition-colors hover:border-gold hover:bg-surface"
        >
          Abrir no Maps
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
        </a>
      </div>
    </div>
  );
}
