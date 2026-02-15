
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Logo } from './icons/Logo';
import { NewsIcon, LightbulbIcon, ActivityTrophyIcon, RefreshIcon, HamburgerIcon, CloseIcon } from './icons/FeatureIcons';
import { getLatestInsights } from '../services/geminiService';
import type { Insight } from '../types';
import InsightModal from './common/InsightModal';
import SkeletonLoader from './common/SkeletonLoader';

interface LandingProps {
    onLogin: () => void;
    onSignUp: () => void;
    onExplore: () => void;
    onNavigateToAbout: () => void;
    onNavigateToContact: () => void;
}

const InsightCard: React.FC<{ insight: Insight; onClick: () => void }> = ({ insight, onClick }) => {
    const icons: Record<string, React.ReactNode> = {
        news: <NewsIcon className="w-6 h-6"/>,
        tip: <LightbulbIcon className="w-6 h-6"/>,
        community: <ActivityTrophyIcon className="w-6 h-6"/>
    };

    return (
        <div onClick={onClick} className="bg-white p-5 rounded-xl shadow-md flex items-start space-x-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
            <div className="bg-brand-gray text-brand-green w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {icons[insight.type] || <NewsIcon className="w-6 h-6" />}
            </div>
            <div>
                <p className="font-bold text-brand-text">{insight.title}</p>
                <p className="text-sm text-brand-text-light mt-1">{insight.description}</p>
            </div>
        </div>
    );
};

