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
import { getFollowers, getFollowersSuccess } from '../../../store/actions/FollowActions';
import Loader from '../../../components/Loader';
import { List, ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';
import { RoundButton } from '../../../components/shared/Button/Button';
import ActionSheet from 'react-native-actionsheet'
import { follow } from "../../../store/actions/FollowActions"
import Colors from '../../../constants/Colors';
import normalize from "react-native-normalize";

let colorGetterFromProps = {};
let darkMode = false;
class ViewFollowers extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colorGetterFromProps.diffrentBack,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: normalize(80)
      },
    };
  };
  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: true,
    data: [],
    followObj: {
      owner: {
        id: null, username: ""
      }
    },
    userId: this.props.navigation.getParam("userId", null),
  }

  componentDidMount() {
    this.props.getFollowers({ limit: 10, offset: 0, userId: this.state.userId })
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.success) {
      if (props.followers.length == 0) {
        this.setState({ data: [...this.state.data, ...props.followers], loading: false, dataEnd: true })
      } else {
        this.setState({ data: [...this.state.data, ...props.followers], loading: false, limit: this.state.limit, offset: (this.state.offset + 10) })
      }
      this.props.getFollowersSuccess(false)
    }
  }

  loadMore() {
    if (this.state.dataEnd == false && !(this.state.data.length < 10)) {
      const data = { offset: this.state.offset, limit: this.state.limit, userId: this.state.userId }
      this.props.getFollowers(data)
      this.setState({ loading: true })
    }
  }

  handleFollow(uuid, is_private, type = "follow") {
    let updatedFlatList = []
    this.props.follow(uuid)

    updatedFlatList = this.state.data.map((item) => {
      if (item.owner.id == uuid) {
        if (type == "follow") {
          item.follow_status = is_private ? "pending" : "active"
        } else {
          item.follow_status = null
        }
      }
      return item
    })

    this.setState({ is_private: is_private, data: updatedFlatList })
  }

  gotToFriendProfile(owner) {
    this.props.navigation.navigate("FriendProfile", { owner: owner })
  }

  showActionSheet = (followObj) => {
    this.setState({ followObj: followObj })
    this.ActionSheet.show()
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: colorGetterFromProps.white}]}>

        <List>
          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) => (

              <ListItem thumbnail>
                <Left>
                  <Thumbnail source={{ uri: item.owner.avatar }} />
                </Left>
                <Body>
                  <TouchableOpacity onPress={() => this.gotToFriendProfile(item.owner)} >
                    <Text style={{ fontSize: 16, fontWeight: "bold", olor: Colors.violetXblue }} >{item.owner.name}</Text>
                    <Text style={{ color: Colors.violetXblue }} note>{item.owner.username}</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  {item.follow_status == "active" && (<RoundButton style={{ borderColor: colorGetterFromProps.backgroundColor }} textColor={colorGetterFromProps.backgroundColor} onPress={() => this.showActionSheet(item)} text={"Following"} />)}
                  {item.follow_status == "pending" && (<RoundButton style={{ borderColor: colorGetterFromProps.backgroundColor }} textColor={colorGetterFromProps.backgroundColor} onPress={() => this.showActionSheet(item)} text={"Pending"} />)}
                  {item.follow_status == null && (<RoundButton style={{ borderColor: colorGetterFromProps.backgroundColor }} textColor={colorGetterFromProps.backgroundColor} onPress={() => this.handleFollow(item.owner.id, item.private)} text={"Follow"} />)}
                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.owner.id}
            onEndReached={() => this.loadMore()}
            onEndReachedThreshold={0.01}
            ListFooterComponent={this.state.loading ? (<Loader />) : null}
            ListEmptyComponent={!this.state.loading ? <Text style={{ fontSize: 12, color: "lightgrey", textAlign: "center" }} >No Follwings Found</Text> : null}
          />
        </List>
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
    followers: state.followReducer.followers,
    success: state.followReducer.getFollowersSuccess,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getFollowers,
  getFollowersSuccess,
  follow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewFollowers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
});
