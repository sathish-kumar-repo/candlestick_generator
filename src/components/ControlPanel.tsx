import React from "react";
import { CandlestickStyle, CandlestickData } from "../types";

interface ControlPanelProps {
  style: CandlestickStyle;
  data: CandlestickData;
  mode: "ohlc" | "simple";
  simpleBodyHeight: number;
  forceBullish: boolean;
  onStyleChange: (updates: Partial<CandlestickStyle>) => void;
  onDataChange: (updates: Partial<CandlestickData>) => void;
  onModeChange: (mode: "ohlc" | "simple") => void;
  onSimpleBodyHeightChange: (height: number) => void;
  onForceBullishChange: (forceBullish: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  style,
  data,
  mode,
  simpleBodyHeight,
  forceBullish,
  onStyleChange,
  onDataChange,
  onModeChange,
  onSimpleBodyHeightChange,
  onForceBullishChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Candlestick Controls
      </h3>

      {/* Mode Selection */}
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
            Simple Body
          </button>
        </div>
      </div>

      {/* Buyer/Seller Toggle */}
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

      {/* Data Inputs */}
      {mode === "ohlc" ? (
        <div className="grid grid-cols-2 gap-4">
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Body Height
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={simpleBodyHeight}
            onChange={(e) => onSimpleBodyHeightChange(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {simpleBodyHeight}px
          </div>
        </div>
      )}

      {/* Design Style */}
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

      {/* Colors */}
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

      {/* Body Properties */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Body Properties
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Opacity ({Math.round(style.bodyOpacity * 100)}%)
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={style.bodyOpacity}
              onChange={(e) =>
                onStyleChange({ bodyOpacity: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Width ({style.bodyWidth}px)
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={style.bodyWidth}
              onChange={(e) =>
                onStyleChange({ bodyWidth: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Border Radius ({style.bodyBorderRadius}px)
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={style.bodyBorderRadius}
              onChange={(e) =>
                onStyleChange({ bodyBorderRadius: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Wick Properties */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Wick Properties
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Top Height ({style.wickTopHeight}px)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={style.wickTopHeight}
              onChange={(e) =>
                onStyleChange({ wickTopHeight: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bottom Height ({style.wickBottomHeight}px)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={style.wickBottomHeight}
              onChange={(e) =>
                onStyleChange({ wickBottomHeight: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Thickness ({style.wickThickness}px)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={style.wickThickness}
              onChange={(e) =>
                onStyleChange({ wickThickness: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Opacity ({Math.round(style.wickOpacity * 100)}%)
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={style.wickOpacity}
              onChange={(e) =>
                onStyleChange({ wickOpacity: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
