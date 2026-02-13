
import React from 'react';
import { Upload, Database, Search, Cpu, CheckCircle } from 'lucide-react';

const StepCard = ({ number, title, description, icon: Icon, isLast = false }: any) => (
  <div className="relative">
    {!isLast && (
      <div className="hidden lg:block absolute top-10 left-[calc(100%-2rem)] w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent z-0"></div>
    )}
    <div className="glass-card p-8 rounded-3xl relative z-10 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="absolute top-4 left-4 text-4xl font-black text-white/5">{number}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  </div>
);

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Data Upload',
      description: 'The investigator uploads claim details or a batch CSV file for processing.',
      icon: Upload
    },
    {
      number: '02',
      title: 'Preprocessing',
      description: 'Pandas handles cleaning, normalization, and feature scaling of the claim data.',
      icon: Database
    },
    {
      number: '03',
      title: 'EDA Analysis',
      description: 'Automated exploratory data analysis checks for statistical outliers.',
      icon: Search
    },
    {
      number: '04',
      title: 'CNN Model',
      description: 'Our neural network identifies deep pattern matches across historical fraud signatures.',
      icon: Cpu
    },
    {
      number: '05',
      title: 'AI Result',
      description: 'System outputs a probability score and a Generative AI explanation for the investigator.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">The Detection Lifecycle</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          From raw data to actionable intelligence. Our seamless pipeline ensures that every 
          claim is scrutinized with the highest level of detail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-24">
        {steps.map((step, idx) => (
          <StepCard key={idx} {...step} isLast={idx === steps.length - 1} />
        ))}
      </div>

      <div className="glass-card p-10 rounded-3xl border-l-4 border-blue-600">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Workflow Visualization</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1 h-12 bg-blue-500 rounded-full mt-1"></div>
                <div>
                  <h4 className="font-semibold text-lg">Input Layer</h4>
                  <p className="text-slate-400 text-sm">Accepts structured JSON or CSV formats containing over 45 risk features.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 h-12 bg-indigo-500 rounded-full mt-1"></div>
                <div>
                  <h4 className="font-semibold text-lg">Hidden Layers (CNN)</h4>
                  <p className="text-slate-400 text-sm">3 Conv2D layers for spatial feature extraction + 2 Dense layers for classification.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 h-12 bg-green-500 rounded-full mt-1"></div>
                <div>
                  <h4 className="font-semibold text-lg">Output Layer</h4>
                  <p className="text-slate-400 text-sm">Sigmoid activation providing a 0.0 to 1.0 probability of fraudulent activity.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-950 p-6 rounded-2xl font-mono text-sm border border-slate-800 shadow-inner">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
              <span className="text-slate-500">fraud_model_v2.py</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
            </div>
            <pre className="text-blue-400">
{`# CNN Architecture Setup
def build_model():
    model = Sequential([
        layers.Conv1D(64, 3, activation='relu'),
        layers.MaxPooling1D(2),
        layers.Dropout(0.2),
        layers.Flatten(),
        layers.Dense(32, activation='relu'),
        layers.Dense(1, activation='sigmoid')
    ])
    return model`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
