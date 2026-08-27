import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { StatusBadge, StatusTone } from '@/components/ui/status-badge';
import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { applications } from '@/data/activity';
import { useTheme } from '@/hooks/use-theme';

const TONE_BY_STATUS: Record<string, StatusTone> = {
  'under-review': 'warning',
  'documents-required': 'alert',
  completed: 'success',
  approved: 'success',
  draft: 'neutral',
  submitted: 'neutral',
};

export function RecentApplications() {
  const theme = useTheme();
  const router = useRouter();
  const latest = applications[0];

  if (!latest) return null;

  return (
    <Pressable
      onPress={() => router.push(`/application/${latest.id}`)}
      style={({ pressed }) => [styles.row, { borderColor: theme.border, opacity: pressed ? 0.7 : 1 }]}>
      <View style={styles.textWrap}>
        <ThemedText type="default">{latest.title}</ThemedText>
        {latest.submittedDate ? (
          <ThemedText type="small" themeColor="textSecondary">
            Applied on {latest.submittedDate}
          </ThemedText>
        ) : null}
      </View>
      <StatusBadge label={latest.statusLabel} tone={TONE_BY_STATUS[latest.status] ?? 'neutral'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.large,
    padding: Spacing.three,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
});
