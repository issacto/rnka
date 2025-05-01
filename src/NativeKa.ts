import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  generateAndroidKeys(challengeString: string): string;
  generateIOSKeys(): Promise<string>;
  getIOSAttest(challenge: string): Promise<string>;
  getAndroidAttest(): string[];
}

export default TurboModuleRegistry.getEnforcing<Spec>('Ka');
