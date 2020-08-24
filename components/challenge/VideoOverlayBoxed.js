import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions
  } from 'react-native';
import { Video, Audio } from 'expo-av';
const dim = Dimensions.get("window");
import { Viewport } from '@skele/components'

const ViewportAwareVideo = Viewport.Aware(Video)
const PRE_TRIGGER_RATIO = -0.3


 class VideoOverlayBoxed extends React.Component{

  state = {
    height: undefined,
    width: undefined
  }

  componentDidMount(){
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    })
  }

  pauseVideo(){
    if(this.playbackObject) {
      this.playbackObject.stopAsync()
    }
  }

  playVideo(){
    if(this.playbackObject) {
      this.playbackObject.playAsync()
    }
  }

  handlePlaying = (isVisible) => {
    console.log(isVisible)
    isVisible ? this.playVideo() : this.pauseVideo();
  }

  _handleVideoRef = component => {
    this.playbackObject = component;
  }

  render(){
    var props = this.props
    var height = props.height != undefined ? props.height : null
    var width = props.width != undefined ? props.width : dim.width

      return (
          <View style={{flex: 1}}>
            <ViewportAwareVideo
              innerRef={this._handleVideoRef}
              source={{ uri: props.source }}
              posterSource={require("../../assets/images/spinner.gif")}
              posterStyle={ { width: 50, height: 50, position: "absolute", top: "50%", left: "43%"} }
              volume={1.0}
              isMuted={false}
              resizeMode={"contain"}
              isLooping
              style={ {...styles.backgroundVideo, ...{height: height, borderRadius: props.rounded != undefined ? props.rounded : 0}} }
              usePoster={true}
              onError={(err) => console.log(err)}
              onViewportEnter={() => this.handlePlaying(true)}
              onViewportLeave={() => this.handlePlaying(false)}
              preTriggerRatio={PRE_TRIGGER_RATIO}
              />
              {props.children}
          </View>
      );
    };
  }



  const styles = StyleSheet.create({
    backgroundVideo: {
      position: "absolute",
      left: 0,
      alignItems: "stretch",
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "#000"
    }
});

export default VideoOverlayBoxed