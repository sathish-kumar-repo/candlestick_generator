import { CandlestickConfig } from "../types";

export const exportCandlestick = (
  config: CandlestickConfig,
  isDark: boolean
) => {
  const { exportOptions } = config;
  const { data, style, mode, forceBullish } = config;

  // Calculate candlestick geometry
  let bodyHeight: number;
  let upperWickHeight: number;
  let lowerWickHeight: number;
  let isBullish: boolean;

  if (mode === "ohlc") {
    const { open, high, low, close } = data;
    isBullish = forceBullish;

    const range = high - low;
    const scale = 200 / Math.max(range, 1);

    bodyHeight = Math.abs(close - open) * scale;
    upperWickHeight = (high - Math.max(close, open)) * scale;
    lowerWickHeight = (Math.min(close, open) - low) * scale;
  } else {
    isBullish = forceBullish;
    bodyHeight = style.bodyHeight;
    upperWickHeight = style.wickTopHeight;
    lowerWickHeight = style.wickBottomHeight;
  }

  // Calculate dynamic dimensions
  const totalHeight = upperWickHeight + bodyHeight + lowerWickHeight + 40; // padding top/bottom
  const totalWidth = style.bodyWidth + 60; // padding left/right
  const centerX = totalWidth / 2;
  const bodyTop = 20 + upperWickHeight;

  // Colors
  const bodyColor = isBullish ? style.buyerColor : style.sellerColor;
  const wickColor = style.design === "minimal" ? "#6B7280" : bodyColor;

  // Create SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", totalWidth.toString());
  svg.setAttribute("height", totalHeight.toString());
  svg.setAttribute("viewBox", `0 0 ${totalWidth} ${totalHeight}`);

  // Background
  if (exportOptions.withBackground) {
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("width", "100%");
    bg.setAttribute("height", "100%");
    bg.setAttribute("fill", isDark ? "#1f2937" : "#ffffff");
    svg.appendChild(bg);
  }

  // Grid
  if (exportOptions.withGrid) {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const pattern = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "pattern"
    );
    pattern.setAttribute("id", "grid");
    pattern.setAttribute("width", "20");
    pattern.setAttribute("height", "20");
    pattern.setAttribute("patternUnits", "userSpaceOnUse");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 20 0 L 0 0 0 20");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", isDark ? "#374151" : "#e5e7eb");
    path.setAttribute("stroke-width", "0.5");
    path.setAttribute("opacity", "0.3");

    pattern.appendChild(path);
    defs.appendChild(pattern);
    svg.appendChild(defs);

    const gridRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    gridRect.setAttribute("width", "100%");
    gridRect.setAttribute("height", "100%");
    gridRect.setAttribute("fill", "url(#grid)");
    svg.appendChild(gridRect);
  }

  // Upper Wick
  if (upperWickHeight > 0) {
    const upperWick = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    upperWick.setAttribute("x1", centerX.toString());
    upperWick.setAttribute("y1", (bodyTop - upperWickHeight).toString());
    upperWick.setAttribute("x2", centerX.toString());
    upperWick.setAttribute("y2", bodyTop.toString());
    upperWick.setAttribute("stroke", wickColor);
    upperWick.setAttribute("stroke-width", style.wickThickness.toString());
    upperWick.setAttribute("opacity", style.wickOpacity.toString());
    svg.appendChild(upperWick);
  }

  // Lower Wick
  if (lowerWickHeight > 0) {
    const lowerWick = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    lowerWick.setAttribute("x1", centerX.toString());
    lowerWick.setAttribute("y1", (bodyTop + bodyHeight).toString());
    lowerWick.setAttribute("x2", centerX.toString());
    lowerWick.setAttribute(
      "y2",
      (bodyTop + bodyHeight + lowerWickHeight).toString()
    );
    lowerWick.setAttribute("stroke", wickColor);
    lowerWick.setAttribute("stroke-width", style.wickThickness.toString());
    lowerWick.setAttribute("opacity", style.wickOpacity.toString());
    svg.appendChild(lowerWick);
  }

  // Body
  const body = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  body.setAttribute("x", (centerX - style.bodyWidth / 2).toString());
  body.setAttribute("y", bodyTop.toString());
  body.setAttribute("width", style.bodyWidth.toString());
  body.setAttribute("height", Math.max(bodyHeight, 2).toString());
  body.setAttribute("fill", bodyColor);
  body.setAttribute("fill-opacity", style.bodyOpacity.toString());
  body.setAttribute("rx", style.bodyBorderRadius.toString());
  body.setAttribute("ry", style.bodyBorderRadius.toString());
  svg.appendChild(body);

  // Labels (optional)
  if (exportOptions.withPrice && mode === "ohlc") {
    const priceLabels = ["H", "O", "L", "C"];
    const priceValues = [data.high, data.open, data.low, data.close];

    priceLabels.forEach((label, i) => {
      const show =
        exportOptions[
          `show${
            label === "H"
              ? "High"
              : label === "O"
              ? "Open"
              : label === "L"
              ? "Low"
              : "Close"
          }` as keyof typeof exportOptions
        ];

      if (!show) return;

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("font-size", "12");
      text.setAttribute("fill", isDark ? "#d1d5db" : "#6b7280");
      text.textContent = `${label}: ${priceValues[i].toFixed(2)}`;
      text.setAttribute("y", (20 + i * 15).toString());

      if (
        exportOptions.pricePosition === "left" ||
        exportOptions.pricePosition === "both"
      ) {
        const leftText = text.cloneNode(true) as Element;
        leftText.setAttribute("x", "10");
        svg.appendChild(leftText);
      }

      if (
        exportOptions.pricePosition === "right" ||
        exportOptions.pricePosition === "both"
      ) {
        const rightText = text.cloneNode(true) as Element;
        rightText.setAttribute("x", (totalWidth - 100).toString());
        rightText.setAttribute("text-anchor", "start");
        svg.appendChild(rightText);
      }
    });
  }

  // Export as image or SVG
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);

  if (exportOptions.format === "svg") {
    downloadFile(svgString, "candlestick.svg", "image/svg+xml");
  } else {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.onload = () => {
      canvas.width = totalWidth;
      canvas.height = totalHeight;
      ctx.drawImage(img, 0, 0);

      const type = exportOptions.format === "png" ? "image/png" : "image/jpeg";
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `candlestick.${exportOptions.format}`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, type);
    };

    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    img.src = URL.createObjectURL(svgBlob);
  }
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
