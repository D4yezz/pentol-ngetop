"use client";


export default function HeaderDashboard({title, desc}) {
  return (
    <div className="flex flex-col px-8 mt-6 gap-2">
      <h1 className="text-3xl font-semibold gradiasi-btn-merah text-transparent bg-clip-text font-inter">
        {title}
      </h1>
      <p>{desc}</p>
    </div>
  );
}