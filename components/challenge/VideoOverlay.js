import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions
  } from 'react-native';
import { Video, Audio } from 'expo-av';
import InViewPort from '../shared/InViewPort';
const dim = Dimensions.get("window");

console.log("dim is "+ JSON.stringify(dim))

import { Viewport } from '@skele/components'

const ViewportAwareVideo = Viewport.Aware(Video)
const PRE_TRIGGER_RATIO = -0.4

 class VideoOverlay extends React.Component{

  state = {
    height: undefined,
    width: undefined
  }

  componentDidMount(){
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    })
  }

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.max(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
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

  componentWillUnmount(){
    // if(this.playbackObject){
    //   this.playbackObject.stopAsync()
    // }
  }

  UNSAFE_componentWillMount(){
      var data = this.calculateAspectRatioFit(540, 960, dim.width, this.props.height)
      this.setState({ width: data.width, height: data.height })
    
  }

  render(){
    var props = this.props
    var height = props.height != undefined ? props.height : null
    var width = props.width != undefined ? props.width : dim.width
    //var url = "http://localhost:8001/uploads/" + props.source;
    var url =  props.source;
    //var url = "http://localhost:8001/uploads/1602063190_26EC882A-2215-4009-9221-4BF429A82E78.mov";
    //var url = "https://snaphunt-app-media.s3.ca-central-1.amazonaws.com/1601920122_709F085B-77D2-4F21-8DA4-2B6015A7A84F.mov";
    //var url = "http://cdn.clipcanvas.com/sample/clipcanvas_14348_H264_320x180.mp4";
    //var url = "https://snaphunt-app-media.s3.ca-central-1.amazonaws.com/1602092701_570f9ae3-8cb1-45b4-b815-998321097397.mp4";
    //var url = "http://192.168.1.18:8000/snap/2.mp4";
    //var url = "http://192.168.1.18:8000/video_player";
    console.log('Props.source = ' + url);
      return (
        props.home != undefined ? (
          // <InViewPort style={{flex: 1}} onChange={(isVisible) => this.handlePlaying(isVisible)}>
          <View style={{flex: 1}}>
            <ViewportAwareVideo
            onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
              console.log("view port is "+ width, height)
            }}

              innerRef={this._handleVideoRef}
              source={{ uri: url }}
              posterSource={require("../../assets/images/spinner.gif")}
              posterStyle={ { width: 50, height: 50, position: "absolute", top: "50%", left: "43%"} }
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              isLooping
              style={ {...styles.backgroundVideo, ...{flex: 1, borderRadius: props.rounded != undefined ? props.rounded : 0}} }
              usePoster={true}
              onError={(err) => console.log(err)}
              onViewportEnter={() => this.handlePlaying(true)}
              onViewportLeave={() => this.handlePlaying(false)}
              preTriggerRatio={PRE_TRIGGER_RATIO}
              onLoad={response => {

                //const { width1, height1 } = response.naturalSize;
                console.log("Width " + JSON.stringify(response));
                
              }}
              />
              
              {props.children}
          {/* </InViewPort> */}
          </View>
        ) : (
          <View style={{flex: 1}}>
            <Video
              // innerRef={this._handleVideoRef}
              source={{ uri: url }}
              posterSource={require("../../assets/images/spinner.gif")}
              posterStyle={ { width: 50, height: 50, position: "absolute", top: "50%", left: "43%"} }
              volume={1.0}
              isMuted={false}
              resizeMode={"contain"}
              shouldPlay
              isLooping
              style={  {...styles.backgroundVideo, ...{flex: 1, borderRadius: props.rounded != undefined ? props.rounded : 0}} }
              usePoster={true}
              onLoad={response => {
                const { width1, height1 } = response.naturalSize;

              }}
              />
              {props.children}
          </View>
        )
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

export default VideoOverlay