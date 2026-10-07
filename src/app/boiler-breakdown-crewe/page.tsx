import { LocalLanding, localLandingMetadata } from '@/components/seo/LocalLanding';
import { localLandings } from '@/lib/local-landings';

export const metadata = localLandingMetadata('boiler-breakdown-crewe');

export default function BoilerBreakdownCrewePage() {
  return <LocalLanding page={localLandings['boiler-breakdown-crewe']} />;
}
