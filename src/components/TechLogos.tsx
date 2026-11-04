import React from 'react';

export const PythonLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 128 128" className={className}>
    <path fill="#387EB8" d="M63.7 3.5c-15.6 0-24.5 6.9-24.5 16.2v11.9h24.8v3.5H25.3C11.5 35.1 0 45.4 0 63.8c0 18.2 10.3 27.6 24.1 27.6h7.9v-11.5c0-11.2 9.7-20.9 20.9-20.9h24.6c9.5 0 17.2-7.8 17.2-17.2V22.2c0-10.7-9.4-18.7-31-18.7zm-13.3 8.3c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3-4.3-1.9-4.3-4.3c0-2.3 2-4.3 4.3-4.3z"/>
    <path fill="#FFE052" d="M64.3 124.5c15.6 0 24.5-6.9 24.5-16.2v-11.9H64v-3.5h38.7c13.8 0 25.3-10.3 25.3-28.7 0-18.2-10.3-27.6-24.1-27.6H116v11.5c0 11.2-9.7 20.9-20.9 20.9H70.5c-9.5 0-17.2 7.8-17.2 17.2v20.6c0 10.7 9.4 18.7 31 18.7zm13.3-8.3c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3c0 2.3-2 4.3-4.3 4.3z"/>
  </svg>
);

export const CppLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 128 128" className={className}>
    <path fill="#00599C" d="M64 4.5L12 34.5v60l52 30 52-30v-60L64 4.5z"/>
    <path fill="#004482" d="M64 14.5L22 38.5v52l42 24 42-24v-52L64 14.5z"/>
    <path fill="#659AD2" d="M64 26.5L34 44.5v40l30 18 30-18v-40L64 26.5z"/>
    <text x="64" y="74" fill="#ffffff" fontSize="28" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">C++</text>
  </svg>
);

export const ReactLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

export const NextLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 128 128" className={className}>
    <circle cx="64" cy="64" r="64" fill="#000000" stroke="#ffffff" strokeWidth="4"/>
    <path fill="#ffffff" d="M82.5 92.5L47.7 47.9H40v33.4h6.7V57.8l30.8 39.5c1.7-1.4 3.3-2.9 4.8-4.5l.2-.3zM81.3 47.9h6.7v33.4h-6.7z"/>
  </svg>
);

export const DockerLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#2496ED">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.714h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M23.79 9.89c-.395-.615-1.127-.923-2.193-.923a4.7 4.7 0 00-1.895.405c-.172-.455-.429-.877-.768-1.246a4.57 4.57 0 00-3.328-1.424 4.53 4.53 0 00-2.316.634v-.036a.185.185 0 00-.185-.185H11.01a.185.185 0 00-.185.185v.077c-.496-.28-1.07-.433-1.68-.433a3.4 3.4 0 00-2.32 1.018 3.5 3.5 0 00-.91 1.767H.185A.186.186 0 000 10.36v2.963c0 2.22 1.458 4.208 3.655 4.98a13.3 13.3 0 004.815.86c6.262 0 11.776-3.834 13.567-9.444.606.07 1.157-.087 1.57-.44.425-.364.636-.884.583-1.39z"/>
  </svg>
);

export const MongoLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#13AA52">
    <path d="M12 2C12 2 6.5 8.5 6.5 14.5C6.5 19 9.5 22 12 22C14.5 22 17.5 19 17.5 14.5C17.5 8.5 12 2 12 2ZM11.3 20.3C11.3 20.3 11 18.5 11 15C11 11.5 12 7.5 12 7.5C12 7.5 13 11.5 13 15C13 18.5 12.7 20.3 12.7 20.3C12.4 20.7 11.6 20.7 11.3 20.3Z"/>
  </svg>
);

export const PostgresLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <circle cx="32" cy="32" r="30" fill="#336791" />
    <path fill="#ffffff" d="M32 14c-9.9 0-18 8.1-18 18 0 6.6 3.6 12.4 9 15.6v-5.2c-3.1-2.4-5-6.2-5-10.4 0-7.2 5.8-13 13-13s13 5.8 13 13c0 4.2-1.9 8-5 10.4v5.2c5.4-3.2 9-9 9-15.6 0-9.9-8.1-18-18-18z"/>
    <path fill="#ffffff" d="M28 26h8v16h-8z"/>
  </svg>
);

export const FastApiLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="11" fill="#009688" />
    <path d="M13 3L6 14h5l-1 7 7-11h-5l1-7z" fill="#ffffff" />
  </svg>
);

export const LangGraphLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 40 40" className={className}>
    <rect width="40" height="40" rx="10" fill="#EF4444" />
    <circle cx="12" cy="20" r="4.5" fill="#ffffff" />
    <circle cx="28" cy="11" r="4.5" fill="#ffffff" />
    <circle cx="28" cy="29" r="4.5" fill="#ffffff" />
    <path d="M15 18 L 25 13 M 15 22 L 25 27 M 28 15 L 28 25" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const GroqLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="8" fill="#F97316" />
    <text x="16" y="24" fill="#ffffff" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Q</text>
  </svg>
);

export const ChromaLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="8" fill="#8B5CF6" />
    <circle cx="16" cy="16" r="8" fill="#ffffff" />
    <circle cx="16" cy="16" r="3" fill="#8B5CF6" />
  </svg>
);

export const HuggingFaceLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <circle cx="16" cy="16" r="15" fill="#FFD21E" />
    <circle cx="11" cy="13" r="2.2" fill="#000000" />
    <circle cx="21" cy="13" r="2.2" fill="#000000" />
    <path d="M 9 20 C 12 25 20 25 23 20" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const TypeScriptLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="6" fill="#3178C6" />
    <text x="16" y="23" fill="#ffffff" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">TS</text>
  </svg>
);

export const GeminiLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="url(#geminiGrad)" />
    <defs>
      <linearGradient id="geminiGrad" x1="2" y1="2" x2="22" y2="22">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="50%" stopColor="#9B51E0" />
        <stop offset="100%" stopColor="#EA4335" />
      </linearGradient>
    </defs>
  </svg>
);

export const NodeLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="#339933" />
    <text x="16" y="21" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">JS</text>
  </svg>
);

export const LangChainLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="8" fill="#1C3C3C" />
    <circle cx="11" cy="16" r="5" fill="none" stroke="#10B981" strokeWidth="2.5" />
    <circle cx="21" cy="16" r="5" fill="none" stroke="#10B981" strokeWidth="2.5" />
    <path d="M14 16h4" stroke="#10B981" strokeWidth="2.5" />
  </svg>
);

export const ChromeExtLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="8" fill="#F59E0B" />
    <path d="M12 9h4a3 3 0 0 1 0 6h-4v4h-2a3 3 0 0 1 0-6h2V9z" fill="#ffffff" />
    <circle cx="21" cy="19" r="3" fill="#ffffff" />
  </svg>
);

export const SqliteLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="8" fill="#003B57" />
    <text x="16" y="22" fill="#00A3E0" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">SQL</text>
  </svg>
);

export const RayCastingLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect width="32" height="32" rx="8" fill="#06B6D4" />
    <polygon points="16,6 26,24 6,24" fill="none" stroke="#ffffff" strokeWidth="2.5" />
    <circle cx="16" cy="18" r="2.5" fill="#ffffff" />
    <line x1="2" y1="18" x2="16" y2="18" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2,2" />
  </svg>
);
