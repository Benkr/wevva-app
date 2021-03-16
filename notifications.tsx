import * as Notifications from 'expo-notifications';
import Days from './components/Days';
import Current from './components/Current';
import 

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
Notifications.scheduleNotificationAsync({
  content: {
    title: 'Look at that notification',
    body: "I'm so proud of myself!",
  },
  trigger: {
    hour: 9,
    minute: 0,
    repeats: true
  },
});
