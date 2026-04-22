import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">Your Portfolio</h2>
          <p className="text-slate-500">Real-time overview of your manual holdings.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={20} /> Add Asset
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Wealth" value="₹12,45,000" change="+12.5%" positive={true} />
        <StatCard title="Total Profit" value="₹2,10,000" change="+5.2%" positive={true} />
        <StatCard title="Risk Level" value="Moderate" change="Low Vol" positive={true} />
      </div>

      {/* Asset Table */}
      <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase text-slate-500 font-semibold">
            <tr>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Avg. Price</th>
              <th className="px-6 py-4">Current Value</th>
              <th className="px-6 py-4">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            <AssetRow name="Reliance Ind." qty="50" avg="₹2,450" current="₹1,32,500" pl="+₹10,000" pos={true} />
            <AssetRow name="HDFC Bank" qty="100" avg="₹1,620" current="₹1,72,000" pl="+₹10,000" pos={true} />
            <AssetRow name="Zomato" qty="500" avg="₹180" current="₹85,000" pl="-₹5,000" pos={false} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, positive }) => (
  <motion.div whileHover={{ y: -5 }} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <p className="text-sm text-slate-500 font-medium">{title}</p>
    <div className="flex items-baseline gap-3 mt-2">
      <span className="text-2xl font-bold">{value}</span>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {change}
      </span>
    </div>
  </motion.div>
);

const AssetRow = ({ name, qty, avg, current, pl, pos }) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
    <td className="px-6 py-4 font-medium">{name}</td>
    <td className="px-6 py-4 text-slate-500">{qty}</td>
    <td className="px-6 py-4 text-slate-500">{avg}</td>
    <td className="px-6 py-4 font-semibold">{current}</td>
    <td className={`px-6 py-4 font-bold ${pos ? 'text-green-500' : 'text-red-500'}`}>{pl}</td>
  </tr>
);

export default Dashboard;