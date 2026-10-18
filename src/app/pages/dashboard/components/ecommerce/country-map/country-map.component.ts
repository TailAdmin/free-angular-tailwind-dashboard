import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  VectorMapInstance,
  VectorMapMarker,
  createVectorMap,
} from '../../../../../shared/components/maps/vector-map/jvectormap';

const defaultMarkers: VectorMapMarker[] = [
  { name: 'USA', coords: [37.2580397, -104.657039] },
  { name: 'France', coords: [46.2276, 2.2137] },
  { name: 'Yemen', coords: [1.3521, 103.8198] },
  { name: 'United Kingdom', coords: [55.3781, -3.436] },
];

@Component({
  selector: 'app-country-map',
  host: { class: 'block size-full' },
  template: `<div #chartdiv style="width: 100%; height: 100%; direction: ltr; text-align: left;"></div>`,
})
export class CountryMapComponent implements OnInit, OnDestroy {
  @Input() mapColor?: string;
  @Input() markers: VectorMapMarker[] = defaultMarkers;
  @ViewChild('chartdiv', { static: true }) chartdiv!: ElementRef<HTMLElement>;
  private map?: VectorMapInstance;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.map = createVectorMap(this.chartdiv.nativeElement, {
        map: 'world',
        markers: this.markers,
        markerStyle: { initial: { fill: '#465FFF', r: 4 } },
        regionStyle: {
          initial: {
            fill: this.mapColor || '#D0D5DD',
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 0,
            strokeOpacity: 0,
          },
          hover: { fillOpacity: 0.7, cursor: 'pointer', fill: '#465fff', stroke: 'none' },
          selected: { fill: '#465FFF' },
          selectedHover: {},
        },
      });
    });
  }

  ngOnDestroy() {
    this.map?.destroy();
  }
}
