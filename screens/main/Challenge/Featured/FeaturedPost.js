import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { connect } from 'react-redux';
import { getFeaturedChallenges, getFeaturedChallengesSuccess } from '../../../../store/actions/FeaturedActions';
import Loader from '../../../../components/Loader';
import { featuredService } from '../../../../services/FeaturedService';
import HomeBox, { BigBox } from '../../../../components/shared/PostBox';
import { OutlineButton, DarkOutlineButton } from '../../../../components/shared/Button/Button';
import NavigationService from '../../../../services/NavigationService';
import normalize from 'react-native-normalize';
import Colors from "../../../../constants/Colors";
import { Logo } from '../../../../components/shared/Logo';
import { Icon } from "native-base"
let colorGetterFromProps = {};
let darkMode = false;
const dim = Dimensions.get("window")

class FeaturedPost extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
        header: null,
    }
  };

  
  // state = {
  //   loading: true,
  //   dataEnd: false,
  //   limit: 12,
  //   offset: 0,
  //   pullLoader: false,
  //   index: 0,
  //   containerHeight: 0,
  //   featuredData: []
  // }

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

  UNSAFE_componentWillReceiveProps(props){
    if(props.success){
      var offset = this.state.offset + 20
      var currentData = this.state.data.length == 1 ? [] : this.state.data
  
      // if(currentData.length > 1 ){
      //   remove loading screen
      //   currentData.pop()
      // }

      if(props.featuredChallenges){
        if(props.featuredChallenges.length == 0 || props.featuredChallenges.length < 20){
          var mergedData = [...currentData, ...props.featuredChallenges]
          this.setState({data: mergedData, offset: offset, dataEnd: true, loading: false } )
        }else{
          var mergedData = [...currentData, ...props.featuredChallenges]
          this.setState({data: mergedData, offset: offset })
        }
      }
      this.props.getFeaturedChallengesSuccess(false)
    }
  }

  componentDidMount(){
    this.props.getFeaturedChallenges({ limit: 20, offset: 0 });
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

  // snapOff = (index) => {
  //   var currentData = this.state.data[index]
  //   if(currentData.snapoffed){
  //     alert("You already Snap Offed!")
  //   }else{
  //     // pass current challenge to CAMERA screen for preloading data
  //     if(currentData){
  //       currentData["snapOff"] = true
  //       currentData["is_featured"] = true
  //       this.props.navigation.navigate("CameraScreen", { title: "SNAPOFF", postData: currentData, clearData: {stack: "CameraStack", screen: "ChallengeMain", navigateTo: "Home", navigationData: {} } } )
  //     }
  //   }
  // }

  loadMore(){
    if (!this.onEndReachedCalledDuringMomentum) {
      if(this.state.dataEnd == false){
        this.props.getFeaturedChallenges({ limit: this.state.limit, offset: this.state.offset })
        this.onEndReachedCalledDuringMomentum = true;
      }      
    }
  }

  // componentDidMount(){
  //   this.callAPI({ limit: 10, offset: 0 })
  // }

  // async callAPI(req){
  //   try{
  //     var {data} = await  featuredService.getFeaturedChallenges(req)
  //     var featuredData = data
  //     var offset = this.state.offset + 12
  //     var currentData = this.state.featuredData.length == 1 ? [] : this.state.featuredData
  
  //     if(currentData.length > 1 ){
  //       // remove loading screen
  //       currentData.pop()
  //     }
  //     if(featuredData.length == 0 || featuredData.length < 12){
  //       var mergedData = [...currentData, ...featuredData]
  //       this.setState({featuredData: mergedData, offset: offset, dataEnd: true, loading: false } )
  //       this.loading = false
  //     }else if (currentData.length == 0){
  //       var mergedData = [...currentData, ...featuredData, { loading:true }]
  //       this.setState({featuredData: mergedData, offset: offset, loading: false })
  //       this.loading = false
  //     }else{
  //       this.newData = [...currentData, ...featuredData, { loading:true }]
  //       this.loading = false
  //     }
  //   }catch(err){
  //     alert(err)
  //   }
  // }

  // handlePaging(index){
  //   var data = this.state.featuredData
  //   if((data.length - 8) == index && !this.state.dataEnd && !this.loading){
  //     // var lastFiveIndex = data.length - 5
  //   //  if(lastFiveIndex == index){
  //       // run load more here
  //       this.loading = true
  //       this.index = index
  //       this.callAPI({ limit: this.state.limit, offset: this.state.offset })
  //     }else{
  //       // this.setState({ index: index })
  //       this.index = index
  //       if(this.newData.length > 0){
  //         this.setState({featuredData: this.newData, offset: this.state.offset + 12 })
  //         this.newData = []
  //       }
  //     }
  //  // }
  // }
  render() {
    let { width } = this.state;
    if (!this.state.timePassed){
      return (
        <View style={[styles.container, { backgroundColor: colorGetterFromProps.white }]}>     
          <Animated.View style={{
            backgroundColor: colorGetterFromProps.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
            flex: this.state.collapsableFlex, 
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
            flex: width, 
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
        <SafeAreaView style={styles.mainContainer} >
  
          {/* // <Viewport.Tracker>
          //   {this.state.featuredData.length == 0 ? (
          //     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
          //       <Text style={{color: "#fff", fontSize: 18, marginBottom: 20}} >No Challenges Found!</Text>
          //       <OutlineButton text={"Go Back"} onPress={() => NavigationService.goBack()} />
          //     </View>
          //   ) : (
          //     <Swiper scrollEventThrottle={16} horizontal={false} loadMinimalSize={2} loadMinimalLoader={<ActivityIndicator />} showsPagination={false} index={this.index} loadMinimal={true} key={this.state.featuredData.length}  style={styles.wrapper} onIndexChanged={(i) => this.handlePaging(i)} loop={false} >
          //     {this.state.featuredData.map((slideData, index) => (
          //     <View key={index} style={{flex: 1}}>
          //     {slideData.loading != undefined ? (
          //           <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }} >
          //               <ActivityIndicator />
          //           </View>
          //     ) : (
          //       // <Text>Faraz</Text>
          //       <HomeBox home={true} detail={true} key={index} ch={slideData} index={index} hideDesc={true} containerWidth={this.state.containerWidth} containerHeight={this.state.containerHeight} navigation={this.props.navigation} />
          //           )}
          //       </View>
          //       ))}
          //   </Swiper>
          //   )}
          // </Viewport.Tracker> */}
          <View style={[styles.StickToTop, {
            backgroundColor: Colors.lightKhaki
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
                <Icon name="back" type="AntDesign" style={{ color: Colors.black, fontSize: 25, alignSelf: "flex-start" }} />
              </TouchableOpacity>
            </View>
            <View style={{
              position: "absolute", bottom: normalize(-50), marginLeft: normalize(145)
            }}>
              <Logo />
            </View>
          </View>
          <View style={{ marginLeft: normalize(23) }}>
            <FlatList
              style={{ paddingTop: normalize(240), paddingBottom: normalize(200) }}
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
                      apiCall: featuredService.getFeaturedChallenges,
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
              ListEmptyComponent={!this.state.loading ? <View style={{ height: dim.height - 50, justifyContent: "center", alignItems: "center" }} >
                <Text style={{ fontSize: 18, marginBottom: 20 }} >No Challenges Found!</Text>
              </View> : null}
            />
          </View>
  
  
        </SafeAreaView>
        
      );
    } 
  }
}

const mapStateToProps = state => {
  return {
    featuredChallenges: state.featuredReducer.featuredChallenges,
    success: state.featuredReducer.featuredChallengesSuccess,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getFeaturedChallenges,
  getFeaturedChallengesSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedPost);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    position: "relative"
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.khaki
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
