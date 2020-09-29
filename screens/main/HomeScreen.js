import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Icon } from "native-base"
import { connect } from 'react-redux';
import { getHomeData } from '../../store/actions/HomeActions';
import { userSelector } from '../../store/selectors/UserSelector';
import Colors from '../../constants/Colors';
import HomeBox from '../../components/shared/PostBox';
import Loader from '../../components/Loader';
import { addHeaderRightNavigator } from '../../helpers';
import { ActivityIndicator, Badge, Avatar } from 'react-native-paper';
import { homeService } from '../../services/HomeService';
import Swiper from 'react-native-swiper'
import { NavigationEvents } from 'react-navigation';
import { Viewport } from '@skele/components'
import { TextButton, RoundButton } from '../../components/shared/Button/Button';
import GlobalStyles from '../../constants/GlobalStyles';
import { normalizeFont, addPrefix } from '../../helpers/CommonMethods';
import Social from '../../components/shared/Challenge/Social';
import normalize from "react-native-normalize";
let colorGetterFromProps = {};
let darkMode = false;

class HomeScreen extends React.Component {

  myCustomAnimatedValue = new Animated.Value(0);
  index = 0
  loading = true
  newData = []

  static navigationOptions = ({ navigation }) => {
    const rightIcon = addHeaderRightNavigator(navigation)
    return {
      title: 'Sn△pHunt',
      headerBackTitle: null,
      ...rightIcon,
      headerTitleStyle: {
        fontFamily: "Merriweather",
        fontWeight: "700",
        fontStyle: "italic"
      }
    };
  };

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({ avatar: this.props.user.avatar })
  }

  state = {
    homeData: [],
    loading: true,
    dataEnd: false,
    limit: 12,
    offset: 0,
    pullLoader: false,
    index: 0,
    containerHeight: 0,
    focus: false,
    itemData: this.renderDataView
  };

  // componentWillReceiveProps(props){
  //   if(this.state.focus){
  //     this.setState({ homeData: [] })
  //     this.index = 0
  //     this.newData = []
  //     const data = { offset: 0, limit: this.state.limit }
  //     this.callAPI(data)
  //   }
  // }

  // componentWillReceiveProps(props){
  //   if(props.homeDataSuccess){
  //     if(this.state.pullLoader){
  //       // means pull to refresh was called
  //       this.setState({ homeData: props.homeData, pullLoader: false, dataEnd: false, limit: this.state.limit, offset: (this.state.offset + 8) })
  //     }else{
  //       // normal case
  //       if(props.homeData.length == 0){
  //         this.setState({ homeData: [...this.state.homeData, ...props.homeData], loading: false, dataEnd: true })
  //       }else{
  //         this.setState({ homeData: [...this.state.homeData, ...props.homeData], loading: false, limit: this.state.limit, offset: (this.state.offset + 8) })
  //       }
  //     }
  //   }
  // }

  async callAPI(req) {
    try {
      var { data } = await homeService.fetchHomeData(req)
      var homeData = data
      var offset = this.state.offset + 12
      var currentData = this.state.homeData.length == 1 ? [] : this.state.homeData

      if (currentData.length > 1) {
        // remove loading screen
        currentData.pop()
      }
      if (homeData.length == 0 || homeData.length < 12) {
        var mergedData = [...currentData, ...homeData]
        this.setState({ homeData: mergedData, offset: offset, dataEnd: true })
        this.loading = false
      } else if (currentData.length == 0) {
        var mergedData = [...currentData, ...homeData, { loading: true }]
        this.setState({ homeData: mergedData, offset: offset })
        this.loading = false
      } else {
        this.newData = [...currentData, ...homeData, { loading: true }]
        this.loading = false
      }
    } catch (err) {
      alert(err)
    }
  }

  // componentWillReceiveProps(props){
  //   var offset = this.state.offset + 8
  //   var currentData = this.state.homeData.length == 1 ? [] : this.state.homeData

  //   if(currentData.length > 1 ){
  //     // remove loading screen
  //     currentData.pop()
  //   }

  //   if(props.homeDataSuccess){
  //     if(props.homeData.length == 0 || props.homeData.length < 8){
  //       var mergedData = [...currentData, ...props.homeData]
  //       this.setState({homeData: mergedData, offset: offset, dataEnd: true } )
  //       this.loading = false
  //     }else if (currentData.length == 0){
  //       var mergedData = [...currentData, ...props.homeData, { loading:true }]
  //       this.setState({homeData: mergedData, offset: offset })
  //       this.loading = false
  //     }else{
  //       this.newData = [...currentData, ...props.homeData, { loading:true }]
  //       this.loading = false
  //     }
  //   }
  // }

  handleFocus() {
    this.setState({ homeData: [], focus: true })
    this.index = 0
    this.newData = []
    const data = { offset: 0, limit: this.state.limit }
    this.callAPI(data)
  }

  // componentWillMount(){
  //   // StatusBar.setBarStyle('light-content', true);
  // }

  handlePaging(index) {
    var data = this.state.homeData
    if ((data.length - 8) == index && !this.state.dataEnd && !this.loading) {
      // var lastFiveIndex = data.length - 5
      //  if(lastFiveIndex == index){
      // run load more here
      this.loading = true
      this.index = index
      this.callAPI({ limit: this.state.limit, offset: this.state.offset })
    } else {
      // this.setState({ index: index })
      this.index = index
      if (this.newData.length > 0) {
        this.setState({ homeData: this.newData, offset: this.state.offset + 12, itemData: this.renderDataView(this.index) })
        this.newData = []
      }
    }
    // }
  }

  // loadMore(){
  //   if(this.state.dataEnd == false){
  //     const data = { offset: this.state.offset, limit: this.state.limit }
  //     this.props.getHomeData(data)
  //     this.setState({loading: true})
  //   }
  // }

  // _refresh(){
  //   this.setState({pullLoader: true, offset: 0, limit: 8})
  //   const data = { offset:0, limit: 8 }
  //   this.props.getHomeData(data)
  // }

  renderDataView(index) {
    var data = this.state.homeData
    var item_data;
    if (!index) {
      item_data = data[0]
    }
    else {
      item_data = data[index]
    }

    console.log(data.length)
    // return (
    //   <View style={{
    //     flex: 1, alignItems: "center", height: normalize(300, "height"), position: "absolute", bottom: normalize(80, "height")
    //   }}>
    //     <View >
    //       <View style={{ padding: 10, marginBottom: 100, height: 165 }} >
    //         <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", marginTop: StatusBar.currentHeight }} >
    //           <View style={{ flexDirection: "row" }} >
    //             <Image source={{ uri: item_data.owner.avatar }} style={{ height: normalize(40), width: normalize(40), borderRadius: 50 }} />
    //             {/* <Image source={{uri: slideData.avatar}} style={{resizeMode: "contain", borderWidth: 1, borderColor: "yellow"}} /> */}
    //             <View >
    //               <View style={{ margin: normalize(10) }}>
    //                 <Text style={{ marginLeft: normalize(8, "width"), color: Colors.light_ash_white, fontSize: normalize(20), }} onPress={() => this.navigation.navigate("FriendProfile", { owner: item_data.owner })}>{item_data.owner.username}</Text>
    //               </View>
    //               <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: normalize(10), width: normalize(280, "width") }}>
    //                 <Badge style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
    //                   <Text style={styles.badgeText}>{item_data.cat_name}</Text>
    //                 </Badge>
    //                 <Text style={{ right: 0, fontSize: normalizeFont(13), color: Colors.light_ash_white }}>1 month ago</Text>
    //               </View>
    //             </View>
    //           </View>
    //           {this.props.detail != undefined && <TouchableOpacity onPress={() => this.navigation.pop(1)} ><Icon name="close" type="EvilIcons" style={{ color: "white", marginRight: 10, fontWeight: "bold" }} /></TouchableOpacity>}
    //         </View>
    //         <View style={{ margin: normalize(10), marginLeft: normalize(55) }}>
    //           <Text style={{ right: 0, fontSize: normalizeFont(15), color: Colors.light_ash_white, marginTop: normalize(10, "height"), marginBottom: normalize(10, "height"), width: normalize(280, "height"), paddingRight: normalize(20, "width") }} numberOfLines={3} ellipsizeMode='tail'>{item_data.desc}</Text>
    //         </View>
    //         <View style={{ marginBottom: 20, width: "100%" }} >
    //           {item_data.is_featured == true && item_data.featured_url && (<TouchableOpacity onPress={() => Linking.openURL(addPrefix(item_data.featured_url))} ><Text style={{ color: "#fff", fontWeight: "bold", marginTop: 5 }} >
    //             {addPrefix(item_data.featured_url)}
    //           </Text></TouchableOpacity>)}
    //           {item_data.original_owner != undefined && item_data.original_owner != null && <View style={{ flexDirection: "row", alignItems: "center" }} >
    //             <Text style={{ color: "white", fontSize: 12, marginRight: 2 }} >Creator:</Text>
    //             <TouchableOpacity onPress={() => this.navigation.navigate("FriendProfile", { owner: item_data.original_owner })}>
    //               <Text style={{ fontWeight: "bold", textDecorationLine: "underline", color: "#fff", fontSize: 12 }} >{item_data.original_owner.username}</Text>
    //             </TouchableOpacity>
    //           </View>}
    //         </View>
    //         <View style={{ marginLeft: normalize(55), padding: 10 }}>
    //           <Social data={item_data} navigation={this.navigation} />
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // )

  }

  render() {
    let props = this.props
    return (
      <SafeAreaView style={styles.container} onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        console.log(height, width)
        this.setState({ containerHeight: height, containerWidth: width })
      }}>

        <NavigationEvents
          onDidFocus={payload => this.handleFocus()}
          onWillBlur={payload => this.setState({ focus: false })}
        />

        {/* <FlatList
            data={this.state.homeData}
            numColumns={2}
            renderItem={({ item, index }) => (
              <PostBox key={index} ch={item} index={index} hideDesc={true} data={this.state.homeData} />
            )}
            keyExtractor={item => item.uuid}
            onEndReached={() => this.loadMore()}
            onEndReachedThreshold={0.01}
            ListFooterComponent={ this.state.loading ? (<Loader />) : null}
            onRefresh={() => this._refresh()}
            refreshing={this.state.pullLoader}
          /> */}

        {/* <FlatList
            data={this.state.homeData}
            renderItem={({ item, index }) => (
              <HomeBox key={index} ch={item} index={index} hideDesc={true} data={this.state.homeData} />
            )}
            keyExtractor={item => item.uuid}
            onEndReached={() => this.loadMore()}
            onEndReachedThreshold={0.01}
            ListFooterComponent={ this.state.loading ? (<Loader />) : null}
            onRefresh={() => this._refresh()}
            refreshing={this.state.pullLoader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          /> */}


        {/* <Swiper horizontal={false} key={this.state.homeData.length} index={this.state.index} style={styles.wrapper} onIndexChanged={(i) => this.handlePaging(i)} loop={false} >
            {this.state.homeData.map((slideData, index) => (
              <View key={index} style={styles.slide1}>
                {slideData.loading != undefined ? (
                      <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }} >
                          <ActivityIndicator />
                      </View>
                ) : (
                  <HomeBox key={index} ch={slideData} index={index} hideDesc={true} />
                )}
            </View>
            ))}
          </Swiper> */}


        {/* <ParallaxSwiper
          vertical={true}
          speed={1}
          dividerWidth={8}
          dividerColor={"white"}
          backgroundColor="black"
          onMomentumScrollEnd={activePageIndex => this.handlePaging(activePageIndex)}
          scrollToIndex={this.index}
        >

        {this.state.homeData.map((slideData, index) => {
          return <ParallaxSwiperPage
            key={index}
            BackgroundComponent={
              slideData.loading != undefined ? (
                <View style={{height: height, justifyContent: "center", alignItems: "center", backgroundColor: "black"}} >
                    <ActivityIndicator />
                </View>
            ) : (
              <HomeBox currentIndex={this.index} key={index} ch={slideData} index={index} hideDesc={true} containerHeight={this.state.containerHeight} navigation={this.props.navigation} />
            )
          }
        />
        })}
       
      </ParallaxSwiper> */}
        {this.state.focus ? (
            <View style={{ flex: 1 }}>
              <View style={styles.StickToTop}>
                <Text
                  style={{
                    fontSize: normalizeFont(38),
                    fontWeight: '500',
                    color: 'rgba(255,255,255,0.8)',
                    marginTop: normalize(15),
                    fontStyle: 'italic'
                  }}
                >
                  SnΔpHunt
                </Text>
              </View>
              <Viewport.Tracker>
              <Swiper
                scrollEventThrottle={16}
                horizontal={false}
                loadMinimalSize={2}
                loadMinimalLoader={<ActivityIndicator />}
                showsPagination={false}
                index={this.index}
                loadMinimal={true}
                key={this.state.homeData.length}
                style={styles.wrapper}
                onIndexChanged={i => this.handlePaging(i)}
                loop={false}
              >
                {this.state.homeData.map((slideData, index) => (
                  <View key={index} style={styles.slide1}>
                    {slideData.loading ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'black'
                        }}
                      >
                        <ActivityIndicator />
                      </View>
                    ) : (
                      <HomeBox
                        backgroundColorForSocial={colorGetterFromProps.white}
                        home={true}
                        key={index}
                        ch={slideData}
                        index={index}
                        hideDesc={true}
                        containerWidth={this.state.containerWidth}
                        containerHeight={this.state.containerHeight}
                        navigation={this.props.navigation}
                      />
                    )}
                  </View>
                ))}
              </Swiper>
              </Viewport.Tracker>
              {/* {this.state.itemData.call(this)} */}
              {
                <View
                  style={{
                    flex: 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black'
                  }}
                >
                  <ActivityIndicator />
                </View>
              }
            </View>
          
        ) : (
          <Loader />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    // homeDataSuccess: state.homeReducer.homeDataSuccess,
    // homeData: state.homeReducer.homeData,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  // getHomeData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    // borderWidth: 1,
    // borderColor: "red"
    // paddingTop: StatusBar.currentHeight
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: "center"
  },
  item: {
    width: "48%",
    marginTop: 20,

    marginRight: 5
  },
  postContainer: {
    alignItems: "center"
  },
  clapBox: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  slide1: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1
  },
  foregroundTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 0.41,
    color: "white"
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
  StickToTop: {
    height: 10,
    margin: 8,
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: Colors.white,
    borderRadius: 40,
    borderColor: "transparent",
    position: 'absolute',
    shadowColor: "rgba(0,0,0,0.02)",
    elevation: 0.2
  }
});
