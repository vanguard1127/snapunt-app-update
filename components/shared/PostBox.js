import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native';
import ImageOverlay from "@image-overlay";
import RespImageOverlay from "@resp-image-overlay";
import NavigationService from '../../services/NavigationService';
import { Icon } from "native-base"
import Colors from '../../constants/Colors';
import { Badge, Avatar, Button } from 'react-native-paper';
import Social from './Challenge/Social';
import VideoOverlay from '../challenge/VideoOverlay';
import Constants from 'expo-constants';
import { TextButton, RoundButton } from './Button/Button';
import * as Sharing from 'expo-sharing';
import Share from './Challenge/Share';
import { userSelector } from '../../store/selectors/UserSelector';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet'
import { deleteDraft, report, pinPost } from "../../store/actions/ChallengeActions"
import GlobalStyles from '../../constants/GlobalStyles';
import EditPost from './Challenge/EditPost';
import { normalizeFont, addPrefix } from '../../helpers/CommonMethods';
import * as Linking from 'expo-linking';
import normalize from "react-native-normalize";

class HomeBox extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    shouldPlay: false,
    modalVisible: false,
    postUUID: null,
    editModal: false
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setEditModal = (visible) => {
    this.setState({ editModal: visible });
  }

  sendURI = async (uri) => {
    try {
      await Sharing.shareAsync(uri)
      this.setModalVisible(false)
    } catch (e) {
      alert("Could'nt share this file, Try Again")
    }
  }


  // componentDidMount(){
  //   if(this.vp){
  //     this.vp.addEventListener("focus", () => {
  //       this.setState({ shouldPlay: true })
  //     })
  //   }
  // }

  // componentWillUnmount(){
  //   if(this.vp){
  //     this.vp.removeEventListener("focus")
  //   }
  // }

  deletePost() {
    this.props.deleteDraft({ uuid: this.state.postUUID })
  }

  handleFriendActions(index) {
    if (index == 0) {
      // call pin post here
      this.pinPost(this.props.ch.uuid)
    }
    else if (index == 1) {
      // report post
      this.props.report({
        reported_to: this.props.ch.uuid,
        report_type: "post"
      })
    } else if (index == 2) {
      // report user
      this.props.report({
        reported_to: this.props.ch.owner.id,
        report_type: "user"
      })
    }
    else if (index == 3) {
      this.setState({ modalVisible: true })
    }
  }

  pinPost(uuid) {
    this.props.pinPost({
      post_id: uuid
    })
  }

  render() {
    var props = this.props
    const customCircle = props.customCircle != undefined ? true : false
    const avatarWidth = props.avatarWidth != undefined ? props.avatarWidth : 40
    const avatarHeight = props.avatarHeight != undefined ? props.avatarHeight : 40
    const userFont = props.userFont != undefined ? props.userFont : 16
    const hideUserData = props.hideUserData != undefined ? true : false
    const style = !customCircle ? styles.item : styles.item2
    const clapWidth = props.clapWidth != undefined ? props.clapWidth : 30
    const clapHeight = props.clapHeight != undefined ? props.clapHeight : 30

    var shouldPlay = props.shouldPlay
    var loadMedia = props.loadMedia

    var height = props.containerHeight
    var width = props.containerWidth


    return (

      <View style={{ flex: 1 }} >
        {/* <TouchableOpacity style={{flexGrow: 1}}  onPress={() => NavigationService.navigate("Detail", { index: props.index, data: props.data })} > */}
        {props.ch.post_type == "image" ? (
          <RespImageOverlay detail={props.detail} height={height} source={{ uri: props.ch.media }} thumb={{ uri: props.ch.thumb }} >

            <View ref={elem => this.vp = elem} style={{
              flex: 1, alignItems: "center", position: "absolute", bottom:normalize(20),
            }}>               
              <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between" }} >
                <View style={{ flexDirection: "row" }} >
                  <Image source={{ uri: props.ch.owner.avatar }} style={{ height: normalize(40), width: normalize(40), borderRadius: 50 }} />
                  {/* <Image source={{uri: props.ch.avatar}} style={{resizeMode: "contain", borderWidth: 1, borderColor: "yellow"}} /> */}
                  <View>
                    <View style={{ margin: normalize(10) }}>
                      <Text style={{ marginLeft: normalize(8, "width"), color: Colors.light_ash_white, fontSize: normalize(20), }} onPress={() => this.props.navigation.navigate("FriendProfile", { owner: props.ch.owner })}>{props.ch.owner.username}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: normalize(10), width: normalize(280, "width") }}>
                      <Badge style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <Text style={styles.badgeText}>{props.ch.cat_name}</Text>
                      </Badge>
                      <Text style={{ right: 0, fontSize: normalizeFont(13), color: Colors.light_ash_white }}>1 month ago</Text>
                    </View>
                  </View>
                </View>

                {props.detail != undefined && <TouchableOpacity onPress={() => props.navigation.pop(1)} ><Icon name="close" type="EvilIcons" style={{ color: "white", marginRight: 10, fontWeight: "bold" }} /></TouchableOpacity>}
              </View>
              <View style={{ marginLeft: normalize(30) }}>
                <Text style={{ right: 0, fontSize: normalizeFont(15), color: Colors.light_ash_white, marginTop: normalize(10, "height"), marginBottom: normalize(10, "height"), width: normalize(280, "height"), paddingRight: normalize(20, "width") }} numberOfLines={3} ellipsizeMode='tail'>{props.ch.desc}</Text>
              </View>
              <View style={{ padding: 10 }} >
                <View style={{ alignItems: "flex-end", marginBottom: 10 }} >

                  <View style={{ alignItems: "center" }} >
                    {/* 
                      <TouchableOpacity style={{marginBottom: 10}} onPress={() => ( this.setState({ modalVisible: true }) )} >
                        <Avatar.Icon size={38} icon="share" style={{backgroundColor: Colors.backgroundColor}} color={"#fff"} />
                      </TouchableOpacity> */}

                    {!props.ch.is_featured && this.props.user.id == props.ch.owner.id && <TouchableOpacity onPress={() => { this.setState({ postUUID: props.ch.uuid }); this.ActionSheet.show() }} >
                      <Icon fontSize={38} name="dots-three-horizontal" type="Entypo" style={{ color: "white" }} />
                    </TouchableOpacity>}

                    {!props.ch.is_featured && this.props.user.id != props.ch.owner.id && <TouchableOpacity onPress={() => { this.setState({ postUUID: props.ch.uuid }); this.FriendActionSheet.show() }} >
                      <Icon fontSize={38} name="dots-three-horizontal" type="Entypo" style={{ color: "white" }} />
                    </TouchableOpacity>}
                  </View>
                </View>
                <View style={{ marginBottom: 20, width: "100%" }} >
                  {props.ch.is_featured == true && props.ch.featured_url && (<TouchableOpacity onPress={() => Linking.openURL(addPrefix(props.ch.featured_url))} ><Text style={{ color: "#fff", fontWeight: "bold", marginTop: 5 }} >
                    {addPrefix(props.ch.featured_url)}
                  </Text></TouchableOpacity>)}
                  {props.ch.original_owner != undefined && props.ch.original_owner != null && <View style={{ flexDirection: "row", alignItems: "center" }} >
                    <Text style={{ color: "white", fontSize: 12, marginRight: 2 }} >Creator:</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("FriendProfile", { owner: props.ch.original_owner })}>
                      <Text style={{ fontWeight: "bold", textDecorationLine: "underline", color: "white", fontSize: 12 }} >{props.ch.original_owner.username}</Text>
                    </TouchableOpacity>
                  </View>}
                </View> 
                <View style={{ width: normalize(250), marginLeft: normalize(20) }}>
                  <Social backgroundColorForModal={props.backgroundColorForSocial} data={props.ch} navigation={props.navigation} />
                </View>
              </View>
            </View>
          </RespImageOverlay>
        ) : (
            <VideoOverlay detail={props.detail} home={props.home} height={height} width={width} source={props.ch.media} shouldPlay={shouldPlay} loadMedia={loadMedia} >
              <View ref={elem => this.vp = elem} style={{ flex: 1, justifyContent: "space-between",width: "100%", }} >

                <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", marginTop: StatusBar.currentHeight }} >
                  <View style={{ flexDirection: "row" }} >
                    <Avatar.Image size={40} source={{ uri: props.ch.owner.avatar }} style={{ marginRight: 5 }} />
                    {/* <Image source={{uri: props.ch.avatar}} style={{resizeMode: "contain", borderWidth: 1, borderColor: "yellow"}} /> */}
                    <View >
                      <TextButton style={{ color: "#fff", fontSize: userFont, fontWeight: "bold" }} text={props.ch.owner.username} onPress={() => props.navigation.navigate("FriendProfile", { owner: props.ch.owner })} />
                      <View style={{ flexDirection: "row", marginTop: 3, alignSelf: "flex-start" }} >
                        <Badge style={{ backgroundColor: "#f84e50", color: "#fff", marginRight: 3 }} size={18} >{props.ch.cat_name}</Badge>
                      </View>
                    </View>
                  </View>

                  {props.detail != undefined && <TouchableOpacity onPress={() => props.navigation.pop(1)} ><Icon name="close" type="EvilIcons" style={{ color: "white", marginRight: 10, fontWeight: "bold" }} /></TouchableOpacity>}

                </View>

                <View style={{ padding: 10 }} >

                <View style={{width: '100%', alignItems: 'center'}}>
                  <View style={{ alignItems: "flex-end", marginBottom: 10 ,width: normalize(250) }} >

                  <View style={{ alignItems: "center" }} >
                    {/* 
                      <TouchableOpacity style={{marginBottom: 10}} onPress={() => ( this.setState({ modalVisible: true }) )} >
                        <Avatar.Icon size={38} icon="share" style={{backgroundColor: Colors.backgroundColor}} color={"#fff"} />
                      </TouchableOpacity> */}

                    {!props.ch.is_featured && this.props.user.id == props.ch.owner.id && <TouchableOpacity onPress={() => { this.setState({ postUUID: props.ch.uuid }); this.ActionSheet.show() }} >
                      <Icon fontSize={38} name="dots-three-horizontal" type="Entypo" style={{ color: "white" }} />
                    </TouchableOpacity>}

                    {!props.ch.is_featured && this.props.user.id != props.ch.owner.id && <TouchableOpacity onPress={() => { this.setState({ postUUID: props.ch.uuid }); this.FriendActionSheet.show() }} >
                      <Icon fontSize={38} name="dots-three-horizontal" type="Entypo" style={{ color: "white" }} />
                    </TouchableOpacity>}

                  </View>
                  </View> 
                </View>

                  <View style={{ marginBottom: 20, width: "100%" }} >
                    <Text style={{ ...GlobalStyles.textShadow, ...{ fontSize: normalizeFont(14), marginBottom: 5, color: "white", fontWeight: "bold", lineHeight: 18, letterSpacing: 0.5 } }} >{props.ch.desc}</Text>
                    {props.ch.is_featured == true && props.ch.featured_url && (<TouchableOpacity onPress={() => Linking.openURL(addPrefix(props.ch.featured_url))} ><Text style={{ color: "#fff", fontWeight: "bold", marginTop: 5 }} >
                      {addPrefix(props.ch.featured_url)}
                    </Text></TouchableOpacity>)}
                    {props.ch.original_owner != undefined && props.ch.original_owner != null && <View style={{ flexDirection: "row", alignItems: "center" }} >
                      <Text style={{ color: "white", fontSize: 12, marginRight: 2 }} >Creator:</Text>
                      <TouchableOpacity onPress={() => props.navigation.navigate("FriendProfile", { owner: props.ch.original_owner })}>
                        <Text style={{ fontWeight: "bold", textDecorationLine: "underline", color: "white", fontSize: 12 }} >{props.ch.original_owner.username}</Text>
                      </TouchableOpacity>
                    </View>}
                  </View>
                  <View style={{width: '100%', bottom: normalize(20), alignItems: 'center'}}>
                    <View style={{ width: normalize(250), marginLeft: normalize(20) }}>
                      <Social data={props.ch} navigation={props.navigation} />                      
                    </View>
                  </View>
                </View>
              </View>
            </VideoOverlay>
          )
        }

        {/* </TouchableOpacity> */}
        {this.state.modalVisible && <Share source={props.ch.media} setModalVisible={this.setModalVisible} modalVisible={this.state.modalVisible} sendURI={this.sendURI} />}
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={['Edit Post', 'Pin Post', 'Share', 'Delete Post', 'Cancel']}
          cancelButtonIndex={4}
          destructiveButtonIndex={3}
          onPress={(index) => {
            if (index == 0) {
              // edit post form
              NavigationService.navigate("EditPost", { postData: props.ch })
            }
            else if (index == 3) {
              this.deletePost()
            }
            else if (index == 1) {
              // call pin post here
              this.pinPost(props.ch.uuid)
            }
            else if (index == 2) {
              this.setState({ modalVisible: true })
            }
          }}
        />

        <ActionSheet
          ref={o => this.FriendActionSheet = o}
          options={['Pin Post', 'Report Post', 'Report User', 'Share', 'Cancel']}
          cancelButtonIndex={3}
          onPress={(index) => { this.handleFriendActions(index) }}
        />
      </View >

    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state)
  };
};

