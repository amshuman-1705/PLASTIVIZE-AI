
import React, { useState, useCallback, useEffect } from 'react';
import Home from './components/Home';
import Scanner from './components/Scanner';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import Chatbot from './components/Chatbot';
import Community from './components/Community';
import Globe from './components/Globe';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';
import SplashScreen from './components/SplashScreen';
import Landing from './components/Landing';
import AuthModal from './components/auth/AuthModal';
import ToastContainer from './components/common/Toast';
import { useUserData } from './contexts/UserDataContext';
import LeftPanel from './components/LeftPanel';
import { Logo } from './components/icons/Logo';
import { HamburgerIcon, CloseIcon } from './components/icons/FeatureIcons';
import ChatbotWidget from './components/ChatbotWidget';
import RecyclingGuide from './components/RecyclingGuide';
import Marketplace from './components/Marketplace';
import MaterialDatabase from './components/MaterialDatabase';

export type View = 'home' | 'scanner' | 'dashboard' | 'calculator' | 'chatbot' | 'community' | 'globe' | 'profile' | 'about' | 'contact' | 'guide' | 'marketplace' | 'database';
export type PublicView = 'landing' | 'about' | 'contact' | 'globe';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [publicView, setPublicView] = useState<PublicView>('landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPublicMobileMenuOpen, setIsPublicMobileMenuOpen] = useState(false);
  console.log("ENV CHECK:", import.meta.env.VITE_GEMINI_API_KEY);


  const { isLoggedIn } = useUserData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setIsInitialized(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navigateTo = (view: View) => {
    setActiveView(view);
    closeMobileMenu();
  };

  const goHome = () => {
    setActiveView('home');
    closeMobileMenu();
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const renderView = useCallback(() => {
    switch (activeView) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'scanner':
        return <Scanner navigateTo={navigateTo} onBack={goHome} />;
      case 'dashboard':
        return <Dashboard onBack={goHome} />;
      case 'calculator':
        return <Calculator onBack={goHome} />;
      case 'chatbot':
        return <Chatbot onBack={goHome} />;
      case 'community':
        return <Community onBack={goHome} />;
      case 'globe':
        return <Globe onBack={goHome} />;
      case 'profile':
        return <Profile onBack={goHome} />;
      case 'about':
        return <About onBack={goHome} />;
      case 'contact':
        return <Contact onBack={goHome} />;
      case 'guide':
        return <RecyclingGuide onBack={goHome} />;
      case 'marketplace':
        return <Marketplace onBack={goHome} />;
      case 'database':
        return <MaterialDatabase onBack={goHome} />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  }, [activeView, navigateTo]);

  if (showSplash) {
    return <SplashScreen />;
  }
  
  if (!isLoggedIn) {
      if (publicView === 'globe') {
          return (
              <div className="h-screen w-screen bg-black animate-view-fade-in">
                  <Globe onBack={() => setPublicView('landing')} />
              </div>
          );
      }

      const renderPublicContent = () => {
        switch (publicView) {
            case 'about':
                return <About onBack={() => setPublicView('landing')} />;
            case 'contact':
                return <Contact onBack={() => setPublicView('landing')} />;
            case 'landing':
            default:
                return (
                    <Landing
                        onLogin={() => openAuthModal('login')}
                        onSignUp={() => openAuthModal('signup')}
                        onExplore={() => setPublicView('globe')}
                        onNavigateToAbout={() => setPublicView('about')}
                        onNavigateToContact={() => setPublicView('contact')}
                    />
                );
        }
    };
      
    return (
        <>
          {isPublicMobileMenuOpen && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 sm:hidden animate-modal-fade-in">
                  <div className="flex justify-end p-4">
                      <button onClick={() => setIsPublicMobileMenuOpen(false)} aria-label="Close menu">
                          <CloseIcon className="w-8 h-8 text-white" />
                      </button>
                  </div>
                  <nav className="flex flex-col items-center space-y-8 mt-16 text-center">
                      <button onClick={() => { setPublicView('about'); setIsPublicMobileMenuOpen(false); }} className="text-white text-2xl font-bold hover:text-brand-primary-light transition-colors">About Us</button>
                      <button onClick={() => { setPublicView('contact'); setIsPublicMobileMenuOpen(false); }} className="text-white text-2xl font-bold hover:text-brand-primary-light transition-colors">Contact</button>
                      <button onClick={() => { openAuthModal('login'); setIsPublicMobileMenuOpen(false); }} className="text-white text-2xl font-bold hover:text-brand-primary-light transition-colors">Login</button>
                      <button onClick={() => { openAuthModal('signup'); setIsPublicMobileMenuOpen(false); }} className="mt-4 bg-brand-green text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-brand-primary-dark transition-colors">Sign Up</button>
                  </nav>
              </div>
          )}
          <div className={`min-h-screen font-sans ${isInitialized ? 'animate-app-fade-in' : 'opacity-0'}`}>
            <ToastContainer />
            {publicView === 'landing' ? (
                renderPublicContent()
            ) : (
                <>
                    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-white shadow-sm sticky top-0 z-20">
                        <div className="flex justify-between items-center max-w-7xl mx-auto">
                            <button onClick={() => setPublicView('landing')} aria-label="Go to homepage">
                                <Logo className="h-9 w-auto" />
                            </button>
                             <div className="hidden sm:flex items-center space-x-2">
                                <button onClick={() => setPublicView('about')} className="font-semibold transition-colors px-4 py-2 rounded-md text-brand-text-light hover:text-brand-text">About Us</button>
                                <button onClick={() => setPublicView('contact')} className="font-semibold transition-colors px-4 py-2 rounded-md text-brand-text-light hover:text-brand-text">Contact</button>
                                <button onClick={() => openAuthModal('login')} className="font-semibold transition-colors px-4 py-2 rounded-md text-brand-green hover:text-brand-green-dark">Login</button>
                                <button onClick={() => openAuthModal('signup')} className="font-bold py-2 px-4 rounded-lg transition duration-300 bg-brand-green hover:bg-brand-green-dark text-white">Sign Up</button>
                            </div>
                            <div className="sm:hidden">
                                <button onClick={() => setIsPublicMobileMenuOpen(true)} aria-label="Open menu">
                                    <HamburgerIcon className="w-7 h-7 text-brand-text" />
                                </button>
                            </div>
                        </div>
                    </header>
                    <main className="p-4 sm:p-6 md:p-8 bg-brand-gray flex-grow">
                        <div key={publicView} className="animate-view-fade-in w-full">
                            {renderPublicContent()}
                        </div>
                    </main>
                     <footer className="bg-white">
                        <div className="container mx-auto py-8 px-4 md:px-8 lg:px-16 text-center text-brand-text-light text-sm">
                        <p>&copy; 2025 PLASTIVIZE. All rights reserved.</p>
                        <p className="mt-2">Your AI Guide to a Greener Planet.</p>
                        </div>
                    </footer>
                </>
            )}
            {showAuthModal && <AuthModal mode={authMode} onClose={() => setShowAuthModal(false)} />}
          </div>
          <ChatbotWidget />
        </>
      );
  }

  if (activeView === 'globe') {
      return (
          <div className={`h-screen w-screen bg-black ${isInitialized ? 'animate-app-fade-in' : 'opacity-0'}`}>
              <Globe onBack={goHome} />
          </div>
      );
  }

  return (
    <div className={`h-screen bg-brand-gray font-sans flex relative ${isInitialized ? 'animate-app-fade-in' : 'opacity-0'}`}>
      <ToastContainer />

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static h-full ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <LeftPanel onClose={closeMobileMenu} navigateTo={navigateTo} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex-shrink-0 sticky top-0 z-20 bg-white/80 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between">
          <Logo className="h-9 w-auto" />
          <button onClick={openMobileMenu} aria-label="Open menu">
            <HamburgerIcon className="w-7 h-7 text-brand-text" />
          </button>
        </header>

        <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
          <div key={activeView} className="animate-view-fade-in w-full">
            {renderView()}
          </div>
        </main>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default App;
