import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const TAG_STYLES: Record<Project["tag"], string> = {
  Prototype: "text-signal border-signal/40",
  Reference: "text-ash border-hairline",
  "Coming soon": "text-ash border-hairline",
};

export function WorkCard({ project }: { project: Project }) {
  const cardClassName = cn(
    "group relative block aspect-[4/3] overflow-hidden rounded-lg border border-hairline",
    project.href && "cursor-pointer"
  );

  const mock = (
    <div
      data-card-image
      className="absolute inset-[-8%] will-change-transform"
      style={{
        background: `linear-gradient(155deg, ${project.gradient[0]}, ${project.gradient[1]})`,
      }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="h-2.5 w-2.5 rounded-sm bg-white/25" />
        <div className="flex gap-1.5">
          <div className="h-1.5 w-6 rounded-full bg-white/15" />
          <div className="h-1.5 w-6 rounded-full bg-white/15" />
          <div className="h-1.5 w-6 rounded-full bg-white/15" />
        </div>
      </div>
      <div className="px-5 pt-8">
        <div className="mb-2 h-2.5 w-3/5 rounded-full bg-white/25" />
        <div className="mb-1.5 h-1.5 w-4/5 rounded-full bg-white/10" />
        <div className="mb-4 h-1.5 w-3/5 rounded-full bg-white/10" />
        <div className="mb-5 inline-block rounded-full bg-signal/90 px-3 py-1.5 text-[9px] font-semibold text-void">
          Learn more
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-square rounded-sm bg-white/10" />
          <div className="aspect-square rounded-sm bg-white/10" />
          <div className="aspect-square rounded-sm bg-white/10" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex shrink-0 flex-col" style={{ width: project.width, marginTop: project.offsetY }}>
      {project.href ? (
        <Link href={project.href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
          {mock}
        </Link>
      ) : (
        <div className={cardClassName}>{mock}</div>
      )}

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-medium text-chalk">{project.industry}</h3>
          <p className="mt-1 max-w-[32ch] text-sm text-ash">{project.description}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium",
            TAG_STYLES[project.tag]
          )}
        >
          {project.tag}
        </span>
      </div>
    </div>
  );
}
