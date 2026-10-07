import { LocalLanding, localLandingMetadata } from '@/components/seo/LocalLanding';
import { localLandings } from '@/lib/local-landings';

export const metadata = localLandingMetadata('gas-engineer-crewe');

export default function GasEngineerCrewePage() {
  return <LocalLanding page={localLandings['gas-engineer-crewe']} />;
}
