import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ViewPropTypes,
  StatusBar
} from "react-native";

const dim = Dimensions.get("window");


export default class RespImageOverlay extends Component {

  state = {
    width: undefined,
    height: undefined,
  }

  UNSAFE_componentWillMount(){
      // console.log("container  "+ width, height - StatusBar.currentHeight)
      Image.getSize(this.props.source.uri, (width, height) => {
        console.log(width, height)
        var data = this.calculateAspectRatioFit(width, 960, dim.width, this.props.height)
        this.setState({ width: data.width, height: data.height })
        });
  }
  
  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.max(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
  }

  render() {
    const {
        children,
        source
      } = this.props;
  
    return (

      <View style={{flexGrow: 1}} >
        <Image
          source={source}
          style={[styles.backgroundImage, {width: this.state.width, height: this.state.height, resizeMode: "contain"}]}
        />
        {children}
      </View>
     

      // <ImageBackground
      //   source={source}
      //   style={[
      //     styles.image,
      //     {
      //       borderRadius: rounded,
      //       height: this.state.height,
      //       width: this.state.width,
      //     },
      //   ]}
      //   imageStyle={imageStyle}
      //   blurRadius={blurRadius}
      // >
      //   <View
      //     style={{
      //       ...StyleSheet.absoluteFillObject,
      //       backgroundColor: overlayColor,
      //       opacity: overlayAlpha,
      //     }}
      //   />
      //   {!children &&
      //     title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      //   {children}
      // </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    left: 0,
    alignItems: "center",
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#000",

  }
});
