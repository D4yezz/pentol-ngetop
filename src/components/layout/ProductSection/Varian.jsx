import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Varian({ item, pedas = true }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={item[0].itemId}
    >
      {item.map((item) => {
        return (
          <AccordionItem
            value={item.itemId}
            key={item.itemId}
            className={"border-0"}
          >
            <AccordionTrigger
              className={
                "text-red-800 cursor-pointer rounded-none border-b-red-800 border-b-[1.5px]  hover:no-underline pb-4 pr-2 text-sm [&[data-orientation=vertical]>svg]:text-red-800 "
              }
            >
              {item.judul}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance mt-2 border-b-[1.5px] border-red-800 text-[0.8rem]">
              <p>{item.deskripsi[0]}</p>
              <p>{item.deskripsi[1]}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
