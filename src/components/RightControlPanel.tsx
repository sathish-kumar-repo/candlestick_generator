import React from "react";
import { CandlestickStyle } from "../types";

interface RightControlPanelProps {
  style: CandlestickStyle;
  isSimple: boolean;
  onStyleChange: (updates: Partial<CandlestickStyle>) => void;
}

const RightControlPanel: React.FC<RightControlPanelProps> = ({
  style,
  isSimple,
  onStyleChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Candlestick Controls
      </h3>

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
              min="10"
              max="100"
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
          {isSimple && (
            <>
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
                    onStyleChange({
                      wickBottomHeight: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
            </>
          )}

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

export default RightControlPanel;
