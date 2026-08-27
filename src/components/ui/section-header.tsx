import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';

type SectionHeaderProps = {
  label: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export function SectionHeader({ label, actionLabel, onPressAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <ThemedText type="default" style={styles.label}>
        {label}
      </ThemedText>
      {actionLabel ? (
        <Pressable onPress={onPressAction} hitSlop={8}>
          <ThemedText type="small" themeColor="primary">
            {actionLabel}
          </ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.two,
  },
  label: {
    fontWeight: 700,
  },
});
