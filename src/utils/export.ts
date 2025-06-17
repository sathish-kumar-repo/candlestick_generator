import { CandlestickConfig } from '../types';

export const exportCandlestick = (config: CandlestickConfig, isDark: boolean) => {
  const { exportOptions } = config;
  
  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '300');
  svg.setAttribute('height', '400');
  svg.setAttribute('viewBox', '0 0 300 400');
  
  // Add background if requested
  if (exportOptions.withBackground) {
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', isDark ? '#1f2937' : '#ffffff');
    svg.appendChild(bg);
  }
  
  // Add grid if requested
  if (exportOptions.withGrid) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', 'grid');
    pattern.setAttribute('width', '20');
    pattern.setAttribute('height', '20');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 20 0 L 0 0 0 20');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', isDark ? '#374151' : '#e5e7eb');
    path.setAttribute('stroke-width', '0.5');
    path.setAttribute('opacity', '0.3');
    
    pattern.appendChild(path);
    defs.appendChild(pattern);
    svg.appendChild(defs);
    
    const gridRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    gridRect.setAttribute('width', '100%');
    gridRect.setAttribute('height', '100%');
    gridRect.setAttribute('fill', 'url(#grid)');
    svg.appendChild(gridRect);
  }
  
  // Generate candlestick elements
  const centerX = 150;
  const { data, style, mode, simpleBodyHeight, forceBullish } = config;
  
  let bodyHeight: number;
  let bodyTop: number;
  let upperWickHeight: number;
  let lowerWickHeight: number;
  let isBullish: boolean;
  
  if (mode === 'ohlc') {
    const { open, high, low, close } = data;
    isBullish = forceBullish;
    
    const range = high - low;
    const scale = 200 / Math.max(range, 1);
    
    bodyHeight = Math.abs(close - open) * scale;
    bodyTop = 200 - (Math.max(close, open) - (high + low) / 2) * scale;
    upperWickHeight = (high - Math.max(close, open)) * scale;
    lowerWickHeight = (Math.min(close, open) - low) * scale;
  } else {
    isBullish = forceBullish;
    bodyHeight = simpleBodyHeight;
    bodyTop = 200 - bodyHeight / 2;
    upperWickHeight = style.wickTopHeight;
    lowerWickHeight = style.wickBottomHeight;
  }
  
  // Determine colors based on design
  let bodyColor: string;
  let wickColor: string;
  
  if (style.design === 'minimal') {
    bodyColor = isBullish ? style.buyerColor : style.sellerColor;
    wickColor = '#6B7280'; // Grey color for minimal design
  } else {
    bodyColor = isBullish ? style.buyerColor : style.sellerColor;
    wickColor = bodyColor;
  }
  
  // Add upper wick
  if (upperWickHeight > 0) {
    const upperWick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    upperWick.setAttribute('x1', centerX.toString());
    upperWick.setAttribute('y1', (bodyTop - upperWickHeight).toString());
    upperWick.setAttribute('x2', centerX.toString());
    upperWick.setAttribute('y2', bodyTop.toString());
    upperWick.setAttribute('stroke', wickColor);
    upperWick.setAttribute('stroke-width', style.wickThickness.toString());
    upperWick.setAttribute('opacity', style.wickOpacity.toString());
    svg.appendChild(upperWick);
  }
  
  // Add lower wick
  if (lowerWickHeight > 0) {
    const lowerWick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lowerWick.setAttribute('x1', centerX.toString());
    lowerWick.setAttribute('y1', (bodyTop + bodyHeight).toString());
    lowerWick.setAttribute('x2', centerX.toString());
    lowerWick.setAttribute('y2', (bodyTop + bodyHeight + lowerWickHeight).toString());
    lowerWick.setAttribute('stroke', wickColor);
    lowerWick.setAttribute('stroke-width', style.wickThickness.toString());
    lowerWick.setAttribute('opacity', style.wickOpacity.toString());
    svg.appendChild(lowerWick);
  }
  
  // Add body
  const body = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  body.setAttribute('x', (centerX - style.bodyWidth / 2).toString());
  body.setAttribute('y', bodyTop.toString());
  body.setAttribute('width', style.bodyWidth.toString());
  body.setAttribute('height', Math.max(bodyHeight, 2).toString());
  body.setAttribute('fill', bodyColor);
  body.setAttribute('fill-opacity', style.bodyOpacity.toString());
  body.setAttribute('rx', style.bodyBorderRadius.toString());
  body.setAttribute('ry', style.bodyBorderRadius.toString());
  svg.appendChild(body);
  
  // Add price labels if requested
  if (exportOptions.withPrice && mode === 'ohlc') {
    const priceLabels = ['H', 'O', 'L', 'C'];
    const priceValues = [data.high, data.open, data.low, data.close];
    
    priceLabels.forEach((label, index) => {
      if (exportOptions[`show${label === 'H' ? 'High' : label === 'O' ? 'Open' : label === 'L' ? 'Low' : 'Close'}` as keyof typeof exportOptions]) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        
        if (exportOptions.pricePosition === 'left' || exportOptions.pricePosition === 'both') {
          text.setAttribute('x', '10');
          text.setAttribute('y', (20 + index * 15).toString());
          text.setAttribute('font-size', '12');
          text.setAttribute('fill', isDark ? '#d1d5db' : '#6b7280');
          text.textContent = `${label}: ${priceValues[index].toFixed(2)}`;
          svg.appendChild(text.cloneNode(true));
        }
        
        if (exportOptions.pricePosition === 'right' || exportOptions.pricePosition === 'both') {
          const rightText = text.cloneNode(true) as Element;
          rightText.setAttribute('x', '200');
          rightText.setAttribute('text-anchor', 'start');
          svg.appendChild(rightText);
        }
      }
    });
  }
  
  // Export based on format
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  
  if (exportOptions.format === 'svg') {
    downloadFile(svgString, 'candlestick.svg', 'image/svg+xml');
  } else {
    // Convert to canvas for PNG/JPG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 300;
      canvas.height = 400;
      ctx.drawImage(img, 0, 0);
      
      const format = exportOptions.format === 'png' ? 'image/png' : 'image/jpeg';
      const filename = `candlestick.${exportOptions.format}`;
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, format);
    };
    
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  }
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};