const mapDispatchToProps = {
  deleteDraft,
  report,
  pinPost
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeBox);


export const PostBox = (props) => {
  const isObj = typeof (props.ch.claps) == "object" ? true : false
  const customCircle = props.customCircle != undefined ? true : false
  const width = props.width != undefined ? props.width : "100%"
  const height = props.height != undefined ? props.height : 180
  const avatarWidth = props.avatarWidth != undefined ? props.avatarWidth : 50
  const avatarHeight = props.avatarHeight != undefined ? props.avatarHeight : 50
  const userFont = props.userFont != undefined ? props.userFont : 20
  const hideUserData = props.hideUserData != undefined ? true : false
  const style = !customCircle ? styles.item : styles.item2
  const clapWidth = props.clapWidth != undefined ? props.clapWidth : 30
  const clapHeight = props.clapHeight != undefined ? props.clapHeight : 30

  return (
    <View style={{ ...style, width: width }} >
      <TouchableOpacity onPress={() => NavigationService.navigate("Detail", { index: props.index, data: props.data })} >
        <ImageOverlay containerStyle={{ width: width, borderWidth: 4, borderColor: Colors.homeBackground }} height={height} rounded={height / 2} source={{ uri: props.ch.thumb }} >
          <View style={styles.postContainer} >
            {!hideUserData && <Image source={{ uri: props.ch.avatar }} style={{ resizeMode: "contain", width: avatarWidth, height: avatarHeight }} />}
            {!hideUserData && <Text style={{ color: "#fff", fontSize: userFont, fontWeight: "500" }} >{props.ch.owner_name}</Text>}
            <View style={!hideUserData ? styles.clapBox : styles.clapBoxNoMargin} >
              <Image source={require("../../assets/images/clap.png")} style={{ resizeMode: "contain", width: clapWidth, height: clapHeight }} />
              <Text style={{ color: "#fff", marginLeft: 5 }} >{isObj ? Object.values(props.ch.claps).length : props.ch.claps}</Text>
            </View>
          </View>
        </ImageOverlay>
        {props.hideDesc != undefined && <Text numberOfLines={1} ellipsizeMode='tail' style={{ textAlign: "center", marginTop: 5 }} >{props.ch.desc}</Text>}
      </TouchableOpacity>
    </View>

  );
}

