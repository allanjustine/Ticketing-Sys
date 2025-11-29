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
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!api || !images || !image) return;

    const index = images.findIndex((item) => item === image);
    if (index >= 0) {
      api.scrollTo(index);
    }
  }, [api, images, image]);

  useEffect(() => {
    const button = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextRef.current?.click();
      } else if (e.key === "ArrowLeft") {
        prevRef.current?.click();
      }
    };

    document.addEventListener("keydown", button);
  }, []);

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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={Storage(item)} target="_blank">
                    <FileInput className="text-blue-500 hover:text-blue-600 w-full h-full" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Download/View</TooltipContent>
              </Tooltip>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <>
          <CarouselPrevious ref={prevRef} />
          <CarouselNext ref={nextRef} />
        </>
      )}
    </Carousel>
  );
}
