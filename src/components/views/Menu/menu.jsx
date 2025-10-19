import ThumbCarousel from "@/components/layout/menuPage/thumbCarousel";

export default function Menu() {
  return (
    <>
      <div className="w-full flex flex-col items-center pt-28 pb-8 px-8 font-poppins">
        <div className="w-full flex flex-col">
          <h1 className="text-6xl gradiasi-btn-merah text-transparent bg-clip-text font-semibold py-2">
            Menu Pentol Ngetop
          </h1>
          <p className="text-lg">Rasakan sensasi pedas nagih dengan menu pentol ngetop</p>
        </div>
        <div className="w-full flex">
            {/* <ThumbCarousel/> */}
        </div>
      </div>
    </>
  );
}
