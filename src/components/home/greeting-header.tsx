import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { currentUser } from '@/data/user';
import { weather } from '@/data/weather';
import { useTheme } from '@/hooks/use-theme';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function GreetingHeader() {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View>
        <ThemedText type="small" themeColor="textSecondary">
          {getGreeting()}
        </ThemedText>
        <ThemedText type="default" style={styles.name}>
          {currentUser.firstName}
        </ThemedText>
      </View>
      <View style={styles.weather}>
        <Icon name="sun" color={theme.textSecondary} size={16} />
        <ThemedText type="small" themeColor="textSecondary">
          {weather.temperatureC}°C
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {weather.city}
        </ThemedText>
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
  name: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: 700,
  },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginTop: 2,
  },
});
