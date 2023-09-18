import * as React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapboxMap({ location }) {
  const [map, setMap] = React.useState();
  const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;

    if (typeof window === 'undefined' || node === null) return;

    let centerCoordinates;
    let zoomLevel;

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
      style: 'mapbox://styles/mapbox/streets-v11',
      center: centerCoordinates,
      zoom: zoomLevel,
    });

    setMap(mapboxMap);

    // Add a marker to the map at the user's location
    if (location) {
      new mapboxgl.Marker().setLngLat([location.longitude, location.latitude]).addTo(mapboxMap);
    }

    return () => {
      mapboxMap.remove();
    };
  }, [location]);

  return <div ref={mapNode} style={{ width: '100%', height: '100vh' }} />;
}

export default MapboxMap;