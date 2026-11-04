import React, { useState } from 'react';

export const PouloAvatar: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-72 sm:w-80 md:w-96 flex flex-col items-center justify-end select-none group cursor-pointer"
      title="Harshit Kumar — AI & Systems Engineer"
    >
      {/* Ambient Halo behind head */}
      <div className="absolute top-10 w-48 h-48 rounded-full bg-white/[0.04] blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />

      {/* SVG Vector Character (Poulo exact line-art cartoon style) */}
      <svg
        viewBox="0 0 320 340"
        className="w-full h-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
        }}
      >
        {/* Striped Shirt Torso / Shoulders */}
        <g id="body">
          {/* Base Torso Shape */}
          <path
            d="M 50 340 C 50 270 95 240 160 240 C 225 240 270 270 270 340 Z"
            fill="#ffffff"
            stroke="#121316"
            strokeWidth="5"
          />

          {/* Horizontal Stripes (Poulo striped t-shirt) */}
          <path
            d="M 54 322 C 70 316 110 310 160 310 C 210 310 250 316 266 322 L 268 335 C 248 330 208 324 160 324 C 112 324 72 330 52 335 Z"
            fill="#121316"
          />
          <path
            d="M 64 290 C 85 284 120 280 160 280 C 200 280 235 284 256 290 L 259 302 C 235 296 198 292 160 292 C 122 292 85 296 61 302 Z"
            fill="#121316"
          />
          <path
            d="M 82 262 C 105 258 132 255 160 255 C 188 255 215 258 238 262 L 243 273 C 218 269 190 266 160 266 C 130 266 102 269 77 273 Z"
            fill="#121316"
          />

          {/* Crewneck Collar */}
          <path
            d="M 125 242 C 125 264 195 264 195 242 Z"
            fill="#121316"
          />
          <path
            d="M 132 240 C 132 256 188 256 188 240 Z"
            fill="#ffffff"
          />
        </g>

        {/* Neck */}
        <path
          d="M 135 200 L 135 242 C 145 246 175 246 185 242 L 185 200 Z"
          fill="#ffffff"
          stroke="#121316"
          strokeWidth="5"
        />

        {/* Ears */}
        <g id="ears">
          {/* Left Ear */}
          <path
            d="M 115 160 C 95 160 92 195 115 200 Z"
            fill="#ffffff"
            stroke="#121316"
            strokeWidth="5"
          />
          <path
            d="M 108 172 C 102 178 106 188 114 186"
            fill="none"
            stroke="#121316"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Right Ear */}
          <path
            d="M 205 160 C 225 160 228 195 205 200 Z"
            fill="#ffffff"
            stroke="#121316"
            strokeWidth="5"
          />
          <path
            d="M 212 172 C 218 178 214 188 206 186"
            fill="none"
            stroke="#121316"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* Head / Face Base */}
        <path
          d="M 115 140 C 115 80 205 80 205 140 C 205 195 192 215 160 215 C 128 215 115 195 115 140 Z"
          fill="#ffffff"
          stroke="#121316"
          strokeWidth="5"
        />

        {/* Hair (Pouya style clean stylized haircut) */}
        <path
          d="M 112 142 C 108 105 125 70 160 70 C 195 70 212 105 208 142 C 205 130 198 115 180 112 C 160 110 148 118 135 114 C 125 110 118 126 112 142 Z"
          fill="#121316"
          stroke="#121316"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Eyebrows */}
        <path
          d="M 132 135 Q 142 130 152 135"
          fill="none"
          stroke="#121316"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 168 135 Q 178 130 188 135"
          fill="none"
          stroke="#121316"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Glasses (Poulo iconic thick black rounded frames) */}
        <g id="glasses">
          {/* Bridge */}
          <path
            d="M 152 153 Q 160 148 168 153"
            fill="none"
            stroke="#121316"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Left Lens Frame */}
          <rect
            x="126"
            y="142"
            width="28"
            height="26"
            rx="12"
            fill="#ffffff"
            stroke="#121316"
            strokeWidth="4.5"
          />
          {/* Left Eye Pupil */}
          <circle
            cx={140 + mousePos.x * 0.3}
            cy={155 + mousePos.y * 0.3}
            r="4.5"
            fill="#121316"
          />
          <circle
            cx={138.5 + mousePos.x * 0.3}
            cy={153.5 + mousePos.y * 0.3}
            r="1.2"
            fill="#ffffff"
          />

          {/* Right Lens Frame */}
          <rect
            x="166"
            y="142"
            width="28"
            height="26"
            rx="12"
            fill="#ffffff"
            stroke="#121316"
            strokeWidth="4.5"
          />
          {/* Right Eye Pupil */}
          <circle
            cx={180 + mousePos.x * 0.3}
            cy={155 + mousePos.y * 0.3}
            r="4.5"
            fill="#121316"
          />
          <circle
            cx={178.5 + mousePos.x * 0.3}
            cy={153.5 + mousePos.y * 0.3}
            r="1.2"
            fill="#ffffff"
          />

          {/* Frame Temple Wings */}
          <path
            d="M 126 153 L 115 152"
            stroke="#121316"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 194 153 L 205 152"
            stroke="#121316"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* Nose */}
        <path
          d="M 160 162 L 158 174 Q 163 177 167 174"
          fill="none"
          stroke="#121316"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Friendly Smile */}
        <path
          d="M 148 188 Q 160 197 172 188"
          fill="none"
          stroke="#121316"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

