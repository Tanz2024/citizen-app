import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/home/app-header';
import { AssistantRow } from '@/components/home/assistant-row';
import { CitizenActions } from '@/components/home/citizen-actions';
import { GreetingHeader } from '@/components/home/greeting-header';
import { RecentApplications } from '@/components/home/recent-applications';
import { SearchBar } from '@/components/home/search-bar';
import { ServicesGrid } from '@/components/home/services-grid';
import { WalletPreview } from '@/components/home/wallet-preview';
import { SectionHeader } from '@/components/ui/section-header';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}>
      <ThemedView
        style={[
          styles.container,
          { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + BottomTabInset + Spacing.six },
        ]}>
        <AppHeader />

        <ThemedView style={styles.greetingBlock}>
          <GreetingHeader />
        </ThemedView>

        <ThemedView style={styles.searchBlock}>
          <SearchBar />
        </ThemedView>

        <ThemedView style={styles.assistantBlock}>
          <AssistantRow />
        </ThemedView>

        <ThemedView style={styles.section}>
          <SectionHeader label="Popular Services" actionLabel="See all" onPressAction={() => router.push('/services')} />
          <ServicesGrid />
        </ThemedView>

        <ThemedView style={styles.section}>
          <SectionHeader label="Digital Wallet" actionLabel="See all" onPressAction={() => router.push('/wallet')} />
          <WalletPreview />
        </ThemedView>

        <ThemedView style={styles.section}>
          <SectionHeader label="Recent Applications" actionLabel="See all" onPressAction={() => router.push('/activity')} />
          <RecentApplications />
        </ThemedView>

        <ThemedView style={styles.section}>
          <SectionHeader label="Quick Actions" actionLabel="View all" onPressAction={() => router.push('/services')} />
          <CitizenActions />
        </ThemedView>
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
  greetingBlock: {
    marginTop: Spacing.five,
  },
  searchBlock: {
    marginTop: Spacing.four,
  },
  assistantBlock: {
    marginTop: Spacing.four,
  },
  section: {
    marginTop: Spacing.six,
  },
});
