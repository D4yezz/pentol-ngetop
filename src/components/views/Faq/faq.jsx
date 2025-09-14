import FaqSection from "@/components/layout/faqSection/FaqSection";

export default function Faq() {
  return (
    <>
      <section className="w-full h-fit bg-yellow-300 flex items-start gap-10 px-16 pb-16 pt-36 font-poppins relative overflow-x-hidden z-10">
        <div className="w-full scale-105 h-48 bg-neutral-100 absolute -top-30 left-0 right-0 mx-auto rounded-[70%]"></div>
        <div className="flex flex-col gap-2">
          <h4 className="gradiasi-btn-merah w-fit px-5 py-0.5 text-yellow-300 font-semibold rounded-full text-lg">
            FAQ
          </h4>
          <h1 className="font-semibold text-4xl gradiasi-btn-merah text-transparent bg-clip-text py-2">
            Pertanyaan yang Sering Ditanyakan
          </h1>
          <p className="max-w-4xl">
            Cek pertanyaan populer seputar Pentol Ngetop dan cara pemesanan agar
            kamu tidak ragu beli Pentol Ngetop.
          </p>
        </div>
        <FaqSection />
      </section>
    </>
  );
}
