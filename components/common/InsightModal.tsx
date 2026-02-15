
import React, { useState, useEffect } from 'react';
import type { Insight, InsightDetails } from '../../types';
import { getInsightDetails } from '../../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import Timeline from './Timeline';
import ProgressBar from './ProgressBar';
import { CloseIcon } from '../icons/FeatureIcons';

interface InsightModalProps {
    insight: Insight;
    onClose: () => void;
}

const InsightModal: React.FC<InsightModalProps> = ({ insight, onClose }) => {
    const [details, setDetails] = useState<InsightDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            setError(null);
            const fetchedDetails = await getInsightDetails(insight);
            if (fetchedDetails) {
                setDetails(fetchedDetails);
            } else {
                setError("Could not load details for this insight.");
            }
            setIsLoading(false);
        };
        fetchDetails();
    }, [insight]);

    // Add keyboard listener for escape key
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
                    <p className="mt-4 text-brand-text-light">Generating detailed analysis...</p>
                </div>
            );
        }
        if (error) {
            return <div className="text-center text-red-500 p-8">{error}</div>
        }
        if (details) {
            return (
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-brand-text mb-4">{details.title}</h2>
                    <p className="text-brand-text-light whitespace-pre-wrap mb-6">{details.summary}</p>

                    {details.progress !== undefined && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-brand-text mb-2">Current Progress</h3>
                            <ProgressBar progress={details.progress} />
                            <p className="text-right text-sm text-brand-text-light mt-1">{details.progress}% Complete</p>
                        </div>
                    )}
                    
                    {details.timeline && details.timeline.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-brand-text mb-3">Timeline of Events</h3>
                            <Timeline events={details.timeline} />
                        </div>
                    )}

                    <div>
                        <h3 className="font-semibold text-brand-text mb-2">Key Takeaways</h3>
                        <ul className="list-disc list-inside space-y-2 text-brand-text-light">
                            {details.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                </div>
            )
        }
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-modal-content-in" onClick={(e) => e.stopPropagation()}>
                <div className="flex-shrink-0 p-4 flex justify-end">
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

export default InsightModal;
