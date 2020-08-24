import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { addHeaderRightNavigator } from '../../../helpers';
import { userSelector } from '../../../store/selectors/UserSelector';
import Colors from '../../../constants/Colors';
import ImageOverlay from "@image-overlay";
import NavigationService from '../../../services/NavigationService';
let colorGetterFromProps = {};
let darkMode = false;
class CacheIndex extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const headerLeftNav = addHeaderRightNavigator(navigation);
    return { ...headerLeftNav, title: 'Cache', headerBackTitle: null }
  };

  render() {
    const { user } = this.props.user;

    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.tile} onPress={() => NavigationService.navigate("SeasonOne")} >
          <Text style={styles.heading} >Sn△pHunt</Text>
          <Text style={styles.p} >Season 1 Challenges</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tileBlue} onPress={() => NavigationService.navigate("MyChallenge")} >
          <Text style={styles.heading} >My Challenges</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tileBlue} onPress={() => NavigationService.navigate("Sponsored")} >
          <ImageOverlay source={require("../../../assets/images/sponsored.png")} containerStyle={{ flex: 1 }} >
            <Text style={styles.heading} >Sponsored Challenges</Text>
          </ImageOverlay>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tileYellow} onPress={() => NavigationService.navigate("HostAHuntScreen")} >
          <Text style={styles.heading} >Host a Hunt</Text>
        </TouchableOpacity>

        {/* 
          <ImageOverlay source={ require("../../../assets/images/snapscapes.png") } containerStyle={{flex: 1}} >
                <Text style={styles.heading} >Snap Scapes</Text>
          </ImageOverlay> */}

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state), color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheIndex);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tile: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorGetterFromProps.backgroundColor,
    flex: 1
  },
  tileBlue: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7A9DFF",
    flex: 1
  },
  tileYellow: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF57E",
    flex: 1
  },
  tileSponsored: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  heading: {
    fontWeight: "bold",
    fontSize: 22,
    fontStyle: "italic",
    color: "white"
  },
  p: {
    fontSize: 16,
    color: "white"
  }
});
