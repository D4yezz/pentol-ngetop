"use client";
import { Card, CardContent } from "@/components/ui/card";
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
        <div className="gradiasi-btn-merah rounded-full overflow-hidden h-90 w-90 flex items-center justify-center shadow-xl">
          <CarouselContent>
            {images.map((image, index) => {
              return (
                <CarouselItem key={index}>
                  <div className="p-3 ">
                    <div
                      className="mx-auto w-80 h-80 bg-center rounded-full overflow-hidden bg-cover"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </div>
        <CarouselPrevious
          className={
            "bottom-0 right-1/2 mr-4 mb-3 scale-[130%] gradiasi-btn-merah text-white hover:text-yellow-300 border-0"
          }
          size="w-20"
        />
        <CarouselNext
          className={
            "bottom-0 left-1/2 ml-4 mb-3 scale-[130%] gradiasi-btn-merah text-white hover:text-yellow-300 border-0"
          }
        />
      </Carousel>
    </>
  );
}
