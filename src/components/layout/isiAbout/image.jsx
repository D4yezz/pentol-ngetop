export default function ImageAbout() {
  return (
    <>
      <div className="flex flex-col w-[400px] h-full py-8 gap-2">
        <div className="h-1/2 w-full flex items-end gap-2">
          <div className="w-2/3 h-[270px] rounded-[0px_40px_0px_50px] overflow-hidden border-3 border-yellow-300 ">
            <img
              src="/pentol2.jpg"
              alt="1"
              className="object-cover w-full h-full "
            />
          </div>
          <div className="w-[200px] h-[200px] rounded-[40px_0px_50px_0px] overflow-hidden border-3 border-yellow-300 ">
            <img
              src="/pentol3.jpg"
              alt="2"
              className="object-cover w-full h-full "
            />
          </div>
        </div>
        <div className="h-1/2 w-full flex items-start gap-2">
          <div className="w-[200px] h-[200px] rounded-[40px_0px_50px_0px] overflow-hidden border-3 border-yellow-300 ">
            <img
              src="/pentol4.jpeg"
              alt="2"
              className="object-cover w-full h-full "
            />
          </div>
          <div className="w-2/3 h-[270px] rounded-[0px_40px_0px_50px] overflow-hidden border-3 border-yellow-300 ">
            <img
              src="/pentol5.jpeg"
              alt="1"
              className="object-cover w-full h-full "
            />
          </div>
        </div>
      </div>
    </>
  );
}
