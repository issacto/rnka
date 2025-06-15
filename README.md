# React Native Key Attestation

[![npm version](https://badge.fury.io/js/react-native-key-attestation.svg)](https://www.npmjs.com/package/react-native-key-attestation)
![Platform Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue)

A React Native library that provides secure key generation and hardware-backed key attestation capabilities for both Android and iOS. This package leverages the native security features of each platform to ensure the integrity and trustworthiness of cryptographic keys generated on the device.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API](#api)
  - [`generateSecureKeys(challenge?: string): Promise<string | null>`](#generatesecurekeyschallenge-string-promisestring--null)
  - [`getAttest(challenge: string): Promise<string | string[] | null>`](#getattestchallenge-string-promisestring--string---null)
- [License](#license)

## Features

- **Secure Key Generation:** Generates cryptographic keys using platform-specific secure hardware (e.g., Android Keystore, Secure Enclave on iOS).
- **Hardware-Backed Attestation:** Verifies the integrity of the generated keys and the device they reside on, providing cryptographic proof that the keys were generated and are protected by the device's hardware.
- **Cross-Platform API:** Offers a consistent JavaScript API for both Android and iOS, simplifying integration into your React Native applications.
- **Challenge-Based Security:** Supports server-provided challenges to enhance the security of the key generation and attestation processes.

## Installation

```bash
npm install rn-key-attestation
# or
yarn add rn-key-attestation
```

## API

### `generateSecureKeys(challenge?: string): Promise<string | null>`

Generates secure keys on the device.

- **`challenge?` (string):** A unique string from the server, required for Android. Optional for iOS.
- **Returns:** A Promise resolving to a base64-encoded key string on success, or `null` on failure.

### `getAttest(challenge: string): Promise<string | string[] | null>`

Retrieves attestation results from the device.

- **`challenge` (string):** A unique string from the server, required for iOS. Used internally on Android.
- **Returns:** A Promise resolving to:
  - A string containing the attestation result on iOS.
  - An array of strings with attestation data on Android.
  - `null` on failure.

## License

[MIT License](https://opensource.org/licenses/MIT)
