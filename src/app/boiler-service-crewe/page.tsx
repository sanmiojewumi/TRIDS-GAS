import { LocalLanding, localLandingMetadata } from '@/components/seo/LocalLanding';
import { localLandings } from '@/lib/local-landings';

export const metadata = localLandingMetadata('boiler-service-crewe');

export default function BoilerServiceCrewePage() {
  return <LocalLanding page={localLandings['boiler-service-crewe']} />;
}
