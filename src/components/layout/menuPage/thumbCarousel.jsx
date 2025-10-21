import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useInView } from "framer-motion";

export default function ThumbCarousel({ images, varian }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); 

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="flex lg:flex-row flex-col items-center lg:w-2/3 w-full lg:h-[80vh] h-fit lg:gap-4 gap-2"
    >
      <div className="lg:order-1 order-2 flex lg:flex-col flex-row justify-center lg:gap-4 gap-2 lg:w-1/4 w-full h-full">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`w-full lg:h-full h-20 lg:rounded-3xl rounded-2xl overflow-hidden transition-all duration-200 ${
              selectedIndex === index
                ? "ring-2 ring-yellow-400"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img.image_url}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="lg:order-2 order-1 lg:w-3/4 w-full h-full overflow-hidden lg:rounded-3xl rounded-2xl relative">
        <img
          src={images[selectedIndex].image_url}
          alt={`Main Image ${selectedIndex}`}
          className="w-full h-full object-cover transition-all duration-300"
        />
        {varian && (
          <p className="absolute top-5 right-5 text-lg font-semibold font-instrument gradiasi-btn-merah text-yellow-300 w-fit py-1.5 px-6 rounded-full">
            {varian}
          </p>
        )}
      </div>
    </motion.div>
  );
}
