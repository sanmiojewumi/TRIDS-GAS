export const SERVICE_LANDING_BY_SLUG: Record<string, string> = {
  'boiler-repairs': '/boiler-repair-crewe',
  'boiler-servicing': '/boiler-service-crewe',
  'gas-safety-checks': '/landlord-gas-safety-crewe',
  'landlord-gas-safety-certificates': '/landlord-gas-safety-crewe',
  'central-heating-services': '/central-heating-repair-crewe',
  'gas-appliance-installation': '/gas-cooker-installation-crewe',
};

export function servicePagePath(slug: string) {
  return SERVICE_LANDING_BY_SLUG[slug] || `/services/${slug}`;
}

export const SERVICE_LANDING_REDIRECTS = Object.entries(SERVICE_LANDING_BY_SLUG).flatMap(
  ([slug, destination]) => [
    { source: `/services/${slug}`, destination, permanent: true as const },
    { source: `/services/${slug}/`, destination, permanent: true as const },
  ],
);
