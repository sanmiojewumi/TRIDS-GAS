import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding TRIDS Gas & Plumbing Database with Media Gallery & Official Details...');

  // 1. Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'tridsgasandplumbing@gmail.com' },
    update: { passwordHash },
    create: {
      name: 'TRIDS Admin',
      email: 'tridsgasandplumbing@gmail.com',
      passwordHash,
      role: 'ADMIN',
    },
  });

  // 2. Initial Picture and Video Media Items for Homepage & Admin Management
  const initialMedia = [
    {
      title: 'Worcester Bosch Combi Boiler Installation',
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      category: 'BOILER',
      description: 'High-efficiency A-rated combi boiler installation with magnetic filter and Nest thermostat in Crewe.',
      location: 'Crewe, Cheshire',
      featured: true,
    },
    {
      title: 'Boiler Servicing & Flue Gas Diagnostics Walkthrough',
      type: 'VIDEO',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-plumber-working-on-a-pipe-with-a-wrench-41549-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
      category: 'BOILER',
      description: 'Step-by-step video demonstration of digital flue gas combustion testing and safety checks.',
      location: 'Nantwich, Cheshire',
      featured: true,
    },
    {
      title: 'Unvented Hot Water Cylinder Upgrade',
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
      category: 'PLUMBING',
      description: '250L stainless steel unvented cylinder installation for high-pressure multi-bathroom water supply.',
      location: 'Sandbach, Cheshire',
      featured: true,
    },
    {
      title: 'Precision Copper Pipework & Thermostatic Brassware',
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      category: 'WORKMANSHIP',
      description: 'Concealed thermostatic brassware installation with 22mm soldered copper pipework.',
      location: 'Winsford, Cheshire',
      featured: true,
    },
    {
      title: 'Gas Safety CP12 Inspection & Tightness Test Video',
      type: 'VIDEO',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-worker-fixing-a-machine-part-41551-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
      category: 'GAS_SAFETY',
      description: 'Video recording of digital manometer gas tightness testing for a landlord CP12 safety check.',
      location: 'Congleton, Cheshire',
      featured: true,
    },
    {
      title: 'Range Cooker & Gas Hob Supply Pipe Installation',
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      category: 'GAS_SAFETY',
      description: 'New gas supply line with stability chain and gas tightness test for range cooker.',
      location: 'Stockport, Manchester',
      featured: true,
    },
  ];

  for (const m of initialMedia) {
    const existing = await prisma.mediaItem.findFirst({ where: { title: m.title } });
    if (!existing) {
      await prisma.mediaItem.create({ data: m });
    }
  }

  console.log('Database seeded with Media Gallery items (Pictures & Videos).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
