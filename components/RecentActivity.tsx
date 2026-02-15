
import React from 'react';
import Card from './common/Card';
import { useUserData } from '../contexts/UserDataContext';
import { ActivityScanIcon, ActivityTrophyIcon, ActivityMarketplaceIcon } from './icons/FeatureIcons';
import { ActivityLogItem } from '../types';

const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(days / 365);
    return `${years}y ago`;
};

const ActivityIcon: React.FC<{type: ActivityLogItem['type']}> = ({ type }) => {
    const iconMap = {
        scan: <ActivityScanIcon className="w-6 h-6 sm:w-7 sm:h-7"/>,
        achievement: <ActivityTrophyIcon className="w-6 h-6 sm:w-7 sm:h-7"/>,
        marketplace: <ActivityMarketplaceIcon className="w-6 h-6 sm:w-7 sm:h-7"/>,
    };
    const styleMap = {
        scan: 'bg-blue-100 text-blue-500',
        achievement: 'bg-green-100 text-green-500',
        marketplace: 'bg-yellow-100 text-yellow-500',
    };
    return (
        <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${styleMap[type] || 'bg-gray-100 text-gray-500'}`}>
            {iconMap[type]}
        </div>
    );
};

const RecentActivity: React.FC = () => {
    const { userData } = useUserData();
    const activities = userData.activityLog.slice(0, 4); // Limit to latest 4 activities

    return (
        <Card className="p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-brand-text mb-4 sm:mb-6">Recent Activity</h3>
            {activities.length > 0 ? (
                <ul className="space-y-4 sm:space-y-6">
                    {activities.map((activity, index) => (
                        <li key={index} className="flex items-start">
                            <ActivityIcon type={activity.type} />
                            <div className="ml-4 sm:ml-5">
                                <p className="text-base font-semibold text-brand-text leading-tight">{activity.title}</p>
                                <p className="text-sm text-brand-text-light">{activity.description}</p>
                                <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(activity.date)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-4">
                    <p className="text-sm text-brand-text-light">Your recent activities will appear here.</p>
                    <p className="text-xs text-gray-400">Scan an item to get started!</p>
                </div>
            )}
        </Card>
    );
};

export default RecentActivity;
