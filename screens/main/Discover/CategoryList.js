import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../../constants/Colors';
import { PostBoxProfile } from '../../../components/shared/PostBox';
import { Icon, Badge, Button } from "native-base";
import Constants from 'expo-constants';
import { discoverService } from '../../../services/DiscoverService';
import NavigationService from '../../../services/NavigationService';
import normalize from 'react-native-normalize';
let colorGetterFromProps = {};
let darkMode = false;
var dim = Dimensions.get("window")

class CategoryList extends React.Component {

  onEndReachedCalledDuringMomentum = {}

  state = {
    loading: this.props.data.data.length < 8 ? false : true,
    limit: 8,
    dataEnd: this.props.data.data.length < 8 ? true : false,
    offset: this.props.data.data.length,
    data: this.props.data
  }

  appendCategoryData(categoryData) {
    let data = this.state.data
    let dataEnd = this.state.dataEnd
    let loading = this.state.loading
    let offset = this.state.offset

    if (categoryData.length < 8) {
      dataEnd = true
      loading = false
    } else {
      data["data"] = [...this.state.data.data, ...categoryData]
      offset = offset + 8
    }
    this.setState({ data: data, dataEnd: dataEnd, loading: loading, offset: offset })
  }

  loadMore(category) {
    if (!this.onEndReachedCalledDuringMomentum) {
      if (this.state.dataEnd == false) {
        var data = { offset: this.state.offset, limit: this.state.limit, category_id: category }
        //this.props.getCategoryData(data)
        discoverService.getCategoryData(data).then((resp) => {
          this.appendCategoryData(resp.data)
        })
        this.setState({categoryOffset: 8 })
        this.onEndReachedCalledDuringMomentum = true
      }
    }
  }

  render() {
    var data = this.state.data
    return (<View style={{ padding: 10 }}>
      
      <TouchableOpacity onPress={() => NavigationService.navigate("CategoryView", { cat_id: data.category, cat_name: data.title })} >
        <Badge style={{ backgroundColor: colorGetterFromProps.backgroundColor, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: normalize(10), width: normalize(150) }}>
          <Text style={{ color: Colors.white }}>{data.title}</Text>
        </Badge>
      </TouchableOpacity>

      <View >
        <FlatList
          style={{ marginLeft: normalize(12) }}
          data={data.data}
          horizontal={false}
          numColumns={2}
          renderItem={({ item, index }) => {
            return <View  >
              <PostBoxProfile
                detailData={
                  {
                    data: [data.data[index]],
                    offset: index,
                    limit: this.state.limit,
                    params: { category_id: data.category },
                    apiCall: discoverService.getCategoryData,
                    index: index
                  }
                }
                key={index} ch={item} index={index} hideDesc={true} />
            </View>
          }}
          keyExtractor={item => item.uuid}
          onEndReached={() => this.loadMore(data.category)}
          onEndReachedThreshold={0.01}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false
          }}
          ListFooterComponent={() => (
            this.state.dataEnd != false >= 0 ? <Button style={styles.morePosts} onPress={() => NavigationService.navigate("CategoryView", { cat_id: data.category, cat_name: data.title })}>
            <Text style={{ color: "#7C7C92" }}>Load more challenges</Text>
          </Button> : <Button style={styles.morePosts} >
            <Text style={{ color: "#7C7C92" }}>No more challenges </Text>
          </Button>
          )}
          ListEmptyComponent={
            this.state.categoryLoading ? (
            <View style={{ justifyContent: "center", alignItems: "center", width: dim.width, paddingBottom: 10, paddingTop: 20, marginLeft: normalize(-15) }} >
              <Icon type="MaterialCommunityIcons" name="image-off" style={{ color: colorGetterFromProps.backgroundColor }} />
              <Text style={{ color: colorGetterFromProps.backgroundColor }} >No Challenges Found!</Text>
            </View>
            ) : null
          }
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  tileYellow: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  tileRed: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  tileGreen: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
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
  },
  morePosts: {
    width: normalize(280),
    height: normalize(60),
    backgroundColor: "#E5E8EE",
    marginTop: normalize(30),
    marginBottom: normalize(30),
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    alignSelf: "center",
    borderRadius: 10
  },
});
