export interface ScaleOptions {
  readonly minSize: number;
  readonly maxSize: number;
  readonly minViewport: number;
  readonly maxViewport: number;
}
export interface FluidScale {
  readonly css: string;
  readonly slope: number;
  readonly intercept: number;
}
export function fluidScale(o: ScaleOptions): FluidScale {
  const { minSize, maxSize, minViewport, maxViewport } = o;
  for (const v of [minSize, maxSize, minViewport, maxViewport])
    if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0 || v > 100000)
      throw new RangeError('Scale values must be finite positive CSS pixels');
  if (maxSize < minSize || maxViewport <= minViewport)
    throw new RangeError('Scale endpoints must be ordered');
  const slope = (maxSize - minSize) / (maxViewport - minViewport),
    intercept = minSize - slope * minViewport;
  const fmt = (n: number) => Number(n.toFixed(6)).toString();
  const css =
    'clamp(' +
    fmt(minSize / 16) +
    'rem, ' +
    fmt(intercept / 16) +
    'rem + ' +
    fmt(slope * 100) +
    'vw, ' +
    fmt(maxSize / 16) +
    'rem)';
  return { css, slope, intercept };
}
