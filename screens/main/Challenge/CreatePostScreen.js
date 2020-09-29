import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CreatePostForm from './CreatePostForm';
import { saveChallenge, deleteDraft, updateSaveChallengeRef } from "../../../store/actions/ChallengeActions"
import { connect } from 'react-redux';
import NavigationService from '../../../services/NavigationService';
import { userSelector } from '../../../store/selectors/UserSelector';
import Loader from '../../../components/Loader';
import PaymentMethod from '../../../components/shared/modal/PaymentMethod';
import { Icon } from "native-base";
import normalize from 'react-native-normalize';
import Colors from '../../../constants/Colors';
let colorGetterFromProps = {};
let darkMode = false;
const subscriptionAlert = () =>
  Alert.alert(
    "Payment Method",
    "You haven't added payment method, It is required to create featured challenge.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Add", onPress: () => NavigationService.navigate("AddCard") }
    ],
    { cancelable: false }
  );


class CreatePostScreen extends React.Component {
  submitButton = null
  draftBtn = null
  isDraft = false

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false
    };
  };

  constructor(props) {
    super(props);
    this.updateSaveChallengeRef = this.updateSaveChallengeRef.bind(this);
    this.updateDraftRef = this.updateDraftRef.bind(this);
    console.log("CreatePostScreen constructor");
  }

  state = {
    mainMedia: this.props.navigation.getParam("filter_uri", null) ? this.props.navigation.getParam("filter_uri", null) : this.props.navigation.getParam("uri"),
    isVideo: this.props.navigation.getParam("isVideo"),
    paymentModal: false
  };

  toggleModal = () => {
    this.setState({
      paymentModal: !this.state.paymentModal
    })
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.navigation.getParam("addCard")) {
      if (this.isDraft) {
        this.draftBtn.props.onPress()
      } else {
        this.submitButton.props.onPress()
      }
      props.navigation.setParams({ addCard: null })
    }
  }

  updateSaveChallengeRef(input) {
    this.submitButton = input
  }

  updateDraftRef(input) {
    this.draftBtn = input
  }

  handleSubmit(data) {
    this.isDraft = data.is_draft
    if (!data.featured || (data.featured && this.props.user.paid)) {
      var clearData = this.props.navigation.getParam("clearData")
      data["clearData"] = clearData
      data["hostAHunt"] = this.props.navigation.getParam("hostAHunt")
      if (data["hostAHunt"] != undefined) {
        console.log("hostAHunt defined");
        delete data["clearData"]
        clearData.navigationData.posts.push(data)
        NavigationService.navigate(clearData.navigateTo, { title: clearData.navigationData.title, posts: clearData.navigationData.posts })
      } else {
        console.log("hostAHunt undefined");
        this.props.saveChallenge(data)
      }
    } else {
      console.log("subscriptionAlert")
      subscriptionAlert()
    }
    console.log("Submitted")
  }

  deleteDraft(data) {
    this.props.deleteDraft(data)
  }
 
  render() {
    var postData = this.props.navigation.getParam("postData")

    return (

      <View style={{ flex: 1 }}>

        <View style={styles.container}>
          <View style={{ flexDirection: "row",  backgroundColor: "transparent", position: "absolute", top: 20, zIndex: 9999 }}>
            <TouchableOpacity
              onPress={() => {
                NavigationService.goBack()
              }}>
              <Icon name="keyboard-arrow-left" type="MaterialIcons" style={{ margin: normalize(5), color: colorGetterFromProps.backgroundColor, fontSize: normalize(40) }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }}>
              <Text style={{ color: colorGetterFromProps.backgroundColor, textAlign: "center", marginLeft: normalize(-30), fontSize: normalize(25), marginTop: normalize(5) }}>Share Moment</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.StickToRight}>
            <View style={{ flexDirection: "column" }}>
              <Icon type="Entypo" name="crop" style={styles.icon} />
              <Icon type="Entypo" name="scissors" style={styles.icon} />
              <Icon type="Entypo" name="lock" style={styles.icon} />
              <Icon type="AntDesign" name="download" style={styles.icon} />
            </View>
          </View>
          <View style={{ flex: 1, marginTop: normalize(-10) }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

              <CreatePostForm
                showFilter={this.showFilter}
                isVideo={this.state.isVideo}
                mainMedia={this.state.mainMedia}
                postData={postData}
                onSubmit={(data) => this.handleSubmit(data)}
                deleteDraft={(data) => this.deleteDraft(data)}
                hostAHunt={this.props.navigation.getParam("hostAHunt", undefined)}
                featured={this.props.user.featured}
                updateSaveChallengeRef={this.updateSaveChallengeRef}
                updateDraftRef={this.updateDraftRef}
              />

            </TouchableWithoutFeedback>
          </View>
          {/* {this.state.paymentModal && <PaymentMethod modalVisible={this.state.paymentModal} toggleModal={this.toggleModal} /> } */}
        </View>
      </View>

    )
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    saveChallengeSuccess: state.challengeReducer.saveChallengeSuccess,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  saveChallenge,
  deleteDraft
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostScreen);


const styles = StyleSheet.create({
  scorllViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  upperBox: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    padding: 10
  },
  slide: {
    width: '100%',
    height: '100%',
    flex: 1
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
    color: Colors.violetXblue
  }
});