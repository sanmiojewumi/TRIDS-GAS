import React from 'react';

interface ReviewsQrProps {
  url: string;
  caption?: string;
}

export function ReviewsQr({ url, caption = 'Scan to leave or read a review' }: ReviewsQrProps) {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(url)}`;

  return (
    <figure className="mx-auto max-w-xs rounded-3xl border border-slate-800 bg-white p-5 text-center shadow-xl">
      <img
        src={qrSrc}
        alt="QR code linking to TRIDS Gas & Plumbing customer reviews"
        width={280}
        height={280}
        className="mx-auto h-auto w-full max-w-[220px]"
      />
      <figcaption className="mt-3 text-sm font-bold text-slate-800">{caption}</figcaption>
      <p className="mt-1 break-all text-[11px] text-slate-500">{url}</p>
    </figure>
  );
}
