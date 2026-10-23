import Image from "next/image";
import { CalendarDays, Crosshair, Wrench } from "lucide-react";
import CornerMarks from "@/components/svg/CornerMarks";
import PaperSheet from "@/components/svg/PaperSheet";
import type { Project } from "@/types";

interface ProjectSheetProps {
  project: Project;
  index: number;
  total: number;
}

/**
 * One project on a large torn sheet of paper that fills its slide. The image is
 * the flexible element, so the details always stay inside the paper.
 *
 * Three layouts: stacked on phones (portrait), and image-left / details-right
 * from `lg` and on phones held sideways (`land`).
 */
export default function ProjectSheet({ project, index, total }: ProjectSheetProps) {
  return (
    <PaperSheet
      flip={index % 2 === 1}
      className="mx-auto h-full max-h-[50rem] w-full max-w-[78rem] text-forest"
    >
      <div className="absolute inset-0 flex flex-col gap-3 px-9 py-10 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-6 lg:px-20 lg:py-16 short:lg:py-12 land:grid land:grid-cols-12 land:grid-rows-[auto_1fr] land:gap-x-8 land:gap-y-3 land:px-14 land:py-8">
        <div
          data-sheet-item
          className="flex flex-wrap items-center gap-x-3 gap-y-1.5 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:flex-col lg:items-start lg:gap-0 land:col-span-5 land:col-start-8 land:row-start-1 land:flex-col land:items-start land:gap-0"
        >
          <span className="rounded-full bg-forest px-3.5 py-1 text-sm font-semibold tabular-nums text-cream lg:mb-4 land:mb-2">
            {index + 1}/{total}
          </span>
          <span className="text-sm font-light text-forest/70 lg:text-xl land:text-sm">
            {project.category}
          </span>
          <h3 className="w-full font-heading text-xl font-extrabold leading-tight tracking-tight lg:text-3xl short:lg:text-2xl land:text-lg 2xl:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 hidden leading-relaxed text-forest/75 lg:block short:hidden">
            {project.description}
          </p>
        </div>

        <div className="relative min-h-32 flex-1 lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-0 land:col-span-7 land:col-start-1 land:row-span-2 land:row-start-1 land:min-h-0">
          <div
            data-sheet-image
            className="relative size-full overflow-hidden rounded-md border border-forest/30 bg-forest-deep"
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 700px, 90vw"
              className="object-cover"
            />
            <span
              aria-hidden
              data-scan
              className="absolute inset-y-0 left-0 w-0.5 bg-bordo"
            />
          </div>
          <CornerMarks className="text-bordo" />
        </div>

        <dl
          data-sheet-item
          className="flex flex-col gap-2.5 text-xs lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:gap-4 lg:self-end lg:text-sm land:col-span-5 land:col-start-8 land:row-start-2 land:gap-2 land:self-end land:text-xs"
        >
          <div className="short:portrait:hidden tiny:hidden">
            <dt className="flex items-center gap-1.5 text-forest/60">
              <Crosshair className="size-3.5 text-bordo lg:size-4" aria-hidden />
              Scope
            </dt>
            <dd className="mt-1">
              <p className="font-semibold leading-snug lg:hidden land:hidden">
                {project.scope.join(" · ")}
              </p>
              <ul className="hidden flex-col gap-0.5 font-semibold leading-snug lg:flex land:flex">
                {project.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <dt className="flex items-center gap-1.5 text-forest/60">
                <CalendarDays className="size-3.5 text-bordo lg:size-4" aria-hidden />
                Date
              </dt>
              <dd className="mt-1 font-semibold">{project.date}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-forest/60">
                <Wrench className="size-3.5 text-bordo lg:size-4" aria-hidden />
                Tool
              </dt>
              <dd className="mt-1 font-semibold">{project.tools.join(", ")}</dd>
            </div>
          </div>
        </dl>
      </div>
    </PaperSheet>
  );
}
