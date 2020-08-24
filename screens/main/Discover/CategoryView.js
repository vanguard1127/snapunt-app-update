import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  FlatList,
  StatusBar,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../../constants/Colors';
import { PostBoxProfile } from '../../../components/shared/PostBox';
import { getFlatCatData, flatCatDataSuccess } from "../../../store/actions/DiscoverActions"
import { discoverService } from '../../../services/DiscoverService';
import normalize from "react-native-normalize";
let colorGetterFromProps = {};
let darkMode = false;
class CategoryView extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("cat_name", ""),
      headerTitleStyle: {
        fontWeight: "bold",
        color: colorGetterFromProps.backgroundColor,
      },
      headerStyle: {
        backgroundColor: colorGetterFromProps.diffrentBack,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: normalize(80)
      },
    };
  };


  state = {
    discoverData: [],
    loading: false,
    categoryIndex: null,
    dataEnd: false,
    offset: 0,
    limit: 40,
    refresh_loading: true,
    selectedCats: [
    ],
    selectedValue: this.props.navigation.getParam("cat_id")
  }


  componentDidMount() {
    const data = { offset: this.state.offset, limit: this.state.limit, cat_ids: this.state.selectedValue }
    this.props.getFlatCatData(data)
  }

  _refresh = () => {
    const data = { offset: 0, limit: this.state.limit, cat_ids: this.state.selectedValue }
    this.props.getFlatCatData(data)
    this.setState({ refresh_loading: true, offset: 0 })
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.success) {
      if (props.flatCatData.length == 0 || props.flatCatData.length < 40) {
        if (this.state.offset == 0) {
          this.setState({ discoverData: props.flatCatData, dataEnd: true, loading: false, refresh_loading: false })
        } else {
          this.setState({ discoverData: [...this.state.discoverData, ...props.flatCatData], dataEnd: true, loading: false, refresh_loading: false })
        }
      }
      else if (this.state.offset == 0) {
        this.setState({ discoverData: props.flatCatData, loading: true, categoryLoading: false, offset: this.state.offset + 40, refresh_loading: false })
      }
      else {
        this.setState({ discoverData: [...this.state.discoverData, ...props.flatCatData], loading: true, categoryLoading: false, offset: this.state.offset + 40, refresh_loading: false })
      }
      this.props.flatCatDataSuccess(false)
    }
  }

  loadMore() {
    if (!this.onEndReachedCalledDuringMomentum) {
      if (this.state.dataEnd == false) {
        const data = { offset: this.state.offset, limit: this.state.limit, cat_ids: this.state.selectedValue }
        this.props.getFlatCatData(data)
        this.onEndReachedCalledDuringMomentum = true;
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colorGetterFromProps.white}]}>
        <View style={{ flex: 1,  backgroundColor: colorGetterFromProps.white }} >
          <View style={{ flexDirection: "row",  backgroundColor: colorGetterFromProps.white }} >

          </View>
          <View style={{alignSelf: "center", backgroundColor: colorGetterFromProps.white}}>
          <FlatList
          style={{backgroundColor: colorGetterFromProps.white}}
            refreshControl={
              <RefreshControl refreshing={this.state.refresh_loading} onRefresh={this._refresh} />
            }
            keyExtractor={item => item.uuid}
            numColumns={2}
            data={this.state.discoverData}
            renderItem={({ item, index }) => (
              <PostBoxProfile
                detailData={
                  {
                    data: [this.state.discoverData[index]],
                    offset: index,
                    params: { cat_ids: this.state.selectedValue },
                    apiCall: discoverService.getFlatCatData,
                    index: index
                  }
                }
                key={index} ch={item} index={index} hideDesc={true} data={this.state.discoverData} />
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
        </View>


      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    flatCatData: state.discoverReducer.flatCatData,
    success: state.discoverReducer.flatCatDataSuccess,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getFlatCatData,
  flatCatDataSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorGetterFromProps.white,
  },
  tileYellow: {
    flex: 1,
    padding: 10,
    backgroundColor: colorGetterFromProps.white,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  tileRed: {
    flex: 1,
    padding: 10,
    backgroundColor:  colorGetterFromProps.white,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  tileGreen: {
    flex: 1,
    padding: 10,
    backgroundColor:  colorGetterFromProps.white
  },
  postContainer: {
    flex: 1
  },
  heading: {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5
  },
  p: {
    color: colorGetterFromProps.darkGrey
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});
