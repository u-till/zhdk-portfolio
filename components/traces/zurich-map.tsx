'use client';

import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapImage {
  id: string;
  src: string;
  overlaySrc?: string;
  lat: number;
  lng: number;
  title?: string;
}

interface ZurichMapProps {
  images: MapImage[];
  onImageClick: (image: MapImage) => void;
}

const createImageIcon = (imageSrc: string, overlaySrc?: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-container" style="
        width: 90px;
        height: 120px;
        border-radius: 8px;
        border: 3px solid #0284c7;
        overflow: hidden;
        cursor: pointer;
        background: white;
        position: relative;
      ">
        <img
          src="${imageSrc}"
          class="marker-base"
          style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;"
          alt=""
        />
        ${overlaySrc ? `
          <img
            src="${overlaySrc}"
            class="marker-overlay"
            style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; opacity: 0; transition: opacity 0.2s;"
            alt=""
          />
        ` : ''}
      </div>
      <style>
        .marker-container:hover .marker-overlay {
          opacity: 1 !important;
        }
      </style>
    `,
    iconSize: [90, 120],
    iconAnchor: [45, 60],
  });
};

export function ZurichMap({ images, onImageClick }: ZurichMapProps) {
  const zurichCenter: [number, number] = [47.38, 8.528];

  return (
    <MapContainer
      center={zurichCenter}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution=""
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
      />
      {images.map((image) => (
        <Marker
          key={image.id}
          position={[image.lat, image.lng]}
          icon={createImageIcon(image.src, image.overlaySrc)}
          eventHandlers={{
            click: () => onImageClick(image),
          }}
        />
      ))}
    </MapContainer>
  );
}
