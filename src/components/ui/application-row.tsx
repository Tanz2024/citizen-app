import { Pressable, StyleSheet, View } from 'react-native';

import { StatusBadge, StatusTone } from '@/components/ui/status-badge';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Application } from '@/types/activity';
import { useTheme } from '@/hooks/use-theme';

const TONE_BY_STATUS: Record<Application['status'], StatusTone> = {
  draft: 'neutral',
  'documents-required': 'alert',
  submitted: 'neutral',
  'documents-checked': 'warning',
  'under-review': 'warning',
  approved: 'success',
  completed: 'success',
};

type ApplicationRowProps = {
  application: Application;
  onPress?: () => void;
  isLast?: boolean;
};

export function ApplicationRow({ application, onPress, isLast }: ApplicationRowProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && { borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth },
        { opacity: pressed ? 0.6 : 1 },
      ]}>
      <View style={styles.textWrap}>
        <ThemedText type="default">{application.title}</ThemedText>
        {application.applicationId ? (
          <ThemedText type="small" themeColor="textSecondary">
            Application ID: {application.applicationId}
          </ThemedText>
        ) : null}
      </View>
      <View style={styles.metaWrap}>
        <StatusBadge label={application.statusLabel} tone={TONE_BY_STATUS[application.status]} />
        {application.time ? (
          <ThemedText type="small" themeColor="textSecondary" style={styles.time}>
            {application.time}
          </ThemedText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  metaWrap: {
    alignItems: 'flex-end',
    gap: Spacing.one,
  },
  time: {
    fontSize: 11,
  },
});
