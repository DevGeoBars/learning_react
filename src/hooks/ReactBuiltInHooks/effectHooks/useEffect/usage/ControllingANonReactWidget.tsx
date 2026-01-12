import { FC, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

interface MapProps {
  zoomLevel: number;
}

//Controlling a non-React widget
export const Map: FC<MapProps> = ({ zoomLevel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapWidget | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
    }

    const map = mapRef.current;
    map.setZoom(zoomLevel);

    // Очистка при размонтировании
    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [zoomLevel]);

  return (
    <div
      style={{ width: '100%', height: '700px' }}
      ref={containerRef}
    />
  );
};

//region MapWidget



export interface MapWidgetConfig {
  zoomControl?: boolean;
  doubleClickZoom?: boolean;
  boxZoom?: boolean;
  keyboard?: boolean;
  scrollWheelZoom?: boolean;
  zoomAnimation?: boolean;
  touchZoom?: boolean;
  zoomSnap?: number;
  maxZoom?: number;
}

export class MapWidget {
  private map: L.Map;

  constructor(domNode: HTMLElement, config: MapWidgetConfig = {}) {
    this.map = L.map(domNode, {
      zoomControl: config.zoomControl ?? false,
      doubleClickZoom: config.doubleClickZoom ?? false,
      boxZoom: config.boxZoom ?? false,
      keyboard: config.keyboard ?? false,
      scrollWheelZoom: config.scrollWheelZoom ?? false,
      zoomAnimation: config.zoomAnimation ?? false,
      touchZoom: config.touchZoom ?? false,
      zoomSnap: config.zoomSnap ?? 0.1
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: config.maxZoom ?? 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.map.setView([0, 0], 0);
  }

  public setZoom(level: number): void {
    this.map.setZoom(level);
  }

  public getMap(): L.Map {
    return this.map;
  }

  public setView(lat: number, lng: number, zoom: number): void {
    this.map.setView([lat, lng], zoom);
  }

  public destroy(): void {
    this.map.remove();
  }
}
//endregion