import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import type { SFSymbol } from 'sf-symbols-typescript';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

type TabDef = {
  name: string;
  label: string;
  sf: SFSymbol;
};

const tabs: TabDef[] = [
  { name: 'index', label: 'Home', sf: 'house' },
  { name: 'services', label: 'Services', sf: 'square.grid.2x2' },
  { name: 'wallet', label: 'Wallet', sf: 'wallet.pass' },
  { name: 'activity', label: 'Activity', sf: 'clock.arrow.circlepath' },
  { name: 'profile', label: 'Profile', sf: 'person' },
];

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundSelected}
      tintColor={colors.primary}
      iconColor={{ default: colors.textSecondary, selected: colors.primary }}
      labelStyle={{ selected: { color: colors.primary } }}>
      {tabs.map((tab) => (
        <NativeTabs.Trigger key={tab.name} name={tab.name}>
          <Label>{tab.label}</Label>
          <Icon sf={tab.sf} />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
