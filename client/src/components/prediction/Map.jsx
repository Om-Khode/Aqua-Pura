import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "../../styles/map.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { LightMode } from "@chakra-ui/react";

function LeafletgeoSearch({ position, setPosition }) {
  const handleMarkerDrag = (e) => {
    setPosition(e.location);
  };

  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
      showPopup: false,
      showMarker: false,
    });

    map.on("geosearch/showlocation", (e) => {
      setPosition({ lat: e.location.y, lng: e.location.x });
    });
    map.on("geosearch/marker/dragend", handleMarkerDrag);

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);

    // eslint-disable-next-line
  }, []);

  return null;
}

function DraggableMarker({ position, setPosition }) {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),

    // eslint-disable-next-line
    []
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      icon={new L.Icon({ iconUrl: icon, shadowUrl: iconShadow })}
      ref={markerRef}
    ></Marker>
  );
}

export default function Map({ position, setPosition }) {
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
  };

  return (
    <LightMode>
      <div id="mapid">
        <MapContainer
          center={position}
          zoom={13}
          onClick={(e) => handleMapClick(e)}
          style={{ height: "400px", width: "100%", bg: "white" }}
          className="rounded-lg shadow-md z-0 mt-6"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LeafletgeoSearch position={position} setPosition={setPosition} />
          <DraggableMarker position={position} setPosition={setPosition} />d
        </MapContainer>
      </div>
    </LightMode>
  );
}
