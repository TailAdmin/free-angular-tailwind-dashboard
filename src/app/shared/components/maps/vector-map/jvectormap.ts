import jsVectorMap from 'jsvectormap';
import { usAeaMap } from './data/us-aea';
import { worldMap } from './data/world';

export type VectorMapName = 'world' | 'us_aea';

/** Minimal typing for the jsvectormap instance members we use. */
export interface VectorMapInstance {
  scale: number;
  _width: number;
  _height: number;
  /** jsvectormap exposes its zoom method as `_setScale` (the same one its built-in zoom buttons call). */
  _setScale(scale: number, anchorX?: number, anchorY?: number, isCentered?: boolean, animate?: boolean): void;
  destroy(): void;
}

const ZOOM_FACTOR = 1.5;
let registered = false;

function registerMaps() {
  if (registered) return;
  const Map = jsVectorMap as unknown as { addMap(name: string, data: unknown): void };
  Map.addMap('world', worldMap);
  Map.addMap('us_aea', usAeaMap);
  registered = true;
}

export interface VectorMapMarker {
  name: string;
  /** [lat, lng] */
  coords: [number, number];
}

export interface VectorMapOptions {
  map: VectorMapName;
  markers?: VectorMapMarker[];
  regionStyle?: Record<string, unknown>;
  markerStyle?: Record<string, unknown>;
  selectedRegions?: string[];
}

/** Creates a jsvectormap instance with the same behaviour as the Next.js `VectorMap` props. */
export function createVectorMap(selector: HTMLElement, options: VectorMapOptions): VectorMapInstance {
  registerMaps();
  const Map = jsVectorMap as unknown as new (options: Record<string, unknown>) => VectorMapInstance;
  return new Map({
    selector,
    zoomOnScroll: false,
    zoomButtons: false,
    zoomAnimate: true,
    zoomStep: ZOOM_FACTOR,
    zoomMax: 12,
    zoomMin: 1,
    ...options,
  });
}

export function zoomVectorMap(map: VectorMapInstance | undefined, direction: 'in' | 'out') {
  if (!map) return;
  const factor = direction === 'in' ? ZOOM_FACTOR : 1 / ZOOM_FACTOR;
  map._setScale(map.scale * factor, map._width / 2, map._height / 2, false, true);
}
