"use client";

import React from "react";
import DeckGL from "@deck.gl/react/typed";
import StaticMap from "react-map-gl";
import { GoogleMapsOverlay as DeckOverlay } from "@deck.gl/google-maps/typed";
import { HeatmapLayer } from "@deck.gl/aggregation-layers/typed";

function MapCard() {
  // Mapbox token
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiYW1hcml0byIsImEiOiJjbDZuZjk1aHEwMGFhM2NxcGZ4ZnlnZ3YzIn0.XRzuAyGE0yFlQurbM7unZQ";

  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 2.33,
    latitude: 48.86,
    zoom: 10,
    maxZoom: 16,
    pitch: 0,
    bearing: 0,
  };

  // Layers
  const layer = () =>
    new HeatmapLayer({
      id: "heatmap",
      stroked: true,
      opacity: 0.8,
      radiusMinPixels: 5,
      radiusMaxPixels: 10,
      getFillColor: [200, 0, 40, 150],
      pickable: true,
    });
  // Map style
  const MAP_STYLE = "mapbox://styles/mapbox/dark-v10";
  // Deck GL overlay
  const overlay = new DeckOverlay({
    layers: [layer()],
  });
  return (
    <div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[layer()]}
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
