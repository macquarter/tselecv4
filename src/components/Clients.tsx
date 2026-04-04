import { useClients, useText } from '../contexts/SiteContentContext';

const defaultClients = [
  'SAMSUNG',
  'LG Electronics',
  'SK hynix',
  'HYUNDAI',
  'Hanwha',
  'LS ELECTRIC',
  'POSCO',
];

export default function Clients() {
  const clients = useClients(defaultClients);
  const label = useText('cl-title', 'Trusted by Innovative Companies');
  const tripled = [...clients, ...clients, ...clients];

  return (
    <section className="relative py-20 bg-black border-t border-white/5 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      <div className="absolute top-0 bottom-0 left-0 w-48 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-48 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />

      <p className="text-center text-[11px] font-semibold tracking-[0.3em] text-gray-500 uppercase mb-10">
        {label}
      </p>

      <div className="overflow-hidden">
        <div
          className="flex items-center gap-24 whitespace-nowrap"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {tripled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-[28px] font-bold tracking-tight text-white/25 hover:text-white transition-colors duration-500 cursor-default shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
