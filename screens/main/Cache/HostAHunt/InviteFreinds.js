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
import { Avatar, TextInput } from 'react-native-paper';
import { setSelectedFriends } from '../../../../store/actions/HuntActions';
import { getFriends, getFriendSuccess } from '../../../../store/actions/FollowActions';
import Loader from '../../../../components/Loader';
import { DummyPostBox, PostBox } from '../../../../components/shared/PostBox';
import Colors from '../../../../constants/Colors';
import { NativeButton, RoundButton, OutlineButton, DarkOutlineButton } from '../../../../components/shared/Button/Button';
import { RegularInput, TextInputPaper } from '../../../../components/shared/FormFields';
let colorGetterFromProps = {};
let darkMode = false;
import { List, ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';
class InviteFriends extends React.Component {

  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: true,
    data: [],
    // selectedFriends: this.props.selectedFriends
  }

  componentDidMount() {
    console.log(this.props.selectedFriends)
    this.props.getFriends({ limit: 10, offset: 0 })
  }

  UNSAFE_componentWillReceiveProps(props) {
    console.log("inside receive props")
    if (props.success) {
      if (props.friends.length == 0) {
        this.setState({ data: [...this.state.data, ...props.friends], loading: false, dataEnd: true })
      } else {
        this.setState({ data: [...this.state.data, ...props.friends], loading: false, limit: this.state.limit, offset: (this.state.offset + 10) })
      }
      this.props.getFriendSuccess(false)
    }
  }

  loadMore() {
    if (this.state.dataEnd == false && !(this.state.data.length < 10)) {
      const data = { offset: this.state.offset, limit: this.state.limit }
      this.props.getFriends(data)
      this.setState({ loading: true })
    }
  }

  addFriend(uuid) {
    var newState = [...this.props.selectedFriends, uuid]
    this.props.setSelectedFriends(newState)
  }

  dropFriend(uuid) {
    var selectedFriends = this.props.selectedFriends
    var updatedList = []
    selectedFriends.map((friendId) => {
      if (friendId != uuid) {
        updatedList.push(friendId)
      }
    })
    this.props.setSelectedFriends(updatedList)
  }

  hasSelected(uuid) {
    var selected = false
    this.props.selectedFriends.map((friendId) => {
      if (friendId == uuid) {
        selected = true
      }
    })
    return selected
  }

  render() {
    console.log(this.props.selectedFriends)
    return (
      <View style={styles.container}>

        <List>
          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) => (

              <ListItem thumbnail>
                <Left>
                  <Thumbnail source={{ uri: item.avatar }} />
                </Left>
                <Body>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }} >{item.first_name + " " + item.last_name}</Text>
                  <Text note>{item.username}</Text>
                </Body>
                <Right>
                  {this.hasSelected(item.uuid) ? (
                    <TouchableOpacity onPress={() => this.dropFriend(item.uuid)} >
                      <Icon type={"AntDesign"} name="checkcircleo" style={{ color: "black" }} />
                    </TouchableOpacity>
                  ) : (
                      <TouchableOpacity onPress={() => this.addFriend(item.uuid)} >
                        <Icon type={"AntDesign"} name="pluscircleo" style={{ color: "black" }} />
                      </TouchableOpacity>
                    )}

                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.uuid}
            onEndReached={() => this.loadMore()}
            onEndReachedThreshold={0.01}
            ListFooterComponent={this.state.loading ? (<Loader />) : null}
            ListEmptyComponent={!this.state.loading ? <Text style={{ fontSize: 12, color: "lightgrey", textAlign: "center" }} >No Friend Found</Text> : null}
          />
        </List>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    friends: state.followReducer.myFriends,
    success: state.followReducer.getFriendsSuccess,
    selectedFriends: state.huntReducer.selectedFriends,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getFriends,
  getFriendSuccess,
  setSelectedFriends
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(InviteFriends));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  }
});
