import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { citizenActions } from '@/data/citizen-actions';
import { useTheme } from '@/hooks/use-theme';

export function CitizenActions() {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {citizenActions.map((action) => (
        <Pressable
          key={action.id}
          style={({ pressed }) => [styles.item, { opacity: pressed ? 0.6 : 1 }]}>
          <View style={[styles.iconWrap, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
            <Icon name={action.icon} color={theme.primary} size={20} />
          </View>
          <ThemedText type="small" style={styles.label}>
            {action.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    gap: Spacing.two,
    flex: 1,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
