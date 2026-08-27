import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/ui/back-header';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const LINKS = ['GitHub', 'Feedback', 'Contributors', 'Licences'];

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + Spacing.five }]}>
      <BackHeader title="About Citizen" />

      <ThemedText type="default" style={styles.title}>
        Citizen
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
        Independent open-source civic technology prototype for Bangladesh.
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
        Not affiliated with or endorsed by the Government of Bangladesh.
      </ThemedText>

      <View style={styles.links}>
        {LINKS.map((link, index) => (
          <View
            key={link}
            style={[
              styles.linkRow,
              index !== LINKS.length - 1 && { borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth },
            ]}>
            <ThemedText type="default" themeColor="textSecondary">
              {link}
            </ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  title: {
    marginTop: Spacing.four,
    fontSize: 18,
    fontWeight: 700,
  },
  description: {
    marginTop: Spacing.two,
  },
  links: {
    marginTop: Spacing.five,
  },
  linkRow: {
    paddingVertical: Spacing.three,
  },
});
