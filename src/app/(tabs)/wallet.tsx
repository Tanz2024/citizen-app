import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CredentialCard } from '@/components/ui/credential-card';
import { Icon } from '@/components/ui/icon';
import { SectionHeader } from '@/components/ui/section-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { credentials } from '@/data/credentials';
import { useTheme } from '@/hooks/use-theme';

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  const primary = credentials.find((credential) => credential.isPrimary);
  const other = credentials.filter((credential) => !credential.isPrimary);

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
          <View style={styles.headerTitleRow}>
            <ThemedText type="default" style={styles.title}>
              Digital Wallet
            </ThemedText>
            <View style={[styles.prototypePill, { borderColor: theme.border }]}>
              <ThemedText type="small" themeColor="textSecondary" style={styles.prototypeText}>
                Prototype
              </ThemedText>
            </View>
          </View>
          <Pressable
            onPress={() => Alert.alert('Add document', 'This feature is not available in the prototype yet.')}
            hitSlop={8}>
            <Icon name="plus" color={theme.text} size={20} />
          </Pressable>
        </View>

        {primary && (
          <Pressable
            onPress={() => router.push(`/credential/${primary.id}`)}
            style={({ pressed }) => [
              styles.identityCard,
              { borderColor: theme.border, opacity: pressed ? 0.85 : 1 },
            ]}>
            <View style={styles.identityHeaderRow}>
              <ThemedText type="smallBold">National ID (Demo)</ThemedText>
              <StatusBadge label="Demo Verified" tone="success" />
            </View>

            <View style={styles.identityBody}>
              <View style={styles.identityFields}>
                <ThemedText type="small" themeColor="textSecondary">
                  NID Number
                </ThemedText>
                <ThemedText type="smallBold" style={styles.identityValue}>
                  {primary.maskedIdentifier}
                </ThemedText>

                <ThemedText type="small" themeColor="textSecondary" style={styles.fieldSpacing}>
                  Name
                </ThemedText>
                <ThemedText type="smallBold" style={styles.identityValue}>
                  {primary.holderName}
                </ThemedText>

                <ThemedText type="small" themeColor="textSecondary" style={styles.fieldSpacing}>
                  Status
                </ThemedText>
                <ThemedText type="smallBold" style={styles.identityValue}>
                  Demo Credential
                </ThemedText>
              </View>

              <View style={[styles.avatarBox, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
                <Icon name="user" color={theme.textSecondary} size={28} />
                <View style={[styles.avatarBadge, { backgroundColor: theme.primary, borderColor: theme.backgroundElement }]}>
                  <Icon name="shield" color={theme.primaryText} size={10} weight="fill" />
                </View>
              </View>
            </View>
          </Pressable>
        )}

        <ThemedView style={styles.section}>
          <SectionHeader label="My Credentials" />
          {other.map((credential) => (
            <CredentialCard
              key={credential.id}
              credential={credential}
              onPress={() => router.push(`/credential/${credential.id}`)}
            />
          ))}
        </ThemedView>

        {primary && (
          <Pressable
            onPress={() => router.push(`/credential/${primary.id}`)}
            style={({ pressed }) => [
              styles.qrButton,
              { borderColor: theme.border, opacity: pressed ? 0.6 : 1 },
            ]}>
            <ThemedText type="default" style={styles.qrButtonLabel}>
              Show My Demo QR
            </ThemedText>
            <Icon name="qrCode" color={theme.text} size={18} />
          </Pressable>
        )}

        <ThemedText type="small" themeColor="textSecondary" style={styles.caption}>
          This is a prototype. All credentials are demo.
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: 700,
  },
  prototypePill: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
  },
  prototypeText: {
    fontSize: 11,
    lineHeight: 14,
  },
  identityCard: {
    marginTop: Spacing.four,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.large,
    padding: Spacing.four,
  },
  identityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  identityBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.three,
  },
  identityFields: {
    flex: 1,
  },
  identityValue: {
    marginTop: 2,
  },
  fieldSpacing: {
    marginTop: Spacing.two,
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: Radius.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: Spacing.five,
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.four,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  qrButtonLabel: {
    fontWeight: 700,
  },
  caption: {
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