const Landing: React.FC<LandingProps> = ({ onLogin, onSignUp, onExplore, onNavigateToAbout, onNavigateToContact }) => {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const titleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const fetchInsights = useCallback(async () => {
        setIsLoading(true);
        const fetchedInsights = await getLatestInsights();
        setInsights(fetchedInsights);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchInsights();
    }, [fetchInsights]);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const originalTitle = "PLASTIVIZE";
        let titleIndex = 0;

        const handleVisibilityChange = () => {
            if (document.hidden && insights.length > 0) {
                const alertTitles = insights.flatMap(insight => [originalTitle, insight.title]);
                titleIntervalRef.current = setInterval(() => {
                    titleIndex = (titleIndex + 1) % alertTitles.length;
                    document.title = alertTitles[titleIndex];
                }, 2000);
            } else {
                if (titleIntervalRef.current) {
                    clearInterval(titleIntervalRef.current);
                    titleIntervalRef.current = null;
                }
                document.title = originalTitle;
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (titleIntervalRef.current) {
                clearInterval(titleIntervalRef.current);
            }
            document.title = originalTitle;
        };
    }, [insights]);


    const renderInsightSkeletons = () => (
        [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow-md flex items-start space-x-4">
                <SkeletonLoader className="w-12 h-12 rounded-lg flex-shrink-0" />
                <div className="flex-grow">
                    <SkeletonLoader className="h-5 w-3/4 mb-2" />
                    <SkeletonLoader className="h-4 w-full" />
                    <SkeletonLoader className="h-4 w-5/6 mt-1" />
                </div>
            </div>
        ))
    );

  return (
    <>
    {selectedInsight && <InsightModal insight={selectedInsight} onClose={() => setSelectedInsight(null)} />}

    {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 sm:hidden animate-modal-fade-in">
            <div className="flex justify-end p-4">
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                    <CloseIcon className="w-8 h-8 text-white" />
                </button>
            </div>
            <nav className="flex flex-col items-center space-y-8 mt-16 text-center">
                <button onClick={() => { onNavigateToAbout(); setIsMobileMenuOpen(false); }} className="text-white text-2xl font-bold hover:text-brand-primary-light transition-colors">About Us</button>
                <button onClick={() => { onNavigateToContact(); setIsMobileMenuOpen(false); }} className="text-white text-2xl font-bold hover:text-brand-primary-light transition-colors">Contact</button>
                <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="text-white text-2xl font-bold hover:text-brand-primary-light transition-colors">Login</button>
                <button onClick={() => { onSignUp(); setIsMobileMenuOpen(false); }} className="mt-4 bg-brand-green text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-brand-primary-dark transition-colors">Sign Up</button>
            </nav>
        </div>
    )}

    <div className="text-brand-text">
      {/* Header */}
      <header
        ref={headerRef}
        className={`py-6 px-4 md:px-8 lg:px-16 sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/75 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Logo
            className="h-8 w-auto"
            waveColor1={isScrolled ? '#10B981' : '#FFFFFF'}
            waveColor2={isScrolled ? '#34D399' : '#FFFFFF'}
            textColor={isScrolled ? '#059669' : '#FFFFFF'}
          />
          <div className="hidden sm:flex space-x-2 items-center">
             <button
              onClick={onNavigateToAbout}
              className={`font-semibold transition-colors px-4 py-2 rounded-md ${
                isScrolled
                  ? 'text-brand-text-light hover:text-brand-text'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              About Us
            </button>
             <button
              onClick={onNavigateToContact}
              className={`font-semibold transition-colors px-4 py-2 rounded-md ${
                isScrolled
                  ? 'text-brand-text-light hover:text-brand-text'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Contact
            </button>
            <button
              onClick={onLogin}
              className={`font-semibold transition-colors px-4 py-2 rounded-md ${
                isScrolled
                  ? 'text-brand-green hover:text-brand-green-dark'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Login
            </button>
            <button
              onClick={onSignUp}
              className={`font-bold py-2 px-4 rounded-lg transition duration-300 ${
                isScrolled
                  ? 'bg-brand-green hover:bg-brand-green-dark text-white'
                  : 'bg-brand-green hover:bg-brand-primary-dark text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
          <div className="sm:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
                <HamburgerIcon className={`w-7 h-7 transition-colors ${isScrolled ? 'text-brand-text' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white text-center overflow-hidden bg-slate-900">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute z-0 w-full h-full object-cover"
                src="https://videos.pexels.com/video-files/8061320/8061320-hd_1920_1080_25fps.mp4"
            >
                Your browser does not support the video tag.
            </video>
            
            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-20 px-4 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-extrabold text-shadow mb-4 leading-tight">
                Turn Plastic Waste into <span className="text-brand-primary-light animate-text-glow">Positive Impact</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-200 text-shadow mb-8">
                PLASTIVIZE uses AI to help you identify, recycle, and creatively reuse plastic. Join our community and start making a difference today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button onClick={onSignUp} className="bg-brand-green hover:bg-brand-primary-dark text-white font-bold py-4 px-8 rounded-lg transition duration-300 text-lg w-full sm:w-auto animate-pulse-glow">
                    Get Started for Free
                </button>
                <button onClick={onExplore} className="bg-transparent hover:bg-white hover:text-brand-text text-white font-bold py-4 px-8 rounded-lg transition duration-300 text-lg border-2 border-white w-full sm:w-auto">
                    Explore the Globe
                </button>
                </div>
            </div>
        </section>

        {/* Latest Insights Section */}
        <section className="bg-brand-gray py-16 md:py-24 relative z-10">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <div className="flex justify-between items-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-brand-text">Latest Insights & Alerts</h2>
                    <button onClick={fetchInsights} disabled={isLoading} className="flex items-center space-x-2 text-brand-green-dark hover:text-brand-green font-semibold disabled:opacity-50 transition-colors">
                    <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                    </button>
                </div>
                <div className="max-w-3xl mx-auto space-y-6">
                    {isLoading ? renderInsightSkeletons() :
                        insights.length > 0 ? insights.map((item) => (
                            <InsightCard key={item.id} insight={item} onClick={() => setSelectedInsight(item)} />
                        )) : (
                            <div className="text-center text-brand-text-light py-8">
                                <p>Could not fetch latest insights. Please try again later.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="container mx-auto py-8 px-4 md:px-8 lg:px-16 text-center text-brand-text-light text-sm">
          <p>&copy; 2025 PLASTIVIZE. All rights reserved.</p>
          <p className="mt-2">Your AI Guide to a Greener Planet.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Landing;
