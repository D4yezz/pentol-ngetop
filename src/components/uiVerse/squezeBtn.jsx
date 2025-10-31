import React from "react";

const SqueezeBtn = ({ className, text, icon, onClick }) => {
  return (
    <div className="w-full h-fit">
      <style jsx>{`
        @keyframes jello-horizontal {
          0% {
            transform: scale3d(1, 1, 1);
          }
          30% {
            transform: scale3d(1.25, 0.75, 1);
          }
          40% {
            transform: scale3d(0.75, 1.25, 1);
          }
          50% {
            transform: scale3d(1.15, 0.85, 1);
          }
          65% {
            transform: scale3d(0.95, 1.05, 1);
          }
          75% {
            transform: scale3d(1.05, 0.95, 1);
          }
          100% {
            transform: scale3d(1, 1, 1);
          }
        }

        @keyframes squeeze {
          0% {
            transform: scale3d(1, 1, 1);
          }
          30% {
            transform: scale3d(1.25, 0.75, 1);
          }
          40% {
            transform: scale3d(0.75, 1.25, 1);
          }
          50% {
            transform: scale3d(1.15, 0.85, 1);
          }
          65% {
            transform: scale3d(0.95, 1.05, 1);
          }
          75% {
            transform: scale3d(1.05, 0.95, 1);
          }
          100% {
            transform: scale3d(1, 1, 1);
          }
        }

        .squeeze-SqueezeBtnbutton {
          animation: jello-horizontal 0.9s both;
        }

        .squeeze-button:hover {
          animation: squeeze 0.9s both;
        }
      `}</style>
      <button
        onClick={onClick}
        className={`squeeze-button flex items-center justify-center gap-2 cursor-pointer outline-none transition-colors duration-200 ${className}`}
      >
        {icon}
        {text}
      </button>
    </div>
  );
};

export default SqueezeBtn;
