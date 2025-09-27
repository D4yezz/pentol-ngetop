import { useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function ImageAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex flex-col lg:w-[450px] w-fit lg:h-full h-fit py-8 gap-2"
      >
        <div className="h-1/2 w-full flex items-end gap-2">
          <div className="w-2/3 h-[270px] rounded-[0px_40px_0px_50px] overflow-hidden border-3 border-yellow-300 ">
            <img
              src="/pentol2.jpg"
              alt="1"
              className="object-cover w-full h-full "
            />
          </div>
          <div className="w-[200px] h-[200px] rounded-[40px_0px_50px_0px] overflow-hidden border-3 border-yellow-300 ">
            <img
              src="/pentol3.jpg"
              alt="2"
              className="object-cover w-full h-full "
            />
          </div>
        </div>
        <div className="h-1/2 w-full flex items-start gap-2">
          <div className="w-[200px] h-[200px] rounded-[40px_0px_50px_0px] overflow-hidden border-3 border-yellow-300 ">
            <img
              src="/pentol4.jpeg"
              alt="2"
              className="object-cover w-full h-full "
            />
          </div>
          <div className="w-2/3 h-[270px] rounded-[0px_40px_0px_50px] overflow-hidden border-3 border-yellow-300 ">
            <img
              src="/pentol5.jpeg"
              alt="1"
              className="object-cover w-full h-full "
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
