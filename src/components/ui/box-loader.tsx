import type React from "react";

export interface BoxLoaderProps {
  className?: string;
  size?: number;
}

const Loader: React.FC<BoxLoaderProps> = ({ className, size = 32 }) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className || ""}`}
      style={{
        ["--size" as string]: `${size}px`,
        ["--duration" as string]: "800ms",
      } as React.CSSProperties}
    >
      <style>{`
        .boxes {
          --size: ${size}px;
          --duration: 800ms;
          height: calc(var(--size) * 2);
          width: calc(var(--size) * 3);
          position: relative;
          transform-style: preserve-3d;
          transform-origin: 50% 50%;
          margin-top: calc(var(--size) * 1.5 * -1);
          transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
        }
        .boxes .box {
          width: var(--size);
          height: var(--size);
          position: absolute;
          transform-style: preserve-3d;
          top: 0;
          left: 0;
        }
        .boxes .box.box-1 {
          animation: box1 var(--duration) linear infinite;
        }
        .boxes .box.box-2 {
          animation: box2 var(--duration) linear infinite;
        }
        .boxes .box.box-3 {
          animation: box3 var(--duration) linear infinite;
        }
        .boxes .box.box-4 {
          animation: box4 var(--duration) linear infinite;
        }
        .boxes .box .face {
          --face-top: #ffffff;
          --face-right: #9ca3af;
          --face-left: #d4d4d8;
          --face-back: rgba(255, 255, 255, 0.04);
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transform-style: preserve-3d;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
        }
        .boxes .box .face.face-top {
          background: var(--face-top);
          transform: translateZ(var(--size));
        }
        .boxes .box .face.face-right {
          background: var(--face-right);
          transform-origin: 100% 50%;
          transform: rotateY(90deg);
        }
        .boxes .box .face.face-front {
          background: var(--face-left);
          transform-origin: 50% 100%;
          transform: rotateX(-90deg);
        }
        .boxes .box .face.face-back {
          background: var(--face-back);
          transform: translateZ(0);
        }
      `}</style>
      <div className="boxes">
        <div className="box box-1">
          <div className="face face-front" />
          <div className="face face-right" />
          <div className="face face-top" />
          <div className="face face-back" />
        </div>
        <div className="box box-2">
          <div className="face face-front" />
          <div className="face face-right" />
          <div className="face face-top" />
          <div className="face face-back" />
        </div>
        <div className="box box-3">
          <div className="face face-front" />
          <div className="face face-right" />
          <div className="face face-top" />
          <div className="face face-back" />
        </div>
        <div className="box box-4">
          <div className="face face-front" />
          <div className="face face-right" />
          <div className="face face-top" />
          <div className="face face-back" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
