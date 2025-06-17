export interface CandlestickData {
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandlestickStyle {
  design: "normal" | "elevated" | "modern" | "minimal";
  buyerColor: string;
  sellerColor: string;
  bodyOpacity: number;
  bodyWidth: number;
  bodyHeight: number;
  bodyBorderRadius: number;
  wickTopHeight: number;
  wickBottomHeight: number;
  wickThickness: number;
  wickOpacity: number;
}

export interface ExportOptions {
  format: "svg" | "png" | "jpg";
  withPrice: boolean;
  pricePosition: "left" | "right" | "both" | "none";
  showOpen: boolean;
  showHigh: boolean;
  showLow: boolean;
  showClose: boolean;
  withBackground: boolean;
  withGrid: boolean;
}

export interface CandlestickConfig {
  name: string;
  data: CandlestickData;
  style: CandlestickStyle;
  mode: "ohlc" | "simple";
  forceBullish: boolean;
  exportOptions: ExportOptions;
}

export interface PredefinedPattern {
  name: string;
  category: "bullish" | "bearish" | "neutral";
  description: string;
  data: CandlestickData;
  icon: string;
}
