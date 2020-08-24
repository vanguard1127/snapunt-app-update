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
import { getFollowers, getFollowersSuccess } from '../../../store/actions/FollowActions';
import Loader from '../../../components/Loader';
import { List, ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base';
import { RoundButton } from '../../../components/shared/Button/Button';
import ActionSheet from 'react-native-actionsheet'
import { getActivities, getActivitiesSuccess } from "../../../store/actions/FollowActions"
import Colors from '../../../constants/Colors';
import { timeAgo } from '../../../helpers/CommonMethods';
import normalize from "react-native-normalize";

let colorGetterFromProps = {};
let darkMode = false;
class Activities extends React.Component {

  state = {
    dataEnd: false,
    offset: 0,
    limit: 10,
    loading: true,
    data: [],
  }

  componentDidMount() {
    this.props.getActivities({ limit: 10, offset: 0 })
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.success) {
      if (props.activities.length == 0) {
        this.setState({ data: [...this.state.data, ...props.activities], loading: false, dataEnd: true })
      } else {
        this.setState({ data: [...this.state.data, ...props.activities], loading: false, limit: this.state.limit, offset: (this.state.offset + 10) })
      }
      this.props.getActivitiesSuccess(false)
    }
  }

  loadMore() {
    if (this.state.dataEnd == false && !(this.state.data.length < 10)) {
      const data = { offset: this.state.offset, limit: this.state.limit }
      this.props.getActivities(data)
      this.setState({ loading: true })
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <List style={{backgroundColor: colorGetterFromProps.diffrentBack, paddingTop: 10}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            style={{backgroundColor: colorGetterFromProps.diffrentBack}}
            renderItem={({ item, index }) => (

              <ListItem thumbnail style={{ marginRight: normalize(20),borderBottomWidth: 0, backgroundColor: colorGetterFromProps.boxColor, marginTop: normalize(10), borderRadius: 5 }}>
                <Left style={{padding: 10}}>
                  <Thumbnail source={{ uri: item.sender.avatar }} style={{height: normalize(40), width: normalize(40)}} />
                  {/* <Text style={{fontWeight: "bold"}} >{item.sender.username}</Text> */}
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate(item.data.data.route, item.data.data.data)} >
                    <Text style={{ fontSize: 13, color: colorGetterFromProps.violetXblue, fontWeight: "bold" }}>{item.data.title}</Text>
                    <Text style={{ fontSize: 10, color: colorGetterFromProps.violetXblue, marginTop: normalize(10) }}>{item.data.msg}</Text>
                    
                  </TouchableOpacity>
                </Body>
                <Right style={{alignItems: "flex-end", justifyContent: "flex-start", borderBottomWidth: 0}}>
                <Text style={{ fontSize: 11, color: colorGetterFromProps.violetXblue, marginLeft: normalize(10) }} >{timeAgo(item.ts)}</Text> 
                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.ts}
            onEndReached={() => this.loadMore()}
            onEndReachedThreshold={0.01}
            ListFooterComponent={this.state.loading ? (<Loader />) : null}
            ListEmptyComponent={!this.state.loading ? <Text style={{ fontSize: 12, color: "lightgrey", textAlign: "center" }} >No Activities Found</Text> : null}
          />
        </List>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.followReducer.activities,
    success: state.followReducer.getActivitiesSuccess,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getActivities,
  getActivitiesSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activities);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorGetterFromProps.diffrentBack
  }
});
