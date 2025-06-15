# React Native Android & iOS Key Attestation Demo App




https://github.com/user-attachments/assets/5b0288a5-c734-4031-942e-a9d052889307


## What This App Can Do

- **Signup & Login:**  
  Users can create an account and log in with username and password.

- **Dynamic and Static Content:**  
  Explore static and dynamic content pages.

- **Android & iOS Key Attestation:**  
  After login, the app generates a secure key pair and attestation certificate using the device's secure hardware (only works on real devices, not simulators/emulators).

- **Attestation Verification:**  
  The attestation certificate is sent to a backend server for verification, ensuring the request is from a genuine device.

- **Secure Flow:**  
  The backend only trusts requests from devices whose keys are stored in secure storage.

- **Modern UI:**  
  All screens use a clean, card-based layout for a better user experience.

## How it Works

1. **Signup:**

   - Enter a username and password to create an account.

2. **Login:**

   - Enter your credentials to log in.
   - On success, the backend returns an access token and a challenge.

3. **Key Attestation:**

   - The app generates a key pair and attestation certificate using the challenge.
   - The certificate is sent to the backend for verification (`/android_attestation/verify` on Android, `/ios_attestation/verify` on iOS).

4. **Attestation Success:**
   - If verification succeeds, you see a confirmation that you are logged in and the backend trusts your device.

## Requirements

- Node.js, npm/yarn
- React Native CLI
- Android Studio or Xcode (for emulators/simulators)
- A backend server that implements the `/auth/signup`, `/login`, `/android_attestation/verify`, and `/ios_attestation/verify` endpoints

> **Note:** Key attestation only works on real Android and iOS devices, not on emulators/simulators.

## Getting Started

### 1. Install dependencies

```sh
npm install
# or
yarn install
```

### 2. Start Metro

```sh
npm start
# or
yarn start
```

### 3. Run the app

#### Android

```sh
npm run android
# or
yarn android
```

#### iOS

```sh
npm run ios
# or
yarn ios
```

### 4. Configure Backend URL

Edit `src/constants.ts` and set your backend URL:

```ts
export const BACKEND_URL = 'http://YOUR_BACKEND_IP:PORT';
```

## Screens

- **Menu:** Entry point, choose static or dynamic content.
- **Static Content:** Demo of key generation and attestation.
- **Dynamic Content:** Signup and login flow.
- **Signup:** Create a new account.
- **Login:** Authenticate and receive attestation challenge.
- **Token:** View access token and challenge, generate and send attestation (Android/iOS).
- **Attestation Success:** Confirmation of secure login.

## Troubleshooting

- If you see network errors, make sure your backend is running and accessible from your device/emulator.
- For Android emulators, use `10.0.2.2` as the backend IP.
- Key attestation will not work on emulators or simulators.

## Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Android Key Attestation](https://developer.android.com/training/articles/security-key-attestation)
- [Apple DeviceCheck & Attestation](https://developer.apple.com/documentation/devicecheck/validating_apps_that_connect_to_your_server)

---

**Enjoy using secure authentication with Android & iOS Key Attestation!**
