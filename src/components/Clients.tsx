import { motion } from 'motion/react';

const clients = [
  'SAMSUNG',
  'LG Electronics',
  'SK hynix',
  'HYUNDAI',
  'Hanwha',
  'LS ELECTRIC',
  'POSCO',
];

export default function Clients() {
  return (
    <section className="py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          className="text-center text-sm font-medium tracking-widest text-gray-500 uppercase mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Trusted by Innovative Companies
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {clients.map((name, i) => (
            <motion.div
              key={name}
              className="text-lg md:text-xl font-semibold tracking-tight text-gray-600 hover:text-white transition-colors duration-500 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}