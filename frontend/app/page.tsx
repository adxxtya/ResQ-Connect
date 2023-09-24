"use client";

import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import mapboxgl, { type LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl/dist/mapbox-gl.css";

const Home = () => {
  const [location, setLocation] = useState<any | null>(null); // Initialize as null
  const isMounted = useRef(true);
  const mapNode = useRef<HTMLDivElement | null>(null);

  const data = [
    {
      Unit1: {
        Name: "Sh. Hitender Pal Singh Kandari",
        Designation: "Commandant",
        Address:
          "1st BN NDRF, Patgaon PO - Azara,Distt. Kamrup Metro, Guwahati-781017",
        "Telephone No.": "0361-2840027",
        "Unit Control Room No.": "07637011337\n09435117246",
        Coordinates: {
          Latitude: 26.0946675,
          Longitude: 91.6127124,
        },
      },
      Unit2: {
        Name: "Sh. Gurminder Singh",
        Designation: "Commandant",
        Address:
          "2nd BN NDRF, Near RRI Camp. Haringhata,  Mohanpur, Nadia, (West Bengal)  Pin - 741246",
        "Telephone No.": "033-25875032",
        "Unit Control Room No.": "033-25875032\n09474061104\n09474116775",
        Coordinates: {
          Latitude: 22.94971903,
          Longitude: 88.51263599,
        },
      },
      Unit3: {
        Name: "Sh. Jacob Kispotta",
        Designation: "Commandant",
        Address: "3rd BN NDRF, PO-Mundali, Cuttack - Odisha Pin - 754013",
        "Telephone No.": "0671-2879710",
        "Unit Control Room No.": "0671-2879711\n09437581614",
        Coordinates: {
          Latitude: 20.42693143,
          Longitude: 85.77666171,
        },
      },
      Unit4: {
        Name: "Sh. Akhilesh Kumar",
        Designation: "Commandant",
        Address:
          "4th Bn NDRF, Suraksha Campus , Arrakonam , Distt. Ranipet, Tamilnadu-631152",
        "Telephone No.": "04177-246269",
        "Unit Control Room No.": "04177-246594\n09442140269",
        Coordinates: {
          Latitude: 13.03963826,
          Longitude: 79.74048681,
        },
      },
      Unit5: {
        Name: "Sh. Santosh Bahadur Singh",
        Designation: "Commandant",
        Address:
          "5th Bn NDRF, Sudumbare Taluka Mavel, Distt - Pune (Maharashtra)       Pin - 412109",
        "Telephone No.": "02114-247001",
        "Unit Control Room No.": "02114-247000\n09422315628",
        Coordinates: {
          Latitude: 18.76276828,
          Longitude: 73.75774733,
        },
      },
      Unit6: {
        Name: "Sh. V. V. N. Prasanna Kumar",
        Designation: "Commandant",
        Address: "6th Bn NDRF, Jarod Camp,Teh-Wagodia, Vadodara, Pin - 391510",
        "Telephone No.": "02668-299182",
        "Unit Control Room No.": "02668-299201\n09870006730",
        Coordinates: {
          Latitude: 22.43093306,
          Longitude: 73.31856273,
        },
      },
      Unit7: {
        Name: "Sh. Santosh Kumar",
        Designation: "Commandant",
        Address: "7th Bn NDRF, Bibiwala Road, Bhatinda ( Punjab ) Pin 151001",
        "Telephone No.": "0164-2246030",
        "Unit Control Room No.": "0164-2246193\n0164-2246570",
        Coordinates: {
          Latitude: 30.24454225,
          Longitude: 74.97134758,
        },
      },
      Unit8: {
        Name: "Sh. P.K.Tiwari",
        Designation: "Commandant",
        Address: "8th Bn NDRF, Kamla Nehru Nagar, Ghaziabad (UP) Pin - 201002",
        "Telephone No.": "0120-2766013",
        "Unit Control Room No.": "0120-2766618\n09412221035",
        Coordinates: {
          Latitude: 28.68172063,
          Longitude: 77.47344952,
        },
      },
      Unit9: {
        Name: "Sh. Suneel Kumar Singh",
        Designation: "Commandant",
        Address: "9th Bn NDRF, Bihata Patna, Bihar Pin -  801103",
        "Telephone No.": "06115-253942",
        "Unit Control Room No.": "06115-253939\n08544415050\n09525752125",
        Coordinates: {
          Latitude: 25.57327227,
          Longitude: 84.85714789,
        },
      },
      Unit10: {
        Name: "Mr. Zahid Khan",
        Designation: "Commandant",
        Address:
          "10th Bn NDRF, Village Kondapavuluru, PO- Surampalli, Gannavaram Mandal   Krishna (AP) PIN - 521212",
        "Telephone No.": "--",
        "Unit Control Room No.": "08333068559\n08333068540\n08897900037",
        Coordinates: {
          Latitude: 16.37913341,
          Longitude: 80.53186558,
        },
      },
      Unit11: {
        Name: "Sh. Manoj Kumar Sharma",
        Designation: "Commandant",
        Address:
          "11 th  Bn NDRF,  Sanskritik Sankul, Maqbool Alam Road, Varanasi, UP - 221002",
        "Telephone No.": "0542-2501202",
        "Unit Control Room No.": "0542-2501101\n08004931410",
        Coordinates: {
          Latitude: 25.33921182,
          Longitude: 82.99534097,
        },
      },
      Unit12: {
        Name: "Sh. Daulat Ram Choudhary",
        Designation: "Commandant",
        Address: "12 th Bn NDRF, Itanagar,  Arunachal Pardesh-791112",
        "Telephone No.": "0360-2999577",
        "Unit Control Room No.": "0360-2999545\n09485235464",
        Coordinates: {
          Latitude: 26.96336288,
          Longitude: 93.60198073,
        },
      },
      Unit13: {
        Name: "Sh. Uttam Chand",
        Designation: "Commandant",
        Address: "13 th Bn NDRF, Ladhowal,  Ludhiana, Punjab-141008",
        "Telephone No.": "0161-2921304",
        "Unit Control Room No.": "0161-2921305",
        Coordinates: {
          Latitude: 30.98037847,
          Longitude: 75.76198884,
        },
      },
      Unit14: {
        Name: "Sh. Baljinder Singh",
        Designation: "Commandant",
        Address:
          "14 th Bn NDRF, Nurpur, Jassur, Kangra,  Himachal Pradesh PIN- 176201",
        "Telephone No.": "01893-292602",
        "Unit Control Room No.": "01893-292478",
        Coordinates: {
          Latitude: 32.28384971,
          Longitude: 75.85804612,
        },
      },
      Unit15: {
        Name: "Sh. Sudesh Kumar Drall",
        Designation: "Commandant",
        Address:
          "15 th Bn NDRF, PO-Gadarpur,\nDistt-Udhamsingh Nagar,  Uttarakhand PIN- 263152",
        "Telephone No.": "05949-231199",
        "Unit Control Room No.": "05949-231198\n07579098442",
        Coordinates: {
          Latitude: 29.03788352,
          Longitude: 79.26693906,
        },
      },
      Unit16: {
        Name: "Sh. Abujam Bijoy Kumar  Singh",
        Designation: "Commandant",
        Address:
          "16 th Bn NDRF, Near Dada Dev Mandir Road,Sector-7,  Dwarka New Delhi, PIN-110077",
        "Telephone No.": "011-20893564",
        "Unit Control Room No.": "011-20892672",
        Coordinates: {
          Latitude: 28.57815097,
          Longitude: 77.07760499,
        },
      },
    },
  ];

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
      zoomLevel = 4;
    }

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: centerCoordinates,
      zoom: zoomLevel,
    });

    const userMarkerColor = "blue";
    const otherMarkerColor = "red";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation: LngLatLike = [longitude, latitude];

          new mapboxgl.Marker({ color: userMarkerColor })
            .setLngLat(userLocation)
            .addTo(mapboxMap);

          // Zoom to the user's marker location
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

    // Create a legend div
    const legend = document.createElement("div");
    legend.innerHTML = `
    <div class="legend">
      <div class="legend-item">
        <span class="marker" style="background-color: ${userMarkerColor};"></span>
        User's Location
      </div>
      <div class="legend-item">
        <span class="marker" style="background-color: ${otherMarkerColor};"></span>
        Other Location
      </div>
    </div>
  `;
    legend.className = "mapboxgl-ctrl map-legend";

    // Add the legend to the map
    node.appendChild(legend);

    // Add markers for all 7 locations
    data.forEach((unitData: any) => {
      // Loop through all units (Unit1, Unit2, etc.)
      for (let unitKey in unitData) {
        const unit = unitData[unitKey];
        const { Coordinates, Name, Address } = unit;

        if (Coordinates) {
          const { Latitude, Longitude } = Coordinates;
          const unitLocation: LngLatLike = [Longitude, Latitude];

          new mapboxgl.Marker({ color: otherMarkerColor })
            .setLngLat(unitLocation)
            .setPopup(
              new mapboxgl.Popup().setHTML(`<h3>${Name}</h3><p>${Address}</p>`)
            )
            .addTo(mapboxMap);
        }
      }
    });

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

<style jsx>{`
  .legend-container {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .legend-marker {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 50%;
  }

  .user-marker {
    background-color: blue; // Color for the user's location marker
  }

  .other-marker {
    background-color: red; // Color for other location markers
  }
`}</style>;
