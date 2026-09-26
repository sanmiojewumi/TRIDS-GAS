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

export const primarySeoAreas = coverageTowns.filter((town) => town.miles <= 30).map((town) => town.name);

export function areaSeoTitle(name: string): string {
  return `Gas Engineer in ${name} | Boiler Repair & Plumbing | TRIDS Crewe`;
}

export function areaSeoDescription(name: string, description: string): string {
  return `${description} Book a Gas Safe registered engineer from TRIDS Gas & Plumbing in Crewe.`;
}
