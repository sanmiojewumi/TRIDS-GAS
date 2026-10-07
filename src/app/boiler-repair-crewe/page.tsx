import { LocalLanding, localLandingMetadata } from '@/components/seo/LocalLanding';
import { localLandings } from '@/lib/local-landings';

export const metadata = localLandingMetadata('boiler-repair-crewe');

export default function BoilerRepairCrewePage() {
  return <LocalLanding page={localLandings['boiler-repair-crewe']} />;
}
