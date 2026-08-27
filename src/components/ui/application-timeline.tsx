import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { ApplicationStep } from '@/types/activity';
import { useTheme } from '@/hooks/use-theme';

type ApplicationTimelineProps = {
  steps: ApplicationStep[];
};

export function ApplicationTimeline({ steps }: ApplicationTimelineProps) {
  const theme = useTheme();

  return (
    <View>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.row}>
          <View style={styles.markerColumn}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: step.done ? theme.primary : theme.background,
                  borderColor: step.done ? theme.primary : theme.border,
                },
              ]}
            />
            {index !== steps.length - 1 && (
              <View style={[styles.line, { backgroundColor: step.done ? theme.primary : theme.border }]} />
            )}
          </View>
          <ThemedText
            type="small"
            themeColor={step.done ? 'text' : 'textSecondary'}
            style={styles.label}>
            {step.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  markerColumn: {
    alignItems: 'center',
    width: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: Radius.pill,
    borderWidth: 2,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: Spacing.four,
  },
  label: {
    paddingBottom: Spacing.three,
  },
});
