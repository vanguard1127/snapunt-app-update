import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SectionList,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { userSelector } from '../../../store/selectors/UserSelector';
import Colors from '../../../constants/Colors';
import { DummyPostBox, DummyPostBoxDiscover, PostBox, PostBoxDiscover, PostBoxProfile } from '../../../components/shared/PostBox';
import Constants from 'expo-constants';
import { Tab, Tabs, Icon } from 'native-base';
import { Avatar } from 'react-native-paper';
import { searchResults, flatResults } from "../../../store/actions/DiscoverActions"
import { follow } from "../../../store/actions/FollowActions"
import { RoundButton } from '../../../components/shared/Button/Button';
import ActionSheet from 'react-native-actionsheet'
import { discoverService } from '../../../services/DiscoverService';
let colorGetterFromProps = {};
let darkMode = false;
class SearchScreen extends React.Component {

  state = {
    sectionData: [
      {
        title: "USERS",
        data: []
      },
      {
        title: "CHALLENGES",
        data: []
      }
    ],
    flatData: [],
    page: 0,
    visible: false,
    following_id: null,
    is_private: false,
    followObj: {
      owner: {
        id: null, username: ""
      }
    }
  }

  componentDidMount() {
    this.props.searchResults({ username: this.props.username })
    this.props.flatResults({ username: this.props.username })
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.searchResultsSuccess) {
      this.setState({ sectionData: props.fullResults })
    }

