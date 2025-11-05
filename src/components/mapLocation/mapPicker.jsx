"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";

const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

function LocationMarker({ onChange }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onChange(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
}

export default function MapPicker({ onLocationSelect }) {
  const [currentPos, setCurrentPos] = useState([-7.953514, 112.659899]); // default Malang
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(`/api/reverse?lat=${lat}&lon=${lng}`);
      const data = await res.json();
      return data.display_name || "Alamat tidak ditemukan";
    } catch (err) {
      console.error("Gagal ambil alamat:", err);
      return "Alamat tidak tersedia";
    }
  };

  // Deteksi lokasi user otomatis
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCurrentPos([lat, lng]);
          const address = await getAddressFromCoords(lat, lng);
          onLocationSelect({ lat, lng, address });
        },
        (err) => console.warn("Lokasi gagal dideteksi:", err)
      );
    }
  }, []);

  const handleMapClick = async (latlng) => {
    const address = await getAddressFromCoords(latlng.lat, latlng.lng);
    onLocationSelect({ ...latlng, address });
  };

  if (!isClient) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-xl shadow-md">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={currentPos}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <Marker position={currentPos} icon={customIcon}></Marker>
        <LocationMarker onChange={handleMapClick} />
      </MapContainer>
    </div>
  );
}
