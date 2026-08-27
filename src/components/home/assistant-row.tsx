import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function AssistantRow() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push('/assistant')}
      style={({ pressed }) => [
        styles.row,
        { borderColor: theme.border, opacity: pressed ? 0.7 : 1 },
      ]}>
      <View style={[styles.iconWrap, { backgroundColor: theme.successSoft }]}>
        <Icon name="sparkle" color={theme.primary} size={16} weight="fill" />
      </View>
      <View style={styles.textWrap}>
        <ThemedText type="smallBold">Citizen Assistant</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Get help with services
        </ThemedText>
      </View>
      <Icon name="chevronRight" color={theme.textSecondary} size={14} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
});
