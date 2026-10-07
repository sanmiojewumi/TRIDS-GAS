import { LocalLanding, localLandingMetadata } from '@/components/seo/LocalLanding';
import { localLandings } from '@/lib/local-landings';

export const metadata = localLandingMetadata('landlord-gas-safety-crewe');

export default function LandlordGasSafetyCrewePage() {
  return <LocalLanding page={localLandings['landlord-gas-safety-crewe']} />;
}
