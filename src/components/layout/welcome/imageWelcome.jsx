export default function ImageWelcome() {
  return (
    <>
      <section className="w-[45%] h-full flex items-center justify-end px-18">
        <div className="w-78 h-96 rounded-full overflow-hidden border-8 border-red-800 group shadow-[0px_6px_12px] shadow-red-800/60">
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
