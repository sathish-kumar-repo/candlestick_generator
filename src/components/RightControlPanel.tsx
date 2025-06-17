import React from "react";
import { CandlestickStyle } from "../types";

interface RightControlPanelProps {
  style: CandlestickStyle;
  isSimple: boolean;
  onStyleChange: (updates: Partial<CandlestickStyle>) => void;
}

const RangeInput = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label} ({value}
      {unit})
    </label>
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-20 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
      />
    </div>
  </div>
);

const RightControlPanel: React.FC<RightControlPanelProps> = ({
  style,
  isSimple,
  onStyleChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Candlestick Styling
      </h3>

      {/* Body Properties */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Body Properties
        </h4>
        <div className="space-y-3">
          {isSimple && (
            <RangeInput
              label="Body Height"
              value={style.bodyHeight}
              min={0}
              max={200}
              unit="px"
              onChange={(v) => onStyleChange({ bodyHeight: v })}
            />
          )}

          <RangeInput
            label="Width"
            value={style.bodyWidth}
            min={1}
            max={50}
            unit="px"
            onChange={(v) => onStyleChange({ bodyWidth: v })}
          />
          <RangeInput
            label="Border Radius"
            value={style.bodyBorderRadius}
            min={0}
            max={20}
            unit="px"
            onChange={(v) => onStyleChange({ bodyBorderRadius: v })}
          />
          <RangeInput
            label="Opacity"
            value={style.bodyOpacity}
            min={0.1}
            max={1}
            step={0.1}
            onChange={(v) => onStyleChange({ bodyOpacity: v })}
          />
        </div>
      </div>

      {/* Wick Properties */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Wick Properties
        </h4>
        <div className="space-y-3">
          <RangeInput
            label="Top Wick Height"
            value={style.wickTopHeight}
            min={0}
            max={100}
            unit="px"
            onChange={(v) => onStyleChange({ wickTopHeight: v })}
          />
          <RangeInput
            label="Bottom Wick Height"
            value={style.wickBottomHeight}
            min={0}
            max={100}
            unit="px"
            onChange={(v) => onStyleChange({ wickBottomHeight: v })}
          />
          <RangeInput
            label="Wick Thickness"
            value={style.wickThickness}
            min={1}
            max={20}
            unit="px"
            onChange={(v) => onStyleChange({ wickThickness: v })}
          />
          <RangeInput
            label="Wick Opacity"
            value={style.wickOpacity}
            min={0.1}
            max={1}
            step={0.1}
            onChange={(v) => onStyleChange({ wickOpacity: v })}
          />
        </div>
      </div>
    </div>
  );
};

export default RightControlPanel;
