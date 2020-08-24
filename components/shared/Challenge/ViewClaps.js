import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList
} from "react-native";
import { connect } from 'react-redux';
import { TouchableOpacity } from "react-native-gesture-handler";
import {  List, ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';
import { RoundButton } from '../../../components/shared/Button/Button';
import ActionSheet from 'react-native-actionsheet'
import { clappedUsers, clappedUsersSuccess } from "../../../store/actions/ChallengeActions"
import { follow } from "../../../store/actions/FollowActions"
import Colors from '../../../constants/Colors';

class ViewClaps extends Component {

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
        postId: this.props.postId
      }
    
      componentDidMount(){
        this.props.clappedUsers({ limit: 10, offset: 0, postId: this.state.postId })
      }
    
      UNSAFE_componentWillReceiveProps(props){
          if(props.success){
            if(props.clappedData.length == 0){
              this.setState({ data: [...this.state.data, ...props.clappedData], loading: false, dataEnd: true })
            }else{
              this.setState({ data: [...this.state.data, ...props.clappedData], loading: false, limit: this.state.limit, offset: (this.state.offset + 10) })
            }
            this.props.clappedUsersSuccess(false)
          }
      }
    
      loadMore(){
        if(this.state.dataEnd == false && !(this.state.data.length < 10) ){
          const data = { offset: this.state.offset, limit: this.state.limit, postId: this.state.postId }
          this.props.clappedUsers(data)
          this.setState({loading: true})
        }
      }
    
      handleFollow(uuid, is_private, type = "follow"){
        let updatedFlatList = []
        this.props.follow(uuid)
    
        updatedFlatList = this.state.data.map((item) => {
            if(item.owner.id == uuid){
                if(type == "follow"){
                  item.follow_status = is_private ? "pending" : "active"
                }else{
                  item.follow_status = null
                }
            }
            return item
        })
    
        this.setState({is_private: is_private, data: updatedFlatList})
      }
    
      gotToFriendProfile(owner){
        this.props.navigation.navigate("FriendProfile", {owner: owner} )
      }
    
      showActionSheet = (followObj) => {
        this.setState({ followObj: followObj })
        this.ActionSheet.show()
      }


  render() {
    const { modalVisible } = this.props;
    return (
      <Modal
        visible={modalVisible}
        presentationStyle={"formSheet"}
        style={{backgroundColor: this.props.color}}
      >
        <View style={[styles.centeredView, {backgroundColor: this.props.color}]}>
            <View style={{justifyContent: "space-between", alignItems: "center", padding: 20, flexDirection: "row"}} >
                <Text style={{fontWeight: "bold", fontSize: 18, color: Colors.violetXblue}} >Users who clapped</Text>
                <Icon type={"AntDesign"} style={{color: Colors.violetXblue}} name={"closecircleo"} onPress={() => this.props.toggleModal()} />
            </View>
            <List style={{width: "95%"}}>
                <FlatList
                  data={this.state.data}
                  renderItem={({ item, index }) => (
                    
                        <ListItem thumbnail style={{backgroundColor: "rgba(0,0,0,0.05)", paddingLeft: 10, borderRadius: 10}}>
                          <Left>
                            <Thumbnail source={{ uri: item.owner.avatar }} />
                          </Left>
                          <Body style={{borderBottomWidth: 0}}>
                            <TouchableOpacity onPress={() => this.gotToFriendProfile(item.owner)} >
                            <Text style={{fontSize: 16, fontWeight: "bold", color: Colors.violetXblue}} >{item.owner.name}</Text>
                            <Text style={{color: Colors.DarkestVioletBlue}} note>{item.owner.username}</Text>
                            </TouchableOpacity>
                          </Body>
                          <Right style={{borderBottomWidth: 0}}>
                            {item.follow_status == "active" && (<RoundButton style={{borderColor: Colors.backgroundColor}} textColor={Colors.backgroundColor} onPress={() => this.showActionSheet(item)} text={"Following"} />)} 
                            {item.follow_status == "pending" && (<RoundButton style={{borderColor: Colors.backgroundColor}} textColor={Colors.backgroundColor} onPress={() => this.showActionSheet(item)} text={"Pending"} />)} 
                            {item.follow_status == null && (<RoundButton style={{borderColor: Colors.backgroundColor}} textColor={Colors.backgroundColor} onPress={() => this.handleFollow(item.owner.id, item.private)} text={"Follow"} />)} 
                          </Right>
                        </ListItem>
                  )}
                  keyExtractor={item => item.owner.id}
                  onEndReached={() => this.loadMore()}
                  onEndReachedThreshold={0.01}
                  ListFooterComponent={ this.state.loading ? (<Loader />) : null}
                  ListEmptyComponent={ !this.state.loading ? <Text style={{fontSize: 12, color: "lightgrey", textAlign: "center"}} >No One Clapped Yet!</Text> : null}
              />
              </List>
        </View>
            <ActionSheet
                  ref={o => this.ActionSheet = o}
                  title={'Do you want to unfollow '+this.state.followObj.owner.username+'?'}
                  options={['Unfollow',  'Cancel']}
                  cancelButtonIndex={1}
                  destructiveButtonIndex={0}
                  onPress={(index) => { index == 0 && this.handleFollow(this.state.followObj.owner.id, this.state.followObj.private, "unfollow") }}
            />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
    return {
      clappedData: state.challengeReducer.clappedData,
      success: state.challengeReducer.clappedUsersSuccess,
    };
};

const mapDispatchToProps = {
    clappedUsers,
    clappedUsersSuccess,
    follow
};

const styles = StyleSheet.create({
  centeredView: {
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
    flex: 1
}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ViewClaps);