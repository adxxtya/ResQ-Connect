"use client";

import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import mapboxgl, { type LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Define the Location and MapboxMapProps interfaces here

const Home = () => {
  const [location, setLocation] = useState<any | null>(null); // Initialize as null
  const isMounted = useRef(true);
  const mapNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedLocation = Cookies.get("userLocation");

    if (isMounted.current) {
      isMounted.current = false;
      if (storedLocation) {
        const parsedLocation = JSON.parse(storedLocation);
        setLocation(parsedLocation);
      } else if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          const userLocation = { latitude, longitude };
          setLocation(userLocation);
          Cookies.set("userLocation", JSON.stringify(userLocation));
        });
      }
    }
  }, []);

  useEffect(() => {
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

  return (
    <div>
      <div ref={mapNode} style={{ width: "100%", height: "80vh" }} />
    </div>
  );
};

export default Home;
