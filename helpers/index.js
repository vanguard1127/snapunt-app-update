import React from 'react';
import {  Icon } from 'native-base';
import { Image } from "react-native"
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const addHeaderRightNavigator = navigation => {
  const styles = {
    menuIcon: {
      marginRight: 15,
    }
  };

  return {
    headerRight: () => (
      <TouchableOpacity           
        onPress ={() => {
          navigation.navigate("Profile");
        }}
      >
        <Image style={ { resizeMode: "contain", width: 40, height: 40, marginLeft: 10 } } source={{ uri: navigation.getParam("avatar") }} />
      </TouchableOpacity>
    )
  };
};


export const addHeaderLeftNavigator = navigation => {
  const styles = {
    menuIcon: {
      marginLeft: 10,
      fontSize: 18
    }
  };

  return {
    headerLeft: () =>  (
      <Icon type="SimpleLineIcons" style={styles.menuIcon} name="magnifier" />
    )
  };
};