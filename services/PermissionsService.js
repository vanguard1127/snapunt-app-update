import { Notifications } from 'expo';
import {Platform} from "react-native"
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export async function askForNotificationsPermission() {

  try{
    if (Constants.isDevice) {

      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
  
      console.log("inside notifications")
      console.log(finalStatus)
  
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        console.log("inside nopt granted")
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
  
      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        console.log("inside null")
        return null;
      }
  
      // Get the token that uniquely identifies this device
      console.log("before token")
      let token = await Notifications.getExpoPushTokenAsync();
      console.log("after token")
      console.log(token)
  
      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: [0, 250, 250, 250],
        });
      }
  
      return token;
    }else{
      alert('Must use physical device for Push Notifications');
    }
  }catch(error){
    console.log("error")
    console.log(error)
  }

}
