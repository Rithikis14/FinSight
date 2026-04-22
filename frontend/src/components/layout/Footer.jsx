import React from 'react';
import { LineChart, Globe, Info, Shield, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-slate-50">
              <LineChart className="text-primary" size={24} />
              <span>Wealth<span className="text-primary">AI</span></span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Institutional-grade financial analysis powered by local Agentic AI. 
              Your data, your privacy, your growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-slate-900 dark:text-slate-50">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Analysis</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-slate-900 dark:text-slate-50">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Info size={14}/> About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Shield size={14}/> Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-slate-900 dark:text-slate-50">Connect</h4>
            <div className="flex gap-4 mb-4">
              <Globe className="text-slate-400 hover:text-primary cursor-pointer transition-colors" size={20} />
              <Mail className="text-slate-400 hover:text-primary cursor-pointer transition-colors" size={20} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">support@wealthai.io</p>
          </div>
        </div>

        {/* Financial Disclaimer */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-4 max-w-2xl mx-auto">
            Financial Disclaimer: WealthAI is an educational tool created by Rithik V Kumar. AI-generated insights are not financial advice. 
            Invest at your own risk.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} WealthAI Systems Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;