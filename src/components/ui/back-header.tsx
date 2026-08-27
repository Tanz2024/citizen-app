import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BackHeaderProps = {
  title: string;
};

export function BackHeader({ title }: BackHeaderProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View style={styles.row}>
      <Pressable onPress={() => router.back()} style={styles.button} hitSlop={8}>
        <Icon name="chevronLeft" color={theme.text} size={20} />
      </Pressable>
      <ThemedText type="smallBold" style={styles.title} numberOfLines={1}>
        {title}
      </ThemedText>
      <View style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Spacing.two,
  },
});
