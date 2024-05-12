import React from "react";
import DeckGL from "@deck.gl/react/typed";
import StaticMap from "react-map-gl";
import { GoogleMapsOverlay as DeckOverlay } from "@deck.gl/google-maps/typed";
import { IconLayer } from "@deck.gl/layers/typed";
import { HeatmapLayer } from "@deck.gl/aggregation-layers/typed";

interface MapCardProps {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
}

const layer = (latitude: number, longitude: number) =>
  new IconLayer({
    id: "icon-layer",
    data: [],
    pickable: true,
    sizeScale: 11,
    getIcon: (d: any) => ({
      url: "/images/pin.png",
      width: 128,
      height: 128,
    }),
    stroked: true,
    opacity: 0.8,
    radiusMinPixels: 5,
    radiusMaxPixels: 10,
    getFillColor: [200, 0, 40, 150],
    getPosition: () => [longitude, latitude],
    getSize: (d: any) => 5,
  });

function MapCard({ latitude, longitude, name, address }: MapCardProps) {
  // Mapbox token
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiYW1hcml0byIsImEiOiJjbDZuZjk1aHEwMGFhM2NxcGZ4ZnlnZ3YzIn0.XRzuAyGE0yFlQurbM7unZQ";

  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: longitude,
    latitude: latitude,
    zoom: 10,
    maxZoom: 16,
    pitch: 0,
    bearing: 0,
  };

  // Map style
  const MAP_STYLE = "mapbox://styles/mapbox/standard";

  // Layers
  const layer = new IconLayer({
    id: "icon-layer",
    pickable: true,
    sizeScale: 11,
    getIcon: () => ({
      url: "/images/pin.png",
      width: 32,
      height: 32,
    }),
    getPosition: [-0.15509, 51.50988],
    getSize: 5,
  });

  // Deck GL overlay
  const overlay = new DeckOverlay({
    layers: [layer],
  });

  return (
    <div className="absolute w-full h-full">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[layer]}
        // getTooltip={() => `${name}\n${address}`}
      >
        <StaticMap
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle={MAP_STYLE}
        />
      </DeckGL>
    </div>
  );
}

export default MapCard;
