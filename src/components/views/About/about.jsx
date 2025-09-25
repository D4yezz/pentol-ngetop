import ImageAbout from "@/components/layout/isiAbout/image";
import TextAbout from "@/components/layout/isiAbout/text";

export default function About() {
  return (
    <>
      <section className="h-[120vh] font-poppins flex flex-col justify-start items-center gradiasi-btn-merah py-6 px-16 rounded-t-[5vw] shadow-[0px_-5px_16px] shadow-black/20">
        <div className="flex h-full w-full items-center justify-around ">
          <ImageAbout />
          <TextAbout />
        </div>
      </section>
    </>
  );
}
