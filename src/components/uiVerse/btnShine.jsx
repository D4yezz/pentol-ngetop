import React from 'react';

const ButtonShine = () => {
  return (
    <div>
      <style jsx>{`
        .btn-shine {
          animation: none;
        }
        .btn-shine:hover {
          animation: rotate624 0.7s ease-in-out both;
        }
        .btn-shine:hover span {
          animation: storm1261 0.7s ease-in-out both;
          animation-delay: 0.06s;
        }
        .btn-shine::after {
          content: "";
          position: absolute;
          top: -50px;
          left: -75px;
          width: 50px;
          height: 155px;
          background: oklch(90.5% 0.182 98.111);
          opacity: 0.4;
          transform: rotate(35deg);
          transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
          z-index: -10;
        }
        .btn-shine:hover::after {
          left: 120%;
          transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        }
        @keyframes rotate624 {
          0% { transform: rotate(0deg) translate3d(0, 0, 0); }
          25% { transform: rotate(3deg) translate3d(0, 0, 0); }
          50% { transform: rotate(-3deg) translate3d(0, 0, 0); }
          75% { transform: rotate(1deg) translate3d(0, 0, 0); }
          100% { transform: rotate(0deg) translate3d(0, 0, 0); }
        }
        @keyframes storm1261 {
          0% { transform: translate3d(0, 0, 0) translateZ(0); }
          25% { transform: translate3d(4px, 0, 0) translateZ(0); }
          50% { transform: translate3d(-3px, 0, 0) translateZ(0); }
          75% { transform: translate3d(2px, 0, 0) translateZ(0); }
          100% { transform: translate3d(0, 0, 0) translateZ(0); }
        }
      `}</style>
      <button className="btn-shine relative m-0 text-yellow-300 px-4 py-2 rounded-full outline-none no-underline flex justify-center items-center cursor-pointer gradiasi-btn-merah z-0 overflow-hidden transition-all duration-300 ease-out hover:ease-in-out h-full">
        <span className="z-20">
          Pesan Sekarang
        </span>
      </button>
    </div>
  );
};

export default ButtonShine;