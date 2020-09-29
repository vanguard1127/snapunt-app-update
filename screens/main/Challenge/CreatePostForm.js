import React from 'react';
import { Text, View, Image, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, ImageBackground, ScrollView } from 'react-native';
import { Formik, Field } from 'formik';
import { createPostValidationRules } from '../../../validation/challenge';
import { DarkOutlineButton, TextButton } from '../../../components/shared/Button/Button';
import { CustomPicker, CustomTextarea, FormikSwitch, TextInputField } from '../../../components/shared/FormFields';
import { Video } from 'expo-av';
import NavigationService from '../../../services/NavigationService';
import ImageOverlay from "@image-overlay";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { categories, privacy, categories_system } from '../../../helpers/CommonMethods';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Colors from '../../../constants/Colors';
import { Switch, Icon } from 'native-base';
import normalize from "react-native-normalize";
import * as Yup from 'yup';
let colorGetterFromProps = {};
let darkMode = false;
export default class CreatePostForm extends React.Component {
  state = {
    thumb: null,
    loaded: false,
    featured: false
  };

  componentDidMount() {
    if (this.props.isVideo) {
      this.generateThumbnail()
    } else {
      this.setState({ thumb: this.props.mainMedia, loaded: true });
    }
  }

  generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        this.props.mainMedia,
        {
          time: 10000,
        }
      );
      this.setState({ thumb: uri, loaded: true });
    } catch (e) {
      console.log(e);
    }
  };

  handleSwitch = () => {
    this.setState({ featured: !this.state.featured })
  }

  getWeeks() {
    var weeks = {}
    for (var i = 1; i <= 50; i++) {
      if (i == 1) {
        weeks[i] = i + " Week   -   $" + i * 50
      } else {
        weeks[i] = i + " Weeks   -   $" + i * 50
      }
    }
    return weeks
  }

  render() {
    var challengeWeeks = this.getWeeks()

    var postData = this.props.postData
    var isFeatured = postData && this.props.postData.is_featured ? true : false
    var hostAHunt = this.props.hostAHunt
    var comingFromDraft = postData && postData.fromDraft != undefined ? true : false
    var season1 = postData && postData.season1 != undefined ? true : false
    var snapOff = postData && postData.snapOff ? true : false
    var hostAHuntSnapOff = postData && postData.hostAHuntSnapOff ? true : false
    var disabled = snapOff ? true : false

    return (
      <ImageBackground source={{ uri: this.state.thumb }} resizeMode='cover' style={styles.slide}>
        <Formik
          initialValues={{
            category: postData ? String(postData.category) : "",
            privacy: postData ? postData.privacy : hostAHunt != undefined ? "friends" : "",
            media: this.props.mainMedia,
            description: postData ? postData.desc : "",
            post_type: this.props.isVideo ? "video" : "image",
            is_draft: false,
            already_saved: comingFromDraft,
            uuid: postData ? postData.uuid : null,
            hunt_id: postData && postData.hunt_id ? postData.hunt_id : null,
            ch_type: postData && postData.ch_type ? postData.ch_type : "paid",
            featured: this.state.featured,
            duration: "",
            featured_url: ""
          }}
          onSubmit={(values, type) => this.props.onSubmit(values, type)}
          validationSchema={() => Yup.lazy((values) => {
            return createPostValidationRules(values)
          })}                >
          {({ handleSubmit, errors, values }) => (
            <View style={{ flex: 1, justifyContent: "flex-end", marginTop: normalize(340) }} >

<ScrollView overScrollMode="never">
  
             <KeyboardAvoidingView behavior= {(Platform.OS === 'ios')? "padding" : null}

keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
             <View style={styles.upperBox} >
                <Field name="description" placeholderTextColor={Colors.white} style={{ flex: 1, marginRight: 5, height: normalize(45), marginTop: 0, color: Colors.white, borderRadius: 5, borderWidth: 0, elevation: 0, borderColor: "transparent", padding: 5, fontSize: normalize(18) }} disabled={disabled} component={CustomTextarea} placeholder={"Describe your challenge"} />
                {/* <View style={{ alignItems: "center" }} >
                  <TouchableOpacity onPress={() => NavigationService.navigate("PostPreview", { uri: this.props.mainMedia, type: this.props.isVideo ? "video" : "image" })} >
                    {this.state.loaded && <ImageOverlay overlayAlpha={0} containerStyle={{ width: 100 }} height={100} source={{ uri: this.state.thumb }} title={"Preview"} rounded={5} />}
                  </TouchableOpacity>
                </View> */}
              </View>
              <View style={styles.upperBox} >
                <Icon type="EvilIcons" name="location" style={{ color: Colors.violetXblue }} />
                <Field name="Location" placeholderTextColor={Colors.white} style={{ flex: 1, marginRight: 5, height: normalize(45), marginTop: 0, color: Colors.white, borderRadius: 5, borderWidth: 0, elevation: 0, borderColor: "transparent", padding: 5, fontSize: normalize(18) }} disabled={disabled} component={CustomTextarea} placeholder={"Your Address"} />
              </View>
              
              <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View style={styles.DownBox}>
                  {(this.props.hostAHunt == undefined && !hostAHuntSnapOff) && <Field name="privacy" component={CustomPicker} placeholder={"Who can view this challenge"} list={privacy} />}
                </View>
                <View style={styles.DownBox}>
                  <Icon type="FontAwesome" name="th-list" style={{ color: Colors.violetXblue, position: "absolute", marginLeft: 5 }} />
                  {values.category != "null" &&
                    <Field name="category" component={CustomPicker} placeholder="Categories" season1={season1} enable={!disabled} list={season1 ? categories_system : categories} />}
                 
                </View>
                
                {this.props.featured == "active" && !isFeatured && 
                <View >
                <View style={styles.DownBox}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15 }} >
                      <Text style={{ fontSize: 16, color: Colors.white }} >Featured</Text>
                      <Field name="featured" component={FormikSwitch} />
                    </View>
                </View>
                {values.featured == true && 
                <View style={styles.DownBox}>
                    <Field name="duration" component={CustomPicker} placeholder="Select duration" list={challengeWeeks} />
                </View>}
                    
                    {values.featured == true && 
                    <View style={styles.DownBox}>
                    <Field
                      name="featured_url"
                      component={CustomTextarea}
                      nativeBase={true}
                      placeholder="Add Website"
                      placeholderTextColor={Colors.white}
                      style={{ flex: 1, marginRight: 5, height: normalize(45), marginTop: 0, color: Colors.white, borderRadius: 5, borderWidth: 0, elevation: 0, borderColor: "transparent", padding: 5, fontSize: normalize(18) }}
                    />
                    </View>
                    }
                    
                  </View>}
                
                <View style={{ flexDirection: "row", justifyContent: "flex-end", width: "75%", alignSelf: "center", marginTop: 20 }}  >
                  {this.props.hostAHunt == undefined && <DarkOutlineButton updateRef={this.props.updateSaveChallengeRef} text="Post Moment" style={{ backgroundColor: colorGetterFromProps.backgroundColor, width: "100%", justifyContent: 'center', alignItems: 'center', marginBottom: normalize(50), color: Colors.white }} onPress={(data) => { values.is_draft = false; handleSubmit(data) }} />}
                  {(this.props.hostAHunt != undefined) && <DarkOutlineButton text="Done" style={{ width: "70%" }} onPress={(data) => { values.is_draft = false; handleSubmit(data) }} />}
                </View>

              </View>
             </KeyboardAvoidingView>

</ScrollView>
            </View>
          )}
        </Formik>
      </ImageBackground >
    )
  }
}

