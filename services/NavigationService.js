import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  if (_navigator && routeName) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  }
};

export const goBack = () => {
  if (_navigator) {
    _navigator.dispatch(NavigationActions.back());
  }
};

export const resetNav = (routeName, screen) => {
  if (_navigator) {
    _navigator.dispatch(StackActions.reset({
      routeName: routeName,
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen })]
  }));
  }
};


// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  resetNav
};
