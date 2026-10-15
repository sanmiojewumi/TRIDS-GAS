import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TRIDS Gas & Plumbing',
    short_name: 'TRIDS',
    description: 'Gas Safe registered gas engineer in Crewe for boiler repair, servicing and plumbing.',
    start_url: '/',
    display: 'browser',
    background_color: '#070D1E',
    theme_color: '#070D1E',
    icons: [
      { src: '/images/icon-48.png', sizes: '48x48', type: 'image/png' },
      { src: '/images/icon-96.png', sizes: '96x96', type: 'image/png' },
      { src: '/images/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
