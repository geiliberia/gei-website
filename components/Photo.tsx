import Image from "next/image";
import type { images } from "@/lib/images";

type Img = (typeof images)[keyof typeof images];

export function Photo({ img, className = "", priority = false, sizes }: { img: Img; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      priority={priority}
      sizes={sizes ?? "(min-width: 1024px) 560px, 100vw"}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
