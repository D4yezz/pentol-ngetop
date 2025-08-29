export default function ImageWelcome() {
  return (
    <>
      <section className="w-1/2 h-full  flex items-center justify-end px-8">
        <div className="w-72 h-90 rounded-full overflow-hidden border-8 border-red-800 group shadow-[0px_6px_12px] shadow-red-800/60">
          <img
            src="/pentol.jpg"
            alt=""
            className="object-cover w-full h-full border-4 border-yellow-300 rounded-full group-hover:scale-105 duration-300 ease-in-out"
          />
        </div>
      </section>
    </>
  );
}
