"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Scale,
  Plane,
  ShoppingBag,
  Banknote,
  ShieldCheck,
  Landmark,
  Receipt,
  HeartHandshake,
  Briefcase,
  Building2,
  HardHat,
  Gavel,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { practiceAreas } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MagicCard } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<string, LucideIcon> = {
  scale: Scale,
  plane: Plane,
  "shopping-bag": ShoppingBag,
  banknote: Banknote,
  "shield-check": ShieldCheck,
  landmark: Landmark,
  receipt: Receipt,
  "heart-handshake": HeartHandshake,
  briefcase: Briefcase,
  "building-2": Building2,
  "hard-hat": HardHat,
  gavel: Gavel,
};

type Area = (typeof practiceAreas)[number];

const cardMagicProps = {
  className: "rounded-2xl",
  gradientSize: 160,
  gradientColor: "color-mix(in oklab, var(--gold) 20%, transparent)",
  gradientOpacity: 0.55,
} as const;

/** Shared icon and title row for the compact and expanded card states. */
function CardHead({
  Icon,
  title,
  isOpen = false,
  children,
}: {
  Icon: LucideIcon;
  title: string;
  isOpen?: boolean;
  children?: ReactNode;
}) {
  return (
    <article className="relative rounded-[inherit] bg-surface/40 p-4">
      <div className="flex min-h-11 items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/20 bg-gold/[0.06] text-gold transition-colors duration-300 ease-out group-hover:border-gold/45">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <div className="flex min-h-11 min-w-0 flex-1 flex-col justify-center">
          <h3 className="font-serif text-[0.98rem] leading-snug text-foreground/90">
            {title}
          </h3>
        </div>
      </div>
      <ChevronDown
        aria-hidden
        className={cn(
          "absolute right-4 top-7 h-4 w-4 text-gold transition-transform duration-300 ease-out",
          isOpen && "rotate-180",
        )}
        strokeWidth={1.5}
      />
      {children}
    </article>
  );
}

function PracticeCard({
  area,
  index,
  isOpen,
  onToggle,
  isMeasurement = false,
}: {
  area: Area;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isMeasurement?: boolean;
}) {
  const Icon = icons[area.icon] ?? Scale;
  const content = (
    <CardHead Icon={Icon} title={area.title} isOpen={isOpen}>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pt-1.5 text-sm leading-relaxed text-muted-foreground">
            {area.description}
          </p>
        </div>
      </div>
    </CardHead>
  );

  return (
    <div
      data-practice-card={isMeasurement ? undefined : index}
      data-practice-measure-card={isMeasurement ? index : undefined}
    >
      <MagicCard {...cardMagicProps}>
        {isMeasurement ? (
          <div className="block w-full text-left">{content}</div>
        ) : (
          <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="block w-full cursor-pointer text-left"
        >
            {content}
          </button>
        )}
      </MagicCard>
    </div>
  );
}

