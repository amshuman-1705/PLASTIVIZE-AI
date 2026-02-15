
import React from 'react';
import Card from './common/Card';
import Avatar from './common/Avatar';
import Button from './common/Button';
import { useToast } from '../contexts/ToastContext';
import { useUserData } from '../contexts/UserDataContext';
import ViewHeader from './common/ViewHeader';
import { marketplaceItems } from './data/marketplaceItems';
import MarketplaceItem from './common/MarketplaceItem';

const getRankIcon = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
}

const LeaderboardItem: React.FC<{ rank: number; name: string; score: number; isUser?: boolean }> = ({ rank, name, score, isUser }) => (
  <div className={`flex items-center p-3 rounded-lg ${isUser ? 'bg-brand-green-light text-white shadow-md scale-105' : 'bg-brand-gray'}`}>
    <span className={`font-bold w-10 text-center text-lg ${isUser ? '' : 'text-brand-text-light'}`}>{getRankIcon(rank)}</span>
    <Avatar name={name} className="w-10 h-10 mx-3 border-2 border-white text-sm" />
    <span className="flex-grow font-semibold">{name}</span>
    {isUser && <span className="text-xs font-bold bg-white/30 px-2 py-1 rounded-full mr-3">You</span>}
    <span className="font-bold">{score.toLocaleString()} pts</span>
  </div>
);

interface CommunityProps {
  onBack: () => void;
}

const Community: React.FC<CommunityProps> = ({ onBack }) => {
  const { addToast } = useToast();
  const { userData } = useUserData();

  const handleJoinChallenge = () => {
    addToast({
        type: 'success',
        title: 'Challenge Joined!',
        message: 'Thanks for contributing to a greener planet!'
    })
  }

  // Show a subset of items on the community page
  const featuredMarketplaceItems = marketplaceItems.slice(0, 2);

  return (
    <div>
      <ViewHeader title="Community Hub" onBack={onBack} />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 items-start">
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-bold text-brand-text mb-4 text-center">Community Leaderboard</h2>
            <div className="space-y-2">
              <LeaderboardItem rank={1} name="Eco Warrior" score={8500} />
              <LeaderboardItem rank={2} name="Green Thumb" score={7950} />
              <LeaderboardItem rank={3} name={userData.username || 'You'} score={userData.stats.ecoPoints} isUser />
              <LeaderboardItem rank={4} name="Recycle Pro" score={6800} />
              <LeaderboardItem rank={5} name="Plastic Free" score={6550} />
            </div>
          </Card>
        </div>

        <div className="space-y-6 mt-6 md:mt-0">
           <Card>
            <h2 className="text-lg font-bold text-brand-text mb-4 text-center">Community Challenge</h2>
            <div className="text-center p-4 bg-brand-gray rounded-lg">
                <p className="text-3xl mb-2">🏆</p>
                <h3 className="font-bold text-brand-green-dark">City-Wide PET Bottle Drive</h3>
                <p className="text-sm text-brand-text-light">Help us collect 10,000 PET bottles by the end of the month!</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div className="bg-brand-green h-2.5 rounded-full" style={{width: '45%'}}></div>
                </div>
                <p className="text-xs text-brand-text-light mt-1">4,500 / 10,000 collected</p>
                <Button className="mt-4 py-2 text-sm" onClick={handleJoinChallenge}>Join Challenge</Button>
            </div>
          </Card>
          
          <Card>
            <h2 className="text-lg font-bold text-brand-text mb-4 text-center">Eco-Marketplace</h2>
            <p className="text-center text-sm text-brand-text-light mb-4">Unlock community creations with your Eco-Points.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredMarketplaceItems.map(item => <MarketplaceItem key={item.id} item={item} />)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;