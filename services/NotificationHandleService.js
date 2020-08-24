import { Notifications } from 'expo';
import { AppState } from 'react-native';
import { Platform } from "react-native"
import ApiService from './ApiService';
import { APP_STATE } from '../constants';
import NavigationService from './NavigationService';

class NotificationHandleService extends ApiService {
  handleOnClick = notification => {
    NavigationService.navigate(notification.data.route, notification.data.data)
  };

  showInApp = (notification, id, showNotification) => {
    if (AppState.currentState === APP_STATE.BACKGROUND) {
      return;
    }
    // showNotification({
    //   title: notification.data.title,
    //   message: notification.data.body,
    //   icon: notification.data.image,
    //   onPress: () => this.handleOnClick(notification)
    // });
  };
}

export const notificationHandleService = new NotificationHandleService();
