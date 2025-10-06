export default function BottomFooter() {
  return (
    <>
      <div className="flex justify-between lg:gap-0 gap-3 text-sm mt-12 w-full mx-auto h-fit border-t-[1.5px] border-yellow-300 font-inter py-4">
        <span className="lg:text-sm text-xs">© 2025 Pentol Ngetop. All rights reserved.</span>
        <div className="flex lg:gap-6 gap-2 lg:text-sm text-xs">
          <a href="/">Syarat & Ketentuan</a>
          <a href="/">Kebijakan Privasi</a>
        </div>
      </div>
    </>
  );
}
