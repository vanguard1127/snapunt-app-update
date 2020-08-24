import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import NavigationService from '../../../services/NavigationService';
import Colors from "../../../constants/Colors";

import normalize from "react-native-normalize";
let colorGetterFromProps = {};
let darkMode = false;
class ChallengeMain extends React.Component {
  UNSAFE_componentWillMount() {
    // StatusBar.setBarStyle('light-content', true);
  }

  state = {
  }


  render() {
    let that = this;
    let { width } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: colorGetterFromProps.white }]}>
        <TouchableOpacity style={{
          backgroundColor: colorGetterFromProps.backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          flex:1
        }}  onPress={() => { that.props.navigation.navigate("SeasonOne") }}  activeOpacity={1} >
          
        <TouchableOpacity>
          <Text style={styles.textStyle}>Season 1</Text>
          <Text style={styles.textStyle}>Challenges</Text>
        </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: "absolute", marginLeft: normalize(145), marginTop: normalize(150), flex: 1, zIndex: 9999 }}>
          <Image source={require('assets/images/logo1.png')}
        style={{ resizeMode: 'cover', alignSelf: "center",   height: 80, width: 80, borderRadius: 10}} />
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: colorGetterFromProps.khaki,
          justifyContent: "center",
          alignItems: "center",
          flex:1
        }} onPress={() => this.props.navigation.navigate("FeaturedScreen")} activeOpacity={1}>
        <TouchableOpacity>
          <Text style={styles.textStyle2} >Featured</Text>
          <Text style={styles.textStyle2} >Challenges</Text>
        </TouchableOpacity></TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(ChallengeMain));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    position: "relative"
  },
  textStyle: {
    fontSize: 16,
    color: "white"
  },
  textStyle2: {
    fontSize: 16,
    color: "#AF7653"
  }
});
