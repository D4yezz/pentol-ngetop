import CardSwap, { Card } from "@/components/ReactBites/CardSwap";
import GlareHover from "@/components/ReactBites/GlareHover";
import SqueezeBtn from "@/components/uiVerse/squezeBtn";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  Beef,
  ChefHat,
  Flame,
  HeartHandshakeIcon,
  ShoppingBasket,
} from "lucide-react";

const dataCard = [
  {
    id: 1,
    img: "/pedas_ori/1.jpeg",
    title: "Pedas Juara",
    icon: <Flame size={22} />,
  },
  {
    id: 2,
    img: "/pedas_ori/3.jpeg",
    title: "Fresh Tiap Gigitan",
    icon: <Beef size={22} />,
  },
  {
    id: 3,
    img: "/pedas_manis/1.jpeg",
    title: "Dijamin Higienis",
    icon: <ChefHat size={22} />,
  },
  {
    id: 4,
    img: "/pedas_manis/9.jpeg",
    title: "Pasti Nagih",
    icon: <HeartHandshakeIcon size={22} />,
  },
];

export default function Cta() {
  const isDekstop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <div className="w-full h-fit lg:mb-24 lg:px-20 px-8 lg:pt-6 pb-20 font-urbanist">
        <div className="lg:h-[450px] h-fit w-full relative overflow-hidden rounded-4xl gradiasi-btn-merah text-yellow-300 inset-shadow-[0px_0px_12px] inset-shadow-black/40 hover:inset-shadow-[0px_0px_20px] hover:inset-shadow-black/60 ease-in-out duration-300 group">
          <GlareHover
            glareColor="#ffdf20"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={1000}
            playOnce={true}
            width="100%"
            height="100%"
            background="#00000000"
          >
            <div className="flex flex-col gap-4 lg:w-1/2 h-full justify-center lg:px-8 px-4 lg:py-0 py-4">
              <h1 className="font-semibold font-instrument lg:text-5xl text-3xl pr-4">
                Siap Panasin Hari Kamu dengan Pentol Ngetop?
              </h1>
              {isDekstop ? (
                <p className="text-xl mb-6 text-white pr-18 font-instrument font-normal">
                  Cuma beberapa klik, Pentol Ngetop dengan saus pedas atau manis
                  siap mendarat di meja makan kamu. Yuk, jangan tunggu lama!
                </p>
              ) : (
                <></>
              )}
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
                  className="bg-cover bg-center w-full h-full border-[1.7px] border-yellow-300 overflow-hidden shadow-2xl"
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
          </GlareHover>
        </div>
      </div>
    </>
  );
}
