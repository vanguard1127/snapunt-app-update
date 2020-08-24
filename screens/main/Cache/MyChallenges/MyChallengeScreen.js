import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { RoundButton, TextButton } from '../../../../components/shared/Button/Button';
import { DummyPostBox, DummyPostBoxMy, PostBox, SavedPostBox } from '../../../../components/shared/PostBox';
import Colors from '../../../../constants/Colors';
import Loader from '../../../../components/Loader';
import { getSavedChallenges, getSavedChallengesSuccess } from '../../../../store/actions/MyChallengeActions';
import NavigationService from '../../../../services/NavigationService';
import { withNavigationFocus } from 'react-navigation';
let colorGetterFromProps = {};
let darkMode = false;
class MyChallengeScreen extends React.Component {

  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: true,
    data: []
  }

  componentDidMount() {
    // this.props.getSavedChallenges({ limit: 10, offset: 0 })
    this.willFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.setState({ data: [], loading: true })
        this.props.getSavedChallenges({ limit: 10, offset: 0 })
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove()
  }

  UNSAFE_componentWillReceiveProps(props) {
    console.log("inside will props")
    if (props.success) {
      console.log("inside success")
      if (props.savedChallenges.length == 0) {
        this.setState({ data: [...this.state.data, ...props.savedChallenges], loading: false, dataEnd: true })
      } else {
        this.setState({ data: [...this.state.data, ...props.savedChallenges], loading: false, limit: this.state.limit, offset: (this.state.offset + 10) })
      }
      this.props.getSavedChallengesSuccess(false)
    }
  }

  loadMore() {
    if (this.state.dataEnd == false && !(this.state.data.length < 10)) {
      const data = { offset: this.state.offset, limit: this.state.limit }
      this.props.getSavedChallenges(data)
      this.setState({ loading: true })
    }
  }

  handlePostForm(item) {
    item["fromDraft"] = true
    item["snapOff"] = item.is_snapoff ? true : false
    var isVideo = item.post_type == "video" ? true : false
    this.props.navigation.navigate("CreatePost", { uri: item.thumb, isVideo: isVideo, postData: item })
  }

  render() {
    return (
      <View style={styles.container}>

        {/* <View style={{margin: 10, borderRadius: 10, borderWidth: 0.5, borderColor: "grey", backgroundColor: "#fff", padding: 20, alignItems: "center", justifyContent: "center"}} >
            <Text style={{fontSize: 18, fontWeight: "bold", fontStyle: "italic", marginBottom: 1}} >3 Free Challenges Left</Text>
            <Text style={{color: "grey", marginBottom: 10, fontSize: 12}} >Pay $3/month and create unlimited challenges. </Text>
            <View style={{flexDirection: "row", justifyContent: "space-evenly"}} >
              <RoundButton text={"Create Challenge"} style={{backgroundColor: colorGetterFromProps.backgroundColor}} onPress={() => this.props.navigation.navigate("CameraScreen")} />
              <RoundButton text={"Subscribe Premium"} style={{backgroundColor: colorGetterFromProps.backgroundColor}}/>
            </View>
          </View> */}

        <View>
          {/* <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 10, fontStyle: "italic", margin: 10}} >Saved Challenges</Text> */}
          <View>

            <FlatList
              data={this.state.data}
              numColumns={2}
              renderItem={({ item, index }) => (
                <SavedPostBox key={index} ch={item} index={index} data={this.state.data} onPress={() => this.handlePostForm(item)} />
              )}
              keyExtractor={item => item.uuid}
              onEndReached={() => this.loadMore()}
              onEndReachedThreshold={0.01}
              ListFooterComponent={this.state.loading ? (<Loader />) : null}
              ListEmptyComponent={!this.state.loading ? <Text style={{ fontSize: 12, color: "lightgrey", textAlign: "center" }} >No Saved Challenges Found</Text> : null}
            />

          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    savedChallenges: state.myChallengeReducer.savedChallenges,
    success: state.myChallengeReducer.savedChallengesSuccess,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getSavedChallenges,
  getSavedChallengesSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(MyChallengeScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
