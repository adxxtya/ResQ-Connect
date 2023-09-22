import * as React from "react";
import mapboxgl, { type LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Location {
  longitude: number;
  latitude: number;
}

interface MapboxMapProps {
  location: Location | null;
}

function MapboxMap({ location }: MapboxMapProps) {
  // const [map, setMap] = React.useState<mapboxgl.Map | null>(null);
  const mapNode = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    let centerCoordinates: LngLatLike;
    let zoomLevel: number;

    if (location) {
      centerCoordinates = [location.longitude, location.latitude];
      zoomLevel = 9;
    } else {
      centerCoordinates = [78.9629, 20.5937];
      zoomLevel = 5;
    }

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: centerCoordinates,
      zoom: zoomLevel,
    });

    // Ask for location permission and show the current location with a marker
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation: LngLatLike = [longitude, latitude];

          new mapboxgl.Marker().setLngLat(userLocation).addTo(mapboxMap);

          // Zoom to the marker's location
          mapboxMap.flyTo({
            center: userLocation,
            zoom: 14,
            essential: true,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }

    return () => {
      if (mapboxMap) {
        mapboxMap.remove();
      }
    };
  }, [location]);

  return <div ref={mapNode} style={{ width: "100%", height: "80vh" }} />;
}

export default MapboxMap;
