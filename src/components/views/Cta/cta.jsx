import CardSwap, { Card } from "@/components/ReactBites/CardSwap";
import SqueezeBtn from "@/components/uiVerse/squezeBtn";
import { Beef, ChefHat, Flame, HeartHandshakeIcon, ShoppingBasket, Utensils } from "lucide-react";

const dataCard = [
  {
    id: 1,
    img: "/pentol.jpg",
    title: "Pedas Juara",
    icon: <Flame size={22} />,
  },
  {
    id: 2,
    img: "/pentol2.jpg",
    title: "Fresh Tiap Gigitan",
    icon: <Beef size={22} />,
  },
  {
    id: 3,
    img: "/pentol3.jpg",
    title: "Dijamin Higienis",
    icon: <ChefHat size={22} />,
  },
  {
    id: 4,
    img: "/pentol4.jpeg",
    title: "Pasti Nagih",
    icon: <HeartHandshakeIcon size={22} />,
  },
];

export default function Cta() {
  return (
    <>
      <div className="w-full h-fit mb-24 px-20 pt-6 pb-20 font-urbanist">
        <div className="h-[450px] w-full relative overflow-hidden px-6 py-2 rounded-4xl gradiasi-btn-merah text-yellow-300 inset-shadow-[0px_0px_12px] inset-shadow-black/40 hover:inset-shadow-[0px_0px_20px] hover:inset-shadow-black/60 ease-in-out duration-300 group">
          <div className="flex flex-col gap-4 w-1/2 h-full justify-center px-8">
            <h1 className="font-semibold font-instrument text-5xl pr-4">
              Siap Panasin Hari Kamu dengan Pentol Ngetop?
            </h1>
            <p className="text-xl mb-6 text-white pr-18 font-instrument font-normal">
              Cuma beberapa klik, Pentol Ngetop dengan saus pedas atau manis
              siap mendarat di meja makan kamu. Yuk, jangan tunggu lama!
            </p>
            <SqueezeBtn
              text={"Pesan Sekarang"}
              icon={<ShoppingBasket />}
              className={
                "px-8 py-2 font-bold text-lg border-yellow-300 text-red-800 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
              }
            />
          </div>
          <CardSwap
            cardDistance={50}
            verticalDistance={50}
            delay={5000}
            pauseOnHover={false}
            width={600}
            height={400}
          >
            {dataCard.map((card) => (
              <Card
                key={card.id}
                className="bg-cover bg-center w-full h-full border-[2px] border-yellow-300 overflow-hidden shadow-2xl"
              >
                <div className="absolute gradiasi-btn-merah top-3 left-3 flex items-center gap-4 h-fit pr-3 py-1 rounded-full">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-yellow-300 text-red-800 rounded-full p-1.5 ml-1">
                      {card.icon}
                    </span>
                    <h3 className="font-semibold text-lg">{card.title}</h3>
                  </div>
                </div>
                <img
                  src={card.img}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </>
  );
}
