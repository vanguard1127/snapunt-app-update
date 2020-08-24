'use strict';

import React from 'react-native';
import Color from "./Colors";
import normalize from 'react-native-normalize';
import Colors from './Colors';


var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  input: {
    height: normalize(40),
    paddingLeft: 7,
    marginBottom: 10,
    marginTop: normalize(10, "height"),
    width: "100%",
    fontSize: normalize(16),
    padding: normalize(3),
    backgroundColor: "rgba(255,255,255, 0.3)",
    borderBottomColor: "rgba(0,0,0,0.02)",
    borderBottomWidth: 2,
    color: Color.textInputColor,
    margin: normalize(2)
  },

  forgetPasswordStyle: {
    height: normalize(40),
    paddingLeft: normalize(5),
    marginBottom: normalize(10, "height"),
    width: "100%",
    padding: normalize(3),
    fontSize: normalize(16),
    marginTop: normalize(10, "height"),
    backgroundColor: "rgba(255,255,255, 0.3)",
    borderBottomColor: "rgba(0,0,0,0.02)",
    borderBottomWidth: 2,
    color: Color.lightGrey,
    paddingTop: normalize(10, "height"),
    paddingRight: normalize(8)
  },

  Button: {
    marginBottom: normalize(10),
    backgroundColor: Color.primaryBackgroundColor,
    borderRadius: 5,
    marginTop: normalize(20, "height")
  },

  LinkToOther: {
    marginTop: normalize(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  formTitle: {
    fontSize: normalize(18),
    color: Color.text_color_1
  },

  ScrollViewContainerPadding: {
    padding: normalize(30),
  }
});