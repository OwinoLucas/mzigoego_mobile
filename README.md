# Expo Boilerplate

<p align="center">
  <b>Modern, scalable, and developer-friendly Expo (React Native) boilerplate with TypeScript, NativeWind, and best practices.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo SDK-53-blue" />
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## ✨ Overview

This boilerplate provides a robust foundation for building cross-platform mobile applications using Expo and React Native. It is designed for rapid development, scalability, and maintainability, featuring:

- **File-based routing** with `expo-router`
- **TypeScript** with strict type safety
- **NativeWind** for Tailwind CSS utility classes in React Native
- **Custom hooks and utilities** for common patterns
- **SVG icon system** with automated conversion
- **Secure storage helpers**
- **Pre-configured ESLint, Prettier, and Tailwind**

---

## 🚀 Quick Start

For experienced developers:

```bash
# Install dependencies
yarn install # or npm install

# Start the development server
yarn start   # or npx expo start
```

---

## 📁 Project Structure

```
expo-boilerplate/
├── assets/             # Images, icons, splash, etc.
│   └── icons/          # SVG icon files for automated conversion
├── src/
│   ├── components/     # Reusable UI components
│   │   └── Icons/      # SVG icon components (e.g., ExpoIcon)
│   ├── hooks/          # Custom React hooks
│   ├── routes/         # App screens & layouts (file-based routing)
│   ├── utils/          # Utility functions (e.g., secure-store, classnames)
│   └── global.css      # TailwindCSS directives for NativeWind
├── app.json            # Expo app configuration
├── package.json        # Dependencies & scripts
├── tailwind.config.js  # Tailwind/NativeWind config
├── metro.config.js     # Metro bundler config
├── tsconfig.json       # TypeScript config
└── ...
```

---

## 🛠️ Key Features

- **Expo**: Leverage the latest Expo SDK for seamless cross-platform development
- **TypeScript**: Strict, type-safe codebase for reliability
- **NativeWind**: Tailwind CSS utility classes for React Native
- **expo-router**: Effortless file-based navigation
- **SVG Icon System**: Automated SVG-to-component workflow
- **Secure Storage**: Easy helpers for sensitive data
- **Custom Hooks & Utilities**: For common patterns and DRY code
- **Pre-configured Tooling**: ESLint, Prettier, Tailwind plugin

---

## ⚡ Getting Started

1. **Install dependencies**

   ```bash
   yarn install # or npm install
   ```

2. **Start the development server**

   ```bash
   yarn start   # or npx expo start
   ```

   - Open in Expo Go, Android/iOS simulator, or web browser.

3. **Edit your app**
   - Main code is in `src/`.
   - Routing is handled by files in `src/routes/`.

---

## 📜 Scripts

- `yarn start` / `npm start` — Start Expo dev server
- `yarn android` / `npm run android` — Run on Android
- `yarn ios` / `npm run ios` — Run on iOS
- `yarn web` / `npm run web` — Run on web
- `yarn lint` / `npm run lint` — Lint code
- `yarn generate-icons` / `npm run generate-icons` — Convert SVGs in `assets/icons` to React components

---

## 🧩 Technologies Used

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [NativeWind](https://www.nativewind.dev/)
- [expo-router](https://docs.expo.dev/router/introduction/)
- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)

---

## 🧰 Custom Utilities & Hooks

### `src/utils/secure-store.ts`

Helpers for securely storing, retrieving, and removing string or JSON data using Expo Secure Store.

- `storeData`, `storeJsonData`, `getData`, `getJsonData`, `removeItem`

### `src/utils/classnames.ts`

Utility to combine and merge class names using `clsx` and `tailwind-merge`.

- `cn(...inputs)`

### `src/utils/switch-case.tsx`

React components for declarative conditional rendering:

- `<Switch>`, `<Case>`, `<Default>`

### `src/hooks/useStyledComponent.tsx`

Custom hook and component for applying NativeWind styles to any component.

- `useStyledComponent(component)`
- `<StyledComponent component={...} className="..." />`

---

## 🎨 Styling

- Uses [NativeWind](https://www.nativewind.dev/) for Tailwind-style utility classes in React Native.
- Global Tailwind directives in `src/global.css`.
- Custom config in `tailwind.config.js`.
- Metro and Babel configured for NativeWind.

---

## 🖼️ SVG Icon System

- Place SVGs in `assets/icons/`.
- Run `yarn generate-icons` (or `npm run generate-icons`) to convert them to React components in `src/components/Icons/`.
- Import and use: `import { ExpoIcon } from '@/components/Icons'` or `Icons.ExpoIcon` via barrel export.

### SVG Generation Configuration

- **.svgrrc.js**: Configuration for [SVGR](https://react-svgr.com/docs/cli/), which converts SVG files to React Native components. This config:
  - Enables TypeScript, React Native, and memoization.
  - Uses custom SVGO settings (see below).
  - Replaces `#000` with `currentColor` for easy theming.
  - Disables dimension, title, and desc props for cleaner output.
- **svgo.config.js**: Customizes [SVGO](https://github.com/svg/svgo) optimization, e.g., removing unnecessary SVG attributes for smaller, cleaner components.

---

## 📄 TypeScript Environment Declarations

- **expo-env.d.ts**: Ensures Expo types are available globally. Should not be edited manually.
- **nativewind-env.d.ts**: Ensures NativeWind types are available globally.

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository and create your branch from `main`.
2. Install dependencies: `yarn install` or `npm install`.
3. Make your changes (add tests if possible).
4. Lint & format: `yarn lint` or `npm run lint`.
5. Open a Pull Request with a clear description of your changes.

---

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Docs](https://www.nativewind.dev/)
- [expo-router Docs](https://docs.expo.dev/router/introduction/)

---

## License

This project is licensed under the MIT License.