export const SavedPostBox = (props) => {

  const customCircle = props.customCircle != undefined ? true : false
  const width = props.width != undefined ? props.width : "100%"
  const height = props.height != undefined ? props.height : 180
  const style = !customCircle ? styles.item : styles.item2

  return (
    <View style={{ ...style, width: width }} >
      <TouchableOpacity onPress={() => props.onPress()} >
        <ImageOverlay containerStyle={{ width: width }} height={240} source={{ uri: props.ch.thumb }} rounded={5} >

          <View style={{
            justifyContent: "flex-end",
            // alignItems: "flex-end",
            flex: 1,
            width: "100%",
            padding: 10
          }} >
            <View style={styles.clapBoxSeacrh} >
              {/* <Image source={require("../../assets/images/clap.png")} style={{resizeMode: "contain", width: 20, height: 20}} /> */}
              {/* <Icon type="Entypo" name="hand" style={{color: "white", fontWeight: "bold", fontSize: 18, marginRight: 3}} /> */}
              <Text numberOfLines={2} style={{ color: "#fff", fontSize: 14, fontWeight: "bold", }} >{props.ch.desc}</Text>
            </View>
          </View>

        </ImageOverlay>
      </TouchableOpacity>
    </View>

  );
}

// export const DummyPostBox = () => (
//     <View style={styles.item2} >
//         <ImageOverlay containerStyle={{width: 150}} height={150} rounded={150/2} source={require("../../assets/images/hbg1.png")} >
//         <View style={styles.postContainer} >
//             <Image style={styles.avatar} source={require("../../assets/images/boy.png")} />
//             <Text style={{ color: "#fff", fontSize: 14, fontWeight: "500" }} >Josh Newman</Text>
//             <View style={styles.clapBox} >
//                 <Image source={require("../../assets/images/clap.png")} style={{resizeMode: "contain", width: 20, height: 20}} />
//                 <Text style={{ color: "#fff", marginLeft: 5 }} >94</Text>
//             </View>
//         </View>
//         </ImageOverlay>
//     </View> 
// )

