import React from 'react';

// Icons for Info Rows, Stats, etc.
const defaultInfoIconClass = "w-5 h-5";
const defaultStatIconClass = "w-6 h-6";
const defaultInputIconClass = "w-5 h-5";

export const AnalysisIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInfoIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
);
export const RecycleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInfoIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5.455a1 1 0 01-.9-1.49l3.455-5.957a1 1 0 011.74 1.01L7.29 11H19a2 2 0 012 2v2a2 2 0 01-2 2h-2.29l-2.455 4.253a1 1 0 01-1.74-1.01L14.545 15H5a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>
);
export const ClockIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInfoIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
export const CarbonIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInfoIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
);
export const TargetIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInfoIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>
);
export const LightbulbIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInfoIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);
export const BoxIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultStatIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
);
export const LeafIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultStatIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.879A3 3 0 0112.02 17.512a3 3 0 01-2.1-1.633m11.958-3.352a3 3 0 01-2.1 5.633m2.1-5.633a2.986 2.986 0 00-2.1-5.633m-14 0a3 3 0 114.2 0m-4.2 0a3 3 0 00-2.1 5.633m2.1-5.633a2.986 2.986 0 012.1-5.633" /></svg>
);
export const CO2Icon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultStatIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
);
export const StarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultStatIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
);

export const BottleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInputIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.5 8.5l.3-2.4a2 2 0 012-1.8h16.4a2 2 0 012 1.8l.3 2.4m-21 0h21m-21 0v10a2 2 0 002 2h17a2 2 0 002-2v-10m-5.5-4v-1.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V4.5" /></svg>
);
export const BagIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInputIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 18h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2zM5 8V6a2 2 0 012-2h10a2 2 0 012 2v2m-9-2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
export const ContainerIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInputIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3m16-4V5a2 2 0 00-2-2H6a2 2 0 00-2 2v3m16 0h-2M4 8H2m18 4H4" /></svg>
);

export const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

export const ActivityLogIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);

export const ActivityScanIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h-1m-10 0H6m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h1m14 0h1M12 20v-1" /></svg>
);

export const ActivityTrophyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>
);

export const ActivityMarketplaceIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
);

export const MagnifyingGlassIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);

export const CloseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
);

export const MapPinIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

export const NewsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h6"></path></svg>
);

export const RefreshIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 10M20 20l-1.5-1.5A9 9 0 003.5 14"></path></svg>
);

export const HamburgerIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);

export const ChatBottleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bottleBodyFill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#CCFBF1" stopOpacity="0.7"/>
                <stop offset="50%" stopColor="#F0FDFA" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#CCFBF1" stopOpacity="0.7"/>
            </linearGradient>
             <linearGradient id="bottleCapFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F766E"/>
                <stop offset="100%" stopColor="#134E4A"/>
            </linearGradient>
        </defs>
        <path fill="url(#bottleCapFill)" d="M9 2h6v2H9z" />
        <path fill="#0d9488" d="M10 4h4v2l-1 2H11l-1-2V4z" />
        <path fill="url(#bottleBodyFill)" d="M11 8H13L15 20.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 20.5L11 8z" />
        <path fill="white" opacity="0.6" d="M11.5 9v11a.5 .5 0 001 0V9a.5 .5 0 00-1 0z" />
    </svg>
);

export const FunFactIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInfoIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const InstructionsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInfoIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);

export const NotesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || defaultInfoIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);

// Lifecycle Icons
const lifecycleIconClass = "w-6 h-6";
export const SourceIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || lifecycleIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c2.286 1.286 4 0 4 0 1.5-1.5 3-3 3-3a8 8 0 014.657 11.657zM9 10s-2 2-2 4 2 4 4 4 4-2 4-4-2-4-2-4" /></svg>
);
export const ProductionIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || lifecycleIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);
export const UseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || lifecycleIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
export const EndOfLifeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || lifecycleIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);