    if (props.flatResultsSuccess) {
      this.setState({ flatData: props.flatUsers })
    }
  }

  handleFollow(uuid, is_private, type = "follow") {
    let updatedFlatList = []
    let updatedSectionList = []
    this.props.follow(uuid)

    updatedFlatList = this.state.flatData.map((item) => {
      if (item.owner.id == uuid) {
        if (type == "follow") {
          item.follow_status = is_private ? "pending" : "active"
        } else {
          item.follow_status = null
        }
      }
      return item
    })
    // update section data
    let sectionData = this.state.sectionData
    updatedSectionList = sectionData[0].data.map((item) => {
      if (item.owner.id == uuid) {
        if (type == "follow") {
          item.follow_status = is_private ? "pending" : "active"
        } else {
          item.follow_status = null
        }
      }
      return item
    })
    sectionData[0].data = updatedSectionList
    this.setState({ is_private: is_private, sectionData: sectionData, flatData: updatedFlatList })
  }

  showActionSheet = (followObj) => {
    this.setState({ followObj: followObj })
    this.ActionSheet.show()
  }

  gotToFriendProfile(owner) {
    this.props.navigation.navigate("FriendProfile", { owner: owner })
  }

  render() {
    const { searchResultsSuccess, searchResults } = this.props
    return (

      <View style={{ flex: 1 }} >
        <Tabs locked={true} tabBarUnderlineStyle={{ backgroundColor: colorGetterFromProps.darkGrey }} page={this.state.page} onChangeTab={(d) => { this.setState({ page: d.i }) }}  >
          <Tab heading="TOP" tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} textStyle={{ color: colorGetterFromProps.darkGrey }} activeTextStyle={{ color: colorGetterFromProps.darkGrey }}>

            <SectionList
              sections={this.state.sectionData}

              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index, section }) => {
                var index1 = index * 3
                var index2 = index1 + 1
                var index3 = index2 + 1

                return section.title == "USERS" ? (
                  <View style={{ padding: 20 }} >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                      <View style={{ flexDirection: "row" }} >
                        <Avatar.Image style={styles.avatar} size={50} source={{ uri: item.owner.avatar }} />
                        <View>
                          <TouchableOpacity onPress={() => this.gotToFriendProfile(item.owner)} ><Text style={{ fontSize: 16 }} >{item.owner.name}</Text></TouchableOpacity>
                          <Text style={{ fontSize: 12, color: "grey", marginBottom: 3 }} >{item.owner.username}</Text>
                          <Text style={{ fontSize: 11, color: "grey" }} >{item.followers_count} Followers  |  {item.challenges_count} Challenges</Text>
                        </View>
                      </View>
                      {item.follow_status == "active" && (<RoundButton style={{ borderColor: colorGetterFromProps.backgroundColor }} textColor={colorGetterFromProps.backgroundColor} onPress={() => this.showActionSheet(item)} text={"Following"} />)}
                      {item.follow_status == "pending" && (<RoundButton style={{ borderColor: colorGetterFromProps.backgroundColor }} textColor={colorGetterFromProps.backgroundColor} onPress={() => this.showActionSheet(item)} text={"Pending"} />)}
                      {item.follow_status == null && (<RoundButton style={{ borderColor: colorGetterFromProps.backgroundColor }} textColor={colorGetterFromProps.backgroundColor} onPress={() => this.handleFollow(item.owner.id, item.private)} text={"Follow"} />)}

                    </View>

                    {index == (this.state.sectionData[0].data.length - 1) && <TouchableOpacity onPress={() => this.setState({ page: 1 })} ><Text style={{ color: "grey", textDecorationLine: "underline", marginTop: 20, fontSize: 14 }} >View More</Text></TouchableOpacity>}

                  </View>
                ) : (
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "center" }} >
                      {section.data[index1] != undefined && <PostBoxProfile
                        detailData={
                          {
                            data: [section.data[index1]],
                            offset: index1,
                            params: { username: this.props.username, detail: true },
                            apiCall: discoverService.getSearchResults,
                            index: index1
                          }
                        }
                        handleDetailState={this.props.handleDetailState} index={index1} ch={section.data[index1]} data={section.data} />}
                      {section.data[index2] != undefined && <PostBoxProfile
                        detailData={
                          {
                            data: [section.data[index2]],
                            offset: index2,
                            params: { username: this.props.username, detail: true },
                            apiCall: discoverService.getSearchResults,
                            index: index2
                          }
                        } handleDetailState={this.props.handleDetailState} index={index2} ch={section.data[index2]} data={section.data} />}

                    </View>
                  )
              }
              }
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.heading}>{title}</Text>
              )}
            />

          </Tab>
          <Tab heading="USERS" tabStyle={{ backgroundColor: "#fff" }} activeTabStyle={{ backgroundColor: "#fff" }} textStyle={{ color: colorGetterFromProps.darkGrey }} activeTextStyle={{ color: colorGetterFromProps.darkGrey }}>
            <FlatList
              data={this.state.flatData}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) =>
                (
                  <View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 15, paddingLeft: 10, paddingRight: 10 }} >
                      <View style={{ flexDirection: "row" }} >
                        <Avatar.Image style={styles.avatar} size={50} source={{ uri: item.owner.avatar }} />
                        <View>
                          <TouchableOpacity onPress={() => this.gotToFriendProfile(item.owner)} ><Text style={{ fontSize: 16 }} >{item.owner.name}</Text></TouchableOpacity>
                          <Text style={{ fontSize: 12, color: "grey", marginBottom: 3 }} >@{item.owner.username}</Text>
                          <Text style={{ fontSize: 11, color: "grey" }} >{item.followers_count} Followers  |  {item.challenges_count} Challenges</Text>
                        </View>
                      </View>

                      {item.follow_status == "active" && (<RoundButton style={{ borderColor: colorGetterFromProps.backgroundColor }} textColor={colorGetterFromProps.backgroundColor} onPress={() => this.showActionSheet(item)} text={"Following"} />)}
                      {item.follow_status == "pending" && (<RoundButton style={{ borderColor: colorGetterFromProps.backgroundColor }} textColor={colorGetterFromProps.backgroundColor} onPress={() => this.showActionSheet(item)} text={"Pending"} />)}
                      {item.follow_status == null && (<RoundButton style={{ borderColor: colorGetterFromProps.backgroundColor }} textColor={colorGetterFromProps.backgroundColor} onPress={() => this.handleFollow(item.owner.id, item.private)} text={"Follow"} />)}
                    </View>
                  </View>

                )
              }
            />
          </Tab>
        </Tabs>

        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Do you want to unfollow ' + this.state.followObj.owner.username + '?'}
          options={['Unfollow', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={(index) => { index == 0 && this.handleFollow(this.state.followObj.owner.id, this.state.followObj.private, "unfollow") }}
        />

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fullResults: state.discoverReducer.fullResults,
    searchResultsSuccess: state.discoverReducer.searchResultsSuccess,
    flatResultsSuccess: state.discoverReducer.flatResultsSuccess,
    flatUsers: state.discoverReducer.flatUsers,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  searchResults,
  flatResults,
  follow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fff"
  },
  tileYellow: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  tileRed: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  tileGreen: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  postContainer: {
    flex: 1
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
    color: colorGetterFromProps.darkGrey
  },
  p: {
    color: colorGetterFromProps.darkGrey
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  avatar: {
    marginRight: 8
  }
});
