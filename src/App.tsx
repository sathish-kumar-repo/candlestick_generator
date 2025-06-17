import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PatternSelector from "./components/PatternSelector";
import CandlestickRenderer from "./components/CandlestickRenderer";
import ExportModal from "./components/ExportModal";
import { CandlestickConfig, PredefinedPattern } from "./types";
import { useLocalStorage, useHistory } from "./hooks/useLocalStorage";
import { exportCandlestick } from "./utils/export";
import { predefinedPatterns } from "./data/patterns";
import LeftControlPanel from "./components/LeftControlPanel";
import RightControlPanel from "./components/RightControlPanel";

const defaultConfig: CandlestickConfig = {
  name: "Custom",
  data: { open: 100, high: 110, low: 95, close: 105 },
  style: {
    design: "normal",
    buyerColor: "#10b981",
    sellerColor: "#ef4444",
    bodyOpacity: 0.8,
    bodyWidth: 30,
    bodyBorderRadius: 2,
    wickTopHeight: 40,
    wickBottomHeight: 30,
    wickThickness: 2,
    wickOpacity: 1,
  },
  mode: "simple",
  simpleBodyHeight: 60,
  forceBullish: true,
  exportOptions: {
    format: "png",
    withPrice: false,
    pricePosition: "left",
    showOpen: true,
    showHigh: true,
    showLow: true,
    showClose: true,
    withBackground: false,
    withGrid: false,
  },
};

function App() {
  const [config, setConfig] = useLocalStorage<CandlestickConfig>(
    "candlestick-config",
    defaultConfig
  );
  const [isDark, setIsDark] = useLocalStorage<boolean>("theme-dark", false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPatternOpen, setIsPatternOpen] = useState(false);
  const { history, addToHistory, clearHistory } =
    useHistory<CandlestickConfig>("candlestick");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleStyleChange = (updates: Partial<typeof config.style>) => {
    setConfig({
      ...config,
      style: { ...config.style, ...updates },
    });
  };

  const handleDataChange = (updates: Partial<typeof config.data>) => {
    setConfig({
      ...config,
      data: { ...config.data, ...updates },
    });
  };

  const handleModeChange = (mode: "ohlc" | "simple") => {
    setConfig({ ...config, mode });
  };

  const handleSimpleBodyHeightChange = (height: number) => {
    setConfig({ ...config, simpleBodyHeight: height });
  };

  const handleForceBullishChange = (forceBullish: boolean) => {
    setConfig({ ...config, forceBullish });
  };

  const handlePatternSelect = (pattern: PredefinedPattern) => {
    const newConfig = {
      ...config,
      name: pattern.name,
      data: pattern.data,
      mode: "ohlc" as const,
      forceBullish: pattern.category === "bullish",
    };
    setConfig(newConfig);
    setIsPatternOpen(false);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    clearHistory();
  };

  const handleSaveToHistory = () => {
    addToHistory(config);
  };

  const handleRandomGenerate = () => {
    const randomPattern =
      predefinedPatterns[Math.floor(Math.random() * predefinedPatterns.length)];

    // Add some randomization to the pattern
    const variation = 0.1; // 10% variation
    const randomData = {
      open: randomPattern.data.open * (1 + (Math.random() - 0.5) * variation),
      high: randomPattern.data.high * (1 + (Math.random() - 0.5) * variation),
      low: randomPattern.data.low * (1 + (Math.random() - 0.5) * variation),
      close: randomPattern.data.close * (1 + (Math.random() - 0.5) * variation),
    };

    const newConfig = {
      ...config,
      name: `Random ${randomPattern.name}`,
      data: randomData,
      forceBullish: randomPattern.category === "bullish",
    };
    setConfig(newConfig);
  };

  const handleExport = () => {
    exportCandlestick(config, isDark);
  };

  const handleExportOptionsChange = (
    updates: Partial<typeof config.exportOptions>
  ) => {
    setConfig({
      ...config,
      exportOptions: { ...config.exportOptions, ...updates },
    });
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Navbar
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onToggelPattern={() => setIsPatternOpen(!isPatternOpen)}
          onReset={handleReset}
          onExport={() => setIsExportModalOpen(true)}
          onRandomGenerate={handleRandomGenerate}
          onSaveToHistory={handleSaveToHistory}
        />

        {isPatternOpen && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <PatternSelector onSelectPattern={handlePatternSelect} />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Left Control Panel */}
            <div>
              <LeftControlPanel
                style={config.style}
                data={config.data}
                mode={config.mode}
                simpleBodyHeight={config.simpleBodyHeight}
                forceBullish={config.forceBullish}
                onStyleChange={handleStyleChange}
                onDataChange={handleDataChange}
                onModeChange={handleModeChange}
                onSimpleBodyHeightChange={handleSimpleBodyHeightChange}
                onForceBullishChange={handleForceBullishChange}
              />
            </div>
            {/* Middle Column: Candlestick Renderer */}
            <div>
              <CandlestickRenderer
                data={config.data}
                style={config.style}
                mode={config.mode}
                simpleBodyHeight={config.simpleBodyHeight}
                forceBullish={config.forceBullish}
                isDark={isDark}
              />
            </div>

            {/* Right Column: Right Control Panel */}
            <div>
              <RightControlPanel
                isSimple={config.mode == "simple"}
                style={config.style}
                onStyleChange={handleStyleChange}
              />
            </div>
          </div>

          {/* History Section */}
          {history.length > 0 && (
            <div className="mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Saved Configurations
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {history.slice(0, 12).map((historyConfig, index) => (
                    <button
                      key={index}
                      onClick={() => setConfig(historyConfig)}
                      className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                        {historyConfig.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {historyConfig.forceBullish ? "🟢" : "🔴"}{" "}
                        {historyConfig.mode.toUpperCase()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          exportOptions={config.exportOptions}
          onExportOptionsChange={handleExportOptionsChange}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}

export default App;
