import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../../../services/NavigationService';
import ImageOverlay from "@image-overlay";
import { Icon } from 'native-base';
import { RoundButton } from '../../../components/shared/Button/Button';
import VideoOverlay from '../../../components/challenge/VideoOverlay';
let colorGetterFromProps = {};
let darkMode = false;
class PostPreview extends React.Component {

  state = {
    uri: this.props.navigation.getParam("uri"),
    type: this.props.navigation.getParam("type"),
    containerHeight: 0,
    containerWidth: 0
  }

  render() {
    console.log("Post Preview Rrender = " + JSON.stringify(props));
    return (
      <View style={styles.container} onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        this.setState({ containerHeight: height, containerWidth: width })
      }}>
        {this.state.type == "image" ? (

          <ImageOverlay overlayAlpha={0} source={{ uri: this.state.uri }} height={this.state.containerHeight} imageStyle={{ resizeMode: "contain" }} >
            <View style={{ flex: 1, justifyContent: "space-between", padding: 10, width: "100%", marginTop: 30 }} >
              <TouchableOpacity
                onPress={() => {
                  NavigationService.goBack()
                }}>
                <Icon name="arrow-back" type="MaterialIcons" size={28} style={{ color: "white" }} />
              </TouchableOpacity>
              <View>
                <RoundButton text={"RE-TAKE"} onPress={() => NavigationService.navigate("CameraScreen")} />
              </View>
            </View>
          </ImageOverlay>
        ) : (


            <VideoOverlay source={this.state.uri} >
              <View style={{ flex: 1, justifyContent: "space-between", padding: 10, width: "100%", marginTop: 30 }} >
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.goBack()
                  }}>
                  <Icon name="arrow-back" type="MaterialIcons" size={28} style={{ color: "white" }} />
                </TouchableOpacity>
                <View>
                  <RoundButton text={"RE-TAKE"} onPress={() => this.props.navigation.pop(2)} />
                </View>
              </View>
            </VideoOverlay>
          )}
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
)(PostPreview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  }
});
