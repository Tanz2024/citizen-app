import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/ui/back-header';
import { SectionHeader } from '@/components/ui/section-header';
import { SourceLabel } from '@/components/ui/source-label';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, Radius, Spacing } from '@/constants/theme';
import { feeTransparencyData } from '@/data/fee-transparency';
import { useTheme } from '@/hooks/use-theme';

function formatTaka(amount: number) {
  return `৳${amount.toLocaleString('en-US')}`;
}

export default function FeeTransparencyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const data = feeTransparencyData[id ?? ''];

  if (!data) {
    return (
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.three }]}>
        <BackHeader title="Fee Transparency" />
        <ThemedText type="default" style={styles.notFound}>
          Fee comparison isn&apos;t available for this service yet.
        </ThemedText>
      </ThemedView>
    );
  }

  const difference = data.communityTotal - data.officialTotal;

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + BottomTabInset + Spacing.five }}>
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.two }]}>
        <BackHeader title="Fee Transparency" />

        <ThemedView style={styles.section}>
          <ThemedText type="small" themeColor="textSecondary">
            {data.title}
          </ThemedText>
          <ThemedText type="default" style={styles.pageTitle}>
            Fee comparison
          </ThemedText>
        </ThemedView>

        <View style={styles.totalsRow}>
          <View style={[styles.totalCard, { borderColor: theme.border }]}>
            <SourceLabel variant="official" />
            <ThemedText type="default" style={styles.totalAmount}>
              {formatTaka(data.officialTotal)}
            </ThemedText>
          </View>
          <View style={[styles.totalCard, { borderColor: theme.accent }]}>
            <SourceLabel variant="community" />
            <ThemedText type="default" style={[styles.totalAmount, { color: theme.accent }]}>
              {formatTaka(data.communityTotal)}
            </ThemedText>
          </View>
        </View>

        <ThemedView style={styles.section}>
          <SectionHeader label="Fee breakdown" />
          {data.breakdown.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.breakdownRow,
                index !== data.breakdown.length - 1 && {
                  borderBottomColor: theme.border,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              ]}>
              <ThemedText type="small" style={styles.breakdownLabel}>
                {item.label}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {formatTaka(item.officialAmount)}
              </ThemedText>
              <ThemedText type="small" style={{ color: theme.accent }}>
                {formatTaka(item.communityAmount)}
              </ThemedText>
            </View>
          ))}
        </ThemedView>

        <ThemedView style={[styles.summary, { backgroundColor: theme.accentSoft }]}>
          <ThemedText type="smallBold" style={{ color: theme.accent }}>
            Community reports run {formatTaka(difference)} higher on average
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.summaryText}>
            Based on {data.reportCount} community-submitted reports. Figures are unverified and shown to
            highlight where people commonly report paying more than the official fee.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <SectionHeader label="How to avoid extra payments" />
          <View style={styles.tips}>
            {data.tips.map((tip) => (
              <View key={tip} style={styles.tipRow}>
                <View style={[styles.tipBullet, { backgroundColor: theme.primary }]} />
                <ThemedText type="small" themeColor="textSecondary" style={styles.tipText}>
                  {tip}
                </ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: Spacing.four,
  },
  notFound: {
    marginTop: Spacing.four,
  },
  section: {
    marginTop: Spacing.five,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 2,
  },
  totalsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  totalCard: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.large,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 700,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two + 2,
  },
  breakdownLabel: {
    flex: 1,
  },
  summary: {
    marginTop: Spacing.five,
    borderRadius: Radius.large,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  summaryText: {
    marginTop: Spacing.one,
  },
  tips: {
    marginTop: Spacing.two,
    gap: Spacing.two,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
  },
  tipText: {
    flex: 1,
  },
});
