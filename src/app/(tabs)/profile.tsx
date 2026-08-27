import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionHeader } from '@/components/ui/section-header';
import { SettingsRow } from '@/components/ui/settings-row';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { accountSettings, appSettings } from '@/data/profile';
import { currentUser } from '@/data/user';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
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
          { paddingTop: insets.top + Spacing.two, paddingBottom: insets.bottom + BottomTabInset + Spacing.five },
        ]}>
        <ScreenHeader title="Profile" />

        <View style={styles.userRow}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <ThemedText type="smallBold" themeColor="primaryText">
              {currentUser.firstName.charAt(0)}
            </ThemedText>
          </View>
          <ThemedText type="default" style={styles.userName}>
            {currentUser.firstName}
          </ThemedText>
        </View>

        <ThemedView style={styles.section}>
          <SectionHeader label="Account" />
          {accountSettings.map((item, index) => (
            <SettingsRow
              key={item.id}
              label={item.label}
              icon={item.icon}
              onPress={item.route ? () => router.push(item.route as never) : undefined}
              isLast={index === accountSettings.length - 1}
            />
          ))}
        </ThemedView>

        <ThemedView style={styles.section}>
          <SectionHeader label="App" />
          {appSettings.map((item, index) => (
            <SettingsRow
              key={item.id}
              label={item.label}
              icon={item.icon}
              onPress={item.route ? () => router.push(item.route as never) : undefined}
              isLast={index === appSettings.length - 1}
            />
          ))}
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
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 700,
  },
  section: {
    marginTop: Spacing.five,
  },
});
