import React from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { AppLoading, Notifications } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
// import { InAppNotificationProvider } from 'react-native-in-app-notification';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import store from './store';
import NavigationService from './services/NavigationService';
import AppNavigator from './navigation/AppNavigator';
import NetworkInterceptor from './screens/NetworkInterceptor';
import FlashMessage from "react-native-flash-message";
import Constants from 'expo-constants';
import AnimatedSplash from "react-native-animated-splash-screen";


if(__DEV__) {
  import('./config/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

Sentry.init({
  dsn: 'https://0d23d44430be41f58b836cc184767e8a@o332873.ingest.sentry.io/5201464',
  enableInExpoDevelopment: true,
  debug: true,
});
// Sentry.captureException(new Error('Oops!'))

Sentry.setRelease(Constants.manifest.revisionId);

YellowBox.ignoreWarnings(['react-native-i18n module is not correctly linked']);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'white',
    text: "white",
    placeholder: "white"
  },
};


export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  static propTypes = {
    skipLoadingScreen: PropTypes.bool
  };

  componentDidMount(){
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    // do whatever you want to do with the notification
    if(notification.origin == "selected" || (notification.origin == "received" && Platform.OS == "ios")){
      // navigate user to desire route
      NavigationService.navigate(notification.data.route, notification.data.data)
    }
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
        
      );
    } else {
      return (

        <Provider store={store}>
          {/* <InAppNotificationProvider height={150}> */}
            <PaperProvider theme={theme} >
              <NetworkInterceptor>
                <View style={styles.container}>
                  {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                  <AppNavigator
                    ref={navigatorRef => {
                      NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                  />
                <FlashMessage position="top" autoHide={false} />
                </View>
              </NetworkInterceptor>
            </PaperProvider>
          {/* </InAppNotificationProvider> */}
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-dev.png'),
        // require('./assets/images/robot-prod.png'),
        require('./assets/images/logo.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        ...Icon.MaterialCommunityIcons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf'),
        'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Merriweather': require("./assets/fonts/Merriweather-Italic.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    Sentry.captureException(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
