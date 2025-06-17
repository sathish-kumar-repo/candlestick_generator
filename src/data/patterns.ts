import { PredefinedPattern } from '../types';

export const predefinedPatterns: PredefinedPattern[] = [
  // Bullish Reversal Patterns
  {
    name: 'Hammer',
    category: 'bullish',
    description: 'Small body at the top with long lower shadow',
    data: { open: 102, high: 105, low: 90, close: 104 },
    icon: '🔨'
  },
  {
    name: 'Inverted Hammer',
    category: 'bullish',
    description: 'Small body at the bottom with long upper shadow',
    data: { open: 98, high: 115, low: 95, close: 100 },
    icon: '🔼'
  },
  {
    name: 'Dragonfly Doji',
    category: 'bullish',
    description: 'Open and close at the high with long lower shadow',
    data: { open: 110, high: 110, low: 95, close: 110 },
    icon: '🐲'
  },
  {
    name: 'Bullish Marubozu',
    category: 'bullish',
    description: 'Long bullish candle with no shadows',
    data: { open: 95, high: 110, low: 95, close: 110 },
    icon: '📈'
  },
  {
    name: 'Spinning Bottom',
    category: 'bullish',
    description: 'Small body with equal upper and lower shadows',
    data: { open: 99, high: 108, low: 92, close: 101 },
    icon: '🔄'
  },
  {
    name: 'Bullish Engulfing',
    category: 'bullish',
    description: 'Large bullish candle that engulfs previous bearish candle',
    data: { open: 95, high: 115, low: 93, close: 113 },
    icon: '🤗'
  },
  {
    name: 'Morning Star',
    category: 'bullish',
    description: 'Small body between two larger candles',
    data: { open: 98, high: 102, low: 96, close: 100 },
    icon: '🌅'
  },
  {
    name: 'Piercing Pattern',
    category: 'bullish',
    description: 'Bullish candle that opens below and closes above midpoint',
    data: { open: 92, high: 108, low: 90, close: 106 },
    icon: '⚡'
  },

  // Bearish Reversal Patterns
  {
    name: 'Hanging Man',
    category: 'bearish',
    description: 'Small body at the top with long lower shadow (bearish context)',
    data: { open: 108, high: 110, low: 95, close: 106 },
    icon: '🪓'
  },
  {
    name: 'Shooting Star',
    category: 'bearish',
    description: 'Small body at the bottom with long upper shadow',
    data: { open: 102, high: 115, low: 100, close: 98 },
    icon: '⭐'
  },
  {
    name: 'Gravestone Doji',
    category: 'bearish',
    description: 'Open and close at the low with long upper shadow',
    data: { open: 95, high: 110, low: 95, close: 95 },
    icon: '🪦'
  },
  {
    name: 'Bearish Marubozu',
    category: 'bearish',
    description: 'Long bearish candle with no shadows',
    data: { open: 110, high: 110, low: 95, close: 95 },
    icon: '📉'
  },
  {
    name: 'Spinning Top',
    category: 'bearish',
    description: 'Small body with equal upper and lower shadows (bearish context)',
    data: { open: 101, high: 108, low: 92, close: 99 },
    icon: '🌪️'
  },
  {
    name: 'Bearish Engulfing',
    category: 'bearish',
    description: 'Large bearish candle that engulfs previous bullish candle',
    data: { open: 115, high: 117, low: 93, close: 95 },
    icon: '🫂'
  },
  {
    name: 'Evening Star',
    category: 'bearish',
    description: 'Small body at top indicating reversal',
    data: { open: 102, high: 106, low: 98, close: 100 },
    icon: '🌆'
  },
  {
    name: 'Dark Cloud Cover',
    category: 'bearish',
    description: 'Bearish candle that opens above and closes below midpoint',
    data: { open: 112, high: 115, low: 96, close: 98 },
    icon: '☁️'
  },
  {
    name: 'Three Black Crows',
    category: 'bearish',
    description: 'Three consecutive bearish candles',
    data: { open: 108, high: 110, low: 95, close: 97 },
    icon: '🐦‍⬛'
  },

  // Indecision / Neutral Patterns
  {
    name: 'Standard Doji',
    category: 'neutral',
    description: 'Open equals close with small upper and lower shadows',
    data: { open: 100, high: 103, low: 97, close: 100 },
    icon: '➕'
  },
  {
    name: 'Long-Legged Doji',
    category: 'neutral',
    description: 'Open equals close with long upper and lower shadows',
    data: { open: 100, high: 115, low: 85, close: 100 },
    icon: '🕷️'
  },
  {
    name: 'High-Wave Candle',
    category: 'neutral',
    description: 'Small body with very long shadows',
    data: { open: 98, high: 120, low: 80, close: 102 },
    icon: '🌊'
  },
  {
    name: 'Paper Umbrella',
    category: 'neutral',
    description: 'Small body with long lower shadow',
    data: { open: 105, high: 108, low: 90, close: 103 },
    icon: '☂️'
  },
  {
    name: 'Four Price Doji',
    category: 'neutral',
    description: 'All four prices are the same',
    data: { open: 100, high: 100, low: 100, close: 100 },
    icon: '🎯'
  },
  {
    name: 'Rickshaw Man',
    category: 'neutral',
    description: 'Long upper and lower shadows with small body in middle',
    data: { open: 99, high: 115, low: 85, close: 101 },
    icon: '🛺'
  },
  {
    name: 'Belt Hold',
    category: 'neutral',
    description: 'Long body with minimal upper shadow',
    data: { open: 95, high: 110, low: 95, close: 108 },
    icon: '🥋'
  },
  {
    name: 'Tri-Star',
    category: 'neutral',
    description: 'Three doji candles in sequence',
    data: { open: 100, high: 105, low: 95, close: 100 },
    icon: '⭐⭐⭐'
  }
];