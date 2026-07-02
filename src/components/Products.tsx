import { motion } from 'motion/react';
import { useImage } from '../contexts/SiteContentContext';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';

interface ProductsProps {
  onSelectProduct: (product: Product) => void;
}

export default function Products({ onSelectProduct }: ProductsProps) {
  const _hp0 = useImage('homeProducts.p0.img', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80');
  const _hp1 = useImage('homeProducts.p1.img', 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80');
  const _hp2 = useImage('homeProducts.p2.img', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80');
  const _hp3 = useImage('homeProducts.p3.img', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80');
  const _hp4 = useImage('homeProducts.p4.img', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80');
  const _imgMap: Record<string,string> = {'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80': _hp0, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80': _hp1, 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80': _hp2, 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80': _hp3, 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80': _hp4};
  const { t } = useTranslation();

  const products: Product[] = [
    {
      id: 'fridge',
      name: t('homeProducts.p0n'),
      desc: t('homeProducts.p0d'),
      img: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80',
      colSpan: 'md:col-span-2',
      rowSpan: 'md:row-span-2',
      details: t('homeProducts.p0.details', { returnObjects: true }) as unknown as string[],
    },
    {
      id: 'dish',
      name: t('homeProducts.p1n'),
      desc: t('homeProducts.p1d'),
      img: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80',
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
      details: t('homeProducts.p1.details', { returnObjects: true }) as unknown as string[],
    },
    {
      id: 'vent',
      name: t('homeProducts.p2n'),
      desc: t('homeProducts.p2d'),
      img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
      details: t('homeProducts.p2.details', { returnObjects: true }) as unknown as string[],
    },
    {
      id: 'med',
      name: t('homeProducts.p3n'),
      desc: t('homeProducts.p3d'),
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
      details: t('homeProducts.p3.details', { returnObjects: true }) as unknown as string[],
    },
    {
      id: 'solar',
      name: t('homeProducts.p4n'),
      desc: t('homeProducts.p4d'),
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
      details: t('homeProducts.p4.details', { returnObjects: true }) as unknown as string[],
    },
  ];

  return (
    <section id="products" className="py-16 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 md:mb-20">
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white break-keep"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('homeProducts.t1')} <br />
            {t('homeProducts.t2')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className={`${product.colSpan} ${product.rowSpan}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                layoutId={`card-${product.id}`}
                onClick={() => onSelectProduct(product)}
                whileHover="hover"
                className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 cursor-pointer group"
              >
                <motion.img
                  layoutId={`img-${product.id}`}
                  src={_imgMap[product.img] || product.img}
                  data-cms-img-key={`homeProducts.p${i}.img`}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  variants={{ hover: { scale: 1.05, opacity: 0.8 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-5 md:p-8 z-20 pointer-events-none">
                  <motion.h3 layoutId={`title-${product.id}`} className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-white tracking-tight break-keep">{product.name}</motion.h3>
                  <motion.p layoutId={`desc-${product.id}`} className="text-sm md:text-base text-gray-400 font-light">{product.desc}</motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
