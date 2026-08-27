import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { CategoryTints, Radius, Spacing } from '@/constants/theme';
import { Service } from '@/types/service';
import { useTheme } from '@/hooks/use-theme';

type ServiceRowProps = {
  service: Service;
  onPress?: () => void;
  isLast?: boolean;
  variant?: 'plain' | 'chip';
};

export function ServiceRow({ service, onPress, isLast, variant = 'plain' }: ServiceRowProps) {
  const theme = useTheme();
  const tint = CategoryTints[service.tint];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && { borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth },
        { opacity: pressed ? 0.6 : 1 },
      ]}>
      {variant === 'chip' ? (
        <View style={[styles.iconChip, { backgroundColor: `${tint}1A` }]}>
          <Icon name={service.icon} color={tint} size={18} />
        </View>
      ) : (
        <View style={styles.iconWrap}>
          <Icon name={service.icon} color={theme.textSecondary} size={20} />
        </View>
      )}
      <View style={styles.textWrap}>
        <ThemedText type="default">{service.label}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {service.description}
        </ThemedText>
      </View>
      {service.estimatedTime ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.time}>
          {service.estimatedTime}
        </ThemedText>
      ) : null}
      <Icon name="chevronRight" color={theme.textSecondary} size={14} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  iconWrap: {
    width: 24,
    alignItems: 'center',
  },
  iconChip: {
    width: 36,
    height: 36,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  time: {
    marginRight: Spacing.one,
  },
});
