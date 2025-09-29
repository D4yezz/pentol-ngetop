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
      className="w-full lg:h-fit h-full"
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
                "text-red-800 cursor-pointer rounded-none border-b-red-800 border-b-[2px] hover:no-underline lg:pb-4 pb-2 pr-2 lg:text-xl text-lg [&[data-orientation=vertical]>svg]:text-red-800 "
              }
            >
              {item.judul}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance mt-2 border-b-[1.5px] border-red-800 text-sm">
              <p>{item.deskripsi[0]}</p>
              <p>{item.deskripsi[1]}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
