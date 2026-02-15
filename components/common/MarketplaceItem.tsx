import React from 'react';
import type { MarketplaceItemData } from '../../types';
import { useUserData } from '../../contexts/UserDataContext';
import { useToast } from '../../contexts/ToastContext';
import Card from './Card';
import Button from './Button';
import Avatar from './Avatar';
import { StarIcon } from '../icons/FeatureIcons';

interface MarketplaceItemProps {
    item: MarketplaceItemData;
}

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({ item }) => {
    const { userData, spendEcoPoints } = useUserData();
    const { addToast } = useToast();

    const isUnlocked = userData.unlockedMarketplaceItems.includes(item.id);
    const canAfford = userData.stats.ecoPoints >= item.cost;

    const handleUnlock = () => {
        if (spendEcoPoints(item.id, item.cost)) {
            addToast({type: 'success', title: 'Item Unlocked!', message: `You've unlocked "${item.title}".`});
        } else {
            addToast({type: 'error', title: 'Not Enough Points', message: 'Scan more items to earn Eco-Points.'});
        }
    };

    return (
        <Card className="overflow-hidden group flex flex-col">
            <div className="relative bg-gray-200 aspect-video flex items-center justify-center overflow-hidden">
                {isUnlocked ? (
                    <item.SvgComponent className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h4 className="font-bold text-brand-text mb-1 truncate">{item.title}</h4>
                <div className="flex items-center text-sm text-brand-text-light mb-2">
                    <Avatar name={item.creator.name} className="w-6 h-6 mr-2 text-xs" />
                    <span>by {item.creator.name}</span>
                </div>
                 <p className="text-xs text-brand-text-light flex-grow mb-3">{item.description}</p>
                <div className="mt-auto">
                    {isUnlocked ? (
                        <p className="text-center font-bold text-brand-green bg-green-100 py-2 rounded-lg text-sm">Unlocked</p>
                    ) : (
                        <Button onClick={handleUnlock} disabled={!canAfford} className="w-full text-sm py-2">
                           <div className="flex items-center justify-center">
                                <StarIcon className="w-4 h-4 mr-2" />
                                <span>Unlock for {item.cost}</span>
                           </div>
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
};
export default MarketplaceItem;
