import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Storage from "@/utils/storage";
import { FileInput } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { isImage } from "@/utils/image-format";
import { useEffect, useRef, useState } from "react";

interface CarouselProps {
  images: string[];
  image?: string;
}

export default function CarouselLayout({ images, image }: CarouselProps) {
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api || !images || !image) return;

    const index = images.findIndex((item) => item === image);
    if (index >= 0) {
      api.scrollTo(index);
    }
  }, [api, images, image]);

  useEffect(() => {
    const handleNextPrev = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        api.scrollNext();
      } else if (e.key === "ArrowLeft") {
        api.scrollPrev();
      }
    };

    window.addEventListener("keydown", handleNextPrev);

    return () => {
      window.removeEventListener("keydown", handleNextPrev);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {images.map((item: any, index: number) => (
          <CarouselItem
            key={index}
            className="flex items-center justify-center"
          >
            {isImage(item) ? (
              <div className="relative w-full h-screen">
                <Image
                  alt={`Image ${index}`}
                  src={item && Storage(item)}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="relative w-full h-screen">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={Storage(item)}
                      target="_blank"
                      title="Download/View"
                    >
                      <FileInput className="text-blue-500 hover:text-blue-600 w-full h-full" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Download/View</TooltipContent>
                </Tooltip>
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
