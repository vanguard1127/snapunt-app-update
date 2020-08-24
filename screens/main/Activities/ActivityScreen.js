import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SectionList,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import {  setSearchUsers } from "../../../store/actions/DiscoverActions"
import Colors from '../../../constants/Colors';
import { RoundButton } from '../../../components/shared/Button/Button';
import { Avatar } from 'react-native-paper';
import { acceptRequest, cancelRequest, activityData, activityDataSuccess } from "../../../store/actions/FollowActions"
import Activities from './Activities';
let colorGetterFromProps = {};
let darkMode = false;
class ActivityScreen extends React.Component {

    state = {
        sectionData: [],
        deleteIndex : null
    }

    UNSAFE_componentWillMount(){
        if(this.props.navigation.getParam("data").data != undefined){
            this.setState({ sectionData: this.props.navigation.getParam("data").data })
        }
    }

    componentDidMount(){
        if(this.state.sectionData.length == 0){
            // call an API to fetch data
            this.props.activityData()
        }
    }

    UNSAFE_componentWillReceiveProps(props){

        if(props.success){
            this.setState({ sectionData: props.data.data })
            this.props.activityDataSuccess(false)
        }

        if(props.acceptSuccess || props.cancelSuccess){
            var sectionData = this.state.sectionData
            sectionData[0]["data"].splice(this.state.deleteIndex, 1);
            this.setState({ sectionData: sectionData })
        }
    }

    static navigationOptions = ({ navigation }) => {
        return { 
            title: "Notifications",
            headerStyle: {
                elevation: 0, //for android
                shadowOpacity: 0, //for ios
                borderBottomWidth: 0, //for ios
                backgroundColor: colorGetterFromProps.white
              },
            }
      };

    render() {
        return (  
                <Tabs tabBarUnderlineStyle={{backgroundColor: colorGetterFromProps.violetXblue}} >
                     <Tab heading="Activities" tabStyle={{backgroundColor: colorGetterFromProps.white}} activeTabStyle={{ backgroundColor: colorGetterFromProps.white }} textStyle={{color: colorGetterFromProps.violetXblue}} activeTextStyle={{color: colorGetterFromProps.violetXblue}}>
                        <Activities navigation={this.props.navigation} />
                    </Tab>
                   
                    <Tab heading="Requests" tabStyle={{backgroundColor: colorGetterFromProps.white}} activeTabStyle={{ backgroundColor: colorGetterFromProps.white }} textStyle={{color: colorGetterFromProps.violetXblue}} activeTextStyle={{color: colorGetterFromProps.violetXblue}}>
                    <SectionList
                        sections={this.state.sectionData}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item, index, section }) => 
                            <View>
                                <View style={{flexDirection: "row", justifyContent: "space-between",  paddingTop: 10, paddingLeft: 10, paddingRight: 10}} >
                                <View style={{flexDirection: "row"}} >
                                    <Avatar.Image style={styles.avatar} size={40} source={{ uri: item.avatar }} />
                                    <View>
                                    <Text style={{fontSize: 16}} >{item.full_name}</Text>
                                    <Text style={{fontSize: 12, color: "grey", marginBottom: 3}} >@{item.username}</Text>
                                    </View>
                                </View>
                                    {section.title == "Follow Requests" ? (<View style={{flexDirection: "row", alignItems: "center"}} >
                                        <RoundButton style={{borderColor: Colors.backgroundColor, marginRight: 5}} textColor={Colors.backgroundColor} onPress={() => { this.props.acceptRequest(item.follower_id); this.setState({ deleteIndex: index }) }} text={"Confirm"} />
                                        <RoundButton style={{borderColor: Colors.backgroundColor}} textColor={Colors.backgroundColor} text={"Cancel"} onPress={() => { this.props.cancelRequest(item.follower_id); this.setState({ deleteIndex: index }) } } />
                                    </View>) : (
                                    <RoundButton style={{borderColor: Colors.backgroundColor, marginRight: 5}} textColor={Colors.backgroundColor} text={"Follow"} />
                                    )}
                                </View>

                                {/* {index == (this.state.sectionData[0].data.length - 1) && <TouchableOpacity><Text style={{color: "grey", padding: 10, textDecorationLine: "underline"}} >See All (21)</Text></TouchableOpacity>} */}

                            </View>
                        }
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.heading}>{title}</Text>
                        )}
                    />
                    </Tab>
                  
                </Tabs>
        );
    }
}

const mapStateToProps = state => {
  return { 
        acceptSuccess: state.followReducer.acceptSuccess,
        cancelSuccess: state.followReducer.cancelSuccess,
        success: state.followReducer.activityDataSuccess,
        data: state.followReducer.activityData,
        color: colorGetterFromProps = state.userReducer.Color,
        darkMode: darkMode = state.userReducer.DarkMode,
     };
};

const mapDispatchToProps = {
    setSearchUsers,
    acceptRequest,
    cancelRequest,
    activityData,
    activityDataSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityScreen);

const styles = StyleSheet.create({
    heading: {
        fontWeight: "bold",
        fontSize: 16,
        padding: 10,
        color: colorGetterFromProps.violetXblue
    },
    avatar:{
      marginRight: 8
  }
  });

