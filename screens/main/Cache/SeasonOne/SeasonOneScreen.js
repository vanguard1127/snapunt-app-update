import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper'
import Constants from 'expo-constants';
import ImageOverlay from "@image-overlay";
import { Icon } from "native-base"
import { RoundButton } from '../../../../components/shared/Button/Button';
import { getSeason1Data } from "../../../../store/actions/Season1Actions"
import { ActivityIndicator } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';

import Loader from '../../../../components/Loader';
import { PostBoxProfile, BigBox } from '../../../../components/shared/PostBox';
import { myChallengeService } from '../../../../services/MyChallengeService';
import { season1Service } from '../../../../services/Season1Service';
import normalize from 'react-native-normalize';
import Colors from "../../../../constants/Colors";
import NavigationService from "../../../../services/NavigationService";
import { Logo } from '../../../../components/shared/Logo';
import { Transition, createFluidNavigator } from "react-navigation-fluid-transitions";


let colorGetterFromProps = {};
let darkMode = false;
class SeasonOneScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
      animationEnabled: false,
    }
  };

  state = {
    data: [],
    limit: 20,
    offset: 0,
    dataEnd: false,
    index: 0,
    loading: true,
    width: new Animated.Value(1),
    timePassed: false,
    textToHide: "Featured",
    textToHide2: "Challenges",
    Season1: "Season 1",
    Season2: "Challenges",
    collapsableFlex: new Animated.Value(1),
    LogoMarginTop: new Animated.Value(150),
  }

  UNSAFE_componentWillReceiveProps(props) {
    var offset = this.state.offset + 20
    var currentData = this.state.data.length == 1 ? [] : this.state.data

    // if(currentData.length > 1 ){
    //   remove loading screen
    //   currentData.pop()
    // }

    if (props.season1DataSuccess) {
      if (props.season1Data.length == 0 || props.season1Data.length < 20) {
        var mergedData = [...currentData, ...props.season1Data]
        this.setState({ data: mergedData, offset: offset, dataEnd: true, loading: false })
      } else {
        var mergedData = [...currentData, ...props.season1Data]
        this.setState({ data: mergedData, offset: offset })
      }
    }
  }

  componentDidMount() {
    this.props.getSeason1Data({ limit: 20, offset: 0 })
    const that = this;

    Animated.timing(that.state.width, {
        toValue: 1,
        duration: 500,
        easing: Easing.back()
    }).start();

    setTimeout(function() {
      that.setState({textToHide: "", textToHide2: "", Season1: "", Season2: ""});
    }, 200)

    Animated.timing(that.state.collapsableFlex, {
      toValue: 0,
      duration: 500,
      easing: Easing.back(),
    }).start();

    Animated.timing(that.state.LogoMarginTop, {
      toValue: 115,
      duration: 500,
      easing: Easing.ease
    }).start();

    setTimeout(function(){
      that.setState({timePassed: true})
    }, 500);
  }

  // handlePaging(index){
  //   var data = this.state.data
  //   if((data.length - 8) == index &&!this.state.dataEnd ){
  //     // var lastFiveIndex = data.length - 5
  //   //  if(lastFiveIndex == index){
  //       // run load more here
  //       this.setState({index: index })
  //       this.props.getSeason1Data({ limit: this.state.limit, offset: this.state.offset })
  //     }else{
  //       this.setState({ index: index })
  //     }
  //  // }
  // }

  // snapOff(){
  //   // pass current challenge to CAMERA screen for preloading data
  //   var currentData = this.state.data[this.state.index]
  //   if(currentData){
  //     currentData["snapOff"] = true
  //     this.props.navigation.navigate("CameraScreen", { postData: currentData, clearData: {stack: "CacheStack", screen: "ChallengeMain", navigateTo: "Home", navigationData: {} } } )
  //   }
  // }

  snapOff = (index) => {
    var currentData = this.state.data[index]
    if (currentData.snapoffed) {
      alert("You already Snap Offed!")
    } else {
      // pass current challenge to CAMERA screen for preloading data
      if (currentData) {
        currentData["snapOff"] = true
        currentData["season1"] = true
        this.props.navigation.navigate("CameraScreen", { title: "SEASON 1", postData: currentData, clearData: { stack: "CameraStack", screen: "ChallengeMain", navigateTo: "Home", navigationData: {} } })
      }
    }
  }

  loadMore() {
    if (!this.onEndReachedCalledDuringMomentum) {
      if (this.state.dataEnd == false) {
        this.props.getSeason1Data({ limit: this.state.limit, offset: this.state.offset })
        this.onEndReachedCalledDuringMomentum = true;
      }
    }
  }


  render() {
    let { width } = this.state;
    if (!this.state.timePassed){
      return (
        <View style={[styles.container, { backgroundColor: colorGetterFromProps.white }]}>     
          <Animated.View style={{
            backgroundColor: colorGetterFromProps.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
            flex: width, 
            marginLeft: this.state._marginLeft
          }}>
            <TouchableOpacity activeOpacity={1} >
              <Text style={styles.textStyle}>{this.state.Season1}</Text>
              <Text style={styles.textStyle}>{this.state.Season2}</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ position: "absolute", marginLeft: normalize(145), marginTop: this.state.LogoMarginTop, flex: 1, zIndex: 9999 }}>
            <Image source={require('assets/images/logo1.png')}
          style={{ resizeMode: 'cover', alignSelf: "center",   height: 80, width: 80, borderRadius: 10}} />
          </Animated.View>
          <Animated.View style={{
            backgroundColor: colorGetterFromProps.khaki,
            justifyContent: "center",
            alignItems: "center",
            flex:this.state.collapsableFlex
          }}>
            <TouchableOpacity activeOpacity={1} >
              <Text style={styles.textStyle2} >{this.state.textToHide}</Text>
              <Text style={styles.textStyle2} >{this.state.textToHide2}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
    }
    else{
      return (
        <View style={styles.mainContainer}>
      <View style={[styles.StickToTop, {
        backgroundColor: Colors.lightBackgroundColor
      }]}>
        <View style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: "row",
          marginTop: normalize(20)
        }}>
          <TouchableOpacity onPress={() => {
            NavigationService.goBack()
          }}>
            <Icon name="back" type="AntDesign" style={{ color: Colors.white, fontSize: 25, alignSelf: "flex-start" }} />
          </TouchableOpacity>
        </View>
        <View style={{
          position: "absolute", bottom: normalize(-50), marginLeft: normalize(145)
        }}>
          <Logo />
        </View>
      </View>
      <View style={{backgroundColor: Colors.backgroundColor, flex: 1}}>
        <FlatList
          style={{ paddingTop: normalize(240), paddingBottom: normalize(200), backgroundColor: Colors.backgroundColor }}
          contentContainerStyle={{paddingLeft: normalize(22)}}
          keyExtractor={item => item.uuid}
          numColumns={2}
          data={this.state.data}
          renderItem={({ item, index }) => (
            <BigBox
              detailData={
                {
                  data: [this.state.data[index]],
                  offset: index,
                  params: {},
                  apiCall: season1Service.getSeason1Data,
                  index: index
                }
              }
              snapOff={this.snapOff} key={index} ch={item} index={index} data={this.state.data} />
          )}
          keyExtractor={item => item.uuid}
          initialNumToRender={9}
          maxToRenderPerBatch={2}
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.01}
          ListFooterComponent={this.state.loading ? <Loader /> : null}
          showsVerticalScrollIndicator={false}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          ListEmptyComponent={!this.state.refresh_loading && !this.state.loading ? <Text style={{ fontSize: 16, color: "lightgrey", textAlign: "center" }} >No Posts Found</Text> : null}
        />
      </View>




      {/* <Swiper loadMinimal={true} loadMinimalSize={2} key={this.state.data.length} index={this.state.index} style={styles.wrapper} showsPagination={false} onIndexChanged={(i) => this.handlePaging(i)} loop={false} >
          {this.state.data.map((slideData, index) => (
             <View key={index} style={styles.slide1}>
               {slideData.loading != undefined ? (
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }} >
                        <ActivityIndicator />
                    </View>
               ) : (
                <ImageOverlay imageStyle={{resizeMode: "contain"}} overlayAlpha={ slideData.snapoffed ? 0.5 : 0 } containerStyle={{width: "100%", flex: 1, justifyContent: "flex-start", alignItems: "flex-start", backgroundColor: "black"}} source={ {uri: slideData.media} } >
                  <View style={{flex: 1, justifyContent: "space-between", width: "100%",  marginTop: 30}} >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ChallengeMain")} >
                      <Icon name="arrow-back" type="MaterialIcons" size={28} style={{color: "white", padding: 10 }} />
                    </TouchableOpacity>

                    { slideData.snapoffed && <View style={{justifyContent: "center", alignItems: "center"}} >
                      <Icon name="check" type="AntDesign" style={{color: "white", fontSize: 100}} />
                    </View>}


                  <View style={{padding: 15,  backgroundColor: 'rgba(0,0,0,.5)'}} >
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center", marginBottom: 10, lineHeight: 22}} >{slideData.desc}</Text>
                    {slideData.snapoffed ? (
                      <RoundButton text={"COMPLETED"} />
                    ) : (
                      <RoundButton text={"START"} onPress={() => this.snapOff()}  />
                    )}
                  </View>
                  </View>
                </ImageOverlay>
               )}
           </View>
          ))}
      </Swiper> */}




    </View>
      );
    } 
  }
}

const mapStateToProps = state => {
  return {
    season1Data: state.season1Reducer.season1Data,
    season1DataSuccess: state.season1Reducer.season1DataSuccess,
    color: state.userReducer.Color,
    darkMode: state.userReducer.DarkMode,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getSeason1Data
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeasonOneScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    position: "relative"
  },

  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },

  slide1: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: Constants.statusBarHeight,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  postContainer: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center"
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: normalize(15),
    marginBottom: normalize(15)
  },
  post: {
    resizeMode: "cover",
    borderRadius: 5,
    height: normalize(150),
    width: normalize(150)
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
  StickToTop: {
    alignSelf: "center",
    padding: normalize(10),
    position: 'absolute',
    width: "100%",
    zIndex: 90,
    height: normalize(150),
  },

  textStyle: {
    fontSize: 16,
    color: "white"
  },
  textStyle2: {
    fontSize: 16,
    color: "#AF7653"
  }
});
