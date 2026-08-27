import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/ui/back-header';
import { Icon, IconName } from '@/components/ui/icon';
import { StatusBadge } from '@/components/ui/status-badge';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { services } from '@/data/services';
import { useTheme } from '@/hooks/use-theme';

function InfoRow({
  icon,
  label,
  value,
  isLast,
}: {
  icon: IconName;
  label: string;
  value: string;
  isLast?: boolean;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.infoRow,
        !isLast && { borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth },
      ]}>
      <View style={[styles.infoIconWrap, { backgroundColor: theme.successSoft }]}>
        <Icon name={icon} color={theme.primary} size={16} />
      </View>
      <View style={styles.infoTextWrap}>
        <ThemedText type="small" themeColor="textSecondary">
          {label}
        </ThemedText>
        <ThemedText type="default" style={styles.infoValue}>
          {value}
        </ThemedText>
      </View>
    </View>
  );
}

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  const [stepsOpen, setStepsOpen] = useState(true);

  const service = services.find((item) => item.id === id);

  if (!service) {
    return (
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.three }]}>
        <BackHeader title="Service" />
        <ThemedText type="default" style={styles.notFound}>
          This service could not be found.
        </ThemedText>
      </ThemedView>
    );
  }

  const hasDetail = Boolean(service.steps && service.steps.length);

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}>
      <ThemedView
        style={[
          styles.container,
          { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + BottomTabInset + Spacing.five },
        ]}>
        <View style={styles.headerRow}>
          <View style={styles.headerBack}>
            <BackHeader title={service.label} />
          </View>
          <Pressable
            onPress={() => Share.share({ message: `${service.label} — Citizen (prototype, demo data)` })}
            hitSlop={8}
            style={styles.shareButton}>
            <Icon name="share" color={theme.text} size={18} />
          </Pressable>
        </View>

        <View style={styles.badgeRow}>
          <StatusBadge label="Demo Service" tone="neutral" />
          {service.lastVerified ? (
            <ThemedText type="small" themeColor="textSecondary" style={styles.lastVerified}>
              Last verified {service.lastVerified}
            </ThemedText>
          ) : null}
        </View>

        <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
          {service.subtitle ?? service.description}
        </ThemedText>

        {hasDetail ? (
          <>
            <ThemedView style={styles.infoCard}>
              <InfoRow icon="clock" label="Processing Time" value={service.processingTime ?? 'N/A'} />
              <InfoRow icon="creditCard" label="Official Fee (Demo)" value={service.officialFee ?? 'N/A'} />
              <InfoRow
                icon="mapPin"
                label="Where to Apply"
                value={service.onlineAvailable ? 'Online' : (service.whereToApply ?? 'N/A')}
              />
              <InfoRow icon="info" label="Official Source" value="Not verified (demo)" isLast />
            </ThemedView>

            <ThemedView style={styles.section}>
              <Pressable
                onPress={() => setRequirementsOpen((value) => !value)}
                style={styles.collapsibleHeader}>
                <ThemedText type="smallBold">Requirements</ThemedText>
                <Icon name={requirementsOpen ? 'chevronUp' : 'chevronDown'} color={theme.textSecondary} size={16} />
              </Pressable>
              {requirementsOpen &&
                service.documents!.map((doc) => (
                  <View key={doc.id} style={styles.docRow}>
                    <Icon name="document" color={theme.textSecondary} size={16} />
                    <ThemedText type="small">{doc.label}</ThemedText>
                  </View>
                ))}
            </ThemedView>

            <ThemedView style={styles.section}>
              <Pressable onPress={() => setStepsOpen((value) => !value)} style={styles.collapsibleHeader}>
                <ThemedText type="smallBold">Steps</ThemedText>
                <Icon name={stepsOpen ? 'chevronUp' : 'chevronDown'} color={theme.textSecondary} size={16} />
              </Pressable>
              {stepsOpen && (
                <View style={styles.steps}>
                  {service.steps!.map((step, index) => (
                    <View key={step.id} style={styles.stepRow}>
                      <View style={styles.stepMarkerColumn}>
                        <View style={[styles.stepIndex, { backgroundColor: theme.primary }]}>
                          <ThemedText type="small" themeColor="primaryText" style={styles.stepIndexText}>
                            {index + 1}
                          </ThemedText>
                        </View>
                        {index !== service.steps!.length - 1 && (
                          <View style={[styles.stepLine, { backgroundColor: theme.border }]} />
                        )}
                      </View>
                      <View style={styles.stepTextWrap}>
                        <ThemedText type="default">{step.title}</ThemedText>
                        <ThemedText type="small" themeColor="textSecondary">
                          {step.description}
                        </ThemedText>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ThemedView>
          </>
        ) : (
          <ThemedView style={styles.section}>
            {service.estimatedTime ? (
              <ThemedView style={styles.infoCard}>
                <InfoRow icon="clock" label="Estimated Time" value={service.estimatedTime} isLast />
              </ThemedView>
            ) : null}
            {!service.hasWizard && (
              <ThemedText type="small" themeColor="textSecondary" style={styles.comingSoon}>
                Full step-by-step details for this service are coming soon.
              </ThemedText>
            )}
          </ThemedView>
        )}

        <ThemedView style={styles.section}>
          <Pressable
            onPress={() => router.push('/assistant')}
            style={({ pressed }) => [styles.assistantRow, { borderColor: theme.border, opacity: pressed ? 0.6 : 1 }]}>
            <Icon name="sparkle" color={theme.primary} size={16} weight="fill" />
            <View style={styles.assistantTextWrap}>
              <ThemedText type="smallBold">Ask Citizen Assistant</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Get help about this service
              </ThemedText>
            </View>
            <Icon name="chevronRight" color={theme.textSecondary} size={14} />
          </Pressable>
        </ThemedView>

        {service.hasWizard && (
          <ThemedView style={styles.section}>
            <Pressable
              onPress={() => router.push(`/wizard/${service.id}`)}
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
              ]}>
              <ThemedText type="default" themeColor="primaryText" style={styles.primaryButtonLabel}>
                Start Application
              </ThemedText>
            </Pressable>
            {service.hasFeeTransparency && (
              <Pressable
                onPress={() => router.push(`/fee-transparency/${service.id}`)}
                style={({ pressed }) => [styles.feeLink, { opacity: pressed ? 0.6 : 1 }]}>
                <ThemedText type="small" themeColor="primary">
                  How to avoid extra payments
                </ThemedText>
              </Pressable>
            )}
          </ThemedView>
        )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBack: {
    flex: 1,
  },
  shareButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    marginTop: Spacing.four,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  lastVerified: {
    fontSize: 12,
  },
  description: {
    marginTop: Spacing.two,
    lineHeight: 20,
  },
  infoCard: {
    marginTop: Spacing.four,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  infoIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextWrap: {
    flex: 1,
    gap: 2,
  },
  infoValue: {
    fontWeight: 700,
  },
  section: {
    marginTop: Spacing.five,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one + 2,
    marginTop: Spacing.two,
  },
  steps: {
    marginTop: Spacing.three,
  },
  stepRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  stepMarkerColumn: {
    alignItems: 'center',
    width: 24,
  },
  stepIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndexText: {
    fontWeight: 700,
  },
  stepLine: {
    width: 2,
    flex: 1,
    minHeight: Spacing.four,
  },
  stepTextWrap: {
    flex: 1,
    paddingBottom: Spacing.three,
    gap: 2,
  },
  comingSoon: {
    marginTop: Spacing.three,
  },
  assistantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
  },
  assistantTextWrap: {
    flex: 1,
    gap: 2,
  },
  primaryButton: {
    borderRadius: Radius.medium,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  primaryButtonLabel: {
    fontWeight: 700,
  },
  feeLink: {
    alignItems: 'center',
    marginTop: Spacing.three,
  },
});
