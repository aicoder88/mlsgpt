import Image from "next/image";

import { cn } from "@/lib/cn";
import { generatedImages } from "@/lib/generated-images";
import { placeholderById } from "@/lib/image-placeholders";

type ImagePlaceholderProps = {
  id: string;
  className?: string;
  priority?: boolean;
};

export function ImagePlaceholder({ id, className, priority }: ImagePlaceholderProps) {
  const spec = placeholderById[id];

  if (!spec) {
    return null;
  }

  const resolved = generatedImages[id];

  if (resolved) {
    return (
      <div
        className={cn("relative overflow-hidden rounded-2xl border border-line/60 bg-surface", className)}
        style={{ aspectRatio: spec.aspectRatio }}
      >
        <Image
          src={resolved}
          alt={spec.label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-dashed border-accent/35 bg-gradient-to-br from-white via-[#f8fbff] to-[#eef8f4] p-4",
        className
      )}
      style={{ aspectRatio: spec.aspectRatio }}
      data-antigravity="image-placeholder"
      data-placeholder-id={spec.id}
      data-placeholder-label={spec.label}
      data-placeholder-aspect={spec.aspectRatio}
      data-placeholder-prompt={spec.prompt}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_5%,rgba(9,187,140,0.18),transparent_40%)]" />
      <div className="relative flex h-full flex-col justify-between rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Image Placeholder</p>
          <h4 className="mt-2 text-lg font-semibold text-ink">{spec.label}</h4>
          <p className="mt-1 text-xs text-ink/70">ID: {spec.id}</p>
        </div>
        <p className="line-clamp-4 rounded-lg border border-line/70 bg-[#fffefb] p-3 text-xs text-ink/75">
          {spec.prompt}
        </p>
      </div>
    </div>
  );
}
