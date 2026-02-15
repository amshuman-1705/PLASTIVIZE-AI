import React from 'react';
import type { MarketplaceItemData } from '../../types';

// Example SVG components for marketplace items
const BottlePlanterSvg: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { className, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet" },
      React.createElement('rect', { width: "100", height: "100", fill: "#E5E7EB" }),
      React.createElement('path', { d: "M30 90 H70 L75 50 H25 Z", fill: "#8B4513", stroke: "#5a2d0c", strokeWidth: "2" }),
      React.createElement('path', { d: "M50 50 C40 30 60 10 50 0", stroke: "#10B981", strokeWidth: "3", fill: "none" }),
      React.createElement('circle', { cx: "40", cy: "20", r: "8", fill: "#34D399" }),
      React.createElement('circle', { cx: "60", cy: "30", r: "10", fill: "#34D399" })
    )
);

const BottleCapArtSvg: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { className, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet" },
      React.createElement('rect', { width: "100", height: "100", fill: "#E5E7EB" }),
      React.createElement('circle', { cx: "50", cy: "50", r: "30", fill: "#3B82F6" }),
      React.createElement('circle', { cx: "50", cy: "50", r: "20", fill: "#FBBF24" }),
      React.createElement('circle', { cx: "35", cy: "35", r: "10", fill: "#EF4444" }),
      React.createElement('circle', { cx: "65", cy: "35", r: "8", fill: "#A855F7" }),
      React.createElement('circle', { cx: "38", cy: "65", r: "9", fill: "#EC4899" }),
      React.createElement('circle', { cx: "62", cy: "62", r: "12", fill: "#84CC16" })
    )
);

const ToteBagSvg: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { className, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet" },
      React.createElement('rect', { width: "100", height: "100", fill: "#F3F4F6" }),
      React.createElement('path', { d: "M20 30 H80 L70 80 H30 Z", fill: "#A7F3D0", stroke: "#14B8A6", strokeWidth: "2" }),
      React.createElement('path', { d: "M35 30 C35 10, 65 10, 65 30", stroke: "#14B8A6", strokeWidth: "3", fill: "none" })
    )
);

const CoastersSvg: React.FC<{className?: string}> = ({className}) => (
    React.createElement('svg', { className, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet" },
      React.createElement('rect', { width: "100", height: "100", fill: "#F3F4F6" }),
      React.createElement('circle', { cx: "35", cy: "35", r: "20", fill: "#3B82F6", stroke: "#1E3A8A", strokeWidth: "2" }),
      React.createElement('circle', { cx: "65", cy: "65", r: "20", fill: "#FBBF24", stroke: "#B45309", strokeWidth: "2" }),
      React.createElement('circle', { cx: "35", cy: "65", r: "20", fill: "#10B981", stroke: "#065F46", strokeWidth: "2" }),
      React.createElement('circle', { cx: "65", cy: "35", r: "20", fill: "#EF4444", stroke: "#991B1B", strokeWidth: "2" })
    )
);

export const marketplaceItems: MarketplaceItemData[] = [
    { id: 'item_planter', creator: { name: "Creative Crafts"}, title: "PET Bottle Planters", description: "Give plastic bottles a new life as beautiful planters.", SvgComponent: BottlePlanterSvg, cost: 100 },
    { id: 'item_cap_art', creator: { name: "Art From Waste"}, title: "HDPE Bottle Cap Art", description: "Vibrant mosaic art from recycled bottle caps.", SvgComponent: BottleCapArtSvg, cost: 250 },
    { id: 'item_tote_bag', creator: { name: "Eco Threads"}, title: "Woven Plastic Tote Bag", description: "A durable and stylish tote bag woven from plastic strips.", SvgComponent: ToteBagSvg, cost: 400 },
    { id: 'item_coasters', creator: { name: "Melt & Mold"}, title: "Recycled Coasters Set", description: "Colorful coasters made from melted and molded HDPE plastic.", SvgComponent: CoastersSvg, cost: 150 },
];