/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1D1D1F',
    background: '#F7F8F9',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E6F4EC',
    textSecondary: '#5C6167',
    border: '#E4E6E8',
    primary: '#006A4E',
    primaryText: '#FFFFFF',
    accent: '#D93025',
    accentSoft: '#FBE9E7',
    success: '#006A4E',
    successSoft: '#E6F4EC',
    warning: '#B4690E',
    warningSoft: '#FCEFDD',
  },
  dark: {
    text: '#F2F1EE',
    background: '#121412',
    backgroundElement: '#1C1F1D',
    backgroundSelected: '#1E332C',
    textSecondary: '#A7ACA9',
    border: '#2B2E2B',
    primary: '#3FA382',
    primaryText: '#04140E',
    accent: '#EF6154',
    accentSoft: '#331A1E',
    success: '#3FA382',
    successSoft: '#16302A',
    warning: '#E0A94C',
    warningSoft: '#312512',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const CategoryTints = {
  business: '#006A4E',
  family: '#D93025',
  travel: '#2E6BD6',
  transport: '#B4690E',
  land: '#1D8A7A',
  tax: '#C7A008',
} as const;

export type CategoryTint = keyof typeof CategoryTints;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const Radius = {
  small: 8,
  medium: 12,
  large: 16,
  pill: 999,
} as const;
