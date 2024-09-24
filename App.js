import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

export default function App() {
  const position = { lat: 55.7047, lng: 13.191 };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey={""}>
        <Map
          defaultCenter={position}
          zoom={14}
          mapId={""}
          fullscreenControl={false}
        >
          <Directions />
        </Map>
      </APIProvider>
    </div>
  );
}

function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes"); //test
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]); // No type annotation here


  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer( { map }));

  }, [routesLibrary, map])

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
  
    const fetchDirections = async () => {
      try {
        const response = await directionsService.route({
          origin: "Södra Esplanaden 36, Lund",
          destination: "Östra Vallgatan 1, Lund"
        });
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };
  
    fetchDirections();
  }, [directionsService, directionsRenderer]); // Corrected - Now this is an array
  
}
