

"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ImageCarousel() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // main carousel
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  // thumbnails
  const [thumbRef] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });

  const slides = [
    { id: 1, img: "/pentol.jpg" },
    { id: 2, img: "/pentol2.jpg" },
    { id: 3, img: "/pentol3.jpg" },
    { id: 4, img: "/pentol4.jpeg" },
  ];

  // update index kalau digeser
  React.useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => setSelectedIndex(mainApi.selectedScrollSnap());
    mainApi.on("select", onSelect);
    onSelect();
  }, [mainApi]);

  // klik thumbnail → pindah main carousel
  const scrollTo = (index) => {
    if (!mainApi) return;
    mainApi.scrollTo(index);
  };

  return (
    <div className="w-full max-w-md">
      {/* Main carousel */}
      <div className="overflow-hidden" ref={mainRef}>
        <div className="flex">
          {slides.map((item, index) => (
            <div
              className="min-w-full p-2"
              key={item.id}
            >
              <Card>
                <CardContent className="flex aspect-video items-center justify-center">
                  <img
                    src={item.img}
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full object-cover rounded"
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail carousel */}
      <div className="mt-4 overflow-hidden" ref={thumbRef}>
        <div className="flex">
          {slides.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollTo(index)}
              className={`mx-1 h-16 w-16 overflow-hidden rounded border 
                ${index === selectedIndex ? "border-blue-600" : "border-gray-300 opacity-60"}`}
            >
              <img
                src={item.img}
                alt={`Thumb ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

