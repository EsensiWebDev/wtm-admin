import Image from "next/image";
import * as React from "react";

interface ImageGridProps {
  images: {
    title: string;
    src?: string;
    alt?: string;
  }[];
  className?: string;
}

export function ImageGrid({ images, className }: ImageGridProps) {
  return (
    <div className={`w-full grid gap-4 md:gap-6 ${className}`}>
      {/* Mobile Layout: Single column */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {images.map((image) => (
          <div key={image.title} className="flex flex-col">
            <p className="font-medium tracking-tight mb-2">{image.title}</p>
            <div className="w-full aspect-square rounded-lg border border-dashed flex justify-center items-center text-lg">
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt || image.title}
                  className="w-full h-full object-cover rounded-lg"
                  width={400}
                  height={400}
                />
              ) : (
                <span className="text-muted-foreground">
                  {image.src === undefined
                    ? "no image uploaded"
                    : "image not found"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet Layout: 2 columns */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        {images.map((image) => (
          <div key={image.title} className="flex flex-col">
            <p className="font-medium tracking-tight mb-2">{image.title}</p>
            <div className="w-full aspect-square rounded-lg border border-dashed flex justify-center items-center text-lg">
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt || image.title}
                  className="w-full h-full object-cover rounded-lg"
                  width={400}
                  height={400}
                />
              ) : (
                <span className="text-muted-foreground">
                  {image.src === undefined
                    ? "no image uploaded"
                    : "image not found"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout: 2x2 grid */}
      <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-6">
        {images.map((image) => (
          <div key={image.title} className="flex flex-col">
            <p className="font-medium tracking-tight mb-2">{image.title}</p>
            <div className="w-full aspect-square rounded-lg border border-dashed flex justify-center items-center text-lg">
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt || image.title}
                  className="w-full h-full object-cover rounded-lg"
                  width={400}
                  height={400}
                />
              ) : (
                <span className="text-muted-foreground">
                  {image.src === undefined
                    ? "no image uploaded"
                    : "image not found"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
