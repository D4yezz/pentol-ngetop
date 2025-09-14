import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const dataFaq = [
  {
    id: 1,
    question: "Apakah bisa pilih level pedas?",
    answer:
      "Bisa banget! Tersedia dari pedas ringan, sedang, sampai pedas ekstrem. Tinggal pilih level favorit kamu saat memesan.",
  },
  {
    id: 2,
    question: "Apakah bahan yang digunakan halal?",
    answer:
      "100% halal, kami hanya menggunakan daging segar pilihan dan bumbu berkualitas tanpa tambahan yang meragukan.",
  },
  {
    id: 3,
    question: "Bagaimana cara memesan?",
    answer:
      "Klik tombol Pesan Sekarang, pilih varian dan level pedas, masukkan alamat, lalu konfirmasi pembayaran. Gampang banget!",
  },
  {
    id: 4,
    question: "Seberapa lama pengiriman biasanya?",
    answer:
      "Rata-rata 20-40 menit tergantung jarak lokasi kamu, dan kami selalu berusaha menjaga pentol tetap hangat.",
  },
  {
    id: 5,
    question: "Apakah ada minimal order?",
    answer:
      "Nggak ada minimal order—mau satu porsi atau sepuluh porsi, semuanya kami layani.",
  },
];

export default function FaqSection() {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full pt-8 font-inter "
        defaultValue="1"
      >
        {dataFaq.map((item) => (
          <>
            <AccordionItem
              key={item.id}
              value={item.id}
              className={
                "my-4 text-neutral-900 border-[1px] border-red-800 px-4 rounded-2xl last:border-b-[1px] shadow-[0px_3px_9px] shadow-red-800/20"
              }
            >
              <AccordionTrigger
                className={
                  "cursor-pointer text-red-800 rounded-none text-lg font-medium hover:no-underline [&[data-orientation=vertical]>svg]:text-red-800 flex items-center"
                }
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 w-xl mt-2 ">
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          </>
        ))}

        {/* <AccordionItem value="item-2">
          <AccordionTrigger>Shipping Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We offer worldwide shipping through trusted courier partners.
              Standard delivery takes 3-5 business days, while express shipping
              ensures delivery within 1-2 business days.
            </p>
            <p>
              All orders are carefully packaged and fully insured. Track your
              shipment in real-time through our dedicated tracking portal.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Return Policy</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We stand behind our products with a comprehensive 30-day return
              policy. If you&apos;re not completely satisfied, simply return the
              item in its original condition.
            </p>
            <p>
              Our hassle-free return process includes free return shipping and
              full refunds processed within 48 hours of receiving the returned
              item.
            </p>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </>
  );
}
