import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ApplicationTimeline } from '@/components/ui/application-timeline';
import { BackHeader } from '@/components/ui/back-header';
import { MetadataRow } from '@/components/ui/metadata-row';
import { SectionHeader } from '@/components/ui/section-header';
import { SourceLabel } from '@/components/ui/source-label';
import { StatusBadge } from '@/components/ui/status-badge';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { applications } from '@/data/activity';
import { useTheme } from '@/hooks/use-theme';

export default function ApplicationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const application = applications.find((item) => item.id === id);

  if (!application) {
    return (
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.three }]}>
        <BackHeader title="Application" />
        <ThemedText type="default" style={styles.notFound}>
          This application could not be found.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}>
      <ThemedView
        style={[
          styles.container,
          { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + BottomTabInset + Spacing.five },
        ]}>
        <BackHeader title={application.title} />

        <ThemedView style={styles.section}>
          <StatusBadge label={application.statusLabel} tone="progress" />
          <SourceLabel variant="demo" />
        </ThemedView>

        {application.submittedDate ? (
          <ThemedView style={styles.section}>
            <MetadataRow label="Submitted" value={application.submittedDate} isLast />
          </ThemedView>
        ) : null}

        {application.timeline ? (
          <ThemedView style={styles.section}>
            <SectionHeader label="Progress" />
            <ApplicationTimeline steps={application.timeline} />
          </ThemedView>
        ) : null}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
    paddingHorizontal: Spacing.four,
  },
  notFound: {
    marginTop: Spacing.four,
  },
  section: {
    marginTop: Spacing.five,
    gap: Spacing.two,
  },
});
