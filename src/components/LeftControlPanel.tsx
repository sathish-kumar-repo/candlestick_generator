import React from "react";
import { CandlestickStyle, CandlestickData } from "../types";

interface LeftControlPanelProps {
  style: CandlestickStyle;
  data: CandlestickData;
  mode: "ohlc" | "simple";
  forceBullish: boolean;
  onStyleChange: (updates: Partial<CandlestickStyle>) => void;
  onDataChange: (updates: Partial<CandlestickData>) => void;
  onModeChange: (mode: "ohlc" | "simple") => void;
  onForceBullishChange: (forceBullish: boolean) => void;
}

const LeftControlPanel: React.FC<LeftControlPanelProps> = ({
  style,
  data,
  mode,
  forceBullish,
  onStyleChange,
  onDataChange,
  onModeChange,
  onForceBullishChange,
}) => {
  const maxOC = Math.max(data.open, data.close);
  const minOC = Math.min(data.open, data.close);

  // Validation flags
  const highTooLow = data.high < maxOC;
  const lowTooHigh = data.low > minOC;
  const lowHigherThanHigh = data.low > data.high;

  // Helper: input class with red border if error
  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
      hasError
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
    }`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Candlestick Controls
      </h3>

      {/* Mode toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Input Mode
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => onModeChange("ohlc")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "ohlc"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            OHLC Values
          </button>
          <button
            onClick={() => onModeChange("simple")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "simple"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Design Manually
          </button>
        </div>
      </div>

      {/* Buyer/Seller */}
      {mode === "simple" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Candlestick Type
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => onForceBullishChange(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                forceBullish
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              🟢 Buyer (Bullish)
            </button>
            <button
              onClick={() => onForceBullishChange(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !forceBullish
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              🔴 Seller (Bearish)
            </button>
          </div>
        </div>
      )}

      {/* OHLC Input */}
      {mode === "ohlc" ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            {/* Open */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Open
              </label>
              <input
                type="number"
                value={data.open}
                onChange={(e) =>
                  onDataChange({ open: parseFloat(e.target.value) || 0 })
                }
                className={inputClass(false)}
              />
            </div>
            {/* High */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                High
              </label>
              <input
                type="number"
                value={data.high}
                onChange={(e) =>
                  onDataChange({ high: parseFloat(e.target.value) || 0 })
                }
                className={inputClass(highTooLow || lowHigherThanHigh)}
              />
            </div>
            {/* Low */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Low
              </label>
              <input
                type="number"
                value={data.low}
                onChange={(e) =>
                  onDataChange({ low: parseFloat(e.target.value) || 0 })
                }
                className={inputClass(lowTooHigh || lowHigherThanHigh)}
              />
            </div>
            {/* Close */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Close
              </label>
              <input
                type="number"
                value={data.close}
                onChange={(e) =>
                  onDataChange({ close: parseFloat(e.target.value) || 0 })
                }
                className={inputClass(false)}
              />
            </div>
          </div>

          {/* Error messages */}
          <div className="text-xs text-red-500 space-y-1 mt-2">
            {highTooLow && (
              <p>High must be greater than or equal to max(Open, Close).</p>
            )}
            {lowTooHigh && (
              <p>Low must be less than or equal to min(Open, Close).</p>
            )}
            {lowHigherThanHigh && (
              <p>Low must be less than or equal to High.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Body Height
          </label>
          <input
            type="range"
            min="1"
            max="200"
            value={simpleBodyHeight}
            onChange={(e) => onSimpleBodyHeightChange(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {simpleBodyHeight}px
          </div> */}
        </div>
      )}

      {/* Design selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Design Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["normal", "elevated", "modern", "minimal"] as const).map(
            (design) => (
              <button
                key={design}
                onClick={() => onStyleChange({ design })}
                className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  style.design === design
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {design}
              </button>
            )
          )}
        </div>
      </div>

      {/* Color pickers */}
      {mode === "simple" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buyer Color
            </label>
            <input
              type="color"
              value={style.buyerColor}
              onChange={(e) => onStyleChange({ buyerColor: e.target.value })}
              className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Seller Color
            </label>
            <input
              type="color"
              value={style.sellerColor}
              onChange={(e) => onStyleChange({ sellerColor: e.target.value })}
              className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftControlPanel;
