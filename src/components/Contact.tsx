import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Printer, Clock, CheckCircle } from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: MapPin, label: t('contact.iAddress'), value: t('contact.address') },
    { icon: Phone, label: t('contact.iPhone'), value: t('contact.phone') },
    { icon: Printer, label: t('contact.iFax'), value: t('contact.fax') },
    { icon: Clock, label: t('contact.iHours'), value: t('contact.hours') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        message: form.message,
        status: 'pending',
        createdAt: Timestamp.now(),
      });
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('문의 전송 실패:', err);
      alert('문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('contact.t1')} <br />
              {t('contact.t2')}
            </motion.h2>
            <motion.p
              className="text-base md:text-xl text-gray-400 font-light mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('contact.s')}
            </motion.p>

            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  className="flex items-start gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white shrink-0">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-semibold tracking-widest uppercase mb-1">
                      {info.label}
                    </div>
                    <div className="text-lg font-medium text-white">{info.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="bg-[#0a0a0a] p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-white/5 relative overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {submitted ? (
              <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={48} className="text-green-400 mb-6" />
                <h3 className="text-2xl font-bold mb-2 text-white">{t('contact.successTitle')}</h3>
                <p className="text-gray-400 mb-8">{t('contact.successSub')}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-white text-sm hover:bg-white/20 transition-colors"
                >
                  {t('contact.successAgain')}
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2 text-white relative z-10 tracking-tight">
                  {t('contact.formTitle')}
                </h3>
                <p className="text-gray-400 mb-8 font-light relative z-10">{t('contact.formSub')}</p>

                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder={t('contact.namePh')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      {t('contact.phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder={t('contact.phonePh')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      {t('contact.emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder={t('contact.emailPh')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      {t('contact.msgLabel')}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                      placeholder={t('contact.msgPh')}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-white text-black font-medium rounded-xl px-6 py-3 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? t('contact.sending') : t('contact.submit')}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
