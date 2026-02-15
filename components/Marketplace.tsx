import React from 'react';
import ViewHeader from './common/ViewHeader';
import { useUserData } from '../contexts/UserDataContext';
import { marketplaceItems } from './data/marketplaceItems';
import MarketplaceItem from './common/MarketplaceItem';
import { StarIcon } from './icons/FeatureIcons';
import Card from './common/Card';

interface MarketplaceProps {
  onBack: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onBack }) => {
  const { userData } = useUserData();

  return (
    <div>
      <ViewHeader title="Eco Marketplace" onBack={onBack} />
      <div className="space-y-6">
        <Card className="!p-4 sm:!p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-brand-text">Discover Products from Waste</h2>
                    <p className="text-brand-text-light mt-1">Unlock these unique items created by the community using your Eco-Points.</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 bg-yellow-100 text-yellow-800 font-bold px-4 py-2 rounded-full text-lg">
                    <StarIcon className="w-6 h-6" />
                    <span>{userData.stats.ecoPoints.toLocaleString()}</span>
                </div>
            </div>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {marketplaceItems.map(item => <MarketplaceItem key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;