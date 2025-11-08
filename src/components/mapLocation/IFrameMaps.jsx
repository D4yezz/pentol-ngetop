const IframeMaps = ({ customLat, customLng }) => {
  const mapUrl = `https://maps.google.com/maps?q=${customLat},${customLng}&z=16&output=embed`;
  return (
    <iframe
      className="w-full h-full"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={mapUrl}
    ></iframe>
  );
};

export default IframeMaps;
