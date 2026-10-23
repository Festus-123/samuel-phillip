import profiles from "./tornPaperData.json";

/**
 * Builds the outline of a sheet of torn paper. The ragged edge profiles were
 * traced from the reference silhouette in `public/svg-style.png`; `margin` is
 * the straight-edge inset and `scale` multiplies the tear depth.
 */
export function tornPath(width: number, height: number, margin = 24, scale = 0.7) {
  const { top, right, bottom, left } = profiles;
  const innerW = width - margin * 2;
  const innerH = height - margin * 2;
  const at = (i: number, n: number, span: number) => margin + (i / (n - 1)) * span;
  const points: string[] = [];

  top.forEach((d, i) =>
    points.push(`${at(i, top.length, innerW).toFixed(1)},${(margin + d * scale).toFixed(1)}`),
  );
  right.forEach((d, j) =>
    points.push(`${(width - margin + d * scale).toFixed(1)},${at(j, right.length, innerH).toFixed(1)}`),
  );
  for (let i = bottom.length - 1; i >= 0; i--) {
    points.push(
      `${at(i, bottom.length, innerW).toFixed(1)},${(height - margin + bottom[i] * scale).toFixed(1)}`,
    );
  }
  for (let j = left.length - 1; j >= 0; j--) {
    points.push(
      `${(margin + left[j] * scale).toFixed(1)},${at(j, left.length, innerH).toFixed(1)}`,
    );
  }

  return `M${points.join("L")}Z`;
}
