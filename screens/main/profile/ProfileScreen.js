import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { logout, getProfile, getProfileSuccess, toggleTheme } from '../../../store/actions/UserActions';
import { getPinPost } from '../../../store/actions/ChallengeActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import Colors from '../../../constants/Colors';
import { Avatar, Badge, Button } from 'react-native-paper';
import { NativeButton, OutlineButton, DarkOutlineButton } from '../../../components/shared/Button/Button';
import { Icon } from 'native-base';
import { PostBox, PostBoxDiscover, PostBoxProfile, DraftBox } from '../../../components/shared/PostBox';
import Loader from '../../../components/Loader';
import NavigationService from '../../../services/NavigationService';
import { profileService } from '../../../services/ProfileService';
import * as Linking from 'expo-linking';
import { addPrefix, normalizeFont } from '../../../helpers/CommonMethods';
import normalize from "react-native-normalize";
let colorGetterFromProps = {};
let darkMode = false;


const headerRightIcon = (navigation, params) => {
  return {
    headerRight: () => (
        <View style={{flexDirection: "row", alignItems: "center", height: "100%"}} >

          <TouchableOpacity style={{height: "100%", justifyContent: "center"}}  onPress={() => {
              navigation.setParams({
                notification_count: params.notification_count - params.profileData.unread_notifications.unread_count,
              })
            navigation.navigate("Activity", { data: params.profileData.unread_notifications })
        } }>
            <Icon
              type="EvilIcons"
              name="bell"
              style={{
                fontSize: 25,
                color: colorGetterFromProps.backgroundColor,
                marginTop: normalize(10),
                marginRight: normalize(20)
              }}
              />
              { (params.notification_count > 0 ) && <Badge style={{ backgroundColor: "#fff", position: "absolute", top: 15, right: normalize(20)  }} size={13} > 
                {params.notification_count}
              </Badge>}
          </TouchableOpacity>
          <TouchableOpacity style={{height: "100%", justifyContent: "center"}}  onPress={() => navigation.navigate("Settings")}>
            <Icon
              type="Entypo"
              name="dots-three-vertical"
              style={{
                fontSize: 20,
                marginRight: normalize(20),
                color: colorGetterFromProps.backgroundColor,
                marginTop: normalize(10)
              }}
            />
          </TouchableOpacity>
        </View>
    )
  };
};

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
      var headerRight = headerRightIcon(navigation, params)
    return { 
        ...headerRight,
        title: "",
     };
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
    refreshLoading: false,
    profileId: this.props.navigation.getParam("profileId", null),
    challengeType: 0,
    second: false
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
    this.props.getProfile({ limit: this.state.limit, offset: 0, profileId: this.state.profileId, type: type, second: this.state.second })
  }

  componentDidMount() {
    this.props.navigation.setParams({ refresh: false })
    this.props.getProfile({ limit: this.state.limit, offset: this.state.offset, profileId: this.state.profileId, type: this.state.challengeType, second: this.state.second })
  }

  UNSAFE_componentWillMount() {
    // StatusBar.setBarStyle('dark-content', true);
  }

  componentDidUpdate(prevProps) {
    if (this.props.profileData.unread_notifications != undefined && prevProps.profileData.unread_notifications != this.props.profileData.unread_notifications) {
      this.props.navigation.setParams({
        notification_count: this.props.profileData.unread_notifications != undefined ? this.props.profileData.unread_notifications.count : 0,
        profileData: this.props.profileData,
        username: this.props.user.username
      })
    }
  }

  _refresh() {
    this.setState({ refreshLoading: true, offset: 0 })
    this.props.getProfile({ limit: this.state.limit, offset: 0, profileId: this.state.profileId, type: this.state.challengeType, second: this.state.second })
  }

  loadMore() {
    if (!this.onEndReachedCalledDuringMomentum) {
      if (this.state.dataEnd == false) {
        const data = { offset: this.state.offset, limit: this.state.limit, profileId: this.state.profileId, type: this.state.challengeType, second: this.state.second }
        this.props.getProfile(data)
        this.onEndReachedCalledDuringMomentum = true;
      }
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.success) {
      if (this.state.offset == 0 && !this.state.second) {
        if (props.profileData.challenges.length == 0) {
          this.setState({ profileData: props.profileData, loading: false, dataEnd: true, refreshLoading: false, second: true })
        } else {
          this.setState({ profileData: props.profileData, offset: (this.state.offset + 20), refreshLoading: false, second: true })
        }
      } else {
        var profileData = this.state.profileData
        if (this.state.refreshLoading) {
          profileData["challenges"] = props.profileData
        } else {
          profileData["challenges"] = [...this.state.profileData.challenges, ...props.profileData]
        }
        if (props.profileData.length < 20) {
          this.setState({ profileData: profileData, offset: (this.state.offset + 20), refreshLoading: false, loading: false, dataEnd: true })
        } else {
          this.setState({ profileData: profileData, offset: (this.state.offset + 20), refreshLoading: false })
        }
      }
      this.props.getProfileSuccess(false)
    }
    if (props.navigation.getParam("refresh") != undefined && props.navigation.getParam("refresh") != false) {
      this.setState({ offset: 0 })
      this.props.navigation.setParams({ refresh: false })
      this.props.getProfile({ limit: this.state.limit, offset: 0, profileId: this.state.profileId, type: this.state.challengeType, second: this.state.second })
    }
  }

  render() {
    var { user } = this.props
    return (
      <View style={[styles.container, { backgroundColor: colorGetterFromProps.white }]}>

          <View style={[styles.StickToTop, {
            backgroundColor: colorGetterFromProps.white,
            color: colorGetterFromProps.black,
          }]}>
            <StatusBar hidden={true} />
            <View style={{ flexDirection: "row", alignItems: "center", height: normalize(50), backgroundColor: colorGetterFromProps.white, }} >
              <View style={{ flex: 0.7 }}>
                <Icon onPress={() => {
                  NavigationService.goBack()
                }} name="back" type="AntDesign" style={{ color: colorGetterFromProps.backgroundColor, fontSize: 25, marginLeft: normalize(20) }} />
              </View>
              <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                  this.props.darkMode == false ?
                    this.props.toggleTheme(true)
                    :
                    this.props.toggleTheme(false)
                }} style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: 50, width: 50, alignItems: "center" }}>
                  <Icon name="brightness-medium" type="MaterialIcons" style={{ color: colorGetterFromProps.violetXblue, fontSize: 20, marginLeft: 20 }} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: 40, width: 40 }}>
                  <View></View>
                </TouchableOpacity>

              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: normalize(10) }}>
              <View style={{ flex: 1.3, alignItems: "center", marginLeft: normalize(30) }} >
                <Image source={{ uri: user.thumb }} style={{
                  height: normalize(70), width: normalize(70), borderRadius: 50, marginTop: normalize(10), marginBottom: normalize(10), alignSelf: "center", borderWidth: 3,
                  borderColor: "#BDBFCB"
                }} />
                <TouchableOpacity onPress={() => NavigationService.navigate("EditProfile")} >
                  <Badge style={{
                    borderRadius: 50, alignSelf: "center", width: normalize(30), height: normalize(30), marginTop: normalize(-20), shadowColor: "rgba(0,0,0,0.5)", shadowOffset: { width: 0, height: 9, }, shadowOpacity: 0.48, shadowRadius: 11.95, elevation: 18, backgroundColor: "#45b6fe"
                  }}>
                    <Text style={{ fontSize: normalize(22), color: "#fff", alignItems: "center", alignSelf: "center", textAlign: "center", justifyContent: "center" }}>+</Text>
                  </Badge>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 3, alignItems: "center", alignItems: "flex-start" }} >
                <View style={{ flex: 3, alignItems: "flex-start" }}>
                  <Text style={{ fontSize: normalize(25), color: colorGetterFromProps.lightGrey, marginTop: normalize(10) }}>{user.username
                  }</Text>
                  <Text style={{ fontSize: normalize(15), color: colorGetterFromProps.lightGrey }}>{user.first_name + " " + user.last_name}</Text>

                  {(user.website != null && user.website != "") && <TouchableOpacity onPress={() => Linking.openURL(addPrefix(user.website))} ><Text style={{ fontSize: normalize(15), color: "#45b6fe", marginTop: normalize(10) }}>
                    {user.website}
                  </Text></TouchableOpacity>}
                </View>
              </View>

            </View>
          </View>
        
        <ScrollView>
        <FlatList
          data={this.state.profileData.challenges}
          style={{ width: "100%"}}
          contentContainerStyle={{ alignItems: "center", paddingBottom: normalize(100) }}
          numColumns={2}
          renderItem={({ item, index }) => (
                <PostBoxProfile
                  detailData={
                    {
                      data: [this.state.profileData.challenges[index]],
                      offset: index,
                      limit: this.state.limit,
                      params: { profileId: this.state.profileId, type: this.state.challengeType, second: this.state.second },
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
              <View style={{ padding: normalize(30), marginTop: normalize(150) }}>
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
                {(user.bio != null && user.bio != "") && <View>
                  <Text style={{ color: colorGetterFromProps.lightGrey, fontSize: normalize(15), fontWeight: "200", marginTop: normalize(30) }}>BIO</Text>
                  <Text style={{ color: "#717088", fontSize: normalize(20) }}>{user.bio}</Text>
                </View>}
                {/* <TouchableOpacity onPress={this.change}>
                  <Text style={{ color: "#000" }}>ChangeScreen</Text>
                </TouchableOpacity> */}
              </View>
              {/* <View>
              <DarkOutlineButton text={"Edit Profile"} style={{marginTop: 10}} small={true} onPress={() => NavigationService.navigate("EditProfile")} />
            </View> */}
              <View style={{ flexDirection: "row", borderWidth: 0, padding: normalize(20) }} >
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
          onEndReachedThreshold={0.01}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onRefresh={() => this._refresh()}
          refreshing={this.state.refreshLoading}
        />
        </ScrollView>
        
      </View >
    );
  }
}

const mapStateToProps = state => {
  return {
    // user: userSelector(state),
    getProfileError: state.errorReducer.getProfileError,
    success: state.userReducer.getProfileSuccess,
    profileData: state.userReducer.profileData,
    user: userSelector(state),
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};
// const mapDispatchToProps = {
//   getProfile,
//   getProfileSuccess,
//   getPinPost
// };
const mapDispatchToProps = {
  // return {
  getProfile,
  getProfileSuccess,
  getPinPost,
  toggleTheme
  // }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexGrow: 1,
    position: "relative",
    zIndex: 1
    // alignItems: "center",
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
    flex: 1,
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
    zIndex: 2
  },

});
