export const coverageTowns = [
  { slug: 'crewe', name: 'Crewe', miles: 0, description: 'Gas Safe boiler, heating and plumbing services from our Crewe base, covering CW1, CW2 and the town centre.' },
  { slug: 'nantwich', name: 'Nantwich', miles: 5, description: 'Boiler repairs, servicing, installations and CP12 checks for Nantwich and CW5 homes.' },
  { slug: 'sandbach', name: 'Sandbach', miles: 6, description: 'Domestic gas and plumbing cover for Sandbach, Elworth and nearby Cheshire villages.' },
  { slug: 'alsager', name: 'Alsager', miles: 7, description: 'Gas engineer and plumber callouts for Alsager, covering boilers, leaks and landlord certificates.' },
  { slug: 'middlewich', name: 'Middlewich', miles: 8, description: 'Boiler servicing, heating repairs and plumbing for Middlewich and the CW10 area.' },
  { slug: 'winsford', name: 'Winsford', miles: 8, description: 'Boiler servicing, repairs and landlord gas safety certificates across Winsford and CW7.' },
  { slug: 'audlem', name: 'Audlem', miles: 9, description: 'Gas Safe heating and plumbing support for Audlem and surrounding South Cheshire villages.' },
  { slug: 'holmes-chapel', name: 'Holmes Chapel', miles: 10, description: 'Boiler, heating and plumbing services for Holmes Chapel and nearby Cheshire homes.' },
  { slug: 'kidsgrove', name: 'Kidsgrove', miles: 11, description: 'Gas engineer visits for Kidsgrove covering boiler faults, servicing and plumbing repairs.' },
  { slug: 'tarporley', name: 'Tarporley', miles: 12, description: 'Heating, gas safety and plumbing work for Tarporley and the mid-Cheshire villages.' },
  { slug: 'congleton', name: 'Congleton', miles: 13, description: 'Gas Safe boiler and plumbing services for Congleton, Holmes Chapel and nearby towns.' },
  { slug: 'northwich', name: 'Northwich', miles: 14, description: 'Boiler repairs, servicing and plumbing for Northwich, Hartford and the CW8/CW9 area.' },
  { slug: 'whitchurch', name: 'Whitchurch', miles: 14, description: 'Gas and plumbing support for Whitchurch, within easy reach of our Crewe base.' },
  { slug: 'newcastle-under-lyme', name: 'Newcastle-under-Lyme', miles: 15, description: 'Boiler installation, servicing and plumbing for Newcastle-under-Lyme and nearby Staffordshire.' },
  { slug: 'knutsford', name: 'Knutsford', miles: 18, description: 'Gas engineer and plumber services for Knutsford, covering boilers, heating and leak repairs.' },
  { slug: 'macclesfield', name: 'Macclesfield', miles: 20, description: 'Boiler servicing, repairs and CP12 certificates for Macclesfield and East Cheshire.' },
  { slug: 'stoke-on-trent', name: 'Stoke-on-Trent', miles: 16, description: 'Staffordshire coverage for boiler installs, servicing, gas safety and plumbing.' },
  { slug: 'chester', name: 'Chester', miles: 25, description: 'Selected gas, heating and plumbing jobs across Chester and the west Cheshire corridor.' },
  { slug: 'warrington', name: 'Warrington', miles: 28, description: 'Boiler and plumbing callouts across Warrington, within the TRIDS coverage area.' },
  { slug: 'stockport', name: 'Stockport', miles: 32, description: 'Heating repairs, servicing and landlord certificates for Stockport homes.' },
  { slug: 'manchester', name: 'Manchester', miles: 35, description: 'Selected Greater Manchester jobs for boilers, gas safety and plumbing.' },
] as const;

