import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding TRIDS Gas & Plumbing database...');

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME?.trim() || 'TRIDS Administrator';

  if (!adminEmail || !adminPassword || adminPassword.length < 16) {
    throw new Error(
      'ADMIN_EMAIL and a unique ADMIN_PASSWORD of at least 16 characters are required to seed the admin account.',
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { name: adminName, passwordHash, role: 'ADMIN' },
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      companyName: 'TRIDS Gas & Plumbing',
      tagline: 'Gas Safe. Professionally Done.',
      phone: '07311038572',
      email: 'tridsgasandplumbing@gmail.com',
      gasSafeNumber: '979661',
      engineerName: 'TRIDS Gas & Plumbing',
      googleReviewsUrl: '#',
    },
  });

  const slides = [
    {
      id: 'slide-1',
      title: 'Ideal Combi Boiler & Precision Copper Pipework',
      category: 'BOILER INSTALLATION',
      description:
        'Wall-hung Ideal Exclusive combi boiler with 22mm soldered copper pipework, gas meter valve & magnetic filter.',
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
      description:
        'Wall-mounted Rinnai continuous flow gas water heater with microprocessor digital display set to 120°F.',
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
      description:
        'Front casing removed exposing burner chamber, heat exchanger, gas valve & ongoing flue gas analysis test.',
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
      description:
        'Electronic digital flue gas analyzer paired with wireless monitor tablet showing live CO (53 PPM) & CO2 (8.5%) ratios.',
      image: '/images/slides/slide2.jpg',
      badge: 'Flue Gas Analyser & Tablet',
      techSpec: 'TPI DC710 Smart Flue Gas Analyser & Live Report',
      order: 4,
      active: true,
    },
  ];

  for (const slide of slides) {
    await prisma.heroSlide.upsert({
      where: { id: slide.id },
      update: {},
      create: slide,
    });
  }

  const services = [
    {
      slug: 'boiler-installation',
      name: 'Boiler Installation',
      category: 'GAS',
      featured: true,
      description: 'High-efficiency combi, system and conventional boiler replacements with full Gas Safe commissioning.',
      content:
        'We specify, install and commission new boilers with chemical flush, magnetic filter, Benchmark paperwork and a clear handover. Typical combi-to-combi replacements are completed in a day.',
    },
    {
      slug: 'boiler-servicing',
      name: 'Boiler Servicing',
      category: 'GAS',
      featured: true,
      description: 'Annual Gas Safe boiler service to keep warranties valid, improve efficiency and check for carbon monoxide.',
      content:
        'A full service includes combustion analysis, safety device checks, flue inspection and a written service record for your manufacturer warranty.',
    },
    {
      slug: 'boiler-repairs',
      name: 'Boiler Repairs',
      category: 'GAS',
      featured: true,
      description: 'Fast diagnosis and repair of lockouts, no heating, no hot water and common manufacturer fault codes.',
      content:
        'We diagnose lockouts, ignition faults, circulation issues and sensor failures, then quote parts clearly before completing the repair.',
    },
    {
      slug: 'gas-safety-checks',
      name: 'Gas Safety Checks',
      category: 'GAS',
      featured: false,
      description: 'Appliance safety inspections, tightness testing and flue checks for homeowners and landlords.',
      content:
        'Every gas appliance is tested for safe operation, flue performance and tightness. You receive a clear written outcome.',
    },
    {
      slug: 'landlord-gas-safety-certificates',
      name: 'Landlord Gas Safety Certificates (CP12)',
      category: 'GAS',
      featured: true,
      description: 'Legal annual CP12 landlord certificates covering boilers, hobs, fires and associated pipework.',
      content:
        'We inspect every gas appliance in the property, issue a digital CP12 and flag any defects that must be made safe before tenants occupy.',
    },
    {
      slug: 'gas-appliance-installation',
      name: 'Gas Appliance Installation',
      category: 'GAS',
      featured: false,
      description: 'Safe installation of gas hobs, ovens, fires and water heaters with tightness testing.',
      content:
        'New gas appliances are fitted, tightness tested and commissioned to manufacturer and Gas Safe standards.',
    },
    {
      slug: 'gas-pipework-installation',
      name: 'Gas Pipework Installation',
      category: 'GAS',
      featured: false,
      description: 'New copper gas pipework, meter connections and isolation valves installed and tightness tested.',
      content:
        'We size and install gas pipework correctly, pressure test the system and leave isolation points accessible.',
    },
    {
      slug: 'gas-tightness-testing',
      name: 'Gas Tightness Testing',
      category: 'GAS',
      featured: false,
      description: 'Formal tightness tests after works, suspected leaks or before commissioning new appliances.',
      content:
        'Tightness testing confirms the installation is sound before we leave the property. Failed tests are isolated and explained.',
    },
    {
      slug: 'gas-leak-investigation',
      name: 'Gas Leak Investigation',
      category: 'GAS',
      featured: false,
      description: 'Urgent investigation of gas smells and suspected leaks, with isolation and repair where safe.',
      content:
        'If you smell gas, call the National Gas Emergency Service on 0800 111 999 first. We then investigate, isolate and repair once the situation is safe.',
    },
    {
      slug: 'central-heating-services',
      name: 'Central Heating Services',
      category: 'GAS',
      featured: false,
      description: 'Radiators, pumps, controls, powerflushing and system upgrades for quieter, more even heating.',
      content:
        'We balance systems, replace failed pumps and valves, and upgrade controls so rooms heat evenly without wasting gas.',
    },
    {
      slug: 'general-plumbing',
      name: 'General Plumbing',
      category: 'PLUMBING',
      featured: true,
      description: 'Everyday domestic plumbing: taps, toilets, wastes, isolation valves and bathroom first-fix/second-fix.',
      content:
        'From dripping taps to full bathroom connections, we complete clean, watertight plumbing with minimal disruption.',
    },
    {
      slug: 'leaking-pipes',
      name: 'Leaking Pipes & Leak Detection',
      category: 'PLUMBING',
      featured: true,
      description: 'Trace and repair leaking copper, plastic and hidden pipework before damage spreads.',
      content:
        'We isolate the supply, locate the leak and repair or replace the affected run, then test before leaving.',
    },
    {
      slug: 'emergency-plumbing',
      name: 'Emergency Plumbing',
      category: 'PLUMBING',
      featured: true,
      description: 'Burst pipes, no water, overflowing cisterns and urgent leaks with same-day response where possible.',
      content:
        'We make the situation safe first, then complete a lasting repair or a temporary make-safe if parts are needed.',
    },
    {
      slug: 'tap-toilet-installation',
      name: 'Tap & Toilet Installation',
      category: 'PLUMBING',
      featured: false,
      description: 'Replacement taps, mixer showers, WCs and cisterns fitted and leak-tested.',
      content:
        'We match isolation, waste and water pressure so new fittings work first time and do not drip.',
    },
    {
      slug: 'shower-radiator-replacement',
      name: 'Shower & Radiator Replacement',
      category: 'PLUMBING',
      featured: false,
      description: 'New radiators, TRVs, towel rails and shower valves with system drain-down and refill.',
      content:
        'Radiators and showers are sized correctly, isolated cleanly and commissioned so the rest of the house stays on heat.',
    },
    {
      slug: 'hot-water-cylinder-services',
      name: 'Hot Water Cylinder Services',
      category: 'PLUMBING',
      featured: false,
      description: 'Vented and unvented cylinder servicing, immersion repairs and G3-compliant upgrades.',
      content:
        'Unvented work is completed by a G3 qualified engineer, including safety valve checks and discharge pipe inspection.',
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  const areas = [
    { slug: 'crewe', name: 'Crewe', description: 'Primary base. Fast response for boilers, CP12s and plumbing across CW1 and CW2.' },
    { slug: 'winsford', name: 'Winsford', description: 'Boiler servicing, repairs and landlord certificates across Winsford and CW7.' },
    { slug: 'sandbach', name: 'Sandbach', description: 'Domestic gas and plumbing cover for Sandbach, Elworth and surrounding villages.' },
    { slug: 'nantwich', name: 'Nantwich', description: 'Installations, servicing and leak repairs across Nantwich and CW5.' },
    { slug: 'congleton', name: 'Congleton', description: 'Gas Safe work and plumbing for Congleton, Holmes Chapel and nearby towns.' },
    { slug: 'warrington', name: 'Warrington', description: 'Boiler and plumbing callouts across Warrington within our 50-mile radius.' },
    { slug: 'stockport', name: 'Stockport', description: 'Heating repairs, servicing and CP12 certificates for Stockport homes.' },
    { slug: 'manchester', name: 'Manchester', description: 'Selected Greater Manchester jobs for boilers, gas safety and plumbing.' },
    { slug: 'stoke-on-trent', name: 'Stoke-on-Trent', description: 'Staffordshire coverage for boiler installs, servicing and emergency plumbing.' },
  ];

  for (const area of areas) {
    await prisma.serviceArea.upsert({
      where: { slug: area.slug },
      update: {},
      create: area,
    });
  }

  const posts = [
    {
      slug: 'how-often-should-you-service-a-boiler',
      title: 'How Often Should You Service a Boiler?',
      excerpt: 'Why an annual Gas Safe service protects your warranty, your bill and your household.',
      category: 'Boiler Advice',
      featuredImage: '/images/slides/slide1.jpg',
      content:
        'Most manufacturers require a documented annual service to keep the warranty valid. A service also checks combustion, flue performance and carbon monoxide risk. Book before winter if the last service is more than 12 months ago.',
    },
    {
      slug: 'what-is-a-cp12-landlord-certificate',
      title: 'What Is a CP12 Landlord Gas Safety Certificate?',
      excerpt: 'A plain-English guide to the annual gas safety record every UK landlord must hold.',
      category: 'Gas Safety',
      featuredImage: '/images/slides/slide2.jpg',
      content:
        'A CP12 records that every gas appliance and flue in a rented property has been checked by a Gas Safe engineer. Landlords must keep records and give tenants a copy. TRIDS issues digital certificates after the visit.',
    },
    {
      slug: 'what-to-do-if-you-smell-gas',
      title: 'What To Do If You Smell Gas',
      excerpt: 'Turn off, get out, and call the National Gas Emergency Service before anything else.',
      category: 'Gas Safety',
      featuredImage: '/images/slides/slide3.jpg',
      content:
        'If you smell gas: do not use switches or phones inside, open windows if it is safe, turn the meter off, leave the property and call 0800 111 999. TRIDS can attend afterwards for investigation and repair.',
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: { ...post, published: true, author: 'TRIDS Gas & Plumbing' },
    });
  }

  console.log('Seed complete: admin users, settings, services, areas, slides and articles.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
