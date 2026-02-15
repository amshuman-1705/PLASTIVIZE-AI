import React, { useState, useRef, useEffect } from 'react';
import { classifyPlastic, getReuseIdeas } from '../services/geminiService';
import type { PlasticClassification, ReuseIdea } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import { AnalysisIcon, CarbonIcon, ClockIcon, RecycleIcon, TargetIcon, LightbulbIcon, ChevronRightIcon } from './icons/FeatureIcons';
import SkeletonLoader from './common/SkeletonLoader';
import { useToast } from '../contexts/ToastContext';
import { useUserData } from '../contexts/UserDataContext';
import { View } from '../App';
import ViewHeader from './common/ViewHeader';
import ProgressBar from './common/ProgressBar';
import DIYTutorialModal from './common/DIYTutorialModal';

interface ScannerProps {
  navigateTo: (view: View) => void;
  onBack: () => void;
}

const Scanner: React.FC<ScannerProps> = ({ navigateTo, onBack }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [classification, setClassification] = useState<PlasticClassification | null>(null);
  const [reuseIdeas, setReuseIdeas] = useState<ReuseIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedIdea, setSelectedIdea] = useState<ReuseIdea | null>(null);

  const { addToast } = useToast();
  const { addScanResult } = useUserData();

  const cleanupCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (isCameraOpen) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing camera:", err);
          setError("Could not access camera. Please check permissions.");
          addToast({ type: 'error', title: 'Camera Error', message: 'Could not access camera. Please check permissions.' });
          setIsCameraOpen(false);
        });
    } else {
      cleanupCamera();
    }
    return cleanupCamera;
  }, [isCameraOpen]);
  
  const resetState = () => {
      setImageFile(null);
      setPreviewUrl(null);
      setClassification(null);
      setReuseIdeas([]);
      setError(null);
      setIsLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileAndPreview(file);
    }
  };
  
  const setFileAndPreview = (file: File) => {
    resetState();
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          setFileAndPreview(file);
        }
        setIsCameraOpen(false);
      }, 'image/jpeg');
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setClassification(null);
    setReuseIdeas([]);

    const classificationResult = await classifyPlastic(imageFile);
    if (classificationResult) {
      const newPoints = addScanResult(classificationResult);
      setClassification(classificationResult);
      addToast({ type: 'success', title: 'Analysis Complete!', message: `You've earned ${newPoints} Eco-Points.` });
      
      const ideas = await getReuseIdeas(classificationResult.plasticType);
      setReuseIdeas(ideas);
    } else {
      setError("Failed to classify the plastic. Please try another image.");
      addToast({ type: 'error', title: 'Analysis Failed', message: 'Could not identify the plastic. Try a clearer image.' });
    }
    setIsLoading(false);
  };

  const triggerFileSelect = () => fileInputRef.current?.click();
  
  const handleViewTutorial = (idea: ReuseIdea) => {
    setSelectedIdea(idea);
  };

  const InfoRow: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center">
        <span className="text-brand-green mr-3">{icon}</span>
        <span className="text-sm font-medium text-brand-text-light">{label}</span>
      </div>
      <span className="text-sm font-semibold text-brand-text text-right">{value}</span>
    </div>
  );

  const renderSkeleton = () => (
    <div className="space-y-6">
      <Card>
        <SkeletonLoader className="h-6 w-3/4 mx-auto mb-4" />
        <div className="space-y-2">
          <SkeletonLoader className="h-8 w-full" />
          <SkeletonLoader className="h-8 w-full" />
          <SkeletonLoader className="h-8 w-full" />
        </div>
      </Card>
      <Card>
        <SkeletonLoader className="h-6 w-1/2 mx-auto mb-4" />
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => <div key={i} className="flex items-start"><SkeletonLoader className="h-8 w-8 rounded-full flex-shrink-0" /><div className="ml-4 w-full"><SkeletonLoader className="h-5 w-1/3 mb-2" /><SkeletonLoader className="h-4 w-full" /></div></div>)}
        </div>
      </Card>
    </div>
  );

  if (isCameraOpen) {
    return (
      <div className="space-y-4 max-w-lg mx-auto">
        <Card>
          <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
          <p className="text-xs text-center text-brand-text-light mt-2">Point your camera at a plastic item.</p>
        </Card>
        <div className="flex space-x-2">
          <Button onClick={handleCapture} className="flex-grow">Capture</Button>
          <Button onClick={() => setIsCameraOpen(false)} className="bg-gray-600 hover:bg-gray-700 flex-shrink-0 w-24">Cancel</Button>
        </div>
      </div>
    );
  }
  
  if (classification) {
    return (
        <>
          {selectedIdea && (
            <DIYTutorialModal 
              idea={selectedIdea} 
              plasticType={classification.plasticType}
              onClose={() => setSelectedIdea(null)} 
            />
          )}
          <div className="animate-view-fade-in">
            <ViewHeader title="Analysis Results" onBack={onBack} />
            <div className="md:grid md:grid-cols-2 md:gap-8 items-start">
              <div className="space-y-6">
                 <Card>
                    <img src={previewUrl!} alt="Scanned item" className="w-full rounded-lg shadow-md mb-4" />
                  </Card>
              </div>
              <div className="space-y-6 mt-6 md:mt-0">
                  <Card>
                      <h3 className="text-md font-bold text-brand-text mb-3 text-center">Analysis Results</h3>
                      <InfoRow icon={<AnalysisIcon />} label="Plastic Type" value={classification.plasticType} />
                      <InfoRow icon={<RecycleIcon />} label="Recyclability" value={classification.recyclability} />
                      <InfoRow icon={<ClockIcon />} label="Decomposition Time" value={classification.decompositionTime} />
                      <InfoRow icon={<CarbonIcon />} label="Carbon Impact" value={classification.carbonImpact} />
                      <InfoRow icon={<TargetIcon />} label="Confidence" value={`${(classification.confidenceScore * 100).toFixed(0)}%`} />
                  </Card>

                  {reuseIdeas.length > 0 && (
                      <Card>
                      <h3 className="text-md font-bold text-brand-text mb-3 text-center">Creative Reuse Ideas</h3>
                      <ul className="space-y-4">
                          {reuseIdeas.map((idea, index) => (
                          <li key={index} className="flex items-start">
                              <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-brand-green-light text-white">
                                  <LightbulbIcon />
                              </span>
                              </div>
                              <div className="ml-4">
                              <p className="font-semibold text-brand-green-dark">{idea.title}</p>
                              <p className="text-sm text-brand-text-light mt-1">{idea.description}</p>
                              <button 
                                onClick={() => handleViewTutorial(idea)}
                                className="text-sm font-bold text-brand-green hover:text-brand-green-dark mt-2"
                              >
                                View DIY Tutorial
                              </button>
                              </div>
                          </li>
                          ))}
                      </ul>
                      </Card>
                  )}
              </div>
            </div>
             <div className="flex space-x-2 mt-6 max-w-lg mx-auto">
                <Button onClick={resetState}>Scan Another Item</Button>
                <Button onClick={() => navigateTo('dashboard')} className="bg-gray-600 hover:bg-gray-700">View Dashboard</Button>
            </div>
          </div>
        </>
    )
  }

  return (
    <div>
      <ViewHeader title="Plastic Analyzer" onBack={onBack} />
      <div className="space-y-6 max-w-lg mx-auto">
        <Card className="animate-fade-in-up">
          <div className="text-center">
            <h2 className="text-lg font-bold text-brand-text mb-2">Scan Your Plastic</h2>
            <p className="text-sm text-brand-text-light mb-4">Identify plastic with your camera or an image.</p>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
            <div className="flex space-x-2">
              <Button onClick={() => setIsCameraOpen(true)} className="flex-grow">Open Camera</Button>
              <Button onClick={triggerFileSelect} className="flex-grow bg-brand-green-light hover:bg-brand-green text-brand-text font-semibold">
                {imageFile ? 'Change Image' : 'Upload Image'}
              </Button>
            </div>
            {previewUrl && (
              <div className="mt-4">
                <img src={previewUrl} alt="Preview" className="mx-auto rounded-lg max-h-48 shadow-md" />
              </div>
            )}
          </div>
        </Card>

        <Card 
            onClick={() => navigateTo('community')}
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group animate-fade-in-up"
            style={{animationDelay: '100ms'}}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-green">Community Challenge</p>
                <h4 className="text-md font-bold text-brand-text mt-1">City-Wide PET Bottle Drive</h4>
              </div>
              <div className="text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-green">
                <ChevronRightIcon />
              </div>
            </div>
            <p className="text-sm text-brand-text-light mt-2">Help us collect 10,000 PET bottles. Every scan counts towards our goal!</p>
            <div className="mt-3">
                <ProgressBar progress={45} />
                <div className="flex justify-between text-xs text-brand-text-light mt-1">
                    <span>Progress</span>
                    <span className="font-semibold">4,500 / 10,000</span>
                </div>
            </div>
        </Card>

        {imageFile && (
          <div className="text-center animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <Button onClick={handleSubmit} isLoading={isLoading} disabled={isLoading}>
              Analyze Plastic
            </Button>
          </div>
        )}

        {isLoading && renderSkeleton()}
        {error && !isLoading && <p className="text-red-500 text-center font-medium p-4 bg-red-50 rounded-lg">{error}</p>}
      </div>
    </div>
  );
};

export default Scanner;
