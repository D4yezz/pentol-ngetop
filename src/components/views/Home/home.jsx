import ImageWelcome from "@/components/layout/welcome/imageWelcome";
import TeksWelcome from "@/components/layout/welcome/teks";

export default function Beranda() {
  return (
    <>
      <main className="font-quicksand h-[80vh] flex flex-col justify-center">
        <div className="flex justify-between items-center py-4 px-16 mx-8 my-4 h-full">
          <TeksWelcome />
          <ImageWelcome/>
        </div>
      </main>
    </>
  );
}
