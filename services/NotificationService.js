import ApiService from './ApiService';
import { AsyncStorage } from 'react-native';

const ENDPOINTS = {
  NOTIFICATIONS: '/profiles/me/notifications',
  NOTIFICATION_SETTINGS: '/user/updateSettings',
  SEND_EXPO_TOKEN: '/exponent/devices/subscribe',
  REMOVE_EXPO_TOKEN: '/exponent/devices/unsubscribe',
  GET_USER_SETTINGS: "/user/settings"
};

class NotificationService extends ApiService {
  getNotifications = () => {
    return this.apiClient.get(ENDPOINTS.NOTIFICATIONS);
  };

  getNotificationSettings() {
        return this.apiClient.get(ENDPOINTS.NOTIFICATION_SETTINGS);
  }

  getUserSettings = () => {
    try{
      return this.apiClient.get(ENDPOINTS.GET_USER_SETTINGS);
    }catch(err){
      console.log(err)
    }
  }
  updateNotificationSettings = data =>  {
    try{
      return this.apiClient.post(ENDPOINTS.NOTIFICATION_SETTINGS, data);
    }catch(error){
      console.log(error)
    }
  }

  sendExpoTokenToServer = expoPushToken => {
    return this.apiClient.post(ENDPOINTS.SEND_EXPO_TOKEN, {
      expo_token: expoPushToken
    });
  };

  removeExpoTokenFromServer = async () => {
    try {
      const expoPushToken = await AsyncStorage.getItem('expoPushToken');
      this.apiClient.post(ENDPOINTS.REMOVE_EXPO_TOKEN, { secret: expoPushToken });
    } catch {
      return;
    }
  };
}

const notificationService = new NotificationService();
export default notificationService;
