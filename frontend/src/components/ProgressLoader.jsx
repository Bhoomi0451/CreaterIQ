import React, { useState, useEffect } from "react";

const ProgressLoader = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "Uploading content metadata...",
    "Extracting video segments...",
    "Scanning thumbnail parameters...",
    "Computing virality and hook scores...",
    "Synthesizing recommendations...",
    "Finalizing AI report..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const progressPercent = Math.min(Math.round(((step + 1) / steps.length) * 100), 100);

  return (
    <div className="mt-8 bg-slate-50 p-6 rounded-2xl border border-gray-100 max-w-xl mx-auto space-y-4 shadow-sm">
      <div className="flex justify-between text-sm font-semibold text-gray-700">
        <span>🤖 AI Analyzing Content</span>
        <span>{progressPercent}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <p className="text-center text-sm font-medium text-blue-600 animate-pulse">
        ✨ {steps[step]}
      </p>
    </div>
  );
};

export default ProgressLoader;