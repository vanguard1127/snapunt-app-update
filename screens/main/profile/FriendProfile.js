import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { getFriendProfile, getfriendProfileSuccess } from '../../../store/actions/UserActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import Colors from '../../../constants/Colors';
import { Avatar, Badge } from 'react-native-paper';
import { NativeButton, OutlineButton, DarkOutlineButton } from '../../../components/shared/Button/Button';
import { Icon, Button } from 'native-base';
import { PostBoxProfile, DraftBox } from '../../../components/shared/PostBox';
import Loader from '../../../components/Loader';
import NavigationService from '../../../services/NavigationService';
import { withNavigationFocus } from 'react-navigation';
import ActionSheet from 'react-native-actionsheet'
import { follow } from "../../../store/actions/FollowActions"
import { profileService } from '../../../services/ProfileService';
import * as Linking from 'expo-linking';
import { addPrefix } from '../../../helpers/CommonMethods';
import normalize from 'react-native-normalize';
let colorGetterFromProps = {};
let darkMode = false;
class FriendProfile extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null
    }
  };

  state = {
    profileData: {
      followers_count: 0,
      followings_count: 0,
      points: 0
    },
    loading: true,
    dataEnd: false,
    limit: 20,
    offset: 0,
    refresh: false,
    owner: this.props.navigation.getParam("owner", null),
    title: "",
    options: [],
    actionType: null,
    challengeType: 0,
    second: false,
    tabChange: 0
  }

  toggleChallengeType(type) {
    var profileData = this.state.profileData
    profileData.challenges = []
    this.setState({
      challengeType: type,
      offset: 0,
      loading: true,
      dataEnd: false,
      profileData: profileData
    })
    this.props.getFriendProfile({ limit: this.state.limit, offset: 0, profileId: this.state.owner.id, type: type, second: this.state.second })
  }

  componentDidMount() {
    this.props.getFriendProfile({ limit: this.state.limit, offset: this.state.offset, profileId: this.state.owner.id, type: this.state.challengeType, second: this.state.second })
  }

  UNSAFE_componentWillMount() {
    // StatusBar.setBarStyle('dark-content', true);
  }

  // _refresh(){
  //   this.setState({loading: true})
  //   this.props.getProfile(false)
  // }

  loadMore() {
    if (!this.onEndReachedCalledDuringMomentum) {
      if (this.state.dataEnd == false) {
        const data = { offset: this.state.offset, limit: this.state.limit, profileId: this.state.owner.id, type: this.state.challengeType, second: this.state.second }
        this.props.getFriendProfile(data)
        this.onEndReachedCalledDuringMomentum = true;
      }
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.success) {
      if (this.state.offset == 0 && !this.state.second) {
        if (props.profileData.challenges.length == 0) {
          this.setState({ profileData: props.profileData, loading: false, dataEnd: true, second: true })
        } else {
          this.setState({ profileData: props.profileData, limit: this.state.limit, offset: (this.state.offset + 20), second: true })
        }
        this.props.navigation.setParams({
          username: this.state.owner.username
        })
      } else {
        var profileData = this.state.profileData
        profileData["challenges"] = [...this.state.profileData.challenges, ...props.profileData]
        if (props.profileData.length < 20) {
          this.setState({ profileData: profileData, offset: (this.state.offset + 20), refreshLoading: false, loading: false, dataEnd: true })
        } else {
          this.setState({ profileData: profileData, offset: (this.state.offset + 20), refreshLoading: false })
        }
      }
      this.props.getfriendProfileSuccess(false)
    }



    if (this.state.owner && this.state.owner.id != props.navigation.getParam("owner").id) {
      this.setState({
        owner: props.navigation.getParam("owner"),
        offset: 0,
        loading: true,
        second: false,
        dataEnd: false,
        profileData: {
          followers_count: 0,
          followings_count: 0,
          points: 0
        }
      })
      this.props.getFriendProfile({ limit: this.state.limit, offset: 0, profileId: props.navigation.getParam("owner").id, type: this.state.challengeType, second: false })
    }
    //   if(props.navigation.getParam("refresh") != undefined){
    //       this.props.getProfile({limit: this.state.limit, offset: 0, profileId: this.state.profileId})
    //       this.props.navigation.setParams({ refresh: false })
    //       this.setState({ refresh: true, offset: 0 })
    //   }
    //   if(props.isFocused && this.state.profileId != this.props.profileData.uuid){
    //       this.props.getProfile({limit: this.state.limit, offset: 0, profileId: this.state.profileId})
    //       this.setState({ refresh: true, offset: 0 })
    //   }
  }

  handleFollow = (type) => {
    var { profileData } = this.state
    this.props.follow(this.state.owner.id)
    if (type == "unfollow") {
      profileData["request_status"] = null
    } else if (type == "follow") {
      profileData["request_status"] = profileData.is_private ? "pending" : "active"
    } else if (type == "sent") {
      profileData["request_status"] = null
    }
    this.setState({ profileData: profileData })
  }

  getActionsSheet = ({ type }) => {

    var actionType = type
    var title = ""
    var options = []

    if (type == "unfollow") {
      title = 'Do you want to unfollow ' + this.state.owner.username + '?'
      options = ['Yes', 'No']
    } else if (type == "sent") {
      title = 'Do you want to cancel request for ' + this.state.owner.username + '?'
      options = ['Yes', 'No']
    }
    // console.log(title, options)
    this.setState({ actionType: actionType, title: title, options: options })
    setTimeout(() => {
      this.ActionSheet.show()
    }, 100);
  }

  render() {
    var { user } = this.props
    return (
      <View style={[styles.container, { backgroundColor: colorGetterFromProps.white }]}>
        <View style={[styles.StickToTop, {
          backgroundColor: colorGetterFromProps.white,
          color: colorGetterFromProps.black,
        }]}>
          <View style={{ flexDirection: "row", alignItems: "center", height: normalize(50), backgroundColor: colorGetterFromProps.white, }} >
            <View style={{ flex: 0.7 }}>
              <Icon onPress={() => {
                NavigationService.goBack()
              }} name="back" type="AntDesign" style={{ color: colorGetterFromProps.backgroundColor, fontSize: 25, marginLeft: normalize(20) }} />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }} >
            <View style={{ flex: 1, alignItems: "center", marginTop: normalize(20) }} >
              <Image size={100} source={{ uri: this.state.owner.avatar }} style={{
                height: normalize(70), width: normalize(70), borderRadius: 50, marginTop: normalize(10), marginBottom: normalize(10), alignSelf: "center", borderWidth: 3,
                borderColor: "#BDBFCB"
              }} />

            </View>
            <View style={{ flex: 1, alignItems: "flex-start" }} >
              <View style={{ flex: 1, alignItems: "flex-start", marginTop: normalize(20) }}>
                <Text style={{ fontSize: normalize(25), color: colorGetterFromProps.lightGrey, marginTop: normalize(10) }}>{this.state.owner.username}</Text>
                <Text style={{ fontSize: normalize(15), color: colorGetterFromProps.lightGrey }}>{this.state.owner.name}</Text>
                {(this.state.profileData.website != null && this.state.profileData.website != "") && <TouchableOpacity onPress={() => Linking.openURL(addPrefix(user.website))} ><Text style={{ fontSize: normalize(15), color: "#45b6fe", marginTop: normalize(10) }}>
                  {this.state.profileData.website}
                </Text></TouchableOpacity>}
              </View>

            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <View style={{ width: "100%", alignItems: "flex-end" }} >
                {user.id == this.state.owner.id ? (
                  <Button text={"Edit Profile"} small={true} onPress={() => NavigationService.navigate("EditProfile")} />)
                  : (
                    this.state.profileData.request_status == "active" ? (
                      <Button onPress={this.getActionsSheet} params={{ type: "unfollow" }} style={{ height: normalize(30), backgroundColor: colorGetterFromProps.redError, width: "70%", marginRight: normalize(10), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colorGetterFromProps.violetXblue }}>
                        <Text style={{ color: Colors.white }}>Unfollow</Text>
                      </Button>
                    ) : (
                        this.state.profileData.request_status == "pending" ? (
                          <Button params={{ type: "sent" }} onPress={this.getActionsSheet} style={{ height: normalize(30), backgroundColor: colorGetterFromProps.mainDark, width: "70%", marginRight: normalize(10), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colorGetterFromProps.violetXblue }}>
                            <Text style={{ color:Colors.white }}>Pending</Text>
                          </Button>
                        ) : (
                            <Button onPress={this.handleFollow} params={{ type: "follow" }} style={{ height: normalize(30), backgroundColor: colorGetterFromProps.mainDark, width: "70%", marginRight: normalize(10), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colorGetterFromProps.violetXblue }}>
                              <Text style={{ color: Colors.white }}>Follow</Text>
                            </Button>
                          )
                      )
                  )
                }
              </View>
            </View>
          </View>
        </View>
        <FlatList
          data={this.state.profileData.challenges}
          numColumns={2}
          style={{ width: "100%", paddingBottom: normalize(100) }}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={({ item, index }) => (
            
              
                <PostBoxProfile
                  detailData={
                    {
                      data: [this.state.profileData.challenges[index]],
                      offset: index,
                      limit: this.state.limit,
                      params: { profileId: this.state.owner.id, type: this.state.challengeType, second: this.state.second },
                      apiCall: profileService.getProfile,
                      index: index
                    }
                  }
                  key={index} ch={item} index={index} hideDesc={true} />
              
          )}
          keyExtractor={item => item.uuid}
          ListFooterComponent={this.state.loading ? (<Loader />) : null}
          ListHeaderComponent={() => (
            <View style={{ padding: 5 }} >

              <View style={{ padding: normalize(30), marginTop: normalize(200) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Followers")} >
                    <Text style={{ fontSize: normalize(20), color: colorGetterFromProps.backgroundColor, marginTop: normalize(10) }}>{this.state.profileData.followers_count}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Followings")} >
                    <Text style={{ fontSize: normalize(20), color: colorGetterFromProps.backgroundColor, marginTop: normalize(10) }}>{this.state.profileData.followings_count}</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: normalize(20), color: colorGetterFromProps.backgroundColor, marginTop: normalize(10) }}>{this.state.profileData.points}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <Text style={{ fontSize: normalize(15), color: colorGetterFromProps.lightGrey }}>Followers</Text>
                  <Text style={{ fontSize: normalize(15), color: colorGetterFromProps.lightGrey }}>Followings</Text>
                  <Text style={{ fontSize: normalize(15), color: colorGetterFromProps.lightGrey }}>SnapScore</Text>
                </View>
                {(this.state.profileData.bio != null && this.state.profileData.bio != "") && <View>
                  <Text style={{ color: colorGetterFromProps.lightGrey, fontSize: normalize(15), fontWeight: "200", marginTop: normalize(30) }}>BIO</Text>
                  <Text style={{ color: "#717088", fontSize: normalize(20) }}>{this.state.profileData.bio}</Text>
                </View>}

              </View>

              {/* <View>
              <DarkOutlineButton text={"Edit Profile"} style={{marginTop: 10}} small={true} onPress={() => NavigationService.navigate("EditProfile")} />
            </View> */}
              <View style={{ flexDirection: "row", borderWidth: 0, padding: normalize(30) }} >
                <TouchableOpacity onPress={() => { this.toggleChallengeType(0); this.setState({ tabChange: 0 }) }} style={{ width: "33%", alignItems: "center", padding: 5, borderRightWidth: 0 }} >
                  <Text style={{ color: this.state.challengeType == 0 ? colorGetterFromProps.DarkestVioletBlue : colorGetterFromProps.violetXblue, marginRight: normalize(20) }}>Challenges</Text>
                </TouchableOpacity>
                <View style={{ width: normalize(130), height: normalize(10), backgroundColor: "#f7f6f6", borderRadius: 10, marginTop: normalize(15) }}>
                  <TouchableOpacity style={{ width: normalize(20), height: normalize(20), backgroundColor: colorGetterFromProps.backgroundColor, marginTop: normalize(-3), borderRadius: 15, marginLeft: this.state.tabChange }}></TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { this.toggleChallengeType(2); this.setState({ tabChange: 120 }) }} style={{ width: "33%", alignItems: "center", padding: 5 }} >
                  <Text style={{ color: this.state.challengeType == 2 ? colorGetterFromProps.DarkestVioletBlue : colorGetterFromProps.violetXblue, marginLeft: normalize(20) }}>Pinned</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        />



        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={this.state.title}
          options={this.state.options}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={(index) => { index == 0 && this.handleFollow(this.state.actionType) }}
        />

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.userReducer.friendProfileSuccess,
    profileData: state.userReducer.friendProfileData,
    user: userSelector(state),
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getFriendProfile,
  getfriendProfileSuccess,
  follow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendProfile);

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  followContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: "row",
    borderTopColor: "lightgrey",
    borderBottomColor: "lightgrey",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginTop: 15,
    padding: 10,
  },
  container: {
    flex: 1
  },
  posts: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: "center",
  },
  StickToTop: {
    alignSelf: "center",
    padding: normalize(10),
    position: 'absolute',
    width: "100%",
    top: 0,
    zIndex: 999
  },
});
