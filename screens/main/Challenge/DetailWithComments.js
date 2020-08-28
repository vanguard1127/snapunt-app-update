import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Platform,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { addClap } from "../../../store/actions/ChallengeActions"
import { setRefreshLoading } from "../../../store/actions/LoaderAction"
import { userSelector } from '../../../store/selectors/UserSelector';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { SafeAreaView } from 'react-navigation';
import Colors from '../../../constants/Colors';
import { Item, Input, Icon } from 'native-base';
import { addComment, getComments } from "../../../store/actions/ChallengeActions";
import moment from "moment";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { timeAgo } from "../../../helpers/CommonMethods"
import { Avatar } from 'react-native-paper';
import Loader from '../../../components/Loader';
import normalize from "react-native-normalize";
let colorGetterFromProps = {};
let darkMode = false;
class DetailWithComments extends React.Component {

  state = {
    keyboardOffset: 0,
    comment: null,
    active: false,
    comments: this.props.comments,
    post_id: this.props.navigation.getParam("uuid"),
    loading: true,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Comments",
      tabBarVisible: false
    };
  };

  componentDidMount() {
    this.props.getComments("?post_id=" + this.state.post_id)
  }

  UNSAFE_componentWillReceiveProps(props) {
    console.log("inside props ")
    console.log(props.comments)
    this.setState({ loading: !props.getCommentsSuccess, comments: props.comments })
  }

  handleChange(val) {
    if (val != "") {
      this.setState({ comment: val, active: true })
    } else {
      this.setState({ comment: val, active: false })
    }
  }

  submitComment() {
    var createdAt = moment().utc().format()
    var newComment = {
      comment: this.state.comment,
      avatar: this.props.user.avatar,
      username: this.props.user.username,
      ts: createdAt
    }
    this.setState({ comments: [...this.state.comments, newComment], comment: null, active: false })
    this.props.addComment({ post_id: this.state.post_id, comment: this.state.comment, ts: createdAt })
  }

  _onRefresh() {
    this.props.setRefreshLoading(true)
    this.props.getComments("?post_id=" + this.state.post_id)
  }

  render() {
    return (
      <SafeAreaView style={{ ...styles.container }}>
        <View style={styles.contentContainer}>
        {this.state.loading ? (<Loader />) : (<ScrollView
          style={{ flex: 1, backgroundColor: colorGetterFromProps.diffrentBack }}
          refreshControl={
            <RefreshControl refreshing={this.props.refreshLoader} onRefresh={() => this._onRefresh()} />
          } >
          <View style={styles.comments} >
            {this.state.comments.map((comment, index) => {
              return <View key={index} style={styles.commentRow} >
                <Avatar.Image style={styles.avatar} size={40} source={{ uri: comment.avatar }} />
                <View style={{ flexShrink: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }} >
                    <Text style={{ fontWeight: "bold" }} >{comment.username}</Text>
                    <Text style={{ fontSize: 12, color: "grey" }} >{timeAgo(comment.ts)}</Text>
                  </View>
                  <Text style={{ color: colorGetterFromProps.darkGrey }} >{comment.comment}</Text>
                </View>
              </View>
            })}
          </View>
        </ScrollView>)}

        
            <KeyboardAvoidingView behavior={Platform.select({android: undefined, ios: 'padding'})} keyboardVerticalOffset={Platform.select({ios: 60, android: 500})}>
               
              <View style={{backgroundColor: colorGetterFromProps.white}}>
              <Icon name="dots-three-horizontal" type="Entypo" size={15} style={{ color: Colors.violetXblue, alignSelf: "flex-end", marginRight: normalize(30) }} />
              <View style={{ alignSelf: "center", height: 3, width: normalize(150), backgroundColor: Colors.violetXblue, borderRadius: 7, marginBottom: normalize(20) }}></View>
              <View style={styles.textInputView}>
              <Item rounded style={{ flexShrink: 1, flexGrow: 1,borderRadius: 50,fontSize: 16,marginRight: 10,textAlignVertical: 'top',backgroundColor: "rgba(33,34,51,0.5)" }} >
                <Input placeholder='Add a comment...' placeholderTextColor="white" style={{ paddingLeft: 10,fontSize: 14, height: 40, color: Colors.white }} value={this.state.comment} onChangeText={(val) => this.handleChange(val)} />
                {this.state.active ? <TouchableOpacity onPress={() => this.submitComment()} ><Icon size={15} style={{ marginRight: 10,  color: "#33B2FF" }}name="paper-plane" type="Entypo" /></TouchableOpacity> : <Icon size={15} style={{ color: Colors.white, marginRight: 10 }}  name="paper-plane" type="Entypo" />}
              </Item>
            </View>
            </View>
            </KeyboardAvoidingView>

        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    getCommentsSuccess: state.challengeReducer.getCommentsSuccess,
    getCommentsError: state.challengeReducer.getCommentsError,
    comments: state.challengeReducer.comments,
    refreshLoader: state.loaderReducer.refreshLoader,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  addClap,
  addComment,
  getComments,
  setRefreshLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailWithComments);

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    // borderColor: "red",
    // borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colorGetterFromProps.white,
  }, 
  comments: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  commentRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  textInputView: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0)",
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: 'top',
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  textInputButton: {
    color: colorGetterFromProps.backgroundColor,
    fontWeight: "bold",
    fontSize: 16
  },
  avatar: {
    marginRight: 8
  }
});
