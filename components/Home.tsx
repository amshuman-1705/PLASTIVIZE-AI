

import React from 'react';
import type { View } from '../App';
import { useUserData } from '../contexts/UserDataContext';
import Card from './common/Card';

interface HomeProps {
  navigateTo: (view: View) => void;
}

const featureCards = [
    { view: 'scanner' as View, emoji: '🔬', title: "Plastic Analyzer", description: "Snap a photo of any plastic item to instantly identify its type, recyclability, and environmental impact." },
    { view: 'dashboard' as View, emoji: '📊', title: "Eco Dashboard", description: "Track your progress, view your positive impact, and earn achievements on your sustainability journey." },
    { view: 'globe' as View, emoji: '🌍', title: "Explore the Globe", description: "Visualize plastic usage and recycling efforts on an interactive 3D globe." },
    { view: 'calculator' as View, emoji: '👣', title: "Footprint Calculator", description: "Estimate your plastic consumption and discover personalized tips to reduce your footprint." },
    { view: 'guide' as View, emoji: '📖', title: "Interactive Recycling Guide", description: "Learn how to properly recycle different types of plastic with region-specific rules." },
    { view: 'database' as View, emoji: '📚', title: "Material Database", description: "Find sustainable alternatives for common plastics like PET, HDPE, and more." },
    { view: 'chatbot' as View, emoji: '💬', title: "Eco Chatbot", description: "Ask our friendly AI assistant anything about recycling, sustainable living, and eco-friendly practices." },
    { view: 'community' as View, emoji: '🤝', title: "Community Hub", description: "Join challenges, view leaderboards, and connect with a community of eco-warriors." },
    { view: 'marketplace' as View, emoji: '🛍️', title: "Eco Marketplace", description: "Discover amazing products made from recycled plastic and unlock them with your points." }
];

const FeatureCard: React.FC<{ emoji: string; title: string; description: string; onClick: () => void; }> = ({ emoji, title, description, onClick }) => (
    <Card
        onClick={onClick}
        className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group text-center flex flex-col items-center p-6 h-full"
    >
        <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">{emoji}</div>
        <h3 className="text-xl font-bold text-brand-text">{title}</h3>
        <p className="mt-2 text-base text-brand-text-light flex-grow">{description}</p>
    </Card>
);

const Home: React.FC<HomeProps> = ({ navigateTo }) => {
    const { userData } = useUserData();
    const { username } = userData;
    
    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-extrabold text-brand-text">Hello, {username}!</h1>
                <p className="mt-4 text-xl text-brand-text-light">Welcome back to your eco-dashboard.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featureCards.map((feature, index) => (
                    <div key={feature.view} className="animate-fade-in-up" style={{ animationDelay: `${index * 75}ms`}}>
                        <FeatureCard
                            emoji={feature.emoji}
                            title={feature.title}
                            description={feature.description}
                            onClick={() => navigateTo(feature.view)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;