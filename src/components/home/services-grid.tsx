import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { CategoryTints, Radius, Spacing } from '@/constants/theme';
import { popularServices } from '@/data/services';
import { useTheme } from '@/hooks/use-theme';

export function ServicesGrid() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View style={styles.grid}>
      {popularServices.map((service) => (
        <Pressable
          key={service.id}
          onPress={() => router.push(`/service/${service.id}`)}
          style={({ pressed }) => [styles.item, { opacity: pressed ? 0.6 : 1 }]}>
          <View style={[styles.iconWrap, { backgroundColor: theme.successSoft }]}>
            <Icon name={service.icon} color={CategoryTints[service.tint]} size={20} />
          </View>
          <ThemedText type="small" style={styles.label} numberOfLines={1}>
            {service.shortLabel ?? service.label}
          </ThemedText>
        </Pressable>
      ))}
      <Pressable
        onPress={() => router.push('/services')}
        style={({ pressed }) => [styles.item, { opacity: pressed ? 0.6 : 1 }]}>
        <View style={[styles.iconWrap, { backgroundColor: theme.backgroundElement, borderColor: theme.border, borderWidth: StyleSheet.hairlineWidth }]}>
          <Icon name="ellipsis" color={theme.textSecondary} size={20} />
        </View>
        <ThemedText type="small" style={styles.label}>
          More
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.two,
  },
  item: {
    width: '25%',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
