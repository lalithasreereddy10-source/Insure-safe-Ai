
import React, { useState } from 'react';
import { 
  AlertCircle, 
  Loader2, 
  ShieldAlert, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Upload,
  Cpu // Added missing Cpu icon import to resolve "Cannot find name 'Cpu'" error.
} from 'lucide-react';
import { ClaimDetails, PredictionResult } from '../types';
import { getFraudExplanation } from '../services/geminiService';

const Demo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<ClaimDetails>({
    policyNumber: 'POL-' + Math.floor(100000 + Math.random() * 900000),
    claimAmount: 5000,
    incidentType: 'Rear-end Collision',
    location: 'Urban',
    policyAge: 24,
    previousClaims: 0,
    incidentDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'claimAmount' || name === 'policyAge' || name === 'previousClaims' 
        ? parseFloat(value) 
        : value
    }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Simulated CNN inference logic based on heuristics
    setTimeout(async () => {
      let score = 15; // Baseline risk
      if (formData.claimAmount > 15000) score += 30;
      if (formData.previousClaims > 2) score += 25;
      if (formData.policyAge < 6) score += 20;
      if (formData.incidentType === 'Single Vehicle Theft') score += 10;
      
      const probability = Math.min(score + Math.floor(Math.random() * 15), 99);
      const isFraud = probability > 60;
      const riskLevel = probability < 30 ? 'Low' : probability < 70 ? 'Medium' : 'High';

      // Use Gemini to generate an explanation
      const explanation = await getFraudExplanation(formData, probability);

      setResult({
        probability,
        riskLevel,
        isFraud,
        explanation
      });
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setResult(null);
    setFormData({
      policyNumber: 'POL-' + Math.floor(100000 + Math.random() * 900000),
      claimAmount: 5000,
      incidentType: 'Rear-end Collision',
      location: 'Urban',
      policyAge: 24,
      previousClaims: 0,
      incidentDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Input Form */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Claim Analyzer</h2>
            <p className="text-slate-400">Enter the details below to evaluate the fraud risk level using our neural network.</p>
          </div>

          <form onSubmit={handlePredict} className="glass-card p-8 rounded-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Policy Number</label>
                <input
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Incident Date</label>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Claim Amount ($)</label>
                <input
                  type="number"
                  name="claimAmount"
                  value={formData.claimAmount}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Incident Type</label>
                <select
                  name="incidentType"
                  value={formData.incidentType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option>Rear-end Collision</option>
                  <option>Single Vehicle Theft</option>
                  <option>Multi-vehicle Pileup</option>
                  <option>Fire Damage</option>
                  <option>Natural Disaster</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Policy Age (Months)</label>
                <input
                  type="number"
                  name="policyAge"
                  value={formData.policyAge}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Previous Claims</label>
                <input
                  type="number"
                  name="previousClaims"
                  value={formData.previousClaims}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> Analyzing Pattern...
                </>
              ) : (
                'Run Fraud Prediction'
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 text-slate-500 text-sm">
            <Upload className="w-4 h-4" />
            <span>Or drag and drop a batch CSV file here</span>
          </div>
        </div>

        {/* Right Column: Prediction Result */}
        <div className="flex flex-col justify-start">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center p-12 glass-card rounded-3xl text-center border-dashed border-2 border-slate-700">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Info className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-300">Awaiting Prediction</h3>
              <p className="text-slate-500 max-w-xs">
                Fill out the claim details and click Predict to see the AI analysis result here.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center p-12 glass-card rounded-3xl text-center">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                <Cpu className="absolute inset-0 m-auto w-10 h-10 text-blue-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-2">Neural Engine Processing</h3>
              <p className="text-slate-400">Evaluating 42 features against fraud database...</p>
            </div>
          )}

          {result && !loading && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className={`glass-card p-8 rounded-3xl border-t-8 ${
                result.riskLevel === 'High' ? 'border-red-500' : 
                result.riskLevel === 'Medium' ? 'border-yellow-500' : 'border-green-500'
              }`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Prediction Output</h3>
                    <p className="text-slate-400 text-sm">Policy ID: {formData.policyNumber}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                    result.riskLevel === 'High' ? 'bg-red-500/10 text-red-500' : 
                    result.riskLevel === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                  }`}>
                    {result.riskLevel} RISK
                  </div>
                </div>

                <div className="flex items-center gap-8 mb-10">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-800"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={364.42}
                        strokeDashoffset={364.42 - (364.42 * result.probability) / 100}
                        className={
                          result.riskLevel === 'High' ? 'text-red-500' : 
                          result.riskLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                        }
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{result.probability}%</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Fraud Prob.</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {result.isFraud ? <ShieldAlert className="w-6 h-6 text-red-500" /> : <CheckCircle2 className="w-6 h-6 text-green-500" />}
                      <span className="font-bold text-lg">
                        {result.isFraud ? 'Investigation Recommended' : 'Verified Genuine Claim'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      The model detected {result.probability}% correlation with historical fraudulent claim patterns.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 italic">AI Investigation Insights</h4>
                  </div>
                  <p className="text-slate-300 italic leading-relaxed text-sm">
                    "{result.explanation}"
                  </p>
                </div>

                <button 
                  onClick={resetForm}
                  className="text-blue-500 text-sm font-semibold flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Clear Results & Run New Scan <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Icon for Insights
const Zap = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

export default Demo;
