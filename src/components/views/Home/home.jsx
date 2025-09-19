import ImageWelcome from "@/components/layout/welcome/imageWelcome";
import TeksWelcome from "@/components/layout/welcome/teks";

export default function Beranda() {
  return (
    <>
      <main className="font-quicksand w-full h-[90vh] flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center py-6 px-32 my-4 h-full">
          <TeksWelcome />
          <ImageWelcome/>
        </div>
      </main>
    </>
  );
}
