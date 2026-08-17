import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding TRIDS Gas & Plumbing Database with Full Admin Control Data...');

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

  // 2. Default Hero Slides for Admin Slide Control
  const defaultSlides = [
    {
      id: 'slide-1',
      title: 'Ideal Combi Boiler & Precision Copper Pipework',
      category: 'BOILER INSTALLATION',
      description: 'Wall-hung Ideal Exclusive combi boiler with 22mm soldered copper pipework, gas meter valve & magnetic filter.',
      image: '/images/slides/slide1.jpg',
      badge: 'Ideal Combi Boiler',
      techSpec: 'Soldered Copper Gas Line & MagnaClean Filter',
      order: 1,
      active: true,
    },
    {
      id: 'slide-2',
      title: 'Rinnai Continuous Flow Digital Water Heater',
      category: 'WATER HEATER SYSTEM',
      description: 'Wall-mounted Rinnai continuous flow gas water heater with microprocessor digital display set to 120°F.',
      image: '/images/slides/slide4.jpg',
      badge: 'Rinnai Water Heater',
      techSpec: 'Microprocessor Digital Temperature Control (120°F)',
      order: 2,
      active: true,
    },
    {
      id: 'slide-3',
      title: 'Boiler With Casing Removed & Ongoing Flue Gas Analysis',
      category: 'INTERNAL DIAGNOSTICS',
      description: 'Front casing removed exposing burner chamber, heat exchanger, gas valve & ongoing flue gas analysis test.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      badge: 'Boiler Casing Off & FGA Test',
      techSpec: 'Combustion Chamber Inspection & Flue Probe Analysis',
      order: 3,
      active: true,
    },
    {
      id: 'slide-4',
      title: 'Flue Gas Analyser & Monitor Tablet',
      category: 'COMBUSTION DIAGNOSTICS',
      description: 'Electronic digital flue gas analyzer paired with wireless monitor tablet showing live CO (53 PPM) & CO2 (8.5%) ratios.',
      image: '/images/slides/slide2.jpg',
      badge: 'Flue Gas Analyser & Tablet',
      techSpec: 'TPI DC710 Smart Flue Gas Analyser & Live Report',
      order: 4,
      active: true,
    },
  ];

  for (const s of defaultSlides) {
    const existing = await prisma.heroSlide.findUnique({ where: { id: s.id } });
    if (!existing) {
      await prisma.heroSlide.create({ data: s });
    }
  }

  console.log('Database seeded with Hero Slides for admin control.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
