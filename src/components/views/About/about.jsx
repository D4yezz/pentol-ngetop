import ImageAbout from "@/components/layout/isiAbout/image";
import TextAbout from "@/components/layout/isiAbout/text";

export default function About() {
  return (
    <>
      <section
        id="tentang-kami"
        className="lg:h-[120vh] h-fit font-poppins flex flex-col justify-start items-center gradiasi-btn-merah lg:py-16 py-10 lg:px-16 px-8 rounded-t-[5vw] shadow-[0px_-5px_16px] shadow-black/20 overflow-hidden"
      >
        <div className="flex lg:flex-row flex-col h-full w-full items-center justify-around lg:gap-0 gap-10">
          <ImageAbout />
          <TextAbout />
        </div>
      </section>
    </>
  );
}
