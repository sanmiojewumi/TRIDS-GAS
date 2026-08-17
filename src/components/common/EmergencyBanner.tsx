import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';

interface EmergencyBannerProps {
  emergencyNotice?: string;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  emergencyNotice = 'If you smell gas or suspect a dangerous gas leak, turn off your gas meter supply immediately, open windows, and call the UK National Gas Emergency Helpline on 0800 111 999.',
}) => {
  return (
    <div className="bg-gradient-to-r from-red-900 via-red-700 to-red-900 border-y border-red-500 text-white py-4 px-4 shadow-glow-red relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white text-red-700 flex items-center justify-center font-bold shrink-0 animate-bounce">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-red-200 block">
              🚨 UK GAS EMERGENCY ADVICE
            </span>
            <p className="text-xs sm:text-sm font-medium leading-tight text-white max-w-3xl">
              {emergencyNotice}
            </p>
          </div>
        </div>

        <a
          href="tel:0800111999"
          className="px-5 py-2.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 whitespace-nowrap font-mono shrink-0"
        >
          <PhoneCall className="w-4 h-4 text-red-700" />
          <span>Call 0800 111 999</span>
        </a>
      </div>
    </div>
  );
};
