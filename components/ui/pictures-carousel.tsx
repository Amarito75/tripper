import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PicturesCarouselProps {
  image: string;
}

export function PicturesCarousel({ image }: PicturesCarouselProps) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {/* {images.map((image, index) => ( */}
        <CarouselItem>
          <div className="p-1">
            <Image
              src={image}
              alt="Product image"
              height={1000}
              width={1000}
              className="rounded-xl h-52 w-full object-fit"
            />
          </div>
        </CarouselItem>
        {/* ))} */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
