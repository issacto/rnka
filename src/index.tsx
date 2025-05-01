import { Platform } from 'react-native';
import Ka from './NativeKa';

/**
 * Generates Android keys using the native module.
 * Requires a challenge string from the server.
 *
 * @param challenge - A unique string to be used in key generation (typically from server).
 * @returns A base64-encoded string representing the public key or related info.
 */
function generateAndroidKeys(challenge: string): string {
  return Ka.generateAndroidKeys(challenge);
}

/**
 * Generates iOS keys using the native module.
 * iOS does not require a challenge for key generation.
 *
 * @returns A Promise resolving to a base64-encoded key string or null.
 */
function generateIOSKeys(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    Ka.generateIOSKeys()
      .then((result) => {
        resolve(result); // Successfully resolve the result from native module
      })
      .catch((error) => {
        reject(error); // Propagate any error that occurs in the native call
      });
  });
}

/**
 * Cross-platform key generation function.
 * On Android, requires a challenge and delegates to `generateAndroidKeys`.
 * On iOS, calls `generateIOSKeys` without any challenge.
 *
 * @param challenge - Required on Android; optional on iOS.
 * @returns A Promise resolving to the generated key string or null on failure.
 */
export async function generateSecureKeys(
  challenge?: string
): Promise<string | null> {
  if (Platform.OS === 'android') {
    if (!challenge) {
      console.warn('Challenge is required for Android key generation.');
      return null;
    }
    try {
      return generateAndroidKeys(challenge);
    } catch (error) {
      console.error('Android key generation failed:', error);
      return null;
    }
  } else {
    try {
      return await generateIOSKeys();
    } catch (error) {
      console.error('iOS key generation failed:', error);
      return null;
    }
  }
}

/**
 * Requests attestation result from iOS device using a given challenge.
 *
 * @param challenge - A unique server-provided challenge.
 * @returns A Promise resolving to an attestation string or null on failure.
 */
function getIOSAttest(challenge: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    Ka.getIOSAttest(challenge)
      .then((result) => {
        resolve(result); // Successful attestation
      })
      .catch((error) => {
        reject(error); // Failure in native module
      });
  });
}

/**
 * Retrieves attestation results from an Android device.
 * Assumes attestation returns an array of strings (e.g., key info or certificates).
 *
 * @returns An array of attestation-related strings; empty on failure.
 */
function getAndroidAttest(): string[] {
  try {
    return Ka.getAndroidAttest();
  } catch (error) {
    console.error('Error getting Android attest:', error);
    return [];
  }
}

/**
 * Cross-platform attestation handler.
 * - Android: returns an array of attestation data.
 * - iOS: returns a single attestation string.
 *
 * @param challenge - Required challenge for iOS attestation.
 * @returns Attestation result (string, array, or null on failure).
 */
export async function getAttest(
  challenge: string
): Promise<string | string[] | null> {
  if (Platform.OS === 'android') {
    try {
      return getAndroidAttest();
    } catch (error) {
      console.error('Android attestation failed:', error);
      return null;
    }
  } else {
    try {
      return await getIOSAttest(challenge);
    } catch (error) {
      console.error('iOS attestation failed:', error);
      return null;
    }
  }
}
