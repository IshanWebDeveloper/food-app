# Food App

A modern React Native food ordering app built with Expo, TypeScript, React Query, and NativeWind.  
Supports authentication, browsing foods, favorites, order flow, and payment.

---

## Features

- **Authentication:** Sign up, sign in, sign out, session persistence, and token refresh.
- **Food Browsing:** View all foods, filter by category, search, and view details.
- **Favorites:** Add/remove foods to your favorites.
- **Order Flow:** Cart, order summary, payment method selection, and order confirmation.
- **Profile:** Edit profile, view delivery address, and manage account.
- **UI:** Responsive, modern design using NativeWind and custom components.
- **API:** All data is fetched from a REST API with secure token handling.

---

## Tech Stack

- [Expo](https://expo.dev/) (React Native)
- [TypeScript](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/query/latest)
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- [React Navigation](https://reactnavigation.org/) (via Expo Router)
- [React Native Paper](https://callstack.github.io/react-native-paper/) (UI components)
- [Axios](https://axios-http.com/) (API requests)
- [Zod](https://zod.dev/) (Validation)

---

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- Yarn or npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/IshanWebDeveloper/food-app.git
   cd food-app
   ```

2. **Install dependencies:**

   ```sh
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root:

   ```
   EXPO_PUBLIC_API_URL=https://your-api-url.com
   EXPO_PUBLIC_TAX_RATE=0.07
   EXPO_PUBLIC_DELIVERY_FEE=5.00
   ```

4. **Start the Expo app:**
   ```sh
   npx expo start
   ```

---

## Project Structure

```
.
├── app/                # App screens and navigation (Expo Router)
│   ├── (auth)/         # Auth screens (sign-in, sign-up, welcome)
│   ├── (protected)/    # Protected screens (tabs, food details, order, etc.)
│   └── _layout.tsx     # Root layout
├── components/         # Reusable UI components
├── hooks/              # Custom hooks (API, state, etc.)
├── context/            # React context providers (auth, etc.)
├── lib/                # API clients, utilities
├── api/                # API endpoint constants
├── assets/             # Images and static assets
├── constants/          # App-wide constants
├── types/              # TypeScript types
└── ...
```

---

## API

- All endpoints are defined in [`api/api-endpoints.ts`](api/api-endpoints.ts).
- Auth and data fetching handled via [`lib/axios.ts`](lib/axios.ts) with automatic token refresh.

---

## Customization

- **UI:** Edit or add components in `components/` and use NativeWind classes for styling.
- **API:** Update endpoints in `api/api-endpoints.ts` as needed.
- **Auth:** Auth logic is in `context/authContext.tsx` and `hooks/useAuthStore.ts`.

---

## Scripts

- `yarn start` / `npm start` — Start Expo dev server
- `yarn android` / `npm run android` — Run on Android
- `yarn ios` / `npm run ios` — Run on iOS
- `yarn web` / `npm run web` — Run on web

---

## License

MIT

---

## Credits

- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
