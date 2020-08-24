import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { userSelector } from '../../../store/selectors/UserSelector';
import HomeBox from '../../../components/shared/PostBox';
let colorGetterFromProps = {};
let darkMode = false;
class SinglePost extends React.Component {

  containerHeight = 0

  state = {
    data: this.props.navigation.getParam("data"),
    containerHeight: 0
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({ showTabBar: false });
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container} onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        this.setState({ containerHeight: height })
      }}>
        <HomeBox detail={true} ch={this.state.data} containerHeight={this.state.containerHeight} navigation={navigation} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    // getChallengeDetailSuccess: state.challengeReducer.getChallengeDetailSuccess,
    // getChallengeDetailError: state.challengeReducer.getChallengeDetailError,
    // challengeDetail: state.challengeReducer.challengeDetail,
    // profileData: state.userReducer.profileData,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  // getChallengeDetail,
  // addClap,
  // updateProfileData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
