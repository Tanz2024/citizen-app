import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export function EmptyState({ title, description, actionLabel, onPressAction }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText type="smallBold" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
        {description}
      </ThemedText>
      {actionLabel ? (
        <Pressable
          onPress={onPressAction}
          style={({ pressed }) => [styles.button, { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 }]}>
          <ThemedText type="small" themeColor="primaryText" style={styles.buttonText}>
            {actionLabel}
          </ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.five,
    gap: Spacing.one,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    maxWidth: 260,
  },
  button: {
    marginTop: Spacing.three,
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two + 2,
  },
  buttonText: {
    fontWeight: 700,
  },
});
