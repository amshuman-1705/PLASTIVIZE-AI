

import { FC } from 'react';

export interface PlasticClassification {
  plasticType: string;
  recyclability: string;
  decompositionTime: string;
  carbonImpact: string;
  confidenceScore: number;
}

export interface ReuseIdea {
  title: string;
  description: string;
}

export interface DIYTutorial {
    materials: string[];
    steps: string[];
}

export interface FootprintResult {
    monthlyFootprintKg: number;
    nationalAverageKg: number;
    recommendations: string[];
}

export interface UserStats {
  itemsScanned: number;
  co2Saved: number;
  ecoPoints: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number;
}

export interface ScanHistoryItem {
    date: string;
    plasticType: string;
    co2Saved: number;
    ecoPoints: number;
}

export interface ActivityLogItem {
    type: 'scan' | 'achievement' | 'marketplace';
    date: string; // ISO string
    title: string;
    description: string;
}

export interface UserData {
  stats: UserStats;
  unlockedAchievements: string[];
  username: string | null;
  scanHistory: ScanHistoryItem[];
  unlockedMarketplaceItems: string[];
  activityLog: ActivityLogItem[];
}

export interface GeoAnalysisResult {
  locationName: string;
  summary: string;
  dataRationale: string;
  keyStats: {
    stat: string;
    value: string;
    description: string;
  }[];
  wasteComposition: {
    name: string;
    value: number;
  }[];
  wasteManagement: {
    name: string;
    value: number;
  }[];
  generationTrend: {
    year: string;
    waste_in_million_tons: number;
  }[];
}


export interface City {
    name: string;
    country: string;
    lat: number;
    lng: number;
}

export type MapPoint = {
    lat: number;
    lng: number;
    name: string;
    kind: 'analysis_point' | 'facility';
    type?: string;
};

export interface Insight {
  id: string;
  type: 'news' | 'tip' | 'community';
  title: string;
  description: string;
}

export interface TimelineEvent {
    date: string;
    description: string;
}

export interface InsightDetails {
    title: string;
    summary: string;
    keyPoints: string[];
    timeline?: TimelineEvent[];
    progress?: number; // for community challenges
}

export interface MarketplaceItemData {
    id: string;
    creator: { name: string; isEthical?: boolean; location?: string };
    title: string;
    description: string;
    SvgComponent: FC<{className?: string}>;
    cost: number;
}

export interface RecyclingRules {
  location: string;
  plasticType: string;
  isRecyclable: boolean;
  instructions: string[];
  notes?: string[];
}

export interface MaterialDatabaseItem {
  id: string;
  name: string;
  description: string;
  suitability: string;
  specs: {
    property: string;
    value: string;
  }[];
  suppliers: string[];
  lifecycle: {
    biodegradability: string;
    carbonFootprint: string;
    recyclingInfo: string;
  };
}