import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";

const image = ["/pedas_ori/1.jpeg", "/pedas_ori/2.jpeg", "/pedas_ori/3.jpeg"];

export default function ThumbCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      watchDrag: false,
    },
  );
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollTo = (index) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };
  return (
    <>
      <div className="overflow-hidden w-1/2" ref={emblaRef}>
        <div className="flex">
          {image.map((imageUrl, index) => (
            <div
              className="w-full flex flex-none items-center"
              key={index}
              onClick={() => scrollTo(index)}
            >
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {image.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-2 ${
                index === selectedIndex ? "bg-red-500" : "bg-gray-300"
              }`}
              onClick={() => scrollTo(index)}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}
