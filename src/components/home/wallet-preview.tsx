import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { StatusBadge } from '@/components/ui/status-badge';
import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { credentials } from '@/data/credentials';
import { useTheme } from '@/hooks/use-theme';

export function WalletPreview() {
  const theme = useTheme();
  const router = useRouter();
  const primary = credentials.find((credential) => credential.isPrimary);

  if (!primary) return null;

  return (
    <Pressable
      onPress={() => router.push(`/credential/${primary.id}`)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.successSoft, opacity: pressed ? 0.85 : 1 },
      ]}>
      <View style={styles.row}>
        <ThemedText type="small" themeColor="textSecondary">
          {primary.type}
        </ThemedText>
        <StatusBadge label="Active" tone="success" />
      </View>
      <ThemedText type="smallBold" style={styles.identifier}>
        {primary.maskedIdentifier}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        Demo Verified
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.large,
    padding: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  identifier: {
    marginTop: Spacing.two,
    fontSize: 16,
  },
});
