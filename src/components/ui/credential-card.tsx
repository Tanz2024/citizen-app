import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { StatusBadge } from '@/components/ui/status-badge';
import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { Credential } from '@/types/credential';
import { useTheme } from '@/hooks/use-theme';

type CredentialCardProps = {
  credential: Credential;
  onPress?: () => void;
};

export function CredentialCard({ credential, onPress }: CredentialCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { borderColor: theme.border, opacity: pressed ? 0.85 : 1 },
      ]}>
      <Pressable
        onPress={() => Alert.alert('Remove credential', 'Removing credentials is not available in this prototype.')}
        hitSlop={8}
        style={styles.dismiss}>
        <Icon name="close" color={theme.textSecondary} size={14} />
      </Pressable>

      <View style={styles.row}>
        <Icon name={credential.icon} color={theme.text} size={22} />
        <View style={styles.textWrap}>
          <ThemedText type="smallBold">{credential.type}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {credential.maskedIdentifier}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Demo Verified
          </ThemedText>
        </View>
        <StatusBadge label="Active" tone="success" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.large,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
  dismiss: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingRight: Spacing.four,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
});