function AreaColumns({
  columns,
  className,
  openIndex,
  onToggle,
  reservedHeight,
}: {
  columns: number;
  className: string;
  openIndex: number | null;
  onToggle: (index: number) => void;
  reservedHeight?: number;
}) {
  const areasByColumn = Array.from({ length: columns }, (_, columnIndex) =>
    practiceAreas
      .map((area, index) => ({ area, index }))
      .filter(({ index }) => index % columns === columnIndex),
  );

  return (
    <div
      data-practice-layout={columns}
      className={cn("grid items-start gap-4", className)}
      style={reservedHeight ? { minHeight: reservedHeight } : undefined}
    >
      {areasByColumn.map((areas, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-col gap-4">
          {areas.map(({ area, index }) => (
            <Reveal key={area.title} index={index % columns} className="relative">
              <PracticeCard
                area={area}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => onToggle(index)}
              />
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}

export function PracticeAreas() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [reservedHeight, setReservedHeight] = useState<number>();
  const gridRef = useRef<HTMLDivElement>(null);

  // Reserve exactly the space required by the tallest possible open column.
  // That lets cards use their natural height without moving the Team section.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let frame = 0;
    const measure = () => {
      frame = requestAnimationFrame(() => {
        const layout = Array.from(
          grid.querySelectorAll<HTMLElement>("[data-practice-layout]"),
        ).find((element) => element.offsetParent !== null);
        if (!layout) return;

        const columns = Number(layout.dataset.practiceLayout);
        const cards = Array.from(
          layout.querySelectorAll<HTMLElement>("[data-practice-card]"),
        );
        const measuredCards = Array.from(
          grid.querySelectorAll<HTMLElement>("[data-practice-measure-card]"),
        );
        const firstColumn = layout.firstElementChild;
        if (!columns || !firstColumn || cards.length !== practiceAreas.length) return;

        const gap = Number.parseFloat(getComputedStyle(firstColumn).rowGap) || 0;
        const closedByColumn = Array.from({ length: columns }, () => 0);
        const cardCountByColumn = Array.from({ length: columns }, () => 0);
        const closedHeights = new Map<number, number>();
        const openHeights = new Map<number, number>();

        for (const card of cards) {
          const index = Number(card.dataset.practiceCard);
          const height = card.getBoundingClientRect().height;
          closedHeights.set(index, height);
          closedByColumn[index % columns] += height;
          cardCountByColumn[index % columns] += 1;
        }

        for (const card of measuredCards) {
          openHeights.set(
            Number(card.dataset.practiceMeasureCard),
            card.getBoundingClientRect().height,
          );
        }

        const columnHeights = closedByColumn.map(
          (height, index) => height + Math.max(0, cardCountByColumn[index] - 1) * gap,
        );
        let nextHeight = Math.max(...columnHeights);

        for (const [index, closedHeight] of closedHeights) {
          const openHeight = openHeights.get(index);
          if (openHeight) {
            nextHeight = Math.max(
              nextHeight,
              columnHeights[index % columns] + openHeight - closedHeight,
            );
          }
        }

        const roundedHeight = Math.ceil(nextHeight);
        setReservedHeight((current) =>
          current === roundedHeight ? current : roundedHeight,
        );
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);
    measure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Escape or a click outside the grid dismisses the open card.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openIndex]);

  return (
    <section className="relative pb-4 pt-24 sm:pb-4 sm:pt-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          title="Soluções jurídicas para cada demanda"
          highlight="cada demanda"
          description="Atuação judicial e extrajudicial perante qualquer Tribunal ou Comarca do país, com atendimento personalizado, agilidade e ética."
        />

        <div id="areas" className="h-0 scroll-mt-24 sm:scroll-mt-28" />

        <div ref={gridRef} className="relative mt-16">
          {/* Each responsive layout is split into independent columns. A card
              therefore moves only the cards below it, never the whole row. The
              section reserves the height of one open card, keeping Team in
              place while that reserved room is used. */}
          <AreaColumns
            columns={1}
            className="grid-cols-1 sm:hidden"
            openIndex={openIndex}
            reservedHeight={reservedHeight}
            onToggle={(index) =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
          <AreaColumns
            columns={2}
            className="hidden grid-cols-2 sm:grid lg:hidden"
            openIndex={openIndex}
            reservedHeight={reservedHeight}
            onToggle={(index) =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
          <AreaColumns
            columns={3}
            className="hidden grid-cols-3 lg:grid xl:hidden"
            openIndex={openIndex}
            reservedHeight={reservedHeight}
            onToggle={(index) =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
          <AreaColumns
            columns={4}
            className="hidden grid-cols-4 xl:grid"
            openIndex={openIndex}
            reservedHeight={reservedHeight}
            onToggle={(index) =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
          <div
            aria-hidden
            className="pointer-events-none invisible absolute inset-x-0 top-0 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {practiceAreas.map((area, index) => (
              <PracticeCard
                key={area.title}
                area={area}
                index={index}
                isOpen
                isMeasurement
                onToggle={() => undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
