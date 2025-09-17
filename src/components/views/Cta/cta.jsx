import CardSwap from "@/components/ReactBites/CardSwap";
import { Card } from "@/components/ui/card";

export default function Cta() {
  return (
    <>
    <div className="w-full h-[600px] bg-green-300 flex justify-center items-center">
        <h1 className="w-1/2">Cta</h1>
      <div className="bg-yellow-200 h-[500px] w-1/2 relative  overflow-hidden ">
        <CardSwap
          cardDistance={10}
          verticalDistance={10}
          delay={2000}
          pauseOnHover={false}
          width={300}
          height={300}
        >
          <Card>
            <h3>Card 1</h3>
            <p>Your content here</p>
          </Card>
          <Card>
            <h3>Card 2</h3>
            <p>Your content here</p>
          </Card>
          <Card>
            <h3>Card 3</h3>
            <p>Your content here</p>
          </Card>
        </CardSwap>
      </div>
      </div>
    </>
  );
}
