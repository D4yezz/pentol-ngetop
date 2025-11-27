import Navbar from "@/components/layout/navbar/navbar";
import KritikSaranView from "@/components/views/KritikSaran/kritikSaran";

export default function KritikSaranPage() {
  return (
    <>
      <main className="w-full bg-neutral-100">
        <Navbar />
        <KritikSaranView />
      </main>
    </>
  );
}
