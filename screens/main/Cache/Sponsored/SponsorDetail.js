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
import ImageOverlay from "@image-overlay";
import { Avatar } from 'react-native-paper';
import { getSponsorPosts, getSponsorPostsSuccess } from '../../../../store/actions/SponsorActions';
import Loader from '../../../../components/Loader';
import { DummyPostBox, PostBox } from '../../../../components/shared/PostBox';
import Colors from '../../../../constants/Colors';
import { Icon } from "native-base"
let colorGetterFromProps = {};
let darkMode = false;
class SponsorDetail extends React.Component {

  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: true,
    data: [
    ],
    uuid: this.props.navigation.getParam("uuid", null),
    postData: this.props.navigation.getParam("postData", null)
  }

  componentDidMount() {
    this.props.getSponsorPosts({ limit: 10, offset: 0, uuid: this.state.uuid })
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.success) {
      if (props.sponsorPosts.length == 0) {
        this.setState({ data: [...this.state.data, ...props.sponsorPosts], loading: false, dataEnd: true })
      } else {
        this.setState({ data: [...this.state.data, ...props.sponsorPosts], loading: false, limit: this.state.limit, offset: (this.state.offset + 10) })
      }
      this.props.getSponsorPostsSuccess(false)
    }
  }

  snapOff() {
    // pass current challenge to CAMERA screen for preloading data
    var currentData = this.state.postData
    if (currentData) {
      currentData["snapOff"] = true
      this.props.navigation.navigate("CameraScreen", { postData: currentData, clearData: { stack: "CacheStack", screen: "Sponsored", navigateTo: "SponsorDetail", navigationData: { uuid: this.state.uuid, postData: this.state.postData } } })
    }
  }


  //   loadMore(){
  //     if(this.state.dataEnd == false && !(this.state.data.length < 10) ){
  //       const data = { offset: this.state.offset, limit: this.state.limit }
  //       this.props.getSponsorChallenges(data)
  //       this.setState({loading: true})
  //     }
  //   }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView >
          <ImageOverlay overlayAlpha={0.3} containerStyle={{ width: "100%", borderBottomWidth: 2, borderBottomColor: "white", alignItems: "flex-start", padding: 10 }} height={210} source={{ uri: this.state.postData.thumb }} >

            <View style={{ justifyContent: "space-between", flex: 1, width: "100%" }} >

              <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }} >
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 25, fontStyle: "italic" }} >{this.state.postData.title}</Text>
              </View>

              <View style={{ width: "100%", alignItems: "flex-end" }} >
                <TouchableOpacity onPress={() => this.snapOff()} >
                  <Icon name="ios-add-circle-outline" type="Ionicons" style={{ color: "white", fontSize: 42 }} />
                </TouchableOpacity>
              </View>

            </View>



          </ImageOverlay>

          <View style={{ borderRadius: 5, backgroundColor: colorGetterFromProps.homeBackground, padding: 10, margin: 10 }} >
            <Text style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 18 }} >Challenge:</Text>
            <Text style={{ fontStyle: "italic", fontSize: 16 }} >{this.state.postData.desc}</Text>
          </View>

          <View style={{ alignItems: "center" }} >
            <Text style={{ fontWeight: "bold", fontSize: 18, fontStyle: "italic", marginBottom: 10 }} >Trending Posts <Icon name="flame" type="Octicons" style={{ fontSize: 24 }} /></Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }} >
              {this.state.data.map((post, id) => {
                return <PostBox key={id} ch={post} index={id} data={this.state.data} />
              })}
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    sponsorPosts: state.sponsorReducer.sponsorPosts,
    success: state.sponsorReducer.sponsorPostsSuccess,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getSponsorPosts,
  getSponsorPostsSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(SponsorDetail));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
