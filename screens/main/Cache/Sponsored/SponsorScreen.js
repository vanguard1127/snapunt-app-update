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
import { getSponsorChallenges, getSponsorChallengesSuccess } from '../../../../store/actions/SponsorActions';
import Loader from '../../../../components/Loader';
import NavigationService from '../../../../services/NavigationService';
let colorGetterFromProps = {};
let darkMode = false;
class SponsorScreen extends React.Component {

  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: true,
    data: []
  }

  componentDidMount() {
    this.props.getSponsorChallenges({ limit: 10, offset: 0 })
  }

  UNSAFE_componentWillReceiveProps(props) {
    console.log(props)
    if (props.success) {
      if (props.sponsorChallenges.length == 0) {
        this.setState({ data: [...this.state.data, ...props.sponsorChallenges], loading: false, dataEnd: true })
      } else {
        this.setState({ data: [...this.state.data, ...props.sponsorChallenges], loading: false, limit: this.state.limit, offset: (this.state.offset + 10) })
      }
      this.props.getSponsorChallengesSuccess(false)
    }
  }


  loadMore() {
    if (this.state.dataEnd == false && !(this.state.data.length < 10)) {
      const data = { offset: this.state.offset, limit: this.state.limit }
      this.props.getSponsorChallenges(data)
      this.setState({ loading: true })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} onPress={() => NavigationService.navigate("SponsorDetail", { uuid: item.uuid, postData: item })} >
              <ImageOverlay overlayAlpha={0.3} containerStyle={{ width: "100%", borderBottomWidth: 2, borderBottomColor: "white", alignItems: "flex-start", padding: 10 }} height={210} source={{ uri: item.thumb }} >
                <View style={{ flex: 1, width: "100%" }} >
                  <View style={{ flexDirection: "row", alignItems: "center" }} >
                    <Avatar.Image size={30} source={{ uri: item.avatar }} style={{ marginRight: 5 }} />
                    <Text style={{ color: "#fff", fontWeight: "500" }} >{item.owner_name}</Text>
                  </View>

                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 25, fontStyle: "italic" }} >{item.title}</Text>
                  </View>

                  {item.last_three_snapoff.users.length != 0 && <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-end" }} >
                    {item.last_three_snapoff.users.map((user, key) => {
                      return <Avatar.Image key={key} size={24} style={{ marginRight: 3 }} source={{ uri: user.avatar }} />
                    })}
                    <Text style={{ color: "white", fontWeight: "bold" }} >{item.last_three_snapoff.total - item.last_three_snapoff.users.length > 0 ? "+" + (item.last_three_snapoff.total - item.last_three_snapoff.users.length) : ""}</Text>
                  </View>}
                </View>
              </ImageOverlay>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.uuid}
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.01}
          ListFooterComponent={this.state.loading ? (<Loader />) : null}
          ListEmptyComponent={!this.state.loading ? <Text style={{ fontSize: 12, color: "lightgrey", textAlign: "center" }} >No Sponsor Challenge Found</Text> : null}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    sponsorChallenges: state.sponsorReducer.sponsorChallenges,
    success: state.sponsorReducer.sponsorChallengesSuccess,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getSponsorChallenges,
  getSponsorChallengesSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(SponsorScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
