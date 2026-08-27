import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function SearchBar() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push('/services')}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border, opacity: pressed ? 0.8 : 1 },
      ]}>
      <Icon name="search" color={theme.textSecondary} size={18} />
      <View style={styles.textWrap}>
        <ThemedText type="small" themeColor="textSecondary">
          Search services, documents...
        </ThemedText>
      </View>
      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          router.push('/assistant');
        }}
        hitSlop={8}>
        <Icon name="microphone" color={theme.textSecondary} size={18} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.half,
  },
  textWrap: {
    flex: 1,
  },
});
