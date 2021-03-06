import { AsyncStorage, Platform } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import ApiService from './ApiService';
import config from '../config';
import { askForNotificationsPermission } from '../services/PermissionsService';
import notificationService from './NotificationService';
import { OS_TYPES } from '../constants';
import Reactotron from 'reactotron-react-native'

const { ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID, FACEBOOK_APP_ID  } = config;

const { CLIENT_ID } = config;

const ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGN_UP: '/auth/register',
  LOGOUT: '/auth/logout',
  FACEBOOK: '/auth/social/facebook',
  APPLE: '/auth/social/apple',
  GOOGLE: '/auth/social/google',
  FORGOT_PASSWORD: '/user/forgotPassword',
  RESET_PASSWORD: '/user/resetPassword',
  VERIFY_CODE: "/auth/verifyCode",
  RESEND_CODE: "resendCode"
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = async () => {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      await this.setAuthorizationHeader();
      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    }
  };

  setAuthorizationHeader = async () => {
    const token = await this.getToken();
    if (token) {
      this.api.attachHeaders({
        Authorization: `Bearer ${token}`
      });
    }

    this.api.attachHeaders({
      clientId: CLIENT_ID
    });
  };

  createSession = async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await this.setAuthorizationHeader();
    console.log("asking permission")
    const expoPushToken = await askForNotificationsPermission();
    if (expoPushToken) {
      console.log("inside asking permission")
      await AsyncStorage.setItem('expoPushToken', expoPushToken);
      // TODO this token need to be saved on BE
      notificationService.sendExpoTokenToServer(expoPushToken);
    }
    console.log("done permission")
  };

  destroySession = async () => {
    // await AsyncStorage.clear();
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      await AsyncStorage.removeItem("user");
    }
    this.api.removeHeaders(['Authorization']);
  };

  login = async loginData => {
    console.log("loginData = " + JSON.stringify(loginData));
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, loginData);
    await this.createSession(data);
    return data;
  };

  // googleLogin = async loginPromise => {
  //   const result = await loginPromise;
  //   if (result.type !== 'success') {
  //     throw new Error(result.type);
  //   }
  //   const { data } = await this.apiClient.post(ENDPOINTS.GOOGLE, {
  //     accessToken: result.accessToken
  //   });
  //   await this.createSession(data);
  //   return data;
  // };

  // loginWithGoogle = async () => {
  //   return await this.googleLogin(
  //     Google.logInAsync({
  //       clientId: Platform.OS == OS_TYPES.IOS ? IOS_GOOGLE_CLIENT_ID : ANDROID_GOOGLE_CLIENT_ID,
  //       scopes: ['profile', 'email']
  //     })
  //   );
  // };

  facebookLogin = async loginPromise => {
    const result = await loginPromise;
    Reactotron.log(result)
    if (result.type !== 'success') {
      throw new Error(result.type);
    }
    const { data } = await this.apiClient.post(ENDPOINTS.FACEBOOK, { accessToken: result.token });
    await this.createSession(data);

    return data;
  };

  loginWithFacebook = async () => {
    try{
      await Facebook.initializeAsync(FACEBOOK_APP_ID);
      return await this.facebookLogin(
        Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email', 'user_birthday']
        })
      );
    }catch(err){
      Reactotron.log(err)
    }
  };

  loginWithApple = async payload => {
    const { data } = await this.apiClient.post(ENDPOINTS.APPLE, payload);
    await this.createSession(data);
    return data
  };

  logout = async () => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGOUT);
    await this.destroySession();
    return { ok: true, data };
  };

  forgotPassword = data => {
    return this.apiClient.post(ENDPOINTS.FORGOT_PASSWORD, data);
  };

  resendCode = data => {
    return this.apiClient.post(ENDPOINTS.RESEND_CODE, data);
  };


  resetPassword = data => {
    return this.apiClient.post(ENDPOINTS.RESET_PASSWORD, data);
  };

  signup = async signupData => {
    await this.apiClient.post(ENDPOINTS.SIGN_UP, signupData);
    // const { email, password } = signupData;
    // return this.login({ email, password });
  };

  verifyCode = async verifyData => {
    await this.apiClient.post(ENDPOINTS.VERIFY_CODE, {email: verifyData.email, id_code: verifyData.code});
    const { email, password, forgotPassword } = verifyData;
    if(forgotPassword == undefined){
      return this.login({ email, password });
    }
  };

  getToken = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user).access_token : undefined;
  };

  getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  };

  updateUserInStorage = async property => {
    const user = await AsyncStorage.getItem('user');
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    AsyncStorage.setItem('user', JSON.stringify(jsonUser));
  };
}

const authService = new AuthService();
export default authService;
