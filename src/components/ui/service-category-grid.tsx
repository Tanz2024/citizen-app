import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { serviceCategories } from '@/data/services';
import { ServiceCategory } from '@/types/service';
import { useTheme } from '@/hooks/use-theme';

type ServiceCategoryGridProps = {
  selected: ServiceCategory;
  onSelect: (category: ServiceCategory) => void;
};

export function ServiceCategoryGrid({ selected, onSelect }: ServiceCategoryGridProps) {
  const theme = useTheme();
  const tiles = serviceCategories.filter((category) => category.id !== 'for-you');

  return (
    <View style={styles.grid}>
      {tiles.map((category) => {
        const isSelected = category.id === selected;
        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(isSelected ? 'for-you' : category.id)}
            style={styles.item}>
            <View
              style={[
                styles.iconWrap,
                {
                  backgroundColor: isSelected ? theme.primary : theme.successSoft,
                },
              ]}>
              <Icon name={category.icon} color={isSelected ? theme.primaryText : theme.primary} size={20} />
            </View>
            <ThemedText type="small" style={styles.label} numberOfLines={1}>
              {category.label}
            </ThemedText>
          </Pressable>
        );
      })}
      <Pressable onPress={() => onSelect('for-you')} style={styles.item}>
        <View style={[styles.iconWrap, { backgroundColor: theme.backgroundElement, borderColor: theme.border, borderWidth: StyleSheet.hairlineWidth }]}>
          <Icon name="ellipsis" color={theme.textSecondary} size={20} />
        </View>
        <ThemedText type="small" style={styles.label} numberOfLines={1}>
          All Categories
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '33.33%',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
