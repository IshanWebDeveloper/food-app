# Food App

A modern React Native food ordering app built with Expo, TypeScript, React Query, and NativeWind. It supports authentication, browsing foods, favorites, an order flow, and basic payment UX.

---

## Features

- Authentication: email/password, Google OAuth, sign out, session persistence, and access/refresh token rotation
- Food browsing: list, category filters, search, details
- Favorites: add/remove and check favorite state
- Order flow: cart summary, taxes, delivery fee, payment method selection, confirmation screen
- Profile: edit profile and account management hooks
- UI/UX: NativeWind (Tailwind for RN) + custom components, responsive layout
- API: REST API integration via Axios with automatic token refresh and 401 handling

---

## Tech Stack

- Expo (React Native) + Expo Router
- TypeScript
- TanStack React Query v5
- NativeWind (Tailwind CSS for RN)
- React Native Paper
- Axios
- Firebase Auth (native RN SDK)
- Zod, Zustand

---

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm (or pnpm)
- Android Studio (for Android emulator) or a device with USB debugging
- Expo CLI (installed automatically via npx, or install globally if you prefer)

### Install

1. Clone and install deps

```sh
git clone https://github.com/IshanWebDeveloper/food-app.git
cd food-app
yarn install # or: npm install / pnpm install
```

1. Create an .env file in the project root

These are read via `process.env.EXPO_PUBLIC_*` at runtime by Expo. Values prefixed with EXPO*PUBLIC* are automatically embedded in the client at build time.

```env
# Backend API
EXPO_PUBLIC_API_URL=https://your-api-url.com

# Order totals (used in order screen UI)
EXPO_PUBLIC_TAX_RATE=0.07
EXPO_PUBLIC_DELIVERY_FEE=5.00


```

1. Configure Firebase + Google Sign-In (Android)

- Create a Firebase project and enable Email/Password and Google providers
- Add an Android app in Firebase with your applicationId: `com.ishan.foodapp` (see `android/app/build.gradle`)
- Add your SHA-1 debug and release fingerprints in the Firebase console
- Download the generated `google-services.json` and place it at `android/app/google-services.json` (already present here for reference—replace with your own)
- The app uses the native Firebase Auth SDK with React Native persistence (see `lib/firebase-config.ts`) and `@react-native-google-signin/google-signin` (see `hooks/use-google-signin.ts`)

1. Run the app

Local development with the Expo dev client:

```sh
npx expo prebuild           # one-time (or when native deps change)
npx expo run:android        # installs the dev client and runs on emulator/device
```

Alternatively, start the Metro bundler for web/Expo Go testing (limited native capabilities):

```sh
npx expo start
```

---

## Scripts

- `yarn start` / `npm start` — Start Expo dev server (Metro bundler)
- `yarn android` / `npm run android` — Build & run Android (requires prebuild/dev client)
- `yarn ios` / `npm run ios` — Build & run iOS (on macOS)
- `yarn test` — Run unit tests (Jest + jest-expo)
- `yarn lint` — Lint the project (ESLint)
- `yarn reset-project` — Clean common caches (see `scripts/reset-project.js`)

---

## Project Structure

```text
.
├── app/                # Screens & routing (Expo Router)
│   ├── (protected)/    # Authenticated area: tabs, dish details, order
│   └── _layout.tsx     # Root layout: fonts, providers, splash control
├── api/                # Endpoint constants (uses EXPO_PUBLIC_API_URL)
├── components/         # Reusable UI components
├── context/            # Auth context & session handling
├── hooks/              # Queries, mutations, UI hooks, Google Sign-In
├── lib/                # Axios client, Firebase config, storage utils
├── assets/             # Images, fonts
├── constants/          # Query keys and global constants
├── types/              # Shared TypeScript types
└── scripts/            # Dev utilities
```

---

## Environment & Configuration

- API base URL, tax rate, and delivery fee are read from `.env`
- Firebase config is read from `.env` and initialized in `lib/firebase-config.ts`
- Axios (`lib/axios.ts`) attaches the access token, handles 401, and refreshes tokens via `ENDPOINTS.AUTH.REFRESH_TOKEN`
- Endpoints are defined in `api/api-endpoints.ts` and are expected to exist on your backend

---

## Testing & Linting

- Unit tests: Jest (preset `jest-expo`)
- Linting: ESLint (with Expo and TanStack Query plugin)

```sh
yarn test
yarn lint
```

---

## Troubleshooting

- Android build fails after adding/removing native deps: run `npx expo prebuild` again, then `yarn android`
- Stale caches (Metro/Gradle/Watchman): use `yarn reset-project`
- Google Sign-In errors: verify SHA-1 in Firebase, package name (`com.ishan.foodapp`), and that `android/app/google-services.json` matches your Firebase project
- 401 loops: ensure your backend implements refresh token endpoint at `ENDPOINTS.AUTH.REFRESH_TOKEN`

---

## API

- All endpoints are defined in [`api/api-endpoints.ts`](api/api-endpoints.ts)
- Network client with token refresh lives in [`lib/axios.ts`](lib/axios.ts)

---

## Customization

- UI: modify or add components in `components/` and style with NativeWind classes
- API: adjust `api/api-endpoints.ts` to match your backend
- Auth: see `context/authContext.tsx`, `hooks/useAuthStore.ts`, and `hooks/api/auth/*`

---

## License

MIT

---

## Credits

- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
