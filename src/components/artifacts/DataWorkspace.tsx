import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';
import type { DataArtifact } from '../../types';

interface DataWorkspaceProps {
  artifact?: DataArtifact;
}

export const DataWorkspace: React.FC<DataWorkspaceProps> = ({ artifact }) => {
  const [activeTab, setActiveTab] = useState<'chart' | 'table' | 'sql'>('chart');
  const [copied, setCopied] = useState<boolean>(false);
  const [chartType, setChartType] = useState<'bar' | 'area'>(artifact?.chartType === 'area' ? 'area' : 'bar');

  const rows = artifact?.rows || [
    { Region: 'North America', Revenue: 45000, Growth: 24, UnitsSold: 1200 },
    { Region: 'Europe', Revenue: 32000, Growth: 18, UnitsSold: 850 },
    { Region: 'Asia Pacific', Revenue: 28000, Growth: 31, UnitsSold: 940 },
    { Region: 'Latin America', Revenue: 14000, Growth: 12, UnitsSold: 410 }
  ];

  const columns = artifact?.columns || ['Region', 'Revenue', 'Growth', 'UnitsSold'];
  const sqlQuery = artifact?.sqlQuery || 'SELECT Region, SUM(Revenue) AS Revenue, AVG(Growth) AS Growth FROM q3_sales GROUP BY Region ORDER BY Revenue DESC;';

  const chartData = artifact?.chartData || rows;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-low text-xs text-on-surface">
      {/* Top Header */}
      <div className="px-3 sm:px-4 py-2.5 border-b border-border bg-surface flex items-center justify-between shrink-0 select-none flex-wrap gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="material-symbols-outlined text-[18px] text-emerald-400 shrink-0">table_chart</span>
          <span className="font-semibold text-on-surface text-xs truncate max-w-[140px] sm:max-w-none">
            {artifact?.title || 'Q3 Regional Sales Performance'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-surface-container-low p-0.5 rounded-lg border border-border">
            <button
              onClick={() => setActiveTab('chart')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md font-semibold text-[10px] sm:text-[11px] transition-all cursor-pointer ${activeTab === 'chart' ? 'bg-primary-container text-white' : 'text-muted hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[14px]">bar_chart</span>
              <span>Chart</span>
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md font-semibold text-[10px] sm:text-[11px] transition-all cursor-pointer ${activeTab === 'table' ? 'bg-primary-container text-white' : 'text-muted hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[14px]">grid_on</span>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md font-semibold text-[10px] sm:text-[11px] transition-all cursor-pointer ${activeTab === 'sql' ? 'bg-primary-container text-white' : 'text-muted hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span>SQL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="flex-1 overflow-auto p-3 sm:p-4 flex flex-col bg-background">
        {activeTab === 'chart' && (
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-mono text-muted uppercase tracking-wider">
                Recharts Visual Intelligence
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border cursor-pointer ${chartType === 'bar' ? 'bg-primary-container text-white border-primary-container' : 'border-border text-muted'}`}
                >
                  Bar
                </button>
                <button
                  onClick={() => setChartType('area')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border cursor-pointer ${chartType === 'area' ? 'bg-primary-container text-white border-primary-container' : 'border-border text-muted'}`}
                >
                  Area
                </button>
              </div>
            </div>

            <div className="w-full h-64 bg-surface rounded-xl p-2 sm:p-4 border border-border">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="Region" stroke="#a1a1aa" fontSize={10} />
                    <YAxis stroke="#a1a1aa" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1f26', borderColor: '#2d2f39', fontSize: '11px', color: '#fff' }} />
                    <Bar dataKey="Revenue" fill="#a4c8ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : (
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="Region" stroke="#a1a1aa" fontSize={10} />
                    <YAxis stroke="#a1a1aa" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1f26', borderColor: '#2d2f39', fontSize: '11px', color: '#fff' }} />
                    <Area type="monotone" dataKey="Revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <div className="border border-border rounded-xl overflow-x-auto bg-surface">
            <table className="w-full text-left border-collapse font-mono text-[10px] sm:text-[11px] min-w-[360px]">
              <thead>
                <tr className="bg-surface-container-high border-b border-border text-muted">
                  {columns.map((col, idx) => (
                    <th key={idx} className="p-2.5 sm:p-3 font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-surface-container-high/50">
                    {columns.map((col, cIdx) => (
                      <td key={cIdx} className="p-2.5 sm:p-3">{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'sql' && (
          <div className="space-y-4">
            <div className="p-3 sm:p-4 rounded-xl bg-surface border border-border space-y-2">
              <div className="flex items-center justify-between text-muted text-[10px]">
                <span className="font-mono uppercase tracking-wider">SQL QUERY EXECUTOR ENGINE</span>
                <button onClick={handleCopy} className="hover:text-on-surface flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-[14px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? 'Copied' : 'Copy Query'}</span>
                </button>
              </div>
              <pre className="text-xs text-emerald-300 font-mono leading-relaxed whitespace-pre-wrap">
                {sqlQuery}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
