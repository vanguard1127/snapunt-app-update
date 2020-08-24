import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
// import QRCode from 'react-native-qrcode';
import Colors from '../../../../constants/Colors';
import { joinHunt } from "../../../../store/actions/HuntActions"
let colorGetterFromProps = {};
let darkMode = false;
class JoinHunt extends React.Component {

  state = {
    data: []
  }

  componentDidMount() {
    this.props.joinHunt(this.props.navigation.getParam("uuid"))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: colorGetterFromProps.darkGrey, fontSize: 20 }} >Joining {this.props.navigation.getParam("title")}</Text>
        <Text style={{ color: "grey", fontSize: 18, marginBottom: 20 }} >Sit tight!</Text>
        <ActivityIndicator size="large" color={colorGetterFromProps.backgroundColor} />
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
  joinHunt
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(JoinHunt));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  }
});
