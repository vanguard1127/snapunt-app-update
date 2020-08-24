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
import { Card, CardItem, Body, Icon } from "native-base";
import { NativeButton, RoundButton } from '../../../../components/shared/Button/Button';
import NavigationService from '../../../../services/NavigationService';
import { getHunts, getHuntsSuccess } from "../../../../store/actions/HuntActions"
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

        <TouchableOpacity onPress={() => navigation.navigate("QRScanner")} >
          <Icon
            type="MaterialCommunityIcons"
            name="qrcode-scan"
            style={styles.menuIcon}
          />

        </TouchableOpacity>

      </View>
    )
  };
};


class HostAHuntScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    var headerRight = headerRightIcon(navigation, params)
    return {
      ...headerRight
    };
  };

  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: true,
    data: [
    ]
  }

  componentDidMount() {
    this.props.getHunts({ limit: 10, offset: 0 })
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.success) {
      if (props.hunts.length == 0) {
        this.setState({ data: [...this.state.data, ...props.hunts], loading: false, dataEnd: true })
      } else {
        this.setState({ data: [...this.state.data, ...props.hunts], loading: false, limit: this.state.limit, offset: (this.state.offset + 10) })
      }
      this.props.getHuntsSuccess(false)
    }
  }

  loadMore() {
    if (this.state.dataEnd == false && !(this.state.data.length < 10)) {
      const data = { offset: this.state.offset, limit: this.state.limit }
      this.props.getHunts(data)
      this.setState({ loading: true })
    }
  }

  firstTwoChallenges(challenges) {
    var resp = [];
    for (var i = 0; i < 2; i++) {
      if (challenges[i] != undefined) {
        resp.push(<Text key={i} style={{ marginBottom: 5 }} > - {challenges[i]["desc"]}</Text>)
      }
    }
    return resp
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }} >
          <Text style={{ fontSize: 18, fontWeight: "bold" }} >Your Hunt's:</Text>
          <RoundButton text={"New Hunt"} style={{ backgroundColor: colorGetterFromProps.backgroundColor }} onPress={() => NavigationService.navigate("CreateHuntScreen")} />
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, padding: 10 }} >
              <TouchableOpacity onPress={() => NavigationService.navigate("ViewHuntScreen", { uuid: item.uuid })} >

                <Card   >
                  <CardItem header style={{ justifyContent: "space-between", backgroundColor: colorGetterFromProps.homeBackground }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", fontStyle: "italic" }} >{item.title}</Text>
                    <Text style={{ color: "grey", fontWeight: "bold", fontStyle: "italic" }} >Creator: {item.creator}</Text>
                  </CardItem>
                  <CardItem bordered style={{ backgroundColor: colorGetterFromProps.homeBackground }}>
                    <Body  >
                      {this.firstTwoChallenges(item.challenges).map((ch) => (ch))}
                      {item.challenges.length > 2 && <Text style={{ fontStyle: "italic" }} >{item.challenges.length - 2} More</Text>}
                    </Body>
                  </CardItem>

                  {item.last_three.users.length > 0 && <CardItem footer style={{ justifyContent: "flex-end", backgroundColor: colorGetterFromProps.homeBackground }} >
                    <View style={{ flexDirection: "row" }} >
                      {item.last_three.users.map((user, key) => {
                        return <Avatar.Image key={key} size={24} style={{ marginRight: 3 }} source={{ uri: user.avatar }} />
                      })}
                      <Text style={{ fontWeight: "bold" }} >{item.last_three.total - item.last_three.users.length > 0 ? "+" + (item.last_three.total - item.last_three.users.length) : ""}</Text>
                    </View>
                  </CardItem>}
                </Card>
              </TouchableOpacity>

            </View>
          )}
          keyExtractor={item => item.uuid}
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.01}
          ListFooterComponent={this.state.loading ? (<Loader />) : null}
          ListEmptyComponent={!this.state.loading ? <Text style={{ fontSize: 12, color: "lightgrey", textAlign: "center" }} >You don't have any Hunt!</Text> : null}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.huntReducer.getHuntsSuccess,
    hunts: state.huntReducer.hunts,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getHunts,
  getHuntsSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(HostAHuntScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
