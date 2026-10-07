export interface LocalLandingContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  bookService: string;
  sections: Array<{ heading: string; body: string }>;
  jobs: string[];
  related: Array<{ href: string; label: string }>;
}

export const LOCAL_LANDING_SLUGS = [
  'gas-engineer-crewe',
  'boiler-repair-crewe',
  'boiler-service-crewe',
  'boiler-breakdown-crewe',
  'landlord-gas-safety-crewe',
  'central-heating-repair-crewe',
  'gas-cooker-installation-crewe',
] as const;

export type LocalLandingSlug = (typeof LOCAL_LANDING_SLUGS)[number];

const nearbyTowns = [
  { href: '/areas/crewe', label: 'Crewe' },
  { href: '/areas/nantwich', label: 'Nantwich' },
  { href: '/areas/sandbach', label: 'Sandbach' },
  { href: '/areas/middlewich', label: 'Middlewich' },
  { href: '/areas/winsford', label: 'Winsford' },
];

export const localLandings: Record<LocalLandingSlug, LocalLandingContent> = {
  'gas-engineer-crewe': {
    slug: 'gas-engineer-crewe',
    title: 'Gas Engineer Crewe | Boiler Repair, Servicing & Heating',
    description:
      'Gas Safe registered gas engineer in Crewe for boiler repair, servicing, breakdowns, central heating and landlord CP12 certificates. Serving Nantwich, Sandbach, Middlewich and Winsford.',
    h1: 'Gas Engineer in Crewe',
    intro:
      'Gas Safe registered heating and plumbing engineer serving Crewe, Nantwich, Sandbach, Middlewich, Winsford and surrounding Cheshire areas. TRIDS handles boiler breakdowns, servicing, replacements, central-heating repairs, gas appliances and landlord gas safety certificates from a Crewe base.',
    bookService: 'Gas engineer Crewe',
    sections: [
      {
        heading: 'What a Crewe gas engineer visit covers',
        body: 'Most calls start with a clear diagnosis: no heat, no hot water, a lockout, a smell of gas after the emergency service has made the property safe, or a landlord certificate that is due. The work is explained before it starts, then completed to Gas Safe standards for homes in CW1, CW2 and nearby Cheshire towns.',
      },
      {
        heading: 'Boilers, heating and landlord work',
        body: 'TRIDS carries out boiler repair, annual servicing, replacement where a boiler is beyond economic repair, central-heating faults, radiator and controls work, gas cooker and hob installation, and CP12 landlord gas safety records. Plumbing that sits alongside that heating work is included where it is needed to finish the job safely.',
      },
      {
        heading: 'Where we work from Crewe',
        body: 'The primary market is Crewe. Regular coverage also includes Nantwich, Sandbach, Middlewich and Winsford, with further Cheshire and nearby Staffordshire towns already on the books. If you are checking whether we cover your street, call or book and we will confirm before travelling.',
      },
    ],
    jobs: [
      'Boiler breakdown and no-heat callouts',
      'Boiler servicing and safety checks',
      'Boiler replacement and commissioning',
      'Central heating and radiator repairs',
      'Landlord gas safety certificates (CP12)',
      'Gas cooker, hob and appliance installation',
    ],
    related: [
      { href: '/boiler-repair-crewe', label: 'Boiler repair Crewe' },
      { href: '/boiler-service-crewe', label: 'Boiler service Crewe' },
      { href: '/boiler-breakdown-crewe', label: 'Boiler breakdown Crewe' },
      { href: '/landlord-gas-safety-crewe', label: 'Landlord CP12 Crewe' },
      { href: '/central-heating-repair-crewe', label: 'Central heating repair Crewe' },
      { href: '/gas-cooker-installation-crewe', label: 'Gas cooker installation Crewe' },
    ],
  },
  'boiler-repair-crewe': {
    slug: 'boiler-repair-crewe',
    title: 'Boiler Repair Crewe | Gas Engineer',
    description:
      'Boiler repair in Crewe for lockouts, no heat, no hot water and noisy or leaking boilers. Gas Safe diagnosis and repair from TRIDS, covering nearby Cheshire towns.',
    h1: 'Boiler Repair in Crewe',
    intro:
      'If a boiler in Crewe has cut out, lost heat or started leaking, TRIDS attends as a Gas Safe registered engineer to find the fault and repair it where it is safe and economical to do so.',
    bookService: 'Boiler Repair & Diagnostics',
    sections: [
      {
        heading: 'Common boiler faults we diagnose',
        body: 'Typical Crewe jobs include boiler lockouts, pressure loss, ignition failure, frozen condensate, noisy heat exchangers, leaking valves and no hot water on combi boilers. The first step is a measured diagnosis, not a guess at a new boiler.',
      },
      {
        heading: 'Repair first where it makes sense',
        body: 'If the boiler can be repaired safely and parts are available, that is the usual recommendation. If the appliance is beyond economical repair, we explain a replacement option clearly before any further work. You are not pushed into a new boiler on the doorstep.',
      },
    ],
    jobs: [
      'No heating or no hot water',
      'Boiler lockout and fault codes',
      'Leaks, pressure loss and kettling',
      'Thermostat, pump and controls faults',
    ],
    related: [
      { href: '/boiler-breakdown-crewe', label: 'Boiler breakdown Crewe' },
      { href: '/boiler-service-crewe', label: 'Boiler service Crewe' },
      { href: '/gas-engineer-crewe', label: 'Gas engineer Crewe' },
    ],
  },
  'boiler-service-crewe': {
    slug: 'boiler-service-crewe',
    title: 'Boiler Service Crewe | Annual Gas Safe Service',
    description:
      'Annual boiler service in Crewe by a Gas Safe registered engineer. Combustion, flue and safety checks for Crewe, Nantwich, Sandbach, Middlewich and Winsford homes.',
    h1: 'Boiler Service in Crewe',
    intro:
      'An annual Gas Safe boiler service in Crewe checks combustion, flue performance, safety devices and the condition of the appliance so it can run reliably through the heating season.',
    bookService: 'Boiler Servicing',
    sections: [
      {
        heading: 'What is included in a service',
        body: 'A service is a safety and efficiency inspection, not a quick wipe-down. It typically includes visual checks, flue and ventilation assessment, combustion analysis where required, and a record of the work. Manufacturer warranties often need documented annual servicing.',
      },
      {
        heading: 'When to book',
        body: 'Book before winter if the last service was more than 12 months ago, or after a repair if the engineer recommends a follow-up service. Landlord properties still need a separate CP12 gas safety record each year.',
      },
    ],
    jobs: [
      'Annual combi, system and regular boiler service',
      'Flue, ventilation and combustion checks',
      'Safety device inspection',
      'Service record for warranty and household files',
    ],
    related: [
      { href: '/boiler-repair-crewe', label: 'Boiler repair Crewe' },
      { href: '/landlord-gas-safety-crewe', label: 'Landlord CP12 Crewe' },
      { href: '/gas-engineer-crewe', label: 'Gas engineer Crewe' },
    ],
  },
  'boiler-breakdown-crewe': {
    slug: 'boiler-breakdown-crewe',
    title: 'Boiler Breakdown Crewe | No Heat or Hot Water',
    description:
      'Boiler breakdown cover in Crewe for sudden loss of heat or hot water. Gas Safe fault finding and repair from TRIDS Gas & Plumbing.',
    h1: 'Boiler Breakdown in Crewe',
    intro:
      'A boiler breakdown in Crewe usually means no heating, no hot water, or a boiler that will not reset. TRIDS provides Gas Safe fault finding and repair so the household can get heat back on where the appliance allows it.',
    bookService: 'Boiler Repair & Diagnostics',
    sections: [
      {
        heading: 'What to do before the engineer arrives',
        body: 'Check the thermostat is calling for heat, look at the boiler pressure gauge if you can see it safely, and note any fault code on the display. Do not keep resetting a boiler that immediately locks out. If you smell gas, do not use electrical switches, leave the property if needed and call the National Gas Emergency Service on 0800 111 999.',
      },
      {
        heading: 'Same-day and next-available breakdowns',
        body: 'Urgent no-heat jobs are booked into the next suitable slot. We do not advertise a guaranteed 30-minute arrival. You get a clear appointment window and an engineer who explains the fault before replacing parts.',
      },
    ],
    jobs: [
      'Sudden loss of heating',
      'No hot water on a combi boiler',
      'Repeated lockouts',
      'Winter breakdown diagnosis',
    ],
    related: [
      { href: '/boiler-repair-crewe', label: 'Boiler repair Crewe' },
      { href: '/central-heating-repair-crewe', label: 'Central heating repair Crewe' },
      { href: '/gas-engineer-crewe', label: 'Gas engineer Crewe' },
    ],
  },
  'landlord-gas-safety-crewe': {
    slug: 'landlord-gas-safety-crewe',
    title: 'Landlord Gas Safety Certificate Crewe | CP12',
    description:
      'Landlord gas safety certificates (CP12) in Crewe. Annual Gas Safe inspection of appliances, flues and pipework for rented homes in Crewe and nearby Cheshire.',
    h1: 'Landlord Gas Safety Certificate in Crewe',
    intro:
      'Landlords in Crewe need a current gas safety record (often called a CP12) for rented properties. TRIDS inspects gas appliances, flues and pipework and issues the certificate after a Gas Safe check.',
    bookService: 'Gas Safety Inspection & CP12',
    sections: [
      {
        heading: 'What a CP12 includes',
        body: 'The inspection covers gas appliances in the property, flues, ventilation and tightness of relevant pipework. Defects are recorded. A certificate is issued when the inspection is complete. Tenants should receive a copy, and landlords should keep records.',
      },
      {
        heading: 'Crewe and nearby rental stock',
        body: 'We carry out landlord checks across Crewe, Nantwich, Sandbach, Middlewich and Winsford. Book before the current certificate expires so there is time to correct any defects.',
      },
    ],
    jobs: [
      'Annual landlord gas safety record',
      'Appliance, flue and pipework inspection',
      'Certificate issued after the visit',
      'Defect reporting for follow-up repairs',
    ],
    related: [
      { href: '/boiler-service-crewe', label: 'Boiler service Crewe' },
      { href: '/gas-engineer-crewe', label: 'Gas engineer Crewe' },
      { href: '/areas/crewe', label: 'Crewe coverage' },
    ],
  },
  'central-heating-repair-crewe': {
    slug: 'central-heating-repair-crewe',
    title: 'Central Heating Repair Crewe | Radiators & Controls',
    description:
      'Central heating repair in Crewe for cold radiators, system noise, controls faults and poor circulation. Gas Safe heating engineer from TRIDS.',
    h1: 'Central Heating Repair in Crewe',
    intro:
      'Central heating problems in Crewe are not always the boiler. Cold radiators, noisy pipework, failed pumps, zone valves and programmer faults are diagnosed and repaired so the system heats evenly again.',
    bookService: 'Radiator & Valve Upgrades',
    sections: [
      {
        heading: 'System faults beyond the boiler',
        body: 'A house can have a working boiler and still feel cold if a pump has failed, a radiator is blocked, a TRV is stuck or a programmer is not switching the heating on. Diagnosis looks at the whole system, not only the boiler casing.',
      },
      {
        heading: 'Radiators and controls',
        body: 'Work includes radiator repairs and replacements, TRVs, circulating pumps, motorised valves and heating controls. Larger system changes are quoted before work starts.',
      },
    ],
    jobs: [
      'Cold or unbalanced radiators',
      'Pump, valve and programmer faults',
      'System noise and poor circulation',
      'Heating controls that do not switch on',
    ],
    related: [
      { href: '/boiler-repair-crewe', label: 'Boiler repair Crewe' },
      { href: '/boiler-breakdown-crewe', label: 'Boiler breakdown Crewe' },
      { href: '/gas-engineer-crewe', label: 'Gas engineer Crewe' },
    ],
  },
  'gas-cooker-installation-crewe': {
    slug: 'gas-cooker-installation-crewe',
    title: 'Gas Cooker & Hob Installation Crewe | Gas Safe',
    description:
      'Gas cooker and hob installation in Crewe by a Gas Safe registered engineer. Safe connection, commissioning and tightness testing for Crewe homes.',
    h1: 'Gas Cooker and Hob Installation in Crewe',
    intro:
      'Gas cookers and hobs in Crewe must be installed by a Gas Safe registered engineer. TRIDS connects, tests and commissions gas cooking appliances so they are safe to use.',
    bookService: 'Gas Hob / Oven Installation',
    sections: [
      {
        heading: 'Why this is not a DIY job',
        body: 'Gas cooker and hob connections involve pipework, isolation, tightness testing and correct ventilation. UK law requires a registered engineer. We disconnect the old appliance where needed and commission the new one.',
      },
      {
        heading: 'What to have ready',
        body: 'Have the new appliance on site, confirm the existing gas point location, and keep the kitchen clear. If pipework has to be altered, that is quoted before extra work is done.',
      },
    ],
    jobs: [
      'Gas cooker installation and commissioning',
      'Gas hob installation',
      'Disconnection of old appliances',
      'Tightness testing after connection',
    ],
    related: [
      { href: '/gas-engineer-crewe', label: 'Gas engineer Crewe' },
      { href: '/landlord-gas-safety-crewe', label: 'Landlord CP12 Crewe' },
      { href: '/services/gas-appliance-installation', label: 'Gas appliance installation' },
    ],
  },
};

export const nearbyTownLinks = nearbyTowns;
