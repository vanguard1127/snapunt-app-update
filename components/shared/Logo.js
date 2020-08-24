import React from 'react';
import { Image } from 'react-native';

export const Logo = (props) => {
    return (
        <Image
        source={require('../../assets/images/logo1.png')}
        style={{ resizeMode: 'cover', alignSelf: "center",  marginTop: 80, height: 80, width: 80, borderRadius: 10}}
      />
    );
  };
  