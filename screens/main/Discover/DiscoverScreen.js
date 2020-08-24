import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  BackHandler,
  Dimensions,
  ImageBackground,
  ScrollView,
  Modal,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  FlatList,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../../constants/Colors';
import { DummyPostBox, PostBox, PostBoxProfile } from '../../../components/shared/PostBox';
import { RegularInput } from '../../../components/shared/FormFields';
import { Header, Body, Button, Icon, Left, Badge, Content, Item, Input } from "native-base";
import Constants from 'expo-constants';
import { TextButton } from '../../../components/shared/Button/Button';
import SearchScreen from './SearchScreen';
import SearchResults from './SearchResults';
import { searchUsers, setSearchUsers, searchResults, resetDiscoverStore, getDiscoverData, discoverDataSuccess as setDiscoverSuccess, setCategorySuccess, getCategoryData } from "../../../store/actions/DiscoverActions"
import { withNavigationFocus } from 'react-navigation';
import { discoverService } from '../../../services/DiscoverService';
import CategoryList from './CategoryList';
import NavigationService from '../../../services/NavigationService';

import { LinearGradient } from 'expo-linear-gradient';
import normalize from "react-native-normalize";
import Swiper from 'react-native-swiper'
var dim = Dimensions.get("window")
let colorGetterFromProps = {};
let darkMode = false;
import { categories_system } from '../../../helpers/CommonMethods';
import { nothing } from 'immer';


class DiscoverScreen extends React.Component {

