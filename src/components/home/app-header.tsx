import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { currentUser } from '@/data/user';
import { unreadNotificationsCount } from '@/data/notifications';
import { useTheme } from '@/hooks/use-theme';

export function AppHeader() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View style={styles.row}>
      <View>
        <ThemedText type="smallBold">Citizen</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Independent civic prototype
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.notificationButton} hitSlop={8}>
          <Icon name="bell" color={theme.text} size={20} />
          {unreadNotificationsCount > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.accent, borderColor: theme.background }]}>
              <ThemedText type="small" themeColor="primaryText" style={styles.badgeText}>
                {unreadNotificationsCount}
              </ThemedText>
            </View>
          )}
        </Pressable>
        <Pressable onPress={() => router.push('/profile')} hitSlop={4}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <ThemedText type="small" themeColor="primaryText" style={styles.avatarText}>
              {currentUser.firstName.charAt(0)}
            </ThemedText>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  notificationButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 700,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: 700,
  },
});
