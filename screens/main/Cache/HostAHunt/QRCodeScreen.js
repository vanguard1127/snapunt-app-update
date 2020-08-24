import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
// import QRCode from 'react-native-qrcode';
import Colors from '../../../../constants/Colors';
let colorGetterFromProps = {};
let darkMode = false;
class QRCodeScreen extends React.Component {

  state = {
    title: this.props.navigation.getParam("title"),
    uuid: this.props.navigation.getParam("uuid")
  }

  render() {
    return (
      <View style={styles.container}>

        <QRCode
          value={this.state.title + "---" + this.state.uuid}
          size={150}
          bgColor='black'
          fgColor='white'
        />

        <Text style={{ fontSize: 20, fontWeight: "bold", color: colorGetterFromProps.darkGrey, fontStyle: "italic", marginTop: 20 }} >{this.props.navigation.getParam("title")}</Text>
        <Text style={{ fontSize: 16, color: "grey", fontStyle: "italic" }} >Scan to join</Text>


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
)(withNavigationFocus(QRCodeScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  }
});
