import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ApplicationRow } from '@/components/ui/application-row';
import { EmptyState } from '@/components/ui/empty-state';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { applications } from '@/data/activity';
import { useTheme } from '@/hooks/use-theme';
import { ActivityGroup, ActivityKind } from '@/types/activity';

type Filter = 'all' | ActivityKind;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'application', label: 'Applications' },
  { id: 'payment', label: 'Payments' },
  { id: 'update', label: 'Updates' },
];

const GROUP_ORDER: ActivityGroup[] = ['Today', 'Yesterday', 'This Week'];

export default function ActivityScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('all');

  const filteredApplications = useMemo(
    () => (filter === 'all' ? applications : applications.filter((application) => application.kind === filter)),
    [filter],
  );

  const groups = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        items: filteredApplications.filter((application) => application.group === group),
      })).filter((entry) => entry.items.length > 0),
    [filteredApplications],
  );

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}>
      <ThemedView
        style={[
          styles.container,
          { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + BottomTabInset + Spacing.five },
        ]}>
        <ScreenHeader title="Activity" />

        <View style={styles.segmentedControl}>
          {FILTERS.map((item) => {
            const isSelected = item.id === filter;
            return (
              <Pressable
                key={item.id}
                onPress={() => setFilter(item.id)}
                style={[
                  styles.segment,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.backgroundElement,
                    borderColor: isSelected ? theme.primary : theme.border,
                  },
                ]}>
                <ThemedText
                  type="small"
                  themeColor={isSelected ? 'primaryText' : 'textSecondary'}
                  style={styles.segmentLabel}
                  numberOfLines={1}>
                  {item.label}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        {groups.length > 0 ? (
          groups.map(({ group, items }) => (
            <ThemedView key={group} style={styles.section}>
              <ThemedText type="smallBold" themeColor="textSecondary">
                {group}
              </ThemedText>
              {items.map((application, index) => (
                <ApplicationRow
                  key={application.id}
                  application={application}
                  onPress={() => router.push(`/application/${application.id}`)}
                  isLast={index === items.length - 1}
                />
              ))}
            </ThemedView>
          ))
        ) : (
          <ThemedView style={styles.section}>
            <EmptyState
              title="No active applications"
              description="When you start a service your progress will appear here."
              actionLabel="Browse Services"
              onPressAction={() => router.push('/services')}
            />
          </ThemedView>
        )}

        <ThemedText type="small" themeColor="textSecondary" style={styles.caption}>
          All data is demo and for prototype purpose only.
        </ThemedText>
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
  segmentedControl: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  segment: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  segmentLabel: {
    fontWeight: 600,
  },
  section: {
    marginTop: Spacing.five,
  },
  caption: {
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
