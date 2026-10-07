import { LocalLanding, localLandingMetadata } from '@/components/seo/LocalLanding';
import { localLandings } from '@/lib/local-landings';

export const metadata = localLandingMetadata('central-heating-repair-crewe');

export default function CentralHeatingRepairCrewePage() {
  return <LocalLanding page={localLandings['central-heating-repair-crewe']} />;
}
