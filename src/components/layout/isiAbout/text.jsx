import CarouselAbout from "./carousel";

export default function TextAbout() {
  return (
    <>
      <div className="flex flex-col lg:w-1/2 w-full lg:h-[400px] h-fit justify-start items-start">
        <div className="bg-yellow-300 w-fit px-5 py-1 rounded-r-full">
          <h5 className="font-quicksand font-bold gradiasi-btn-merah text-transparent bg-clip-text ">
            Pentol<span>Ngetop</span>
          </h5>
        </div>
        <h2 className="text-left lg:text-4xl text-5xl font-medium text-white my-4">
          Kenapa Harus Pentol Ngetop?
        </h2>
        <h3 className="text-2xl text-yellow-300 mb-3">Pedas Juara</h3>
        <p className="text-white text-[0.9rem] font-medium lg:w-[86%] mb-4 ">
          Kami hadir bukan sekadar jual pentol, tapi pengalaman makan pedas yang
          bikin ketagihan. Setiap pentol dibuat dari bahan segar dengan bumbu
          rahasia yang khas. Tingkat kepedasannya bisa kamu pilih sesuai selera,
          dari pedas santai sampai pedas ekstrem. Rasanya mantap, harganya
          bersahabat, bikin lidah puas dan perut kenyang!
        </p>
        <CarouselAbout />
      </div>
    </>
  );
}
