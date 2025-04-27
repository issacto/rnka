import Ka from './NativeKa';

export function multiply(a: number, b: number): number {
  return Ka.multiply(a, b);
}

export function generateKeys(challenge: string): string {
  return Ka.generateKeys(challenge);
}

export function generateIOSKeys(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    Ka.generateIOSKeys()
      .then((result) => {
        console.log('result', result);
        resolve(result); // Resolve the promise with the result
      })
      .catch((error) => {
        reject(error); // Reject the promise if there's an error
      });
  });
}

export function getIOSAttest(challenge: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    Ka.getIOSAttest(challenge)
      .then((result) => {
        console.log('result', result);
        resolve(result); // Resolve the promise with the result
      })
      .catch((error) => {
        reject(error); // Reject the promise if there's an error
      });
  });
}

export function getAttestationCertificates(): string[] {
  return Ka.getAttestationCertificates();
}