  constructor(props) {
    super(props);
    this.categoriesLoadMore = this.categoriesLoadMore.bind(this);

  }
  onEndReachedCalledDuringMomentum = true;

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false
    };
  };

  state = {
    container: 1,
    query: "",
    disableSearch: true,
    username: "",
    fromDetail: false,
    discoverData: [],
    loading: true,
    categoryDataEnd: false,
    categoryLoading: true,
    categoryLimit: 8,
    categoryOffset: 0,
    loadMoreData: {},
    categoryIndex: null,
    refresh_loading: false,
    modalVisible: false,
    selectedCategory: "",
    selectDiscoverData: []
  }

  componentDidMount() {
    const data = { offset: this.state.categoryOffset, limit: this.state.categoryLimit }
    this.props.getDiscoverData(data)
  }

  _refresh = () => {
    const data = { offset: 0, limit: this.state.categoryLimit }
    this.props.getDiscoverData(data)
    this.setState({ refresh_loading: true, categoryDataEnd: false, categoryLoading: true, categoryOffset: 0 })
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.discoverDataSuccess) {
      if (props.discoverData.length < 8) {
        if (this.state.refresh_loading) {
          this.setState({ discoverData: props.discoverData, categoryLoading: false, categoryDataEnd: true, loading: false, refresh_loading: false })
        } else {
          this.setState({ discoverData: [...this.state.discoverData, ...props.discoverData], categoryLoading: false, categoryDataEnd: true, loading: false, refresh_loading: false })
        }
      } else {
        if (this.state.refresh_loading) {
          this.setState({ discoverData: props.discoverData, loading: false, categoryOffset: (this.state.categoryOffset + 8), refresh_loading: false })
        } else {
          this.setState({ discoverData: [...this.state.discoverData, ...props.discoverData], loading: false, categoryOffset: (this.state.categoryOffset + 8), refresh_loading: false })
        }
      }
      this.props.setDiscoverSuccess(false)
    }
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButtonClick());
  }



  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButtonClick());
  }

  handleBackButtonClick() {
    if (!this.state.fromDetail && this.props.isFocused) {
      this.props.navigation.setParams({ showTabBar: true });
      this.setState({ container: 1, query: "", disableSearch: true, username: "" })
      this.props.resetDiscoverStore()
      return true
    } else {
      this.setState({ fromDetail: false })
    }
  }

  handleFocus = () => {
    this.props.navigation.setParams({ showTabBar: false });
    this.setState({ container: 2 })
  }

  handleSearch(username = this.state.query) {
    this.setState({ container: 3, username: username, query: username })
    Keyboard.dismiss()
  }

  handleDetailState(val) {
    this.setState({ fromDetail: val })
  }

  handleBack = () => {
    Keyboard.dismiss()
    if (!this.state.fromDetail) {
      this.props.resetDiscoverStore()
      this.props.navigation.setParams({ showTabBar: true });
      this.setState({ container: 1, query: null, disableSearch: true })
    } else {
      this.setState({ fromDetail: false })
    }
  }

  handleChange(val) {
    if (val != "") {
      this.props.searchUsers(val)
      this.setState({ query: val, disableSearch: false })
    } else {
      this.props.searchUsers(null)
      this.setState({ query: val, disableSearch: true })
    }
  }

  categoriesLoadMore() {

    /*if (!this.onEndReachedCalledDuringMomentumMain) {
      if (this.state.categoryDataEnd == false) {
        const data = { offset: this.state.categoryOffset, limit: this.state.categoryLimit }
        this.props.getDiscoverData(data)
        this.onEndReachedCalledDuringMomentumMain = true;
      }
    }*/
    if (this.state.categoryDataEnd == false) {
      const data = { offset: this.state.categoryOffset, limit: this.state.categoryLimit }
      this.props.getDiscoverData(data)
      this.setState({categoryOffset: 8 })
    }

  }
  
  clickLeaderboard = () => {
    this.props.navigation.navigate('LeaderBoard');
  }


  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    const { container, query, disableSearch } = this.state
    var buttonColor = disableSearch ? "lightgrey" : colorGetterFromProps.backgroundColor
    const Avatar1 = { uri: "https://uploads.scratch.mit.edu/users/avatars/53328900.png" };
    const Avatar2 = { uri: "https://demo.athemes.com/intro/wp-content/uploads/sites/33/2014/12/kitty-551554_1280-500x500.jpg" };
    const Avatar3 = { uri: "https://www.agrimaccari.com/en/wp-content/uploads/2015/05/girl-500x500.jpg" };
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'orange',
        }}>
        <ImageBackground source={require('../../../assets/images/discovery_scenery_header-01.png')} style={{
          resizeMode: "contain",
          height: "100%",
          width: "100%"
        }}>
          <LinearGradient
            // Background Linear Gradient
            colors={['transparent', colorGetterFromProps.white, colorGetterFromProps.white]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: "100%",
            }}
          >
            <View>
              <ScrollView>
                <Button style={{ marginTop: normalize(30, "height"), width: normalize(200, "width"), elevation: 0.3, height: normalize(40), backgroundColor: "rgba(0,0,0,0.01)", borderRadius: 50, alignSelf: "center", justifyContent: "center", alignItems: "center", marginBottom: normalize(50, "height") }} onPress={() => { this.setModalVisible(true) }}>
                  <Icon type="FontAwesome" name="list" style={styles.IconStyle} />
                  <Text style={styles.TextStyle}>Categories</Text>
                </Button>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                >
                  <View style={{ backgroundColor: colorGetterFromProps.white, width: windowWidth, height: "100%" }}>
                    <View style={{ height: "100%" }}>

                     <ScrollView>
                       
                     <FlatList
                        style={{height: "100%", paddingBottom: normalize(100)}}
                        keyExtractor={item => item.title}
                        data={this.state.discoverData}
                        renderItem={({ item, index }) => {
                          return <View style={{ flexDirection: "row", width: "70%", alignSelf: "center" }}>
                            <View style={{ flex: 0.5 }}>
                            </View>
                            <View style={{ flex: 0.5 }}>
                              {this.state.selectedCategory == item.title ? <View style={{ width: normalize(30), height: normalize(30), borderRadius: 50, borderColor: colorGetterFromProps.backgroundColor, borderWidth: 2, marginTop: normalize(15) }}></View>
                                : <View />}</View>
                            <View style={{ flex: 3 }}>
                              <View style={styles.ITem2}>
                                <TouchableOpacity onPress={() => {
                                  this.setState(() => {
                                    this.state.selectedCategory = item.title;
                                    this.state.selectDiscoverData = [item];
                                    this.state.categoryLoading = false
                                  }, () => {
                                    this.setModalVisible(!modalVisible);
                                  });

                                }}>
                                  <Text style={{ color: colorGetterFromProps.violetXblue, fontSize: normalize(30) }}>{item.title}</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        }}
                        ListHeaderComponent={() => 
                          (
                        <View
                          style={ {
                            backgroundColor: colorGetterFromProps.white, paddingTop: normalize(30),
                            height: normalize(60), flex: 1, flexDirection: "row", paddingLeft: normalize(10)
                          }}
                        >
                          <TouchableOpacity style={{flex:0.6}} onPress={() => {
                            this.setModalVisible(!modalVisible);
                          }}>
                            <Icon name="back" type="AntDesign" style={{ color: colorGetterFromProps.violetXblue, fontSize: normalize(30) }} />
                          </TouchableOpacity>
                          <View style={{flex:1, alignItems: "flex-start"}}>
                          <Text style={{ fontSize: normalize(20), color: colorGetterFromProps.violetXblue, textAlign: "center"}}>Categories</Text>
                          </View>
                        </View>)
                        }
                        ListFooterComponent={this.state.categoryLoading ? <Loader /> : null}
                        onEndReachedThreshold={0.1}
                       onEndReached={this.categoriesLoadMore}
                      />
                     </ScrollView>
                      <View>
                       
                        <View >
                          
                          <KeyboardAvoidingView style={[styles.StickToBottom, { backgroundColor: colorGetterFromProps.white }]} behavior={Platform.select({android: undefined, ios: 'padding'})} keyboardVerticalOffset={Platform.select({ios: 60, android: 500})}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1 }}>
                              <Content>
                                <Item style={{ width: "80%", height: normalize(50), alignSelf: "center", borderRadius: 50, justifyContent: "center", alignItems: "center", FontSize: normalize(15), padding: normalize(10), borderBottomColor: "transparent" }}>
                                  <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 5 }} >
                                    <RegularInput value={query} placeholder="Search"  icon="magnifier" family="SimpleLineIcons" onChangeText={(val) => this.handleChange(val)} style={{ height: normalize(40), width: normalize(220), borderRadius: 30, backgroundColor: "rgba(33,34,51, .4)", color:Colors.white}} />
                                    <TextButton disabled={disableSearch} onPress={() => { this.handleSearch(this.state.query); this.setModalVisible(!modalVisible); }} text={"Search"} style={{ color: buttonColor, marginLeft: 10, fontWeight: "bold", backgroundColor: colorGetterFromProps.diffrentColor }} />
                                  </View>
                                </Item>
                              </Content>
                            </View>
                          </KeyboardAvoidingView>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Badge style={{ backgroundColor: "#2D2E44", justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: normalize(30), width: normalize(150) }}>
                  <Text style={{ color: Colors.white }}>Top Challengers</Text>
                </Badge>
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={this.clickLeaderboard}>
                  <Icon name="map-marker" type="FontAwesome" style={{ color: colorGetterFromProps.darkGrey, fontSize: normalize(25), marginRight: normalize(40) }} />
                </TouchableOpacity>
                <Swiper style={{ height: normalize(250) }} dot={<Text></Text>} activeDot={<Text></Text>} showsButtons={false}>
                  <View style={styles.slide}>
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <Image source={Avatar1} style={styles.AvatarStyle} />
                      <Badge style={{ paddingLeft: 7, paddingRight: 7, width: normalize(80), height: 25, backgroundColor: colorGetterFromProps.backgroundColor, borderWidth: 3, borderColor: "#717088", justifyContent: "center", alignItems: "center", padding: 5, alignSelf: "center", marginTop: -10 }}>
                        <Text style={{ color: colorGetterFromProps.white, fontSize: normalize(15) }}>Cory</Text>
                      </Badge>
                      <Text style={{ justifyContent: "center", alignItems: "center", color: colorGetterFromProps.badgeColor }}>1.1k</Text>
                      <Icon type="EvilIcons" name="trophy" style={{ justifyContent: "center", alignItems: "center", color: "#DAA520", fontSize: 20 }} />
                    </View>
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <Image source={Avatar2} style={styles.AvatarStyle} />
                      <Badge style={{ paddingLeft: 7, paddingRight: 7, width: normalize(80), height: 25, backgroundColor: colorGetterFromProps.backgroundColor, borderWidth: 3, borderColor: "#717088", justifyContent: "center", alignItems: "center", padding: 5, alignSelf: "center", marginTop: -10 }}>
                        <Text style={{ color: colorGetterFromProps.white, fontSize: normalize(15) }}>Merry</Text>
                      </Badge>
                      <Text style={{ justifyContent: "center", alignItems: "center", color: colorGetterFromProps.badgeColor }}>456</Text>
                      <Icon type="EvilIcons" name="trophy" style={{ justifyContent: "center", alignItems: "center", color: "#DAA520", fontSize: 20 }} />
                    </View>
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <Image source={Avatar3} style={styles.AvatarStyle} />
                      <Badge style={{ paddingLeft: 7, paddingRight: 7, width: normalize(80), height: 25, backgroundColor: colorGetterFromProps.backgroundColor, borderWidth: 3, borderColor: "#717088", justifyContent: "center", alignItems: "center", padding: 5, alignSelf: "center", marginTop: -10 }}>
                        <Text style={{ color: colorGetterFromProps.white, fontSize: normalize(15) }}>Alisha</Text>
                      </Badge>
                      <Text style={{ justifyContent: "center", alignItems: "center", color: colorGetterFromProps.badgeColor }}>225</Text>
                      <Icon type="EvilIcons" name="trophy" style={{ justifyContent: "center", alignItems: "center", color: "#DAA520", fontSize: 20 }} />
                    </View>
                  </View>
                  <View style={styles.slide}>
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <Image source={Avatar2} style={styles.AvatarStyle} />
                      <Badge style={{ paddingLeft: 7, paddingRight: 7, width: normalize(80), height: 25, backgroundColor: colorGetterFromProps.backgroundColor, borderWidth: 3, borderColor: "#717088", justifyContent: "center", alignItems: "center", padding: 5, alignSelf: "center", marginTop: -10 }}>
                        <Text style={{ color: colorGetterFromProps.white, fontSize: normalize(15) }}>Leigha</Text>
                      </Badge>
                      <Text style={{ justifyContent: "center", alignItems: "center", color: colorGetterFromProps.badgeColor }}>765</Text>
                      <Icon type="EvilIcons" name="trophy" style={{ justifyContent: "center", alignItems: "center", color: "#DAA520", fontSize: 20 }} />
                    </View>
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <Image source={Avatar3} style={styles.AvatarStyle} />
                      <Badge style={{ paddingLeft: 7, paddingRight: 7, width: normalize(80), height: 25, backgroundColor: colorGetterFromProps.backgroundColor, borderWidth: 3, borderColor: "#717088", justifyContent: "center", alignItems: "center", padding: 5, alignSelf: "center", marginTop: -10 }}>
                        <Text style={{ color: colorGetterFromProps.white, fontSize: normalize(15) }}>Jordan</Text>
                      </Badge>
                      <Text style={{ justifyContent: "center", alignItems: "center", color: colorGetterFromProps.badgeColor }}>4.3k</Text>
                      <Icon type="EvilIcons" name="trophy" style={{ justifyContent: "center", alignItems: "center", color: "#DAA520", fontSize: 20 }} />
                    </View>
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <Image source={Avatar1} style={styles.AvatarStyle} />
                      <Badge style={{ paddingLeft: 7, paddingRight: 7, width: normalize(80), height: 25, backgroundColor: colorGetterFromProps.backgroundColor, borderWidth: 3, borderColor: "#717088", justifyContent: "center", alignItems: "center", padding: 5, alignSelf: "center", marginTop: -10 }}>
                        <Text style={{ color: colorGetterFromProps.white, fontSize: normalize(15) }}>Messy</Text>
                      </Badge>
                      <Text style={{ justifyContent: "center", alignItems: "center", color: colorGetterFromProps.badgeColor }}>908</Text>
                      <Icon type="EvilIcons" name="trophy" style={{ justifyContent: "center", alignItems: "center", color: "#DAA520", fontSize: 20 }} />
                    </View>
                  </View>
                </Swiper>
                <SafeAreaView style={{ alignSelf: "center", paddingBottom: normalize(100) }}>


                  {(() => {
                    switch (container) {
                      case 1:
                        return (

                          <FlatList
                            refreshControl={
                              <RefreshControl refreshing={this.state.refresh_loading} onRefresh={this._refresh} />
                            }
                            keyExtractor={item => item.title}
                            data={this.state.selectedCategory == "" ? this.state.discoverData : this.state.selectDiscoverData/*this.state.discoverData.filter((x) => x.title = this.state.selectedCategory)*/}
                            renderItem={({ item, index }) => {
                              return <CategoryList key={index} data={item} />
                            }}
                            onEndReached={this.categoriesLoadMore}
                            onEndReachedThreshold={0.01}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentumMain = false; }}
                            ListFooterComponent={this.state.categoryLoading ? <Loader /> : null}
                          />
                        )
                      case 2:
                        return (

                          <SearchResults handleSearch={(q) => this.handleSearch(q)} />
                        )
                      case 3:
                        return (
                          <SearchScreen navigation={this.props.navigation} username={this.state.username} handleDetailState={(q) => this.handleDetailState(q)} />
                        )
                    }
                  })()}


                </SafeAreaView>

              </ScrollView>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResultsSuccess: state.discoverReducer.searchResultsSuccess,
    discoverData: state.discoverReducer.discoverData,
    discoverDataSuccess: state.discoverReducer.discoverDataSuccess,
    // categoryData: state.discoverReducer.categoryData,
    // categoryDataSuccess : state.discoverReducer.categoryDataSuccess,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  searchUsers,
  setSearchUsers,
  searchResults,
  resetDiscoverStore,
  getDiscoverData,
  setDiscoverSuccess,
  setCategorySuccess,
  getCategoryData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverScreen);

const styles = StyleSheet.create({
  TextStyle: {
    fontSize: normalize(25),
    color: colorGetterFromProps.violetXblue,
  },
  IconStyle: {
    fontSize: normalize(25),
    color: colorGetterFromProps.violetXblue
  },
  slide: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: "row",
  },
  AvatarStyle: {
    height: normalize(90),
    width: normalize(90),
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#2D2E44"
  },
  post: {
    width: "100%",
    height: "100%",
    borderRadius: 5
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10
  },
  morePosts: {
    width: normalize(280),
    height: normalize(60),
    backgroundColor: "#E5E8EE",
    marginTop: normalize(30),
    marginBottom: normalize(80),
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    alignSelf: "center",
    borderRadius: 15
  },
  StickToTop: {
    alignSelf: "center",
    padding: normalize(10),
    position: 'absolute',
    width: "100%",
    flexDirection: "row"
  },
  StickToBottom: {
    alignSelf: "center",
    paddingTop: normalize(30),
    position: 'absolute',
    width: "100%",
    height: normalize(100),
    bottom: 0,
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center"
  },
  ITem2: {
    backgroundColor: "transparent",
    padding: normalize(5),
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: normalize(25),
  },
});
