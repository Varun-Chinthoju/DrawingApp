# DrawingApp (React Native Procreate‑like App)

## Overview
A premium‑looking drawing application for iOS/Android built with **React Native**. It provides:
- Freehand drawing with pressure‑sensitive strokes
- Brush controls (color, size, opacity)
- Undo / Redo stack
- Export to PNG
- Dark‑mode UI with glass‑morphism toolbar

## Prerequisites
- macOS with Xcode (for iOS) or Android Studio (for Android)
- Node.js (>=18) and npm (or yarn/pnpm)
- CocoaPods (`sudo gem install cocoapods`) for iOS

## Getting Started
```bash
# Clone the repository (if not already)
git clone <YOUR_REPO_URL>
cd DrawingApp

# Install dependencies
npm install
# iOS only – install pods
cd ios && pod install && cd ..

# Run on iOS simulator
npx react-native run-ios
# Or run on Android emulator
npx react-native run-android
```

## Development
- **Canvas** component located at `src/components/Canvas.tsx`
- **Toolbar** component at `src/components/Toolbar.tsx`
- Adjust brush settings via the toolbar; undo/redo/export are exposed through a ref.

## Building for Production
```bash
# iOS
npx react-native run-ios --configuration Release
# Android
npx react-native run-android --variant=release
```

## License
MIT © 2025 Your Name
