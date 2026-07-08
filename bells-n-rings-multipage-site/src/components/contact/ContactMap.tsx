import { CONTACT } from "@/lib/constants";

// Static Google Maps embed — no API key required. Swap the src query for a
// precise address once the studio location is confirmed.
export default function ContactMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold-soft/40">
      <iframe
        title="Bells n Rings Event Planners location"
        src={CONTACT.mapEmbedSrc}
        width="100%"
        height="320"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale-[15%]"
      />
    </div>
  );
}