// export const DummyPostBoxMy = () => (
//   <View style={styles.item2} >
//       <ImageOverlay containerStyle={{width: 150}} height={150} rounded={150/2} source={require("../../assets/images/hbg1.png")} >
//       <View style={styles.postContainer} >
//           <Icon name="circle-edit-outline" type="MaterialCommunityIcons" style={{color: "white"}} />
//           {/* <Text style={{ color: "#fff", fontSize: 14, fontWeight: "500" }} >Josh Newman</Text> */}
//           {/* <View style={styles.clapBox} >
//               <Image source={require("../../assets/images/clap.png")} style={{resizeMode: "contain", width: 20, height: 20}} />
//               <Text style={{ color: "#fff", marginLeft: 5 }} >94</Text>
//           </View> */}
//       </View>
//       </ImageOverlay>
//       <Text numberOfLines={1}  ellipsizeMode='tail' style={{textAlign: "center", marginTop: 8}} >Snap a pic at midnight!</Text>
//   </View> 
// )


export const PostBoxDiscover = (props) => (

  <View style={styles.item3} >
    <TouchableOpacity onPress={() => { props.handleDetailState(true); NavigationService.navigate("Detail", { index: props.index, data: props.data }) }} >
      <ImageOverlay containerStyle={{ width: "100%" }} height={240} source={{ uri: props.ch.thumb }} contentPosition="bottom" rounded={5} >
        <View style={{
          width: "100%", paddingLeft: 8,
          paddingRight: 8,
          paddingBottom: 5
        }} >
          <Text numberOfLines={1} style={{ color: "#fff", marginBottom: 10, fontWeight: "bold" }} >{props.ch.desc}</Text>
          <View style={styles.postContainerSearch} >
            <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center" }} >
              <Image style={styles.avatar} source={{ uri: props.ch.avatar }} />
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "500" }} >{props.ch.owner_name}</Text>
            </View>
            <View style={styles.clapBoxSeacrh} >
              <Image source={require("../../assets/images/clap.png")} style={{ resizeMode: "contain", width: 20, height: 20 }} />
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }} >{Object.values(props.ch.claps).length}</Text>
            </View>
          </View>
        </View>
      </ImageOverlay>
    </TouchableOpacity>
  </View>
)

