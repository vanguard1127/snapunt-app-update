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
import { List, ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';
let colorGetterFromProps = {};
let darkMode = false;
class HuntMembers extends React.Component {

  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: false,
    data: [],
    members: this.props.navigation.getParam("members")
  }

  render() {
    return (
      <View style={styles.container}>

        <List>
          <FlatList
            data={this.state.members}
            renderItem={({ item, index }) => (

              <ListItem thumbnail>
                <Left>
                  <Thumbnail source={{ uri: item.avatar }} />
                </Left>
                <Body>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }} >{item.first_name + " " + item.last_name}</Text>
                  <Text note>{item.username}</Text>
                </Body>
              </ListItem>
            )}
            keyExtractor={item => item.uuid}
            //   onEndReached={() => this.loadMore()}
            //   onEndReachedThreshold={0.01}
            //   ListFooterComponent={ this.state.loading ? (<Loader />) : null}
            ListEmptyComponent={<Text style={{ fontSize: 12, color: "lightgrey", textAlign: "center" }} >No Member Found</Text>}
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
)(withNavigationFocus(HuntMembers));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  }
});