const styles = StyleSheet.create({
  scorllViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },

  slide: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: "flex-end"
  },
  StickToRight: {
    alignSelf: "center",
    padding: normalize(15),
    backgroundColor: 'rgba(33,34,51,0.8)',
    borderRadius: 5,
    color: "#000",
    position: 'absolute',
    width: normalize(55),
    right: 5,
    top: normalize(60),
    zIndex: 999
  },
  icon: {
    marginTop: 5,
    marginBottom: 5,
    color: Colors.white
  },
  upperBox: {
    flexDirection: "row",
    backgroundColor: "rgba(33,34,51,0.7)",
    margin: normalize(9),
    width: "75%",
    height: normalize(45),
    alignSelf: "center",
    borderRadius: normalize(5),
    alignItems: "center",
    justifyContent: "center"
  },
  DownBox: {
    backgroundColor: "rgba(33,34,51,0.7)",
    borderRadius: normalize(5),
    color: Colors.white,
    height: normalize(45),
    justifyContent: "center",
    width: "75%",
    margin: normalize(9),
    alignSelf: "center",
    justifyContent: "center",
  },
  filterBox: {
    height: normalize(60),
    width: normalize(60),
    backgroundColor: "rgba(255,255,255,0.3)",
    margin: normalize(6),
    borderRadius: 3
  }
});