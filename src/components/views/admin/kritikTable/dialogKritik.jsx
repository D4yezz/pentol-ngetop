import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DialogKritik({ pesan }) {
  return (
    <>
      <DialogContent className={"font-instrument"}>
        <DialogHeader>
          <DialogTitle className={"font-inter text-red-800"}>
            Detail pesan dari {pesan.nama.split(" ")[0]}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p>Nama Pengirim :</p>
            <p>{pesan.nama}</p>
          </div>
          <div className="flex gap-2 border rounded-lg p-3 shadow-md border-red-800">
            <h4 className="text-sm font-semibold w-24">Isi Pesan :</h4>
            <p>{pesan.pesan}</p>
          </div>

          <div className="flex gap-2 text-sm text-gray-500">
            <p>Dikirim pada : </p>
            <p>
              {new Date(pesan.created_at).toLocaleDateString("in-ID", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </DialogContent>
    </>
  );
}
