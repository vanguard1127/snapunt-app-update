import React from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { connect } from 'react-redux';
import {  addClap } from "../../../store/actions/ChallengeActions"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userSelector } from '../../../store/selectors/UserSelector';
import NavigationService from '../../../services/NavigationService';
import Colors from '../../../constants/Colors';
import { Avatar } from 'react-native-paper';
import ViewClaps from './ViewClaps';
import { Icon } from 'native-base';
import { normalizeFont } from '../../../helpers/CommonMethods';
import { DarkOutlineButton, OutlineButton, RoundButton } from '../Button/Button';

class SocialCompact extends React.Component {

  state = {
    data: this.props.data,
    clapModal: false
  }

  addClap(){
    var data = this.state.data
    var userId = this.props.user.id
    if(data["claps"][userId] !== undefined){
      // remove the clap
      delete data["claps"][userId]
    }else{
      // add clap
      data["claps"][userId] = 1
    }
    // this.props.updateProfileData(data)
    this.props.addClap(data["uuid"])
    this.setState({ data: data })
  }

  snapOff(){
    if(this.state.data.snapoffed){
      alert("You already Snap Offed!")
    }else{
      // pass current challenge to CAMERA screen for preloading data
      var currentData = this.state.data
      if(currentData){
        currentData["snapOff"] = true
        this.props.navigation.navigate("CameraScreen", { postData: currentData, clearData: {stack: "ChallengeStack", screen: "CameraScreen", navigateTo: "Home", navigationData: {} } } )
      }
    }
  }

  isClaped(){
    var clapped = false
    var data = this.state.data
    if(typeof(data.claps) == "object"){
      Object.keys(data.claps).map((key) => {
        if(key == this.props.user.id){
          clapped = true
        }
      })
    }
    return clapped
  }

  toggleModal = () => {
    this.setState({ clapModal: !this.state.clapModal })
  }

  render() {

    var data = this.state.data
    const isObj = typeof(data.claps) == "object" ? true : false

    return (
      <View style={{flexDirection: "row", alignItems: "center"}} >

        <View style={{justifyContent: "center", alignItems: "flex-end", flexDirection: "row", marginRight: 20}} >
          <TouchableOpacity style={{marginBottom: 5}} onPress={() => this.addClap()} >
          {/* <Avatar.Text size={35} label={isObj ? Object.values(data.claps).length : data.claps} style={{backgroundColor: Colors.backgroundColor}} color={Colors.darkGrey} /> */}
          <Icon type="FontAwesome" name="signing" style={{color: Colors.backgroundColor, marginRight: 8, fontSize: 20}} />

          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleModal } >
          <Text style={{ fontSize: normalizeFont(12) , color: Colors.darkGrey,  fontWeight: "bold", textAlign: "center" }} >{isObj ? Object.values(data.claps).length : data.claps} </Text>
          <Text style={{ fontSize: normalizeFont(12), color: Colors.darkGrey, fontWeight: "bold", color:  this.isClaped() ? Colors.backgroundColor : Colors.darkGrey }} >Claps</Text>
          </TouchableOpacity>
        </View>

          <TouchableOpacity style={{justifyContent: "center", alignItems: "flex-end", flexDirection: "row"}} onPress={() => NavigationService.navigate("DetailWithComments", {uuid: data.uuid })} >

          {/* <Avatar.Text size={35} label={data.comments} style={{backgroundColor: Colors.backgroundColor, marginBottom: 5}} color={Colors.darkGrey} /> */}
          <Icon type="FontAwesome" name="comments" style={{color: Colors.backgroundColor, marginRight: 8, fontSize: 20}} />
          <View>
            <Text style={{ fontSize: normalizeFont(12), color: Colors.darkGrey,  fontWeight: "bold",  textAlign: "center" }} >{data.comments}</Text>
            <Text style={{ fontSize: normalizeFont(12), color: Colors.darkGrey,  fontWeight: "bold" }} >Comments</Text>
          </View>

          </TouchableOpacity>


          {this.state.clapModal && <ViewClaps navigation={this.props.navigation} postId={data.uuid}  modalVisible={this.state.clapModal} toggleModal={this.toggleModal} /> }

    </View>
    );
  }
}

const mapStateToProps = state => {
  return { 
      user: userSelector(state)
   };
};

const mapDispatchToProps = {
  addClap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialCompact);

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        // borderColor: "red",
        // borderWidth: 1,
    },
    container: {
        backgroundColor: "black",
        flex: 1
    },
    postContainer: {
        flexDirection: "row",
        marginTop: 25,
        alignItems: "center",
        padding: 10
    },
    descBox: {
        padding: 10,
    },
    clapBox: {
        flexDirection: "row",
        alignItems: "center"
      }, 
      backgroundVideo: {
        width: "100%",
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      countBox:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#b5b5b5"
      },
      iconBox:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 5,
        paddingLeft: 5,
        paddingRight: 5
      }
});
