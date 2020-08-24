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
import { Avatar } from 'react-native-paper';
import Loader from '../../../../components/Loader';
import Colors from '../../../../constants/Colors';
import { Icon } from "native-base";
import { huntDetail, huntDetailSuccess } from "../../../../store/actions/HuntActions"
import NavigationService from '../../../../services/NavigationService';
let colorGetterFromProps = {};
let darkMode = false;

const headerRightIcon = (navigation, params) => {
  const styles = {
    menuIcon: {
      marginRight: 15,
      fontSize: 20
    }
  };

  return {
    headerRight: () => (
      <View style={{ flexDirection: "row" }} >

        <TouchableOpacity onPress={() => navigation.navigate("QRCodeScreen", { title: params.title, uuid: params.uuid })} >
          <Icon
            type="MaterialCommunityIcons"
            name="qrcode"
            style={styles.menuIcon}
          />

        </TouchableOpacity>

        <TouchableOpacity  >
          <Icon
            type="AntDesign"
            name="adduser"
            style={styles.menuIcon}
          />
        </TouchableOpacity>

      </View>
    )
  };
};

class ViewHuntScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    var headerRight = headerRightIcon(navigation, params)
    return {
      ...headerRight,
      title: "",
      tabBarVisible: false,
      headerStyle: {
        elevation: 0, //for android
        shadowOpacity: 0, //for ios
        borderBottomWidth: 0, //for ios
      },
    };
  };

  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: true,
    data: {
      title: "",
      members: [],
      challenges: []
    },
    uuid: this.props.navigation.getParam("uuid")
  }

  componentDidMount() {
    this.props.huntDetail(this.state.uuid)
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.success) {
      this.setState({ data: props.huntData, loading: false })
      this.props.navigation.setParams({
        title: props.huntData.title,
        uuid: props.huntData.uuid
      })
    }
    this.props.huntDetailSuccess(false)
  }

  render() {
    var data = this.state.data
    console.log(data)
    return (
      <View style={styles.container}>

        <View style={{ alignItems: "center", marginBottom: 10, backgroundColor: colorGetterFromProps.darkBlue, borderRadius: 5, padding: 10 }} >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff", fontStyle: "italic" }} >{data.title}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }} >
            <View style={{ alignItems: "center", marginRight: 30 }} >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }} >{data.challenges.length}</Text>
              <Text style={{ color: "#fff" }}  >Challenges</Text>
            </View>

            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => this.props.navigation.navigate("HuntMembers", { members: data.members })} >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }} >{data.members.length}</Text>
              <Text style={{ color: "#fff" }} >Members</Text>
            </TouchableOpacity>
          </View>
        </View>


        <ScrollView style={{ width: "100%" }} >
          {data.challenges.map((ch, key) => (
            <View key={key} style={{ width: "100%", marginBottom: 10 }} >
              <TouchableOpacity onPress={() => NavigationService.navigate("HuntChallengeDetail", { chId: ch.uuid, huntId: data.uuid, postData: ch })} >
                <ImageOverlay overlayAlpha={0.3} rounded={5} containerStyle={{ width: "100%", borderBottomWidth: 2, borderBottomColor: "white", alignItems: "flex-start", padding: 10 }} height={210} source={{ uri: ch.thumb }} >
                  <View style={{ flex: 1, width: "100%" }} >

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 25, fontStyle: "italic" }} >{ch.desc}</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-start" }} >
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >

                      {ch.snapoffed && <Icon type="Ionicons" name="ios-checkbox-outline" style={{ color: "#fff" }} />}

                      <View style={{ flexDirection: "row", alignItems: "center" }} >
                        {ch.last_three.users.map((user, key) => (
                          <Avatar.Image key={key} size={24} style={{ marginRight: 3 }} source={{ uri: user.avatar }} />
                        ))}
                        <Text style={{ fontWeight: "bold", color: "#fff" }} >{ch.last_three.total - ch.last_three.users.length > 0 ? "+" + (ch.last_three.total - ch.last_three.users.length) : ""}</Text>
                      </View>
                    </View>
                  </View>
                </ImageOverlay>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.huntReducer.huntDetailSuccess,
    huntData: state.huntReducer.huntDetail,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  huntDetail,
  huntDetailSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(ViewHuntScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  }
});
