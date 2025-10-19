import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const dataFaq = [
  {
    id: 1,
    question: "Bagaimana cara memesan?",
    answer:
      "Klik tombol Pesan Sekarang, pilih varian dan level pedas, masukkan alamat, lalu konfirmasi pembayaran. Gampang banget!",
  },
  {
    id: 2,
    question: "Apakah bahan yang digunakan halal?",
    answer:
      "100% halal, kami hanya menggunakan daging segar pilihan dan bumbu berkualitas tanpa tambahan yang meragukan.",
  },
  {
    id: 3,
    question: "Apakah bisa request tambahan topping atau saus?",
    answer:
      "Bisa banget! Kamu tinggal pilih tambahan topping atau saus favorit saat checkout.",
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
          <AccordionItem
            key={item.id}
            value={item.id}
            className={
              "my-4 text-neutral-100 border-[1px] border-yellow-300 px-4 rounded-2xl last:border-b-[1px] shadow-[0px_3px_9px] shadow-yellow-300/30"
            }
          >
            <AccordionTrigger
              className={
                "cursor-pointer text-yellow-300 rounded-none text-lg font-medium hover:no-underline [&[data-orientation=vertical]>svg]:text-yellow-300 flex items-center"
              }
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 lg:w-xl mt-2 ">
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
