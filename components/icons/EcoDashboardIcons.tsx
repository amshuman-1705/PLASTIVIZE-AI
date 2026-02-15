import React from 'react';

// 1. Interactive Recycling Guide
export const RecyclingGuideIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 54C44.1503 54 54 44.1503 54 32C54 19.8497 44.1503 10 32 10C19.8497 10 10 19.8497 10 32C10 36.6874 11.4036 41.0616 13.8074 44.6953" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M48 50L44 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42 22L32 12L22 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 12V31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// 2. Marketplace for Recycled Products
export const EcoMarketplaceIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 20H50L54 46H10L14 20Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 28V16C24 11.5817 27.5817 8 32 8C36.4183 8 40 11.5817 40 16V28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 54C28.2091 54 30 52.2091 30 50C30 47.7909 28.2091 46 26 46C23.7909 46 22 47.7909 22 50C22 52.2091 23.7909 54 26 54Z" fill="currentColor" opacity="0.2"/>
        <path d="M42 54C44.2091 54 46 52.2091 46 50C46 47.7909 44.2091 46 42 46C39.7909 46 38 47.7909 38 50C38 52.2091 39.7909 54 42 54Z" fill="currentColor" opacity="0.2"/>
    </svg>
);

// 3. Material Database
export const MaterialDatabaseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48 12H16C13.7909 12 12 13.7909 12 16V48C12 50.2091 13.7909 52 16 52H48C50.2091 52 52 50.2091 52 48V16C52 13.7909 50.2091 12 48 12Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 12V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 22H26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 32H26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 42H26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42 26C42 23.7909 40.2091 22 38 22C35.7909 22 34 26 34 26V42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// 4. Plastic Decomposition Visualizer
export const DecompositionVisualizerIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 12L48 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 52L48 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12L25 32L20 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44 12L39 32L44 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 22H43" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
        <path d="M23 42H41" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2"/>
    </svg>
);

// 5. Microplastics Detection Toolkit
export const MicroplasticsToolkitIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 44L16 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44 28C44 36.8366 36.8366 44 28 44C19.1634 44 12 36.8366 12 28C12 19.1634 19.1634 12 28 12C36.8366 12 44 19.1634 44 28Z" stroke="currentColor" strokeWidth="3"/>
        <circle cx="28" cy="28" r="4" fill="currentColor" opacity="0.2"/>
        <circle cx="22" cy="24" r="2" fill="currentColor" opacity="0.2"/>
        <circle cx="35" cy="31" r="1" fill="currentColor" opacity="0.2"/>
        <path d="M42 42L52 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);

// 6. AI-based Sorting Algorithm
export const AISortingAlgorithmIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 44H56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 44L16 52H48L52 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 32L20 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 32L44 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 8V24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 24L24 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 24L40 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="8" r="4" fill="currentColor" opacity="0.2"/>
    </svg>
);