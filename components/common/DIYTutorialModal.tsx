import React, { useState, useEffect } from 'react';
import { getDIYTutorial } from '../../services/geminiService';
import type { ReuseIdea, DIYTutorial } from '../../types';
import { LoadingSpinner } from './LoadingSpinner';
import { CloseIcon, LightbulbIcon } from '../icons/FeatureIcons';

interface DIYTutorialModalProps {
    idea: ReuseIdea;
    plasticType: string;
    onClose: () => void;
}

const DIYTutorialModal: React.FC<DIYTutorialModalProps> = ({ idea, plasticType, onClose }) => {
    const [tutorial, setTutorial] = useState<DIYTutorial | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTutorial = async () => {
            setIsLoading(true);
            setError(null);
            const result = await getDIYTutorial(idea.title, plasticType);
            if (result) {
                setTutorial(result);
            } else {
                setError("Could not load the tutorial at this time. Please try again later.");
            }
            setIsLoading(false);
        };
        fetchTutorial();
    }, [idea, plasticType]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <LoadingSpinner />
                    <p className="mt-4 text-brand-text-light">Preparing your DIY guide...</p>
                </div>
            );
        }
        if (error) {
            return <div className="text-center text-red-500 p-8">{error}</div>;
        }
        if (tutorial) {
            return (
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="font-bold text-brand-text mb-2 text-lg">Materials Needed</h3>
                        <ul className="list-disc list-inside space-y-1 text-brand-text-light bg-brand-gray p-4 rounded-lg">
                            {tutorial.materials.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-brand-text mb-2 text-lg">Step-by-Step Instructions</h3>
                        <ol className="list-decimal list-inside space-y-3 text-brand-text-light">
                            {tutorial.steps.map((step, i) => <li key={i} className="pl-2 leading-relaxed">{step}</li>)}
                        </ol>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-modal-content-in" onClick={(e) => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-green-light text-white">
                            <LightbulbIcon />
                        </span>
                        <div>
                            <h2 className="text-xl font-bold text-brand-text">{idea.title}</h2>
                            <p className="text-sm text-brand-text-light">A DIY guide for {plasticType}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <CloseIcon className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default DIYTutorialModal;
