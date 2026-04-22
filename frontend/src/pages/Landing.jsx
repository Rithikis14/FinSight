import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Cpu } from 'lucide-react';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, staggerChildren: 0.25 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center text-center space-y-16 py-16"
    >
      {/* Hero Header */}
      <header className="max-w-4xl space-y-8 px-4">
        <motion.h1 variants={containerVariants} className="text-6xl md:text-7xl font-extrabold tracking-tighter dark:text-slate-700">
          Manage Wealth with <span className="text-primary">Local Intelligence.</span>
        </motion.h1>
        <motion.p variants={containerVariants} className="text-xl leading-relaxed max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          A production-grade investment tracker powered by Ollama. 
          Keep your financial data private while getting institutional-level insights.
        </motion.p>
        <motion.div variants={containerVariants} className="flex gap-5 justify-center pt-5">
          <button className="bg-primary hover:bg-blue-600 text-white px-10 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-sm">
            Get Started
          </button>
          <button className="border border-slate-300 dark:border-slate-700 px-10 py-3.5 rounded-full font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-800 dark:text-slate-200">
            How it works
          </button>
        </motion.div>
      </header>

      {/* Modern Feature Cards Section */}
      <section className="grid md:grid-cols-3 gap-10 w-full max-w-6xl pt-16 px-6">
        <FeatureCard 
          icon={<TrendingUp className="text-primary" size={28}/>} 
          title="Manual Tracking" 
          description="Add your stocks and mutual funds manually. No broker logins required."
        />
        <FeatureCard 
          icon={<ShieldCheck className="text-green-500" size={28}/>} 
          title="Bank-Level Security" 
          description="Your data is encrypted and stored in your private PostgreSQL instance."
        />
        <FeatureCard 
          icon={<Cpu className="text-purple-500" size={28}/>} 
          title="Local RAG AI" 
          description="Analysis performed locally via Ollama. Your data never leaves your machine."
        />
      </section>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-slate-950/20 transition-colors"
  >
    <div className="mb-6 inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-50">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export default Landing;