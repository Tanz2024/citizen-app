import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SourceVariant = 'official' | 'community' | 'ai' | 'demo';

type SourceLabelProps = {
  variant: SourceVariant;
};

const COPY: Record<SourceVariant, string> = {
  official: 'Official source',
  community: 'Community reported',
  ai: 'AI explanation',
  demo: 'Prototype · Demo data',
};

export function SourceLabel({ variant }: SourceLabelProps) {
  const theme = useTheme();

  const color =
    variant === 'official' ? theme.primary : variant === 'community' ? '#A66A0B' : variant === 'ai' ? '#3060A8' : theme.textSecondary;

  return (
    <View style={[styles.pill, { borderColor: color }]}>
      <ThemedText type="small" style={[styles.text, { color }]}>
        {COPY[variant]}
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
    fontSize: 11,
    lineHeight: 14,
    fontWeight: 600,
  },
});
