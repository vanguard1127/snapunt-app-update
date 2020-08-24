import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Animated, Easing, Platform, SafeAreaView, StatusBar } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import NavigationService from '../../../services/NavigationService';
import Timer from './Timer';
import { withNavigationFocus } from 'react-navigation';
import { setLoader } from '../../../store/actions/LoaderAction';
import { connect } from 'react-redux';
import { Icon } from "native-base"
import Colors from '../../../constants/Colors';
import Loader from '../../../components/Loader';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as ImageManipulator from 'expo-image-manipulator';

const DESIRED_RATIO = "16:9";

class CameraIndex extends React.Component {
  imageProgress = false
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    flash: Camera.Constants.FlashMode.off,
    capturing : false,
    captures: [],
    recording: false,
    scaleValue: new Animated.Value(0),
    isVideo: false,
    clearData: this.props.navigation.getParam("clearData", undefined),
    hostAHunt: this.props.navigation.getParam("hostAHunt", undefined),
    title: this.props.navigation.getParam("title", null),
    ratio: DESIRED_RATIO,
    picker: false
  };

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
         const ratios = await this.camera.getSupportedRatiosAsync();
         const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
         this.setState({ ratio });
    }
}

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing){
      this.camera.stopRecording();
    }
  };

  handleShortCapture = async () => {
      try{
        this.imageProgress = true
        this.props.setLoader(true)
        const captureImage = await this.camera.takePictureAsync({quality: 0.8, exif: true});
        var options = []
        // resize image
        if(this.state.type == Camera.Constants.Type.front){
          options = [
            {
              resize: { width: 540 }
            },
            { flip: ImageManipulator.FlipType.Horizontal }
          ]
         
        }else{
          options = [
            {
              resize: { width: 540 }
            },
          ]
        }

        var photoData = await ImageManipulator.manipulateAsync(captureImage.uri, options , {  format: ImageManipulator.SaveFormat.JPEG })
        this.imageProgress = false
        this.setState({ capturing: false, captures: photoData })
        this.props.setLoader(false)

        if(this.state.isVideo){
          this.props.navigation.navigate("CreatePost", { uri: this.state.captures.uri, isVideo: this.state.isVideo, postData: this.props.navigation.getParam("postData", null), 
          clearData: this.state.clearData,
          hostAHunt: this.state.hostAHunt
         })
        }else{
          this.props.navigation.navigate("ImageFilter", {
          data: {
          uri: this.state.captures.uri,
          isVideo: this.state.isVideo,
          postData: this.props.navigation.getParam("postData", null), 
          clearData: this.state.clearData,
          hostAHunt: this.state.hostAHunt
         }})
        }

      }catch(e){
        console.log(e)
        alert("Could'nt capture image")
      }
  };

  handleLongCapture = async () => {
      this.setState({recording: true})
      const videoData = await this.camera.recordAsync({maxDuration: 30, quality: Camera.Constants.VideoQuality['4:3']});
      this.setState({ capturing: false, recording: false, isVideo: true, captures: videoData });
      this.props.navigation.navigate("CreatePost", { uri: this.state.captures.uri, isVideo: this.state.isVideo, postData: this.props.navigation.getParam("postData", null), 
      clearData: this.state.clearData,
      hostAHunt: this.state.hostAHunt
     })
  };
  captures
  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
    this.setState({ hasCameraPermission });
  }

  openGallery(){
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status == 'granted') {
        this._pickImage()
      }else{
        alert('Sorry, we need camera roll permissions to make this work!');
      }
  };

  _pickImage = async () => {
    try {
      this.setState({ picker: true })
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        if(result.type == "video"){
          this.props.navigation.navigate("CreatePost", { uri: result.uri, isVideo: result.type ==  "video"? true : false, 
          postData: this.props.navigation.getParam("postData", null),
          clearData: this.state.clearData
          })
        }else{
          this.props.navigation.navigate("ImageFilter", {data: {uri: result.uri, isVideo: result.type ==  "video"? true : false, 
          postData: this.props.navigation.getParam("postData", null),
          clearData: this.state.clearData
          } })
        }
      }
      this.setState({ picker: false })
    } catch (E) {
      this.setState({ picker: false })
      console.log(E);
    }
  };

  render() {
    var postData = this.props.navigation.getParam("postData", null)
    var isSnapoff = postData && postData.snapOff ? true : false

    var title = ""
    if(this.state.title){
      title = this.state.title
    }else if (isSnapoff){
      title = "SNAPOFF"
    }else{
      title = "CREATE CHALLENGE"
    }

    var scaleValue = this.state.scaleValue
    const circleScale = scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1.2]
    });

    let isFocused = this.props.isFocused && !this.state.picker ? true : false
    let transformStyle = this.state.recording ? { ...styles.captureBtnActive , transform: [{ scale: circleScale }] } :  { ...styles.captureBtn , transform: [{ scale: circleScale }] } 

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          { isFocused ? <Camera ratio={this.state.ratio} style={{ flex: 1 }} onCameraReady={this.prepareRatio} flashMode={this.state.flash} type={this.state.type} ref={ref => {
              this.camera = ref;
          }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingRight: 15,
                paddingLeft: 15,
                paddingTop: 25,
              }}>

                <TouchableOpacity
                onPress={() => {
                    NavigationService.goBack()
                }}>
                <Icon name="arrow-back" type="MaterialIcons" size={28} style={{color: "white" }} />
                {/* <Image source={require("../../../assets/images/back.png")} style={{width: 24, height: 24, resizeMode: "contain"}} /> */}
              </TouchableOpacity>

              <Text style={{textAlign: "center",  fontWeight: "bold", fontSize: 20, color: Colors.backgroundColor}} > {title}</Text>



              <View style={{flexDirection: "row"}} >
                <TouchableOpacity
                  style={{marginRight: 30}}
                  onPress={() => {
                    this.setState({
                      flash:
                        this.state.flash === Camera.Constants.FlashMode.on
                          ? Camera.Constants.FlashMode.off
                          : Camera.Constants.FlashMode.on,
                    });
                  }}>
                    {this.state.flash == Camera.Constants.FlashMode.on ? (
                      <Icon name="ios-flash" type="Ionicons" size={28} style={{color: "white" }} />
                ): (
                      <Icon name="ios-flash-off" type="Ionicons" size={28} style={{color: "white" }} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}>
                <Icon name="camera-party-mode" type="MaterialCommunityIcons" size={28} style={{color: "white" }} />
                </TouchableOpacity>
              </View>

            </View>

            <View style={{ alignItems: "center", padding: 10, backgroundColor: Colors.fade}} >
                {this.state.recording && <Timer />}
                <TouchableWithoutFeedback
                      onPressIn={ () => {
                        scaleValue.setValue(0);
                      Animated.timing(scaleValue, {
                        toValue: 1,
                        duration: 50,
                        easing: Easing.linear,
                        useNativeDriver: true
                      }).start();
                      this.handleCaptureIn()
                      }}
                      onPressOut={() => {
                        Animated.timing(scaleValue, {
                          toValue: 0,
                          duration: 50,
                          easing: Easing.linear,
                          useNativeDriver: true
                        }).start();
                        this.handleCaptureOut()
                      } }
                      onLongPress={this.handleLongCapture}
                      onPress={async () => !this.imageProgress && await this.handleShortCapture()}>
                      <Animated.View style={transformStyle} />
                  </TouchableWithoutFeedback>
                <Text style={{marginTop: 10, color: "#fff"}} >Hold for video, Tap for picture</Text>
                <TouchableOpacity  onPress={() => this.openGallery()}>
                  <Text style={{marginTop: 10, color: "#fff", textDecorationLine: "underline"}} >Gallery</Text>
                </TouchableOpacity>
            </View>
            
          </Camera> : (<Loader /> )}
        </SafeAreaView>
      );
    }
  }
}

const mapDispatchToProps = {
  setLoader
};

export default connect(
  null,
  mapDispatchToProps
)(withNavigationFocus(CameraIndex));

const styles = StyleSheet.create({
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF",
},
captureBtnActive: {
  width: 60,
  height: 60,
  borderWidth: 2,
  borderRadius: 60,
  borderColor: "#FFFFFF",
  backgroundColor: "red"
},
  });