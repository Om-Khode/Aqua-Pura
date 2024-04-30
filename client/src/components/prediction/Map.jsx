import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

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
      marker: {
        icon: new L.Icon({ iconUrl: icon, shadowUrl: iconShadow }),
        draggable: true,
      },
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

export default function Map({ position, setPosition }) {
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
  };

  const handleMarkerDrag = (e) => {
    setPosition(e.latlng);
  };

  return (
    <div id="mapid">
      <MapContainer
        center={position}
        zoom={13}
        onClick={(e) => handleMapClick(e)}
        style={{ height: "400px", width: "100%" }}
        className="rounded-lg shadow-md z-0 mt-6"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LeafletgeoSearch position={position} setPosition={setPosition} />
        <Marker
          position={position}
          draggable={true}
          icon={new L.Icon({ iconUrl: icon, shadowUrl: iconShadow })}
          eventHandlers={{
            mouseup: (e) => {
              handleMarkerDrag(e);
            },
          }}
        ></Marker>
      </MapContainer>
    </div>
  );
}
