'use client';

export default function MapEmbed() {
  const placeQuery = encodeURIComponent('Hotel Restaurante Boabdil, Carr. Bailén-Motril, s/n, 18630 Otura, Granada');
  const mapSrc = `https://www.google.com/maps?q=${placeQuery}&output=embed`;

  return (
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg border-2 border-amber-200">
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de la boda - Hotel Restaurante Boabdil"
      />
    </div>
  );
}