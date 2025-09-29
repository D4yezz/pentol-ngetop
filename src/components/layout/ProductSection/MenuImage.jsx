"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export default function MenuImage({ images }) {
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        className={"w-full h-full items-center flex justify-center"}
      >
        <div className="gradiasi-btn-merah rounded-full overflow-hidden lg:h-90 md:h-70 lg:w-90 md:w-70 w-60 h-60 flex items-center justify-center shadow-xl">
          <CarouselContent>
            {images.map((image, index) => {
              return (
                <CarouselItem key={index}>
                  <div
                    className="mx-auto lg:w-80 md:w-60 lg:h-80 md:h-60 w-50 h-50 bg-center rounded-full overflow-hidden bg-cover"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </div>
        <CarouselPrevious
          className={
            "bottom-0 right-1/2 mr-4 lg:mb-0.5 -mb-16 scale-[130%] gradiasi-btn-merah text-white hover:text-yellow-300 border-0"
          }
          size="w-20"
        />
        <CarouselNext
          className={
            "bottom-0 left-1/2 ml-4 lg:mb-0.5 -mb-16 scale-[130%] gradiasi-btn-merah text-white hover:text-yellow-300 border-0"
          }
        />
      </Carousel>
    </>
  );
}
