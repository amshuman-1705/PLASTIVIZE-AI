import React from 'react';
import { Logo } from './icons/Logo';

const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="url(#globeGradient)" />
    <defs>
      <radialGradient id="globeGradient" cx="0.3" cy="0.3" r="0.7">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="100%" stopColor="#10B981" />
      </radialGradient>
    </defs>
    <path d="M5,50 A45,45 0 0,1 95,50" stroke="#F3F4F6" strokeWidth="1.5" fill="none" opacity="0.3" />
    <path d="M20,25 A50,50 0 0,1 80,25" stroke="#F3F4F6" strokeWidth="1.5" fill="none" opacity="0.3" />
    <path d="M20,75 A50,50 0 0,0 80,75" stroke="#F3F4F6" strokeWidth="1.5" fill="none" opacity="0.3" />
    <path d="M50,5 A45,45 0 0,1 50,95" stroke="#F3F4F6" strokeWidth="1.5" fill="none" opacity="0.3" />
  </svg>
);

const ScannerInterface: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" stroke="#14B8A6" strokeWidth="4">
    <path d="M30,30 h-20 v-20" />
    <path d="M170,30 h20 v-20" />
    <path d="M30,170 h-20 v20" />
    <path d="M170,170 h20 v20" />
    <rect x="10" y="10" width="180" height="180" stroke="#14B8A6" strokeWidth="1" strokeDasharray="10 5" opacity="0.3" />
  </svg>
);

const ScanLine: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} style={{
    position: 'absolute', left: '10%', right: '10%', height: '3px',
    background: 'linear-gradient(90deg, transparent, #14B8A6, transparent)',
    boxShadow: '0 0 10px #14B8A6',
    borderRadius: '50%',
  }}></div>
);

const BottleForScan: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <g transform="translate(30, 10) scale(0.9)">
      <path d="M15,90 V40 H35 V90 Z" fill="#0F766E" opacity="0.9"/>
      <path d="M15,40 C15,20 35,20 35,40 Z" fill="#0F766E" opacity="0.9"/>
      <rect x="20" y="10" width="10" height="15" fill="#1E293B"/>
    </g>
  </svg>
);

const PlanterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <g transform="translate(25, 35) scale(1.2)">
      <path d="M10,60 H40 L35,20 H15 Z" fill="#059669" />
      <path d="M25,20 Q15,0 30,0" stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </g>
  </svg>
);

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-brand-gray flex flex-col items-center justify-center z-50 text-center animate-splash-fade-out overflow-hidden">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <GlobeIcon className="absolute w-full h-full animate-globe-enhanced" />

        <div className="absolute inset-0 animate-scanner-ui">
          <ScannerInterface className="absolute inset-0 w-full h-full" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-1/2 h-1/2">
              <BottleForScan className="absolute inset-0 w-full h-full animate-bottle-dissolve" />
              <PlanterIcon className="absolute inset-0 w-full h-full animate-planter-reform" />
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <ScanLine className="w-full animate-scan-line" />
          </div>

          <div className="absolute bottom-5 left-0 right-0 text-center">
            <p className="font-mono text-brand-primary-dark animate-text-analyzing-glitch">Analyzing...</p>
            <p className="font-semibold text-brand-primary-dark animate-text-result">PET Detected ♻️ – Recyclable.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 animate-logo-final">
        <Logo className="h-14 w-auto mx-auto" />
        <p className="text-brand-text-light mt-2">Your AI Guide to a Greener Planet</p>
      </div>
    </div>
  );
};

export default SplashScreen;