export const coverageTownDetails: Record<string, string> = {
  crewe:
    'Jobs in Crewe are usually in CW1 and CW2: no-heat callouts, annual services, landlord certificates and cooker connections. The engineer is based in the town, so Crewe is the first coverage area rather than a distant add-on.',
  nantwich:
    'Nantwich work is typically CW5 homes around the town centre and the villages off the A51. Common calls are combi lockouts, radiator faults and CP12 records for rented cottages and terraces.',
  sandbach:
    'Sandbach and Elworth sit on the CW11 side of the coverage map. Visits from Crewe usually cover boiler servicing, frozen condensate in winter, and gas safety checks on the housing around the cobbles and the bypass.',
  alsager:
    'Alsager is a short run east of Crewe. Calls are often boiler pressure loss, noisy heat exchangers and landlord inspections on ST7 properties, with plumbing leaks handled on the same visit where needed.',
  middlewich:
    'Middlewich (CW10) jobs are booked from Crewe along the A530. Typical work is no hot water on combis, programmer and thermostat faults, and annual services before the heating season.',
  winsford:
    'Winsford coverage includes CW7 estates and the older housing near the town centre. TRIDS attends boiler breakdowns, radiator cold spots and landlord gas safety records without treating Winsford as a separate branch.',
  audlem:
    'Audlem and the South Cheshire villages are reached from Crewe for planned servicing and breakdowns. Rural properties often need flue and condensate checks as well as cooker or hob connections.',
  'holmes-chapel':
    'Holmes Chapel sits between Crewe and Manchester airport traffic. Calls are usually boiler services, heating controls and CP12 work on CW4 homes, booked as part of the same Crewe diary.',
  kidsgrove:
    'Kidsgrove is on the Staffordshire edge of the regular round. Work includes boiler repairs, tightness testing after pipework jobs, and plumbing leaks on ST7 properties.',
  tarporley:
    'Tarporley and the mid-Cheshire villages are covered for heating repairs and gas safety. Larger houses often need system-boiler diagnosis, cylinder issues and radiator balancing rather than a combi-only visit.',
  congleton:
    'Congleton jobs are scheduled from Crewe for boiler servicing, lockouts and landlord certificates. CW12 properties around the town and the nearby villages are treated as genuine coverage, not copied town pages.',
  northwich:
    'Northwich, Hartford and the CW8/CW9 area are in range for boiler repair, servicing and plumbing. Salt-town housing stock often shows up as pressure loss, kettling and failed pumps.',
  whitchurch:
    'Whitchurch is a Shropshire market town within the Crewe working radius. Visits are typically boiler services, cooker installs and heating repairs rather than a full-time Shropshire depot.',
  'newcastle-under-lyme':
    'Newcastle-under-Lyme coverage is for booked boiler, gas safety and plumbing work from Crewe into Staffordshire. It is offered where the diary and travel make sense, not as a fake second office.',
  knutsford:
    'Knutsford calls from Crewe are usually planned services, heating repairs and landlord checks. WA16 properties are accepted when the appointment window is workable.',
  macclesfield:
    'Macclesfield and East Cheshire jobs include boiler servicing, repairs and CP12 records. SK10/SK11 visits are booked from the Crewe base rather than a Macclesfield shopfront.',
  'stoke-on-trent':
    'Stoke-on-Trent coverage is selected Staffordshire work: boiler installs, servicing, gas safety and plumbing where the job can be completed in a Crewe-based diary slot.',
  chester:
    'Chester work is selected west-Cheshire heating and plumbing, not a claim to be a Chester-only firm. Jobs are quoted with travel from Crewe made clear.',
  warrington:
    'Warrington callouts are accepted for boilers, leaks and gas safety when the travel from Crewe is practical. It is an extended coverage town, not a second trading address.',
  stockport:
    'Stockport heating and CP12 jobs are booked case by case from Crewe. Greater Manchester coverage is real work, not a generated landing page for every postcode.',
  manchester:
    'Manchester jobs are selected Greater Manchester boiler, gas safety and plumbing visits from the Crewe engineer, not a city-centre branch.',
};

export const primarySeoAreas = coverageTowns.filter((town) => town.miles <= 30).map((town) => town.name);

export function areaSeoTitle(name: string): string {
  return `Gas Engineer in ${name} | Boiler Repair & Plumbing | TRIDS Crewe`;
}

export function areaSeoDescription(name: string, description: string): string {
  return `${description} Book a Gas Safe registered engineer from TRIDS Gas & Plumbing in Crewe.`;
}

export function getCoverageTown(slug: string) {
  return coverageTowns.find((town) => town.slug === slug);
}

export function areaPagePath(slug: string) {
  return slug === 'crewe' ? '/gas-engineer-crewe' : `/areas/${slug}`;
}

export function coverageAreasForListing() {
  return coverageTowns.map((town) => ({
    id: town.slug,
    name: town.name,
    slug: town.slug,
    description: town.description,
  }));
}
