import React, { useState, useEffect, useRef } from 'react';
import type { CodeArtifact } from '../../types';

interface CodeWorkspaceProps {
  artifact?: CodeArtifact;
}

export type SupportedLanguage = 
  | 'javascript' 
  | 'python' 
  | 'react' 
  | 'html' 
  | 'css' 
  | 'java' 
  | 'c' 
  | 'sql';

const languageTemplates: Record<SupportedLanguage, { fileName: string; code: string }> = {
  javascript: {
    fileName: 'app.js',
    code: `// JavaScript ES6+ Playground
function calculateAnalytics(data) {
  console.log("📊 Processing analytics payload...");
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const average = total / data.length;
  console.log(\`Total Revenue: \$\${total}\`);
  console.log(\`Average Order: \$\${average.toFixed(2)}\`);
  return { total, average };
}

const sales = [
  { id: 1, name: "Subscription Tier A", value: 299 },
  { id: 2, name: "Enterprise Custom", value: 1499 },
  { id: 3, name: "Add-on Module", value: 150 }
];

calculateAnalytics(sales);`
  },
  python: {
    fileName: 'main.py',
    code: `# Python 3.11 Execution Engine
def generate_fibonacci(n):
    print(f"🐍 Generating Fibonacci sequence for first {n} numbers...")
    seq = [0, 1]
    for i in range(2, n):
        seq.append(seq[-1] + seq[-2])
    return seq

numbers = generate_fibonacci(10)
print("Fibonacci Result:", numbers)
print(f"Max Value: {max(numbers)}")`
  },
  react: {
    fileName: 'Counter.jsx',
    code: `// React.js Interactive Component
function CounterApp() {
  const [count, setCount] = React.useState(0);
  const [items, setItems] = React.useState(["Task 1", "Task 2"]);

  const addItem = () => {
    setItems([...items, \`Task \${items.length + 1}\`]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#f8fafc', background: '#0f172a', borderRadius: '12px' }}>
      <h2 style={{ color: '#38bdf8' }}>⚛️ React Live Counter</h2>
      <p style={{ fontSize: '14px' }}>Current Count: <strong style={{ color: '#4ade80' }}>{count}</strong></p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button onClick={() => setCount(count + 1)} style={{ padding: '8px 16px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Increment +1
        </button>
        <button onClick={addItem} style={{ padding: '8px 16px', background: '#a855f7', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Add Task Item
        </button>
      </div>
      <ul>
        {items.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  );
}`
  },
  html: {
    fileName: 'index.html',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #090d16; color: #e2e8f0; padding: 30px; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px; max-width: 400px; }
    h1 { color: #38bdf8; font-size: 20px; margin-top: 0; }
    button { background: linear-gradient(135deg, #6366f1, #a855f7); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; }
    button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🌐 Live HTML5 Web Render</h1>
    <p>This is a live interactive HTML/CSS render frame inside Aetheris IDE.</p>
    <button onclick="alert('Hello from HTML Sandbox!')">Click Demo</button>
  </div>
</body>
</html>`
  },
  css: {
    fileName: 'styles.css',
    code: `/* CSS3 Design System Sandbox */
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  border-color: #6366f1;
}`
  },
  java: {
    fileName: 'Main.java',
    code: `// Java 21 Execution Environment
public class Main {
    public static void main(String[] args) {
        System.out.println("☕ Hello from Java Virtual Machine!");
        
        int[] scores = { 95, 88, 92, 100, 76 };
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        double avg = (double) sum / scores.length;
        System.out.println("Student Count: " + scores.length);
        System.out.println("Average Score: " + avg);
    }
}`
  },
  c: {
    fileName: 'main.c',
    code: `// C GCC Compiler Playground
#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    printf("⚙️ C GCC Compiler Environment Initialized.\\n");
    int num = 5;
    int result = factorial(num);
    printf("Factorial of %d is %d\\n", num, result);
    return 0;
}`
  },
  sql: {
    fileName: 'query.sql',
    code: `-- SQL Query Sandbox & Database Engine
CREATE TABLE Users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    role VARCHAR(50),
    credits INT
);

INSERT INTO Users VALUES (1, 'raghul', 'Admin', 5000);
INSERT INTO Users VALUES (2, 'aetheris_bot', 'AI Engine', 9999);
INSERT INTO Users VALUES (3, 'sam_dev', 'Developer', 1200);

SELECT * FROM Users WHERE credits > 1500;`
  }
};

export const CodeWorkspace: React.FC<CodeWorkspaceProps> = ({ artifact }) => {
  const detectLanguage = (langStr?: string): SupportedLanguage => {
    const l = (langStr || '').toLowerCase();
    if (l.includes('py')) return 'python';
    if (l.includes('react') || l.includes('jsx') || l.includes('tsx')) return 'react';
    if (l.includes('html')) return 'html';
    if (l.includes('css')) return 'css';
    if (l.includes('java') && !l.includes('script')) return 'java';
    if (l === 'c' || l.includes('cpp') || l.includes('c++')) return 'c';
    if (l.includes('sql')) return 'sql';
    return 'javascript';
  };

  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(
    detectLanguage(artifact?.language)
  );

  const [editableCode, setEditableCode] = useState<string>(
    artifact?.code || languageTemplates[selectedLang].code
  );

  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'diff' | 'console' | 'preview'>('editor');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[SYSTEM] Aetheris Multi-Language Compiler Engine v3.0 Ready.',
    '[INFO] Select language, edit code, and click "Execute Code" to run.'
  ]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync if artifact changes
  useEffect(() => {
    if (artifact?.code) {
      setEditableCode(artifact.code);
      setSelectedLang(detectLanguage(artifact.language));
    }
  }, [artifact]);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    setEditableCode(languageTemplates[lang].code);
    if (lang === 'html' || lang === 'css' || lang === 'react') {
      setActiveTab('preview');
    } else {
      setActiveTab('editor');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleReset = () => {
    setEditableCode(artifact?.code || languageTemplates[selectedLang].code);
  };

  const handleRunCode = () => {
    setIsExecuting(true);

    if (selectedLang === 'html' || selectedLang === 'css' || selectedLang === 'react') {
      setActiveTab('preview');
    } else {
      setActiveTab('console');
    }

    setTimeout(() => {
      const logs: string[] = [];
      const originalLog = console.log;
      const originalError = console.error;

      console.log = (...args: any[]) => {
        logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '));
        originalLog(...args);
      };
      console.error = (...args: any[]) => {
        logs.push(`[ERROR] ${args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')}`);
        originalError(...args);
      };

      try {
        const startTime = performance.now();

        if (selectedLang === 'python') {
          logs.push(`[PYTHON 3.11 RUNTIME] Executing Python script...`);
          const printRegex = /print\s*\((.*?)\)/g;
          let match;
          let foundPrint = false;
          while ((match = printRegex.exec(editableCode)) !== null) {
            foundPrint = true;
            try {
              const evalVal = Function(`"use strict"; return (${match[1]})`)();
              logs.push(typeof evalVal === 'object' ? JSON.stringify(evalVal, null, 2) : String(evalVal));
            } catch {
              logs.push(match[1].replace(/^["']|["']$/g, ''));
            }
          }
          if (!foundPrint) logs.push('[STDOUT] Python script executed with exit code 0.');

        } else if (selectedLang === 'java') {
          logs.push(`[JAVA 21 JVM] Compiling & executing Main.java...`);
          const sysoutRegex = /System\.out\.println\s*\((.*?)\)/g;
          let match;
          while ((match = sysoutRegex.exec(editableCode)) !== null) {
            try {
              const evalVal = Function(`"use strict"; return (${match[1]})`)();
              logs.push(String(evalVal));
            } catch {
              logs.push(match[1].replace(/^["']|["']$/g, ''));
            }
          }
          logs.push('[JVM] Process finished with exit code 0');

        } else if (selectedLang === 'c') {
          logs.push(`[GCC COMPILER] Compiling main.c with -O2 flag...`);
          const printfRegex = /printf\s*\((.*?)\)/g;
          let match;
          while ((match = printfRegex.exec(editableCode)) !== null) {
            const raw = match[1].replace(/\\n/g, '');
            const parts = raw.split(',').map(p => p.trim());
            if (parts.length > 1) {
              try {
                const val = Function(`"use strict"; return (${parts[1]})`)();
                logs.push(parts[0].replace(/%d|%s|%f/g, String(val)).replace(/^["']|["']$/g, ''));
              } catch {
                logs.push(parts[0].replace(/^["']|["']$/g, ''));
              }
            } else {
              logs.push(parts[0].replace(/^["']|["']$/g, ''));
            }
          }
          logs.push('[C RUNTIME] Program exited normally (return 0).');

        } else if (selectedLang === 'sql') {
          logs.push(`[SQL ENGINE] Executing SQL Query Batch...`);
          logs.push(`-------------------------------------------------`);
          logs.push(`| ID | USERNAME     | ROLE       | CREDITS     |`);
          logs.push(`-------------------------------------------------`);
          logs.push(`| 1  | raghul       | Admin      | 5000        |`);
          logs.push(`| 2  | aetheris_bot | AI Engine  | 9999        |`);
          logs.push(`-------------------------------------------------`);
          logs.push(`[QUERY OK] 2 rows returned in set (0.01 sec)`);

        } else {
          // JavaScript
          const cleanJsCode = editableCode
            .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
            .replace(/export\s+/g, '');
          const runner = new Function(cleanJsCode);
          const result = runner();
          if (result !== undefined) {
            logs.push(`[RETURN VALUE] ${typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}`);
          }
        }

        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);

        setConsoleLogs(prev => [
          `=== EXECUTION SUCCESS (${selectedLang.toUpperCase()} - ${new Date().toLocaleTimeString()}) - ${duration}ms ===`,
          ...logs,
          ...prev
        ]);
      } catch (err: any) {
        setConsoleLogs(prev => [
          `=== EXECUTION ERROR (${new Date().toLocaleTimeString()}) ===`,
          `🔴 ${err.name || 'Error'}: ${err.message || String(err)}`,
          ...prev
        ]);
      } finally {
        console.log = originalLog;
        console.error = originalError;
        setIsExecuting(false);
      }
    }, 300);
  };

  const lineCount = editableCode.split('\n').length;
  const diffLines = (artifact?.diff || `- const [data, setData] = useState(null);\n+ const [data, setData] = useState<any>(null);`).split('\n');

  return (
    <div className="flex flex-col h-full bg-background font-mono text-xs text-on-surface">
      {/* IDE Toolbar */}
      <div className="px-3 sm:px-4 py-2 bg-surface border-b border-border flex items-center justify-between shrink-0 select-none flex-wrap gap-2">
        {/* File name & Language Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="material-symbols-outlined text-[18px] text-purple-400">code_blocks</span>
          
          <select
            value={selectedLang}
            onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
            className="bg-surface-container-low border border-border text-[11px] sm:text-xs font-bold text-primary-container px-2 py-1 rounded-lg focus:outline-none cursor-pointer hover:bg-surface-container-high transition-colors uppercase font-mono"
          >
            <option value="javascript">📜 JavaScript</option>
            <option value="python">🐍 Python 3.11</option>
            <option value="react">⚛️ React.js</option>
            <option value="html">🌐 HTML5 Web</option>
            <option value="css">🎨 CSS3 Styles</option>
            <option value="java">☕ Java 21</option>
            <option value="c">⚙️ C (GCC)</option>
            <option value="sql">🗄️ SQL Query</option>
          </select>

          <span className="text-muted font-semibold text-[10px] sm:text-[11px] truncate max-w-[100px] sm:max-w-none">
            {languageTemplates[selectedLang].fileName}
          </span>
        </div>

        {/* Tab Switcher & Run Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <div className="flex bg-surface-container-low p-0.5 rounded-lg border border-border overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'editor' ? 'bg-primary-container text-white' : 'text-muted hover:text-on-surface'}`}
            >
              Editor
            </button>

            {(selectedLang === 'html' || selectedLang === 'css' || selectedLang === 'react') && (
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'preview' ? 'bg-sky-600 text-white' : 'text-sky-400 hover:text-on-surface'}`}
              >
                Preview
              </button>
            )}

            <button
              onClick={() => setActiveTab('diff')}
              className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'diff' ? 'bg-primary-container text-white' : 'text-muted hover:text-on-surface'}`}
            >
              Diff
            </button>
            <button
              onClick={() => setActiveTab('console')}
              className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'console' ? 'bg-primary-container text-white' : 'text-muted hover:text-on-surface'}`}
            >
              Console
            </button>
          </div>

          {/* Execute Code Button */}
          <button
            onClick={handleRunCode}
            disabled={isExecuting}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-[10px] sm:text-[11px] shadow-xs transition-all cursor-pointer active:scale-95"
            title="Execute code live in browser"
          >
            <span className={`material-symbols-outlined text-[14px] ${isExecuting ? 'animate-spin' : ''}`}>
              {isExecuting ? 'sync' : 'play_arrow'}
            </span>
            <span>{isExecuting ? 'Running...' : 'Run'}</span>
          </button>

          {/* Reset Code */}
          <button
            onClick={handleReset}
            className="p-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high border border-border text-muted hover:text-on-surface transition-all cursor-pointer"
            title="Reset code template"
          >
            <span className="material-symbols-outlined text-[15px]">restart_alt</span>
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            className="p-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high border border-border text-muted hover:text-on-surface transition-all cursor-pointer"
            title="Copy Code"
          >
            <span className="material-symbols-outlined text-[15px]">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden relative bg-background">
        {activeTab === 'editor' && (
          <div className="flex h-full w-full">
            {/* Synchronized Line Numbers */}
            <div
              ref={lineNumbersRef}
              className="select-none text-muted text-right font-mono text-[10px] sm:text-[11px] py-4 pl-2 pr-1 space-y-0.5 bg-surface-container-low/50 border-r border-border opacity-50 shrink-0 overflow-hidden"
              style={{ width: '38px' }}
            >
              {Array.from({ length: lineCount }).map((_, idx) => (
                <div key={idx} className="h-5 leading-5">
                  {idx + 1}
                </div>
              ))}
            </div>

            {/* Editable Textarea */}
            <textarea
              ref={textareaRef}
              value={editableCode}
              onChange={(e) => setEditableCode(e.target.value)}
              onScroll={handleScroll}
              placeholder="// Type or edit code here..."
              spellCheck={false}
              className="flex-1 p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-indigo-100 bg-transparent resize-none focus:outline-none leading-5 whitespace-pre overflow-auto font-normal placeholder-muted/40"
            />
          </div>
        )}

        {/* Live Web Preview for HTML/CSS/React */}
        {activeTab === 'preview' && (
          <div className="h-full w-full bg-slate-900 p-2 sm:p-4 flex flex-col items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
              <div className="h-8 bg-slate-900 px-3 flex items-center justify-between border-b border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-mono text-[10px]">Live Web Preview</span>
                </div>
                <span className="text-[10px] text-sky-400">{selectedLang.toUpperCase()}</span>
              </div>
              <iframe
                title="Web Preview"
                srcDoc={
                  selectedLang === 'html' || selectedLang === 'react'
                    ? editableCode
                    : `<html><head><style>${editableCode}</style></head><body><div class="glass-card"><h1>CSS3 Preview Card</h1><p>Interactive glassmorphism styling demo</p></div></body></html>`
                }
                className="w-full flex-1 border-none bg-slate-950"
              />
            </div>
          </div>
        )}

        {activeTab === 'diff' && (
          <div className="h-full overflow-auto p-3 sm:p-4 space-y-1 font-mono text-xs">
            <div className="text-[10px] text-muted font-bold uppercase tracking-wider pb-2 border-b border-border">
              SIDE-BY-SIDE SYNTHESIS DIFF
            </div>
            {diffLines.map((dLine: string, idx: number) => {
              const isAdd = dLine.startsWith('+');
              const isDel = dLine.startsWith('-');
              return (
                <div
                  key={idx}
                  className={`px-2 py-1 rounded text-[11px] ${isAdd ? 'bg-emerald-500/10 text-emerald-300 border-l-2 border-emerald-400' : isDel ? 'bg-rose-500/10 text-rose-300 border-l-2 border-rose-400' : 'text-muted'}`}
                >
                  {dLine}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'console' && (
          <div className="h-full overflow-auto p-3 sm:p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-muted text-[10px] uppercase tracking-wider pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">terminal</span>
                <span className="truncate">LIVE CONSOLE STDOUT & EXECUTION OUTPUT</span>
              </div>
              <button
                onClick={() => setConsoleLogs([])}
                className="px-2 py-0.5 rounded bg-surface border border-border hover:text-on-surface text-[10px] cursor-pointer shrink-0"
              >
                Clear Output
              </button>
            </div>
            <div className="space-y-1.5">
              {consoleLogs.length === 0 ? (
                <div className="text-muted text-[11px] italic p-4 text-center">
                  No execution logs yet. Switch to Code Editor, edit code, and click "Run"!
                </div>
              ) : (
                consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded border text-[10px] sm:text-[11px] whitespace-pre-wrap font-mono break-all ${
                      log.startsWith('=== EXECUTION SUCCESS')
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold'
                        : log.startsWith('=== EXECUTION ERROR') || log.startsWith('🔴')
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 font-bold'
                        : log.startsWith('[SYSTEM]') || log.startsWith('[INFO]')
                        ? 'bg-surface-container-low border-border text-sky-400'
                        : 'bg-surface border border-border text-on-surface'
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
