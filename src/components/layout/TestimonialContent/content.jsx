import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const dataTester = [
  {
    id: 1,
    img: "/emot-tawa.png",
    name: "Dayezz",
    desc: "Pentol pedasnya bener-bener bikin kaget. Pedasnya nendang tapi tetap enak dinikmati, pasti bakal sering order lagi.",
    work: "Pelajar",
    rateOn: 5,
    rateOff: 0,
  },
  {
    id: 2,
    img: "/navanken.png",
    name: "NavanKen",
    desc: "Saya udah coba banyak makanan pedas, tapi pentol ini punya sensasi unik. Level pedas bisa dipilih sesuai selera, dan rasanya konsisten dari awal sampai habis.",
    work: "Odoo Developer",
    rateOn: 4,
    rateOff: 1,
  },
  {
    id: 3,
    img: "/mpus.webp",
    name: "Dyou",
    desc: "Pentolnya terasa fresh dan bumbunya meresap sempurna. Saus pedasnya bukan cuma panas di lidah, tapi juga punya aroma khas yang bikin ketagihan.",
    work: "Buzzer",
    rateOn: 4,
    rateOff: 1,
  },
  {
    id: 4,
    img: "/lewis.jpg",
    name: "Lewis Hamilton",
    desc: "Pentol pedas ini bikin pengalaman makan jadi lebih seru. Teksturnya lembut, pedasnya pas, dan kombinasi rasanya bikin susah berhenti ngemil.",
    work: "Supir Delman",
    rateOn: 5,
    rateOff: 0,
  },
];

export default function ContentTester({ index = null }) {
  if (index !== null) {
    const item = dataTester[index];
    return (
      <>
        <Card
          className="bg-white w-[380px] h-[300px] rounded-3xl justify-between border-b-8"
          key={item.id}
        >
          <CardHeader className={"-mb-4"}>
            <Quote strokeWidth={0} fill="oklch(44.4% 0.177 26.899)" />
          </CardHeader>
          <CardContent className={"w-full"}>
            <div className="flex flex-col">
              <p className="text-[1rem]/6 font-medium w-fit h-[80%] text-red-800">
                {item.desc}
              </p>
            </div>
          </CardContent>
          <CardFooter
            className={
              "flex w-[92%] mx-auto  items-center justify-between py-3 px-2 border-t-[1.5px]"
            }
          >
            <div className="flex items-center gap-4">
              <Avatar className={"w-12 h-12 border-2 border-red-800"}>
                <AvatarImage src={item.img} />
                <AvatarFallback>
                  <img src="/ilang.jpg" alt="" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[1rem] font-medium font-poppins">{item.name}</h2>
                <p className="text-sm font-normal text-red-800 font-poppins">
                  {item.work}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex gap-1">
                {[...Array(item.rateOn)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="oklch(90.5% 0.182 98.111)"
                    strokeWidth={2}
                    stroke="oklch(90.5% 0.182 98.111)"
                  />
                ))}
                {[...Array(item.rateOff)].map((_, i) => (
                  <Star key={i} size={16} stroke="oklch(90.5% 0.182 98.111)" />
                ))}
              </div>
              <span className="text-sm font-medium">{item.rateOn}.0</span>
            </div>
          </CardFooter>
        </Card>
      </>
    );
  }
}