export const PostBoxProfile = (props) => (

  <View style={styles.item3} >
    <TouchableOpacity onPress={() => { props.handleDetailState != undefined && props.handleDetailState(true); NavigationService.navigate("Detail", { detailData: props.detailData }) }} >
      <ImageOverlay overlayAlpha={0} containerStyle={{ width: normalize(150) }} height={normalize(150)} source={{ uri: props.ch.thumb }} contentPosition="bottom" rounded={8} >

        <View style={{
          alignItems: "flex-end",
          flex: 1,
          width: "100%",
          padding: 10
        }} >
          <View style={styles.clapBoxSeacrh} >
            {/* <Image source={require("../../assets/images/clap.png")} style={{resizeMode: "contain", width: 20, height: 20}} /> */}
            {props.ch.post_type == "video" && <Icon type="Ionicons" name="ios-videocam" style={{ color: "white", fontSize: 20 }} />}
            {/* <Text numberOfLines={2} style={{ color: "#fff", fontSize: 14, fontWeight: "bold",  }} >{props.ch.desc}</Text> */}
          </View>
        </View>
      </ImageOverlay>
    </TouchableOpacity>
  </View>
)

export const BigBox = (props) => (

  <TouchableOpacity onPress={() => NavigationService.navigate("Detail", { detailData: props.detailData })} style={styles.item4} >
    <ImageOverlay overlayAlpha={0.2} containerStyle={{ width: normalize(150) }} height={normalize(150)} source={{ uri: props.ch.post_type == "video" ? props.ch.thumb : props.ch.media }} contentPosition="bottom" rounded={5} >

      <View style={{
        flex: 1,
        width: "100%",
        padding: 8
      }} >
        <View style={{ flex: 1 }} >
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }} >
            {props.ch.post_type == "video" ? <Icon type="Ionicons" name="ios-videocam" style={{ color: "white", fontSize: 20 }} /> : <Text style={{ color: "white" }} ></Text>}
          </View>
          {!props.ch.is_featured && (
            <View style={{ alignSelf: "center", justifyContent: "center", flex: 1, marginTop: normalize(100) }} >
              {props.ch.snapoffed ? <Icon name="check" type="AntDesign" style={{ color: "white", fontSize: 40 }} /> : <Button onPress={(e) => props.snapOff(props.index)} style={[styles.selectChallenge, { backgroundColor: Colors.DarkestVioletBlue }]}>
                <Text style={{ color: Colors.white, fontSize: normalize(10) }}>Select Challenge</Text>
              </Button>}
            </View>
          )}
        </View>
      </View>

    </ImageOverlay>
    <Text numberOfLines={3} style={{ marginTop: normalize(20), marginBottom: normalize(20), color: Colors.white, width: normalize(140) }}>{props.ch.desc}
    </Text>
  </TouchableOpacity>
)

