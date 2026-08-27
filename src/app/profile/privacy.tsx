import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/ui/back-header';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { Spacing } from '@/constants/theme';

const PARAGRAPHS = [
  'Citizen is an independent prototype.',
  'Prototype data may be stored locally on your device during development.',
  'No official government identity integration currently exists.',
  'AI features may eventually send your questions to an AI service to generate an answer.',
];

export default function PrivacyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + Spacing.five }]}>
      <BackHeader title="Privacy" />
      <ThemedView style={styles.list}>
        {PARAGRAPHS.map((paragraph) => (
          <ThemedText key={paragraph} type="default" style={styles.paragraph}>
            {paragraph}
          </ThemedText>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  list: {
    marginTop: Spacing.four,
    gap: Spacing.three,
  },
  paragraph: {
    lineHeight: 22,
  },
});
