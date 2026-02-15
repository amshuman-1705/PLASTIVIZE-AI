import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from './common/Card';
import { CO2Icon, StarIcon, BoxIcon } from './icons/FeatureIcons';
import { useUserData } from '../contexts/UserDataContext';
import { ALL_ACHIEVEMENTS } from '../contexts/UserDataContext';
import { ScanHistoryItem } from '../types';
import ViewHeader from './common/ViewHeader';

const COLORS = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#059669', '#047857'];

const StatCard: React.FC<{ value: string; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg transition-shadow hover:shadow-lg duration-200">
        <div className="p-3 rounded-full bg-brand-green-light text-white mb-2">
            {icon}
        </div>
        <div>
            <p className="text-xl font-bold text-brand-text">{value}</p>
            <p className="text-sm text-brand-text-light">{label}</p>
        </div>
    </div>
);

const Badge: React.FC<{ icon: string; name: string; description: string; isUnlocked: boolean; }> = ({ icon, name, description, isUnlocked }) => (
    <div className={`flex flex-col items-center text-center transition-all duration-300 ${isUnlocked ? 'opacity-100' : 'opacity-40 grayscale'}`}>
        <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">
                <defs>
                    <linearGradient id={`grad-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={isUnlocked ? '#FBBF24' : '#D1D5DB'} />
                        <stop offset="100%" stopColor={isUnlocked ? '#F59E0B' : '#9CA3AF'} />
                    </linearGradient>
                </defs>
                <path d="M50 0 L100 25 V85 L50 120 L0 85 V25 Z" fill={`url(#grad-${name})`} />
                <path d="M50 0 L100 25 V85 L50 120 L0 85 V25 Z" stroke="#fff" strokeWidth="4" fill="none" opacity="0.2" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-5xl text-white drop-shadow-lg">
                {icon}
            </div>
        </div>
        <p className="font-semibold text-brand-text mt-2 text-sm">{name}</p>
        <p className="text-xs text-brand-text-light">{isUnlocked ? description : 'Locked'}</p>
    </div>
);

const EmptyChartState: React.FC<{title: string}> = ({title}) => (
    <div className="h-[250px] flex flex-col items-center justify-center text-center">
        <h3 className="text-md font-bold text-brand-text mb-4">{title}</h3>
        <p className="text-brand-text-light">Scan your first plastic item</p>
        <p className="text-sm text-gray-400">to see your data here!</p>
    </div>
);

const ScanHistoryList: React.FC<{ history: ScanHistoryItem[] }> = ({ history }) => {
    if (history.length === 0) {
        return (
            <div className="text-center py-4">
                <p className="text-sm text-brand-text-light">Your scan history will appear here.</p>
            </div>
        );
    }

    const recentHistory = [...history].reverse().slice(0, 5);

    return (
        <ul className="space-y-3">
            {recentHistory.map((scan, index) => (
                <li key={index} className="flex items-center justify-between p-2 rounded-lg bg-brand-gray">
                    <div>
                        <p className="font-semibold text-brand-text">{scan.plasticType}</p>
                        <p className="text-xs text-brand-text-light">{new Date(scan.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-brand-green">+{scan.ecoPoints} pts</p>
                        <p className="text-xs text-brand-text-light">-{scan.co2Saved.toFixed(2)}kg CO₂</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const { userData } = useUserData();
  const { stats, unlockedAchievements, scanHistory } = userData;

  const getWeeklyData = (history: ScanHistoryItem[]) => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = new Date();
      const weeklyData = Array(7).fill(null).map((_, i) => {
          const d = new Date();
          d.setDate(today.getDate() - (6 - i));
          return { name: days[d.getDay()], items: 0 };
      });

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 6);
      oneWeekAgo.setHours(0, 0, 0, 0);

      history.forEach(scan => {
          const scanDate = new Date(scan.date);
          if (scanDate >= oneWeekAgo) {
              const dayIndex = weeklyData.findIndex(d => d.name === days[scanDate.getDay()]);
              if (dayIndex !== -1) {
                  weeklyData[dayIndex].items += 1;
              }
          }
      });
      return weeklyData;
  };
  
  const getPlasticTypeData = (history: ScanHistoryItem[]) => {
      const typeCounts = history.reduce((acc, scan) => {
          acc[scan.plasticType] = (acc[scan.plasticType] || 0) + 1;
          return acc;
      }, {} as {[key: string]: number});

      return Object.entries(typeCounts).map(([name, value]) => ({ name, value }));
  };
  
  const weeklyChartData = getWeeklyData(scanHistory);
  const plasticTypeChartData = getPlasticTypeData(scanHistory);


  return (
    <div>
      <ViewHeader title="Eco Dashboard" onBack={onBack} />
      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-bold text-brand-text mb-4 text-center">Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard value={stats.itemsScanned.toString()} label="Items Scanned" icon={<BoxIcon />} />
              <StatCard value={`${stats.co2Saved.toFixed(2)} kg`} label="CO₂ Saved" icon={<CO2Icon />} />
              <StatCard value={stats.ecoPoints.toLocaleString()} label="Eco-Points" icon={<StarIcon />} />
          </div>
        </Card>
        
        <Card>
          <h3 className="text-md font-bold text-brand-text mb-4 text-center">Achievements</h3>
          <div className="flex justify-around pt-4 pb-2">
              {ALL_ACHIEVEMENTS.map(ach => (
                  <Badge 
                      key={ach.id}
                      icon={ach.icon}
                      name={ach.name}
                      description={ach.description}
                      isUnlocked={unlockedAchievements.includes(ach.id)}
                  />
              ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3">
              {scanHistory.length > 0 ? (
                  <>
                      <h3 className="text-md font-bold text-brand-text mb-4">Weekly Scans (items)</h3>
                      <div style={{ width: '100%', height: 250 }}>
                          <ResponsiveContainer>
                              <BarChart data={weeklyChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                              <YAxis allowDecimals={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                              <Tooltip cursor={{fill: 'rgba(16, 185, 129, 0.1)'}} contentStyle={{backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px'}}/>
                              <Bar dataKey="items" fill="#10B981" radius={[4, 4, 0, 0]} />
                              </BarChart>
                          </ResponsiveContainer>
                      </div>
                  </>
              ) : <EmptyChartState title="Weekly Scans (items)"/>}
          </Card>
          
          <Card className="lg:col-span-2">
              {scanHistory.length > 0 ? (
                   <>
                      <h3 className="text-md font-bold text-brand-text mb-4">Plastic Types</h3>
                      <div style={{ width: '100%', height: 250 }}>
                          <ResponsiveContainer>
                          <PieChart>
                              <Pie
                              data={plasticTypeChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              innerRadius={50}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              >
                              {plasticTypeChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                              </Pie>
                              <Tooltip contentStyle={{backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px'}}/>
                          </PieChart>
                          </ResponsiveContainer>
                      </div>
                   </>
              ) : <EmptyChartState title="Your Recycled Plastic Types"/> }
          </Card>
        </div>
        <Card>
            <h3 className="text-md font-bold text-brand-text mb-4">Recent Scans</h3>
            <ScanHistoryList history={scanHistory} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;