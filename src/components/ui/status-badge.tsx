import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StatusTone = 'success' | 'progress' | 'neutral' | 'alert' | 'warning';

type StatusBadgeProps = {
  label: string;
  tone?: StatusTone;
};

export function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  const theme = useTheme();

  const toneColor =
    tone === 'success' || tone === 'progress'
      ? theme.primary
      : tone === 'alert'
        ? theme.accent
        : tone === 'warning'
          ? theme.warning
          : theme.textSecondary;

  return (
    <View style={[styles.pill, { borderColor: toneColor }]}>
      <ThemedText type="small" style={[styles.text, { color: toneColor }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: 600,
  },
});
