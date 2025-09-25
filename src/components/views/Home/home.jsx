import ImageWelcome from "@/components/layout/welcome/imageWelcome";
import TeksWelcome from "@/components/layout/welcome/teks";

export default function Beranda() {
  return (
    <>
      <main className="font-quicksand w-full md:h-[90vh] h-fit flex flex-col justify-center items-center z-10 relative">
        <div className="w-full flex md:flex-row flex-col justify-between items-center py-6 md:px-32 px-8 md:my-4 mt-4 mb-14 h-full md:gap-0 gap-12">
          <TeksWelcome />
          <ImageWelcome />
        </div>
      </main>
    </>
  );
}
