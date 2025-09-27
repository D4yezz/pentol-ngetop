import { useInView } from "framer-motion";
import { CookingPot, Soup } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function ImageWelcome() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <>
      <motion.section
        ref={ref}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="lg:w-[45%] w-full h-full flex items-center justify-end lg:px-18 px-8 relative"
      >
        <div className="lg:w-78 lg:h-96 w-full h-fit lg:rounded-full rounded-4xl overflow-hidden border-8 lg:border-red-800 border-t-yellow-300 border-r-yellow-300 border-l-red-800 border-b-red-800 group shadow-[0px_6px_12px] shadow-red-800/60">
          <img
            src="/pentol.jpg"
            alt=""
            className="object-cover w-full h-full lg:border-4 border-yellow-300 lg:rounded-full group-hover:scale-105 duration-300 ease-in-out"
          />
        </div>
        <CookingPot
          size={30}
          className="visible lg:invisible w-fit h-fit absolute top-20 right-2 text-yellow-300 gradiasi-btn-merah p-3 rounded-[1.3rem] shadow-xl rotate-12 border-4 border-yellow-300"
        />
        <Soup
          size={30}
          className="visible lg:invisible w-fit h-fit absolute bottom-20 left-2 text-red-800 bg-yellow-300 p-3 rounded-[1.3rem] shadow-xl -rotate-12 border-4 border-red-800"
        />
      </motion.section>
    </>
  );
}
