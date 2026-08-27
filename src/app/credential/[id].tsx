import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/ui/back-header';
import { Icon } from '@/components/ui/icon';
import { MetadataRow } from '@/components/ui/metadata-row';
import { SourceLabel } from '@/components/ui/source-label';
import { StatusBadge } from '@/components/ui/status-badge';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { credentials } from '@/data/credentials';
import { useTheme } from '@/hooks/use-theme';

export default function CredentialDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [showQr, setShowQr] = useState(false);

  const credential = credentials.find((item) => item.id === id);

  if (!credential) {
    return (
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.three }]}>
        <BackHeader title="Credential" />
        <ThemedText type="default" style={styles.notFound}>
          This credential could not be found.
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
        <BackHeader title={credential.type} />

        <ThemedView style={styles.header}>
          <Icon name={credential.icon} color={theme.primary} size={28} />
          <ThemedText type="default" style={styles.holderName}>
            {credential.holderName}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {credential.maskedIdentifier}
          </ThemedText>
          <View style={styles.statusRow}>
            <StatusBadge label="Demo Verified" tone="success" />
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <MetadataRow label="Document type" value={credential.type} />
          <MetadataRow label="Holder name" value={credential.holderName} />
          <MetadataRow label="Identifier" value={credential.maskedIdentifier} />
          {credential.issueDate ? <MetadataRow label="Issue date" value={credential.issueDate} /> : null}
          {credential.expiryDate ? <MetadataRow label="Expiry date" value={credential.expiryDate} /> : null}
          <MetadataRow label="Status" value="Demo Verified" isLast={!credential.expiryDate} />
        </ThemedView>

        <ThemedView style={styles.section}>
          <SourceLabel variant="demo" />
        </ThemedView>

        {showQr && (
          <ThemedView style={[styles.qrBox, { borderColor: theme.border }]}>
            <Icon name="qrCode" color={theme.textSecondary} size={96} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.qrLabel}>
              Demo verification QR — not a real credential
            </ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.actions}>
          <Pressable
            onPress={() => setShowQr((value) => !value)}
            style={({ pressed }) => [styles.actionButton, { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 }]}>
            <ThemedText type="small" themeColor="primaryText" style={styles.actionLabel}>
              {showQr ? 'Hide QR' : 'Show QR'}
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('Share information', 'Sharing is not available in this prototype yet.')}
            style={({ pressed }) => [styles.actionButtonSecondary, { borderColor: theme.border, opacity: pressed ? 0.7 : 1 }]}>
            <ThemedText type="small" style={styles.actionLabel}>
              Share information
            </ThemedText>
          </Pressable>
        </ThemedView>
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
  header: {
    alignItems: 'center',
    marginTop: Spacing.four,
    gap: 2,
  },
  holderName: {
    marginTop: Spacing.two,
    fontSize: 18,
    fontWeight: 700,
  },
  statusRow: {
    marginTop: Spacing.two,
  },
  section: {
    marginTop: Spacing.five,
  },
  qrBox: {
    marginTop: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.large,
    paddingVertical: Spacing.five,
  },
  qrLabel: {
    textAlign: 'center',
  },
  actions: {
    marginTop: Spacing.five,
    gap: Spacing.two,
  },
  actionButton: {
    borderRadius: Radius.medium,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.medium,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  actionLabel: {
    fontWeight: 700,
  },
});
