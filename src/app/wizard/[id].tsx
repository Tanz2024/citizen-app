import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/ui/back-header';
import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, Radius, Spacing } from '@/constants/theme';
import { wizards } from '@/data/wizard';
import { useTheme } from '@/hooks/use-theme';

const STEP_LABELS = ['Overview', 'Documents', 'Payment', 'Review'];

export default function WizardScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  const [stepIndex, setStepIndex] = useState(0);
  const [readyDocs, setReadyDocs] = useState<Set<string>>(new Set());
  const [paid, setPaid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const wizard = wizards[id ?? ''];

  if (!wizard) {
    return (
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.three }]}>
        <BackHeader title="Application" />
        <ThemedText type="default" style={styles.notFound}>
          This application flow isn&apos;t available yet.
        </ThemedText>
      </ThemedView>
    );
  }

  const progress = ((stepIndex + 1) / STEP_LABELS.length) * 100;
  const canContinue =
    (stepIndex === 0) ||
    (stepIndex === 1 && readyDocs.size === wizard.documents.length) ||
    (stepIndex === 2 && paid) ||
    stepIndex === 3;

  function toggleDoc(docId: string) {
    setReadyDocs((current) => {
      const next = new Set(current);
      if (next.has(docId)) next.delete(docId);
      else next.add(docId);
      return next;
    });
  }

  function handlePrimaryAction() {
    if (stepIndex < STEP_LABELS.length - 1) {
      setStepIndex((current) => current + 1);
      return;
    }
    setSubmitted(true);
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + BottomTabInset + Spacing.five }}>
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.two }]}>
        <BackHeader title={wizard.title} />

        <View style={styles.stepTabs}>
          {STEP_LABELS.map((label, index) => {
            const isDone = index < stepIndex || submitted;
            const isCurrent = index === stepIndex && !submitted;
            return (
              <View key={label} style={styles.stepTab}>
                <View
                  style={[
                    styles.stepCircle,
                    {
                      backgroundColor: isDone || isCurrent ? theme.primary : theme.backgroundElement,
                      borderColor: isDone || isCurrent ? theme.primary : theme.border,
                    },
                  ]}>
                  {isDone ? (
                    <Icon name="check" color={theme.primaryText} size={12} />
                  ) : (
                    <ThemedText
                      type="small"
                      themeColor={isCurrent ? 'primaryText' : 'textSecondary'}
                      style={styles.stepNumber}>
                      {index + 1}
                    </ThemedText>
                  )}
                </View>
                <ThemedText
                  type="small"
                  themeColor={isCurrent ? 'text' : 'textSecondary'}
                  style={styles.stepLabel}
                  numberOfLines={1}>
                  {label}
                </ThemedText>
              </View>
            );
          })}
        </View>

        {submitted ? (
          <ThemedView style={styles.section}>
            <View style={[styles.successIconWrap, { backgroundColor: theme.successSoft }]}>
              <Icon name="checkCircle" color={theme.primary} size={32} weight="fill" />
            </View>
            <ThemedText type="default" style={styles.successTitle}>
              Application submitted (Demo)
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.successDescription}>
              This is a prototype flow — nothing was sent to a real government system. In the finished app
              this would appear in your Activity tab.
            </ThemedText>
            <Pressable
              onPress={() => router.push('/activity')}
              style={[styles.primaryButton, { backgroundColor: theme.primary }]}>
              <ThemedText type="default" themeColor="primaryText" style={styles.primaryButtonLabel}>
                Go to Activity
              </ThemedText>
            </Pressable>
          </ThemedView>
        ) : (
          <>
            <ThemedView style={styles.section}>
              <ThemedText type="default" style={styles.title}>
                {wizard.title}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {wizard.subtitle}
              </ThemedText>

              <View style={styles.progressRow}>
                <ThemedText type="small" themeColor="textSecondary">
                  Your progress
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  Step {stepIndex + 1} of {STEP_LABELS.length}
                </ThemedText>
              </View>
              <View style={[styles.progressTrack, { backgroundColor: theme.backgroundElement }]}>
                <View style={[styles.progressFill, { backgroundColor: theme.primary, width: `${progress}%` }]} />
              </View>
            </ThemedView>

            {stepIndex === 0 && (
              <ThemedView style={styles.section}>
                <ThemedText type="smallBold">Overview &amp; eligibility</ThemedText>
                <View style={styles.list}>
                  {wizard.eligibility.map((line) => (
                    <View key={line} style={styles.checkRow}>
                      <Icon name="checkCircle" color={theme.primary} size={16} weight="fill" />
                      <ThemedText type="small" style={styles.checkLabel}>
                        {line}
                      </ThemedText>
                    </View>
                  ))}
                </View>
                <View style={[styles.aiGuide, { backgroundColor: theme.successSoft }]}>
                  <Icon name="sparkle" color={theme.primary} size={14} weight="fill" />
                  <ThemedText type="small" themeColor="textSecondary" style={styles.aiGuideText}>
                    Based on your answers, you appear eligible to apply. Shall we continue?
                  </ThemedText>
                </View>
              </ThemedView>
            )}

            {stepIndex === 1 && (
              <ThemedView style={styles.section}>
                <ThemedText type="smallBold">Required documents</ThemedText>
                <View style={styles.list}>
                  {wizard.documents.map((doc) => {
                    const isReady = readyDocs.has(doc.id);
                    return (
                      <Pressable key={doc.id} onPress={() => toggleDoc(doc.id)} style={styles.checkRow}>
                        <Icon
                          name="checkCircle"
                          color={isReady ? theme.primary : theme.border}
                          size={16}
                          weight={isReady ? 'fill' : 'regular'}
                        />
                        <ThemedText type="small" style={styles.checkLabel}>
                          {doc.label}
                        </ThemedText>
                      </Pressable>
                    );
                  })}
                </View>
                <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
                  Tap each document to mark it ready.
                </ThemedText>
              </ThemedView>
            )}

            {stepIndex === 2 && (
              <ThemedView style={styles.section}>
                <ThemedText type="smallBold">Pay government fee</ThemedText>
                <View style={styles.feeRow}>
                  <ThemedText type="default">Registration fee</ThemedText>
                  <ThemedText type="default" style={styles.feeValue}>
                    {wizard.fee}
                  </ThemedText>
                </View>
                <Pressable
                  onPress={() => setPaid(true)}
                  disabled={paid}
                  style={[
                    styles.payButton,
                    { backgroundColor: paid ? theme.successSoft : theme.primary },
                  ]}>
                  <ThemedText type="default" themeColor={paid ? 'primary' : 'primaryText'} style={styles.primaryButtonLabel}>
                    {paid ? 'Paid (Demo)' : 'Pay Fee (Demo)'}
                  </ThemedText>
                </Pressable>
              </ThemedView>
            )}

            {stepIndex === 3 && (
              <ThemedView style={styles.section}>
                <ThemedText type="smallBold">Review &amp; submit</ThemedText>
                <View style={styles.reviewRow}>
                  <ThemedText type="small" themeColor="textSecondary">
                    Eligibility
                  </ThemedText>
                  <ThemedText type="small" style={styles.reviewValue}>
                    Confirmed
                  </ThemedText>
                </View>
                <View style={styles.reviewRow}>
                  <ThemedText type="small" themeColor="textSecondary">
                    Documents
                  </ThemedText>
                  <ThemedText type="small" style={styles.reviewValue}>
                    {readyDocs.size} of {wizard.documents.length} ready
                  </ThemedText>
                </View>
                <View style={styles.reviewRow}>
                  <ThemedText type="small" themeColor="textSecondary">
                    Payment
                  </ThemedText>
                  <ThemedText type="small" style={styles.reviewValue}>
                    {paid ? 'Paid (Demo)' : 'Not paid'}
                  </ThemedText>
                </View>
              </ThemedView>
            )}

            <ThemedView style={styles.section}>
              <Pressable
                onPress={handlePrimaryAction}
                disabled={!canContinue}
                style={[
                  styles.primaryButton,
                  styles.continueButton,
                  { backgroundColor: canContinue ? theme.primary : theme.backgroundElement },
                ]}>
                <ThemedText
                  type="default"
                  themeColor={canContinue ? 'primaryText' : 'textSecondary'}
                  style={styles.primaryButtonLabel}>
                  {stepIndex === STEP_LABELS.length - 1 ? 'Submit application' : 'Continue'}
                </ThemedText>
                <Icon name="arrowRight" color={canContinue ? theme.primaryText : theme.textSecondary} size={16} />
              </Pressable>
            </ThemedView>
          </>
        )}
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
  stepTabs: {
    flexDirection: 'row',
    marginTop: Spacing.four,
  },
  stepTab: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontWeight: 700,
  },
  stepLabel: {
    fontSize: 11,
  },
  section: {
    marginTop: Spacing.five,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.three,
  },
  progressTrack: {
    height: 6,
    borderRadius: Radius.pill,
    marginTop: Spacing.one,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: Radius.pill,
  },
  list: {
    marginTop: Spacing.three,
    gap: Spacing.three,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  checkLabel: {
    flex: 1,
  },
  hint: {
    marginTop: Spacing.two,
  },
  aiGuide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
    marginTop: Spacing.four,
    borderRadius: Radius.medium,
    padding: Spacing.three,
  },
  aiGuideText: {
    flex: 1,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.three,
  },
  feeValue: {
    fontWeight: 700,
  },
  payButton: {
    marginTop: Spacing.three,
    borderRadius: Radius.medium,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  reviewValue: {
    fontWeight: 600,
  },
  primaryButton: {
    borderRadius: Radius.medium,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  primaryButtonLabel: {
    fontWeight: 700,
  },
  successIconWrap: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    textAlign: 'center',
    marginTop: Spacing.three,
    fontSize: 18,
    fontWeight: 700,
  },
  successDescription: {
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
