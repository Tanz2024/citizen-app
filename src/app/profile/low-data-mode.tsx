import { StyleSheet, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/ui/back-header';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { Spacing } from '@/constants/theme';
import { useLowDataMode } from '@/hooks/use-low-data-mode';
import { useTheme } from '@/hooks/use-theme';

const REDUCTIONS = ['Splash and screen animations are reduced.'];

export default function LowDataModeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { isLowDataMode, setLowDataMode } = useLowDataMode();

  return (
    <ThemedView
      style={[styles.container, { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + Spacing.five }]}>
      <BackHeader title="Low Data Mode" />

      <View style={[styles.toggleRow, { borderColor: theme.border }]}>
        <View style={styles.toggleTextWrap}>
          <ThemedText type="default">Low Data Mode</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Reduce data and battery use on slow connections
          </ThemedText>
        </View>
        <Switch
          value={isLowDataMode}
          onValueChange={setLowDataMode}
          trackColor={{ true: theme.primary }}
        />
      </View>

      <ThemedText type="smallBold" style={styles.sectionLabel}>
        What this changes
      </ThemedText>
      <View style={styles.list}>
        {REDUCTIONS.map((line) => (
          <View key={line} style={styles.bulletRow}>
            <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.bulletText}>
              {line}
            </ThemedText>
          </View>
        ))}
      </View>

      <ThemedText type="small" themeColor="textSecondary" style={styles.note}>
        Citizen is currently a prototype with no live network requests to reduce. This setting
        is being built out ahead of the real service data and AI features.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    marginTop: Spacing.four,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: Spacing.three,
  },
  toggleTextWrap: {
    flex: 1,
    gap: 2,
  },
  sectionLabel: {
    marginTop: Spacing.five,
  },
  list: {
    marginTop: Spacing.two,
    gap: Spacing.two,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
  },
  note: {
    marginTop: Spacing.five,
    lineHeight: 18,
  },
});
