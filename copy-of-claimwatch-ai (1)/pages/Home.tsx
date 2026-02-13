
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Next-Gen AI Protection
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block text-white">Smart Fraud Detection</span>
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent italic">
              Using Generative AI
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-10">
            Identify suspicious insurance claims in real-time. Our CNN-powered platform 
            analyzes deep patterns in claim data to reduce losses and improve investigation efficiency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              Try Demo <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/model-details"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 border border-slate-700"
            >
              View Model Details
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Real-time Analysis</h3>
            <p className="text-slate-400 leading-relaxed">
              Process claims instantly using our high-performance inference engine. Get results in milliseconds.
            </p>
          </div>
          <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Deep Learning CNN</h3>
            <p className="text-slate-400 leading-relaxed">
              Utilizes advanced Convolutional Neural Networks to detect non-linear patterns that rule-based systems miss.
            </p>
          </div>
          <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform">
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Explainable AI</h3>
            <p className="text-slate-400 leading-relaxed">
              Powered by Generative AI, we provide clear human-readable explanations for every flagged claim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
