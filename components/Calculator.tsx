import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Loader from './common/Loader';
import { calculateFootprint } from '../services/geminiService';
import type { FootprintResult } from '../types';
import { BagIcon, BottleIcon, ContainerIcon } from './icons/FeatureIcons';
import ViewHeader from './common/ViewHeader';

interface CalculatorProps {
  onBack: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onBack }) => {
  const [bottles, setBottles] = useState('');
  const [bags, setBags] = useState('');
  const [containers, setContainers] = useState('');
  const [result, setResult] = useState<FootprintResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usageData = {
      bottles: parseInt(bottles, 10) || 0,
      bags: parseInt(bags, 10) || 0,
      containers: parseInt(containers, 10) || 0,
    };
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    const footprintResult = await calculateFootprint(usageData);
    if (footprintResult) {
      setResult(footprintResult);
    } else {
      setError("Could not calculate your footprint. Please try again.");
    }

    setIsLoading(false);
  };
  
  const InputField: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, icon: React.ReactNode}> = ({ label, value, onChange, icon }) => (
    <div>
        <label className="block text-sm font-medium text-brand-text-light mb-1">{label}</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
          <input
              type="number"
              min="0"
              value={value}
              onChange={onChange}
              placeholder="e.g., 5"
              className="w-full pl-12 pr-4 py-3 bg-brand-gray text-brand-text placeholder-gray-500 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>
    </div>
  );

  const renderResult = () => {
    if (!result) return null;

    const maxFootprint = Math.max(result.monthlyFootprintKg, result.nationalAverageKg, 1) * 1.5;
    const userHeight = (result.monthlyFootprintKg / maxFootprint) * 100;
    const avgHeight = (result.nationalAverageKg / maxFootprint) * 100;
    const isBelowAverage = result.monthlyFootprintKg < result.nationalAverageKg;

    return (
        <Card>
          <h3 className="text-md font-bold text-brand-text mb-3 text-center">Your Estimated Footprint</h3>
          <div className="text-center mb-4">
            <p className="text-4xl font-bold text-brand-green">{result.monthlyFootprintKg.toFixed(2)} kg</p>
            <p className="text-brand-text-light">per month</p>
          </div>
          
          <div className="px-2">
            <div className="flex items-end h-32 justify-center space-x-8">
              <div className="relative w-16 text-center flex flex-col justify-end">
                <p className="text-xs font-semibold -mb-4">{result.monthlyFootprintKg.toFixed(1)}kg</p>
                <div className="bg-brand-green mx-auto rounded-t-md animate-bar-grow" style={{ height: `${userHeight}%`, minHeight: '2px', width: '80%' }}></div>
                <p className="text-xs font-bold mt-1">You</p>
              </div>
              <div className="relative w-16 text-center flex flex-col justify-end">
                <p className="text-xs font-semibold -mb-4">{result.nationalAverageKg.toFixed(1)}kg</p>
                <div className="bg-gray-300 mx-auto rounded-t-md animate-bar-grow" style={{ height: `${avgHeight}%`, minHeight: '2px', width: '80%', animationDelay: '150ms' }}></div>
                <p className="text-xs font-bold mt-1">Average</p>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-2 mb-4"></div>
          </div>
          
          <p className={`text-center text-sm font-medium p-3 rounded-md ${isBelowAverage ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {isBelowAverage ? "Great job! Your footprint is below the national average." : "Your footprint is above average, but here are some tips to help!"}
          </p>
          
          <div className="mt-4">
            <h4 className="font-semibold text-brand-text mb-2">Recommendations to Reduce:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-brand-text-light">
                {result.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                ))}
            </ul>
          </div>
        </Card>
    );
  }

  return (
    <div>
      <ViewHeader title="Footprint Calculator" onBack={onBack} />
      <div className="md:grid md:grid-cols-2 md:gap-8 items-start">
          <div className="space-y-6">
              <Card>
                  <h2 className="text-lg font-bold text-brand-text mb-2 text-center">Plastic Footprint Calculator</h2>
                  <p className="text-sm text-brand-text-light mb-4 text-center">Estimate your weekly plastic usage to understand your impact.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                  <InputField label="Plastic Bottles per week" value={bottles} onChange={(e) => setBottles(e.target.value)} icon={<BottleIcon />} />
                  <InputField label="Plastic Bags per week" value={bags} onChange={(e) => setBags(e.target.value)} icon={<BagIcon />} />
                  <InputField label="Takeaway Containers per week" value={containers} onChange={(e) => setContainers(e.target.value)} icon={<ContainerIcon />} />
                  <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                      Calculate My Footprint
                  </Button>
                  </form>
              </Card>
          </div>
          <div className="mt-6 md:mt-0">
              {isLoading && <Loader message="Calculating your footprint..." />}
              {error && <p className="text-red-500 text-center">{error}</p>}
              {result && <div className="animate-view-fade-in">{renderResult()}</div>}
          </div>
      </div>
    </div>
  );
};

export default Calculator;