export const DraftBox = (props) => (

  <View style={styles.item3} >
    <TouchableOpacity onPress={() => { props.handleDetailState != undefined && props.handleDetailState(true); NavigationService.navigate("MyChallenge") }} >
      <View style={{
        justifyContent: "center",
        // alignItems: "flex-end",
        flex: 1,
        width: "100%",
        height: 240,
      }} >
        <View style={{ backgroundColor: Colors.darkBlue, justifyContent: "center", flex: 1, alignItems: "center", borderRadius: 5 }} >
          {/* <Image source={require("../../assets/images/clap.png")} style={{resizeMode: "contain", width: 20, height: 20}} /> */}
          <Icon type="MaterialCommunityIcons" name="content-save-edit-outline" style={{ color: "white", fontWeight: "bold", fontSize: 28 }} />
          <Text numberOfLines={2} style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }} >{props.drafts} DRAFTS</Text>
        </View>
      </View>

    </TouchableOpacity>
  </View>
)

// export const DummyPostBoxDiscover = () => (

//   <View style={styles.item3} >
//       <ImageOverlay containerStyle={{width: "100%"}} height={180} source={require("../../assets/images/hbg1.png")} contentPosition="bottom" >
//           <View style={{width: "100%", paddingLeft: 8,
//             paddingRight: 8,
//             paddingBottom: 5
//             }} >
//             <Text numberOfLines={1} style={{color: "#fff", marginBottom: 10, fontWeight: "bold"}} >this is a post description. and post is really awesome</Text>
//             <View style={styles.postContainerSearch} >
//               <View style={{flexDirection: "row", alignItems: "center", alignContent: "center"}} >
//               <Image style={styles.avatar} source={require("../../assets/images/boy.png")} />
//                 <Text style={{ color: "#fff", fontSize: 12, fontWeight: "500" }} >farazirfan</Text>
//               </View>
//               <View style={styles.clapBoxSeacrh} >
//                   <Image source={require("../../assets/images/clap.png")} style={{resizeMode: "contain", width: 20, height: 20}} />
//                   <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }} >94</Text>
//               </View>
//           </View>
//           </View>
//       </ImageOverlay>
//   </View>
// )


const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    flexBasis: "48%",
    marginRight: "1%",
    marginLeft: "1%"
  },
  item4: {
    marginTop: 5,
    flexBasis: "48%",
    marginRight: "1%",
    marginLeft: "1%"
  },
  item2: {
    marginRight: 8,
    marginBottom: 20
  },
  item3: {

    margin: normalize(10)
  },
  postContainer: {
    alignItems: "center"
  },
  postContainerSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  clapBox: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  clapBoxNoMargin: {
    flexDirection: "row",
    alignItems: "center"
  },
  clapBoxSeacrh: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    resizeMode: "contain",
    width: 30,
    height: 30
  },
  selectChallenge: {
    width: normalize(130),
    height: normalize(30),
    marginTop: normalize(-40),
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    alignSelf: "center",
    borderRadius: 15,
    marginLeft: normalize(-8),
    borderWidth: 1,
    borderColor: "#685F7D"
  },
  iconAndText: {
    fontSize: normalizeFont(15),
    color: Colors.light_ash_white,
    fontWeight: "100"
  },
  icon: {
    fontSize: normalizeFont(20),
    color: Colors.light_ash_white,
    marginRight: 3,
    marginTop: 3
  },
  badgeText: {
    color: Colors.light_ash_white,
    fontSize: normalize(15),
    marginTop: normalize(5, "height"),
    fontWeight: "500",
    margin: 8
  },
});
