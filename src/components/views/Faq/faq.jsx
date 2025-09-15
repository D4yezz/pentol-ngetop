import FaqSection from "@/components/layout/faqSection/FaqSection";

export default function Faq() {
  return (
    <>
      <section className="w-full h-fit gradiasi-btn-merah flex items-start gap-10 px-16  py-36 mb-20 font-poppins relative overflow-hidden z-10">
        <div className="w-full scale-105 h-48 bg-neutral-100 absolute z-10 -top-30 left-0 right-0 mx-auto rounded-[70%]"></div>
        <div className="flex flex-col gap-2">
          <h4 className="bg-yellow-300 w-fit px-5 py-0.5 text-red-800 font-semibold rounded-full text-lg">
            FAQ
          </h4>
          <h1 className="font-semibold text-4xl text-yellow-300 py-2">
            Pertanyaan yang Sering Ditanyakan
          </h1>
          <p className="max-w-4xl text-white">
            Cek pertanyaan populer seputar Pentol Ngetop dan cara pemesanan agar
            kamu tidak ragu beli Pentol Ngetop.
          </p>
        </div>
        <FaqSection />
        <div className="w-full scale-105 h-48 bg-neutral-100 absolute z-20 -bottom-30 left-0 right-0 mx-auto rounded-[70%]"></div>
      </section>
    </>
  );
}
