import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useInView } from "framer-motion";

export default function ThumbCarousel({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="flex lg:flex-row flex-col items-center lg:w-2/3 w-full lg:gap-4 gap-2"
    >
      <div className="lg:order-1 order-2 flex lg:flex-col flex-row justify-center lg:gap-4 gap-2 lg:w-1/4 w-full">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`w-full lg:h-40 h-20 lg:rounded-3xl rounded-2xl overflow-hidden transition-all duration-200 ${
              selectedIndex === index
                ? ""
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="lg:order-2 order-1 lg:w-3/4 w-full h-full overflow-hidden lg:rounded-3xl rounded-2xl">
        <img
          src={images[selectedIndex]}
          alt={`Main Image ${selectedIndex}`}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>
    </motion.div>
  );
}
