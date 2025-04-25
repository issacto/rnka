import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  generateKeys(challengeString: string): string;
  generateIOSKeys(): Promise<string>;
  getIOSAttest(challenge: string): Promise<string>;
  getAttestationCertificates(): string[];
}

export default TurboModuleRegistry.getEnforcing<Spec>('Ka');
