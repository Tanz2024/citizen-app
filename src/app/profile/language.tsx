import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/ui/back-header';
import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'bn', label: 'বাংলা' },
];

export default function LanguageScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [selected, setSelected] = useState('en');

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + Spacing.five }]}>
      <BackHeader title="Language" />

      <ThemedText type="small" themeColor="textSecondary" style={styles.note}>
        Citizen currently displays English. Bangla support is in progress.
      </ThemedText>

      <View style={styles.list}>
        {LANGUAGES.map((language, index) => {
          const isSelected = language.id === selected;
          return (
            <Pressable
              key={language.id}
              onPress={() => setSelected(language.id)}
              style={[
                styles.row,
                index !== LANGUAGES.length - 1 && { borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth },
              ]}>
              <ThemedText type="default">{language.label}</ThemedText>
              {isSelected && <Icon name="check" color={theme.primary} size={18} />}
            </Pressable>
          );
        })}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  note: {
    marginTop: Spacing.four,
  },
  list: {
    marginTop: Spacing.four,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
  },
});
