import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { ActivityIndicator } from "react-native-paper"
import { connect } from 'react-redux';
import { userSelector } from '../../../store/selectors/UserSelector';
import HomeBox from '../../../components/shared/PostBox';
import Swiper from 'react-native-swiper'
import { Viewport } from '@skele/components'
import Loader from '../../../components/Loader';
let colorGetterFromProps = {};
let darkMode = false;
const dim = Dimensions.get("window")

class ChallengeDetail extends React.Component {

  containerHeight = 0
  index = 0
  loading = false
  newData = []
  showSwiper = false

  state = {
    data: [],
    params: {},
    containerHeight: 0,
    containerWidth: dim.width,
    focus: false,
    offset: 0,
    limit: 12,
    dataEnd: false,
    service: "",
    apiCall: "",
    showSwiper: false,
    static: undefined
  }

  componentDidMount() {
    var detailData = this.props.navigation.getParam("detailData")
    if (detailData != undefined) {
      this.setState({
        data: detailData.data,
        offset: detailData.offset,
        // limit: detailData.limit,
        dataEnd: detailData.dataEnd,
        params: detailData.params,
        apiCall: detailData.apiCall,
        static: detailData.static
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data.length > 0 && this.state.containerHeight > 0 && !this.state.showSwiper) {
      // this.index = this.props.navigation.getParam("detailData").index
      this.setState({ showSwiper: true })
      var detailData = this.props.navigation.getParam("detailData")
      if (detailData.static == undefined) {
        this.firstCall(detailData)
      }
    }
  }

  async firstCall(detailData) {
    try {
      var { data } = await detailData.apiCall({ ...{ limit: this.state.limit, offset: detailData.offset }, ...detailData.params })
      var offset = detailData.offset + 12
      var currentData = detailData.data.length == 1 ? [] : this.detailData.data
      if (currentData.length > 1) {
        // remove loading screen
        currentData.pop()
      }
      if (data.length == 0 || data.length < 12) {
        var mergedData = [...currentData, ...data]
        this.setState({ data: mergedData, offset: offset, dataEnd: true })
        this.loading = false
      } else if (currentData.length == 0) {
        var mergedData = [...currentData, ...data, { loading: true }]
        this.setState({ data: mergedData, offset: offset })
        this.loading = false
      } else {
        var mergedData = [...currentData, ...data, { loading: true }]
        this.setState({ data: mergedData, offset: offset })
        this.loading = false
      }
    } catch (err) {
      console.log(err)
    }
  }

  async callAPI(req, method = this.state.apiCall) {
    try {
      var { data } = await method(req)
      var offset = this.state.offset + 12
      var currentData = this.state.data.length == 1 ? [] : this.state.data
      if (currentData.length > 1) {
        // remove loading screen
        currentData.pop()
      }
      if (data.length == 0 || data.length < 12) {
        var mergedData = [...currentData, ...data]
        this.setState({ data: mergedData, offset: offset, dataEnd: true })
        this.loading = false
      } else if (currentData.length == 0) {
        var mergedData = [...currentData, ...data, { loading: true }]
        this.setState({ data: mergedData, offset: offset })
        this.loading = false
      } else {
        this.newData = [...currentData, ...data, { loading: true }]
        this.loading = false
      }
    } catch (err) {
      console.log(err)
    }
  }

  handlePaging(index) {
    if (this.state.static == undefined) {
      var data = this.state.data
      if ((data.length - 8) == index && !this.state.dataEnd && !this.loading) {
        // var lastFiveIndex = data.length - 5
        //  if(lastFiveIndex == index){
        // run load more here
        this.loading = true
        this.index = index
        this.callAPI({ ...{ limit: this.state.limit, offset: this.state.offset }, ...this.state.params })
      } else {
        // this.setState({ index: index })
        this.index = index
        if (this.newData.length > 0) {
          this.setState({ data: this.newData, offset: this.state.offset + 12 })
          this.newData = []
        }
      }
      // }
    }
  }

  render() {
    console.log("swiper is" + this.state.showSwiper)
    return (
      <SafeAreaView style={styles.container} onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        console.log("safe height is " + width, height)
        this.setState({ containerHeight: height, containerWidth: width })
      }}>

        {this.state.showSwiper ? (
        <Viewport.Tracker>
          <Swiper scrollEventThrottle={16} horizontal={false} loadMinimalSize={2} loadMinimalLoader={<ActivityIndicator />} showsPagination={false} index={this.index} loadMinimal={true} key={this.state.data.length} onIndexChanged={(i) => this.handlePaging(i)} loop={false} >
            {this.state.data.map((slideData, index) => (
              <View key={index} style={{ flex: 1 }}>
                {slideData.loading != undefined ? (
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }} >
                    <ActivityIndicator />
                  </View>
                ) : (
                    // <Text>Faraz</Text>
                    <HomeBox home={true} detail={true} key={index} ch={slideData} index={index} hideDesc={true} containerWidth={this.state.containerWidth} containerHeight={this.state.containerHeight} navigation={this.props.navigation} />
                  )}
              </View>
            ))}
          </Swiper>
        </Viewport.Tracker>) : (<Loader />)}

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
)(ChallengeDetail);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
