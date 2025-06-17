import React from "react";
import { CandlestickData, CandlestickStyle } from "../types";

interface CandlestickRendererProps {
  data: CandlestickData;
  style: CandlestickStyle;
  mode: "ohlc" | "simple";
  forceBullish: boolean;
  isDark: boolean;
}

const CandlestickRenderer: React.FC<CandlestickRendererProps> = ({
  data,
  style,
  mode,
  forceBullish,
  isDark,
}) => {
  let svgWidth = 300;
  let svgHeight = 400;
  let centerX = svgWidth / 2;

  let bodyHeight: number;
  let bodyTop: number;
  let upperWickHeight: number;
  let lowerWickHeight: number;
  let isBullish: boolean;

  if (mode === "ohlc") {
    const { open, high, low, close } = data;
    isBullish = close >= open;

    const range = high - low;
    const scale = 200 / Math.max(range, 1);

    bodyHeight = Math.abs(close - open) * scale;
    bodyTop =
      svgHeight / 2 - (Math.max(close, open) - (high + low) / 2) * scale;
    upperWickHeight = (high - Math.max(close, open)) * scale;
    lowerWickHeight = (Math.min(close, open) - low) * scale;
  } else {
    isBullish = forceBullish;
    bodyHeight = style.bodyHeight;
    upperWickHeight = style.wickTopHeight;
    lowerWickHeight = style.wickBottomHeight;

    const padding = 40; // Add some breathing room
    svgHeight = upperWickHeight + bodyHeight + lowerWickHeight + padding;
    svgWidth = style.bodyWidth + 80; // Extra space for shadows & labels
    centerX = svgWidth / 2;
    bodyTop = upperWickHeight + padding / 2;
  }

  let bodyColor: string;
  let wickColor: string;

  if (style.design === "minimal") {
    bodyColor = isBullish ? style.buyerColor : style.sellerColor;
    wickColor = "#6B7280";
  } else {
    bodyColor = isBullish ? style.buyerColor : style.sellerColor;
    wickColor = bodyColor;
  }

  const getShadowFilter = () => {
    if (style.design === "elevated")
      return `drop-shadow(0 4px 8px rgba(0,0,0,0.2))`;
    if (style.design === "modern")
      return `drop-shadow(0 2px 4px rgba(0,0,0,0.1))`;
    return "none";
  };

  const getGradient = () => {
    if (style.design === "modern") {
      return (
        <defs>
          <linearGradient id="candleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor={bodyColor}
              stopOpacity={style.bodyOpacity}
            />
            <stop
              offset="100%"
              stopColor={bodyColor}
              stopOpacity={style.bodyOpacity * 0.7}
            />
          </linearGradient>
        </defs>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Candlestick Preview
      </h3>

      <div className="flex justify-center">
        <svg
          width={svgWidth}
          height={svgHeight}
          className="border border-gray-200 dark:border-gray-600 rounded-lg"
          style={{ background: isDark ? "#1f2937" : "#ffffff" }}
        >
          {getGradient()}

          {/* Grid background */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={isDark ? "#374151" : "#e5e7eb"}
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Upper wick */}
          {upperWickHeight > 0 && (
            <line
              x1={centerX}
              y1={bodyTop - upperWickHeight}
              x2={centerX}
              y2={bodyTop}
              stroke={wickColor}
              strokeWidth={style.wickThickness}
              opacity={style.wickOpacity}
              style={{ filter: getShadowFilter() }}
            />
          )}

          {/* Lower wick */}
          {lowerWickHeight > 0 && (
            <line
              x1={centerX}
              y1={bodyTop + bodyHeight}
              x2={centerX}
              y2={bodyTop + bodyHeight + lowerWickHeight}
              stroke={wickColor}
              strokeWidth={style.wickThickness}
              opacity={style.wickOpacity}
              style={{ filter: getShadowFilter() }}
            />
          )}

          {/* Body */}
          <rect
            x={centerX - style.bodyWidth / 2}
            y={bodyTop}
            width={style.bodyWidth}
            height={Math.max(bodyHeight, 2)}
            fill={
              style.design === "modern" ? "url(#candleGradient)" : bodyColor
            }
            fillOpacity={style.design === "modern" ? 1 : style.bodyOpacity}
            rx={style.bodyBorderRadius}
            ry={style.bodyBorderRadius}
            stroke={style.design === "elevated" ? bodyColor : "none"}
            strokeWidth={style.design === "elevated" ? 1 : 0}
            style={{ filter: getShadowFilter() }}
          />

          {/* OHLC Labels */}
          {mode === "ohlc" && (
            <g fill={isDark ? "#d1d5db" : "#6b7280"}>
              <text x={10} y={20} fontSize="12">
                H: {data.high.toFixed(2)}
              </text>
              <text x={10} y={35} fontSize="12">
                O: {data.open.toFixed(2)}
              </text>
              <text x={10} y={50} fontSize="12">
                L: {data.low.toFixed(2)}
              </text>
              <text x={10} y={65} fontSize="12">
                C: {data.close.toFixed(2)}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        {isBullish ? "🟢 Bullish" : "🔴 Bearish"} Candlestick
      </div>
    </div>
  );
};

export default CandlestickRenderer;
