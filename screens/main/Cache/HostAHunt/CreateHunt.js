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
import { Badge } from "react-native-paper"
import ImageOverlay from "@image-overlay";
import { Icon } from "native-base";
import { NativeButton, RoundButton, OutlineButton, DarkOutlineButton } from '../../../../components/shared/Button/Button';
import { RegularInput, TextInputPaper } from '../../../../components/shared/FormFields';
import NavigationService from '../../../../services/NavigationService';
import { saveHunt } from "../../../../store/actions/HuntActions"
let colorGetterFromProps = {};
let darkMode = false;
class CreateHunt extends React.Component {

  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: false,
    data: [
      "",
      ""
    ],
    title: "",
    posts: [],
  }

  //   componentDidMount(){
  //     this.props.getSponsorPosts({ limit: 10, offset: 0, uuid: this.state.uuid })
  //   }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      title: props.navigation.getParam("title", ""),
      posts: props.navigation.getParam("posts", []),
    })
  }

  saveHunt() {
    var data = {}
    data["title"] = this.state.title
    data["challenges"] = this.state.posts
    data["members"] = this.props.selectedFriends
    this.props.saveHunt(data)
  }

  //   loadMore(){
  //     if(this.state.dataEnd == false && !(this.state.data.length < 10) ){
  //       const data = { offset: this.state.offset, limit: this.state.limit }
  //       this.props.getSponsorChallenges(data)
  //       this.setState({loading: true})
  //     }
  //   }

  handleChange(val) {
    if (val != "") {
      this.setState({ title: val })
    }
  }

  createChallenge() {
    this.props.navigation.navigate("CameraScreen",
      {
        hostAHunt: true,
        clearData: {
          stack: "CacheStack",
          screen: "CreateHuntScreen",
          navigateTo: "CreateHuntScreen",
          navigationData: {
            title: this.state.title,
            posts: this.state.posts
          }
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={{ width: "100%" }} >

          <RegularInput placeholder={"Hunt Title"} style={{ marginTop: 10, marginBottom: 10 }} value={this.state.title} onChangeText={(val) => this.handleChange(val)} />

          {this.state.posts.map((post) => (
            <View style={{ width: "100%", marginBottom: 10 }} >

              <ImageOverlay overlayAlpha={0.3} rounded={5} containerStyle={{ width: "100%", borderBottomWidth: 2, borderBottomColor: "white", alignItems: "flex-start", padding: 10 }} height={210} source={{ uri: post.media }} >
                <View style={{ flex: 1, width: "100%" }} >

                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 25, fontStyle: "italic" }} >{post.description}</Text>
                  </View>

                </View>
              </ImageOverlay>
            </View>
          ))}


          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => this.createChallenge()} >
            <Icon type={"AntDesign"} name="pluscircleo" style={{ color: "black", marginBottom: 5 }} />
            <Text>Add Challenge</Text>
          </TouchableOpacity>

        </ScrollView>




        <View style={{ flexDirection: "row", justifyContent: "space-around", borderTopWidth: 0.5, width: "100%", borderTopColor: "grey", paddingTop: 10 }} >
          <DarkOutlineButton text={"Invite Friends"} small={true} onPress={() => NavigationService.navigate("InviteFriendsScreen")}>

            {this.props.selectedFriends.length > 0 && <Badge style={{ backgroundColor: "#f84e50", color: "#fff", position: "absolute", top: -8, right: 5 }} size={18} >
              {this.props.selectedFriends.length}
            </Badge>}

          </DarkOutlineButton>
          {/* <DarkOutlineButton text={"Add Challenge"} small={true} /> */}
          <DarkOutlineButton text={"Save Hunt"} small={true} onPress={() => this.saveHunt()} />
        </View>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedFriends: state.huntReducer.selectedFriends,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  saveHunt
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(CreateHunt));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
