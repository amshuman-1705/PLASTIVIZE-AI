import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { UserData, Achievement, UserStats, PlasticClassification, ScanHistoryItem, ActivityLogItem } from '../types';
import { marketplaceItems } from '../components/data/marketplaceItems';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/auth";

export const ALL_ACHIEVEMENTS: Achievement[] = [
    { id: 'scan1', name: 'First Scan', description: 'Scan your first item.', icon: '🌱', threshold: 1 },
    { id: 'scan10', name: 'Recycle Starter', description: 'Scan 10 items.', icon: '♻️', threshold: 10 },
    { id: 'scan50', name: 'Eco Warrior', description: 'Scan 50 items.', icon: '🛡️', threshold: 50 },
];

const initialStats: UserStats = {
    itemsScanned: 0,
    co2Saved: 0,
    ecoPoints: 0,
};

const initialData: UserData = {
    stats: initialStats,
    unlockedAchievements: [],
    username: null,
    scanHistory: [],
    unlockedMarketplaceItems: [],
    activityLog: [],
};

interface UserDataContextType {
  userData: UserData;
  isLoggedIn: boolean;
  addScanResult: (classification: PlasticClassification) => number;
  spendEcoPoints: (itemId: string, cost: number) => boolean;
  updateUsername: (newUsername: string) => void;
  logout: () => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const STORAGE_KEY = 'plastivize_userdata';

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [userData, setUserData] = useState<UserData>(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                return JSON.parse(storedData);
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
        return initialData;
    });

    // 🔥 SAVE DATA TO LOCALSTORAGE
    useEffect(() => {
        try {
            if (userData.username) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    }, [userData]);

    // 🔥 FIREBASE AUTH LISTENER
    useEffect(() => {
        if (!auth) {
            console.warn('Firebase Auth is not available. User authentication is disabled.');
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(prev => ({
                    ...prev,
                    username: user.email || "User"
                }));
            } else {
                setUserData(initialData);
            }
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        if (auth) {
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Logout error:", error);
            }
        }
        setUserData(initialData);
    };

    const updateUsername = (newUsername: string) => {
        if (!newUsername.trim()) return;
        setUserData(prevData => ({
            ...prevData,
            username: newUsername.trim(),
        }));
    };

    const addScanResult = (classification: PlasticClassification): number => {
        const pointsEarned = 10;
        const co2SavedPerItem = 0.6;

        const newScan: ScanHistoryItem = {
            date: new Date().toISOString(),
            plasticType: classification.plasticType.split(' ')[0].replace('(', ''),
            co2Saved: co2SavedPerItem,
            ecoPoints: pointsEarned
        };

        const scanActivity: ActivityLogItem = {
            type: 'scan',
            date: newScan.date,
            title: `Scanned a ${newScan.plasticType} item`,
            description: `+${pointsEarned} Eco-Points, +${co2SavedPerItem.toFixed(2)}kg CO₂ saved`
        };

        setUserData(prevData => {
            const newStats: UserStats = {
                ...prevData.stats,
                itemsScanned: prevData.stats.itemsScanned + 1,
                ecoPoints: prevData.stats.ecoPoints + pointsEarned,
                co2Saved: prevData.stats.co2Saved + co2SavedPerItem,
            };

            let newActivityLog = [scanActivity, ...prevData.activityLog];

            const newlyUnlockedAchievements = ALL_ACHIEVEMENTS.filter(ach =>
                newStats.itemsScanned >= ach.threshold &&
                !prevData.unlockedAchievements.includes(ach.id)
            );

            if (newlyUnlockedAchievements.length > 0) {
                newlyUnlockedAchievements.forEach(ach => {
                    newActivityLog.unshift({
                        type: 'achievement',
                        date: new Date().toISOString(),
                        title: 'Achievement Unlocked!',
                        description: `You earned the "${ach.name}" badge.`
                    });
                });
            }

            const unlockedAchievementIds = newlyUnlockedAchievements.map(ach => ach.id);

            return {
                ...prevData,
                stats: newStats,
                unlockedAchievements: [...prevData.unlockedAchievements, ...unlockedAchievementIds],
                scanHistory: [...prevData.scanHistory, newScan],
                activityLog: newActivityLog.slice(0, 20),
            };
        });

        return pointsEarned;
    };

    const spendEcoPoints = (itemId: string, cost: number): boolean => {
        const itemToUnlock = marketplaceItems.find(item => item.id === itemId);
        if (!itemToUnlock || userData.stats.ecoPoints < cost) {
            return false;
        }

        setUserData(prevData => {
            if (prevData.stats.ecoPoints < cost) return prevData;

            const newActivity: ActivityLogItem = {
                type: 'marketplace',
                date: new Date().toISOString(),
                title: 'Marketplace Unlock',
                description: `You unlocked "${itemToUnlock.title}" for ${cost} points.`
            };

            return {
                ...prevData,
                stats: {
                    ...prevData.stats,
                    ecoPoints: prevData.stats.ecoPoints - cost
                },
                unlockedMarketplaceItems: [...prevData.unlockedMarketplaceItems, itemId],
                activityLog: [newActivity, ...prevData.activityLog].slice(0, 20)
            };
        });

        return true;
    };

    return (
        <UserDataContext.Provider
            value={{
                userData,
                isLoggedIn: !!userData.username,
                addScanResult,
                spendEcoPoints,
                updateUsername,
                logout
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = (): UserDataContextType => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
};
