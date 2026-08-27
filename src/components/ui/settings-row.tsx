import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SettingsRowProps = {
  label: string;
  icon: IconName;
  onPress?: () => void;
  isLast?: boolean;
};

export function SettingsRow({ label, icon, onPress, isLast }: SettingsRowProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && { borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth },
        { opacity: pressed ? 0.6 : 1 },
      ]}>
      <View style={styles.iconWrap}>
        <Icon name={icon} color={theme.textSecondary} size={18} />
      </View>
      <ThemedText type="default" style={styles.label}>
        {label}
      </ThemedText>
      <Icon name="chevronRight" color={theme.textSecondary} size={14} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  iconWrap: {
    width: 24,
    alignItems: 'center',
  },
  label: {
    flex: 1,
  },
});
