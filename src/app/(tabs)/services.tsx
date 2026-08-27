import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@/components/ui/icon';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceCategoryGrid } from '@/components/ui/service-category-grid';
import { ServiceRow } from '@/components/ui/service-row';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { services } from '@/data/services';
import { useTheme } from '@/hooks/use-theme';
import { Service, ServiceCategory } from '@/types/service';

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('for-you');

  const trimmedQuery = query.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return services.filter(
      (service) =>
        service.label.toLowerCase().includes(trimmedQuery) ||
        service.description.toLowerCase().includes(trimmedQuery),
    );
  }, [isSearching, trimmedQuery]);

  const browseServices = useMemo(
    () =>
      category === 'for-you' ? services : services.filter((service) => service.categories.includes(category)),
    [category],
  );

  function goToService(service: Service) {
    router.push(`/service/${service.id}`);
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled">
      <ThemedView
        style={[
          styles.container,
          { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + BottomTabInset + Spacing.five },
        ]}>
        <View style={styles.headerRow}>
          <ScreenHeader title="Services" />
          <Pressable hitSlop={8}>
            <Icon name="filter" color={theme.text} size={20} />
          </Pressable>
        </View>

        <View style={[styles.searchBox, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Icon name="search" color={theme.textSecondary} size={18} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search services"
            placeholderTextColor={theme.textSecondary}
            style={[styles.searchInput, { color: theme.text }]}
          />
          {isSearching && (
            <Pressable onPress={() => setQuery('')} hitSlop={8}>
              <Icon name="close" color={theme.textSecondary} size={18} />
            </Pressable>
          )}
        </View>

        {isSearching ? (
          searchResults.length > 0 ? (
            <ThemedView style={styles.section}>
              {searchResults.map((service, index) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  variant="chip"
                  onPress={() => goToService(service)}
                  isLast={index === searchResults.length - 1}
                />
              ))}
            </ThemedView>
          ) : (
            <EmptyState
              title="No results"
              description={`We couldn't find a service matching "${query}".`}
            />
          )
        ) : (
          <>
            <ThemedView style={styles.section}>
              <SectionHeader label="Categories" />
              <ServiceCategoryGrid selected={category} onSelect={setCategory} />
            </ThemedView>

            <ThemedView style={styles.section}>
              <SectionHeader label="Popular Services" />
              {browseServices.map((service, index) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  variant="chip"
                  onPress={() => goToService(service)}
                  isLast={index === browseServices.length - 1}
                />
              ))}
            </ThemedView>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
    paddingHorizontal: Spacing.four,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.half,
    marginTop: Spacing.four,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  section: {
    marginTop: Spacing.five,
  },
});
