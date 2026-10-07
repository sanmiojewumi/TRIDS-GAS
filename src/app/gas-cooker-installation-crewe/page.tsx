import { LocalLanding, localLandingMetadata } from '@/components/seo/LocalLanding';
import { localLandings } from '@/lib/local-landings';

export const metadata = localLandingMetadata('gas-cooker-installation-crewe');

export default function GasCookerInstallationCrewePage() {
  return <LocalLanding page={localLandings['gas-cooker-installation-crewe']} />;
}
