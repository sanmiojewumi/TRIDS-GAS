'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Move } from 'lucide-react';

interface WhatsAppProps {
  phone?: string;
}

export const DraggableWhatsApp: React.FC<WhatsAppProps> = ({
  phone = '07311038572',
}) => {
  // Format phone number for WhatsApp URL (convert UK 07... to 447...)
  const formattedPhone = phone.replace(/^0/, '44').replace(/\s+/g, '');
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=Hello%20TRIDS%20Gas%20%26%20Plumbing%2C%20I%20would%20like%20to%20enquire%20about%20a%20service.`;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ x: 0, y: 0 }}
      className="fixed bottom-8 right-8 z-50 hidden cursor-grab select-none active:cursor-grabbing lg:block"
    >
      <div className="relative group">
        
        {/* Drag handle tooltip indicator on hover only */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950/90 text-[9px] font-mono text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-1 pointer-events-none">
          <Move className="w-2.5 h-2.5 text-amber-400" /> Drag to move
        </div>

        {/* Main Floating Draggable WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.6)] border-2 border-white/80 transition-all relative"
          title={`Chat with TRIDS Gas & Plumbing on WhatsApp (${phone})`}
          aria-label={`Chat with TRIDS Gas & Plumbing on WhatsApp at ${phone}`}
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

          {/* Official Complete WhatsApp Logo SVG (Bubble + Handset) */}
          <svg className="w-8 h-8 fill-white relative z-10" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.197 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

      </div>
    </motion.div>
  );
};
