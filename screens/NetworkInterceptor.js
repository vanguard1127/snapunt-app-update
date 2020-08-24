import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import NavigationService from '../services/NavigationService';
import { Linking, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import { withInAppNotification } from 'react-native-in-app-notification';

import authService from '../services/AuthService';
import ActivityIndicatorComponent from '../components/shared/ActivityIndicatorComponent';
import { connect } from 'react-redux';
import { loaderSelector } from '../store/selectors/LoaderSelector';
import { passwordChangedSelector } from '../store/selectors/UserSelector';
import { setChangePasswordSuccess } from '../store/actions/UserActions';
import { setFlashMessage } from '../store/actions/LoaderAction';
import ErrorModal from '../components/shared/modal/ErrorModal';
import { globalErrorSelector, socialLoginErrorSelector } from '../store/selectors/ErrorSelector';
import { setGlobalError, setSocialLoginError } from '../store/actions/ErrorActions';
import { OS_TYPES, DEFAULT, NOTIFICATION, NOTIFICATION_ORIGIN } from '../constants';
import { notificationHandleService } from '../services/NotificationHandleService';
import { showMessage, hideMessage } from "react-native-flash-message";
import Colors from '../constants/Colors';
import NetInfo from "@react-native-community/netinfo";

class NetworkInterceptor extends Component {

  UNSAFE_componentWillReceiveProps(props){
    if(props.flashMessage != ""){
      showMessage({
        message: props.flashMessage,
        type: "default",
        backgroundColor: Colors.flashColor
      });
      setTimeout(() => {
          this.props.setFlashMessage("")
          hideMessage()
      }, 1850);
    }
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
    this._connectionInfo();
    this._setUrlEventListener();

    // if (Platform.OS === OS_TYPES.ANDROID) {
    //   Notifications.createChannelAndroidAsync(DEFAULT, {
    //     name: NOTIFICATION,
    //     sound: true
    //   });
    // }
    // this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  // _handleNotification = notification => {
  //   if (notification.origin === NOTIFICATION_ORIGIN.SELECTED) {
  //     notificationHandleService.handleOnClick(notification);
  //   } else {
  //     notificationHandleService.showInApp(
  //       notification,
  //       notification.notificationId,
  //       this.props.showNotification
  //     );
  //   }
  // };

  _connectionInfo = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log(state.isConnected)
      state.isConnected
        ? NavigationService.navigate('AuthLoading')
        : NavigationService.navigate('Offline');
    });
  };

  _setUrlEventListener = () => {
    //If app is in background
    Linking.addEventListener('url', event => {
      let { queryParams } = Linking.parse(event.url);
      this._processUrlEvent(queryParams);
    });

    //If app is not open
    Linking.getInitialURL().then(url => {
      let { queryParams } = Linking.parse(url);
      this._processUrlEvent(queryParams);
    });
  };

  async _processUrlEvent(queryParams) {
    const userToken = await authService.getToken();
    if (queryParams.forgot_password_token) {
      NavigationService.navigate('ResetPassword', {
        forgot_password_token: queryParams.forgot_password_token
      });
      return;
    }

    if (!userToken) {
      NavigationService.navigate('AuthStack');
      return;
    }

    if (queryParams.notifications) {
      NavigationService.navigate('NotificationsScreen');
      return;
    }
  }

  render() {
    const {
      globalError,
      setGlobalError,
      loader,
      children,
      flashMessage
    } = this.props;

    return (
      <View style={styles.container}>
        {children}
        {loader && <ActivityIndicatorComponent animating />}
        <ErrorModal isVisible={globalError} closeModal={() => setGlobalError(false)} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loader: loaderSelector(state),
    passwordChanged: passwordChangedSelector(state),
    globalError: globalErrorSelector(state),
    socialLoginError: socialLoginErrorSelector(state),
    flashMessage: state.loaderReducer.flashMessage
  };
};

const mapDispatchToProps = {
  setChangePasswordSuccess,
  setGlobalError,
  setSocialLoginError,
  setFlashMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withInAppNotification(NetworkInterceptor));

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
