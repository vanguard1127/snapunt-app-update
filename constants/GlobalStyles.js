import { StyleSheet, Platform, StatusBar } from "react-native";
export default StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    textShadow: {
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    }
  });