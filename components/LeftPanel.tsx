import React from 'react';
import { Logo } from './icons/Logo';
import { useUserData } from '../contexts/UserDataContext';
import { BoxIcon, CO2Icon, StarIcon, CloseIcon } from './icons/FeatureIcons';
import { LogoutIcon, UserCircleIcon, InfoIcon, MailIcon } from './icons/UserIcons';
import RecentActivity from './RecentActivity';
import { View } from '../App';

const StatItem: React.FC<{ value: string; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
    <div className="text-center">
        <div className="text-brand-green mx-auto mb-1 sm:mb-2">{icon}</div>
        <p className="font-bold text-brand-text text-2xl sm:text-3xl">{value}</p>
        <p className="text-sm sm:text-base text-brand-text-light">{label}</p>
    </div>
);

const NavLink: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <li>
        <button
            onClick={onClick}
            className="w-full flex items-center px-3 py-3 text-base font-semibold text-brand-text-light rounded-lg hover:bg-brand-gray hover:text-brand-text transition-colors duration-200 group"
        >
            <span className="text-gray-500 group-hover:text-brand-green">{icon}</span>
            <span className="ml-4">{label}</span>
        </button>
    </li>
);

interface LeftPanelProps {
  onClose: () => void;
  navigateTo: (view: View) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ onClose, navigateTo }) => {
    const { userData, logout } = useUserData();
    const { stats, username } = userData;

    return (
        <aside className="w-80 lg:w-[400px] bg-white h-full flex flex-col p-4 sm:p-6 lg:p-8 shadow-2xl md:shadow-none md:border-r md:border-gray-200 flex-shrink-0 overflow-y-auto">
            <div className="flex items-center justify-between mb-8 sm:mb-12">
                <button onClick={() => navigateTo('home')} aria-label="Go to homepage">
                    <Logo className="h-10 sm:h-14 w-auto" />
                </button>
                <button onClick={onClose} className="md:hidden p-2 -mr-2" aria-label="Close menu">
                    <CloseIcon className="w-6 h-6 text-gray-500" />
                </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
                <div className="grid grid-cols-3 gap-4">
                    <StatItem value={stats.itemsScanned.toString()} label="Items Scanned" icon={<BoxIcon className="w-7 h-7 sm:w-8 sm:h-8" />} />
                    <StatItem value={stats.co2Saved.toFixed(2)} label="CO₂ Saved" icon={<CO2Icon className="w-7 h-7 sm:w-8 sm:h-8" />} />
                    <StatItem value={stats.ecoPoints.toLocaleString()} label="Eco-Points" icon={<StarIcon className="w-7 h-7 sm:w-8 sm:h-8" />} />
                </div>
            </div>

            <div className="mt-8 sm:mt-10">
                <RecentActivity />
            </div>
            
            <div className="mt-8 sm:mt-10">
                <h3 className="px-3 text-xs font-semibold uppercase text-gray-500 tracking-wider">More</h3>
                <nav className="mt-2">
                    <ul className="space-y-1">
                        <NavLink icon={<UserCircleIcon className="w-6 h-6"/>} label="Profile" onClick={() => navigateTo('profile')} />
                        <NavLink icon={<InfoIcon className="w-6 h-6"/>} label="About Us" onClick={() => navigateTo('about')} />
                        <NavLink icon={<MailIcon className="w-6 h-6"/>} label="Contact Us" onClick={() => navigateTo('contact')} />
                    </ul>
                </nav>
            </div>

            <div className="mt-auto pt-8 sm:pt-10 border-t border-gray-200">
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <UserCircleIcon className="w-12 h-12 sm:w-14 sm:h-14 text-gray-500" />
                    <div>
                        <p className="font-bold text-brand-text text-lg sm:text-xl">{username}</p>
                        <p className="text-sm sm:text-base text-brand-text-light">{stats.ecoPoints.toLocaleString()} points</p>
                    </div>
                    <div className="ml-auto flex items-center">
                        <button onClick={logout} className="p-3 text-gray-500 hover:text-red-500 transition-colors" aria-label="Logout">
                            <LogoutIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default LeftPanel;