import ImageWelcome from "@/components/layout/welcome/imageWelcome";
import TeksWelcome from "@/components/layout/welcome/teks";

export default function Beranda() {
  return (
    <>
      <main className="font-quicksand w-full lg:h-[100vh] h-fit flex flex-col justify-center items-center z-10 relative">
        <div className="w-full flex lg:flex-row flex-col justify-between items-center py-6 lg:px-32 px-8 lg:my-4 mt-14 mb-20 h-full lg:gap-0 gap-18">
          <TeksWelcome />
          <ImageWelcome />
        </div>
      </main>
    </>
  );
}
