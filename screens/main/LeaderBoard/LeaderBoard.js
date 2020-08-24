import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../../constants/Colors';
import { Icon, Button, Content, Item, Input } from "native-base";
import Constants from 'expo-constants';
import { TextButton } from '../../../components/shared/Button/Button';
import { withNavigationFocus } from 'react-navigation';
// import { Icon, Button } from "native-base";
import { goBack } from '../../../services/NavigationService';
import normalize from "react-native-normalize";
import MapView, { Marker } from 'react-native-maps';
import NavigationService from '../../../services/NavigationService';
let colorGetterFromProps = {};
let darkMode = false;

class LeaderBoard extends React.Component {

    static navigationOptions = {
        title: 'LeaderBoard',
        headerShown: false
    };

    state = {
        markers: [{
            title: 'Ananya',
            latlng: {
                latitude: 34.052235,
                longitude: -118.243683
            },
            userImage: { uri: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-3/img/user-13.005c80e1.jpg' }
        },
        {
            title: 'John',
            latlng: {
                latitude: 3.149771,
                longitude: 101.655449
            },
            userImage: { uri: 'https://www.bnl.gov/today/body_pics/2017/06/stephanhruszkewycz-hr.jpg' }
        },
        {
            title: 'Mary',
            latlng: {
                latitude: 6.423750,
                longitude: -66.589729
            },
            userImage: { uri: 'https://cdn.wallpapersafari.com/47/75/i8cgUE.jpg' }
        }
        ]
    }



    clickProfile = () => {
        this.props.navigation.navigate('FriendProfile');
    }

    render() {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const image = { uri: "https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-3/img/user-13.005c80e1.jpg" };
        return (
            <View style={styles.container}>
                <View style={styles.StickToTop}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: "transparent",
                        flexDirection: "row",
                        marginTop: normalize(20)
                    }}>
                        <TouchableOpacity style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }} onPress={() => {
                            NavigationService.goBack()
                        }}>
                            <Icon name="back" type="AntDesign" style={{ color: colorGetterFromProps.backgroundColor, fontSize: 25 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Button style={{ marginTop: normalize(-30, "height"), width: normalize(200, "width"), elevation: 0.3, height: normalize(40), backgroundColor: colorGetterFromProps.boxColor, borderRadius: 50, alignSelf: "center", justifyContent: "center", alignItems: "center" }} onPress={() => { this.setModalVisible(true) }}>
                            <Text style={styles.TextStyle}>Leaderboard</Text>
                        </Button>
                    </View>

                </View>
                <View style={styles.StickToBottom}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Content>
                            <Item style={{ width: "80%", height: normalize(40), backgroundColor: colorGetterFromProps.boxColor, alignSelf: "center", borderRadius: 50, justifyContent: "center", alignItems: "center", FontSize: normalize(15), padding: normalize(10), borderBottomColor: "transparent" }}>
                                <Input placeholder='Search Categories' style={{ color: colorGetterFromProps.violetXblue, fontSize: normalize(18) }} />
                                <Icon active name='search' style={{ color: colorGetterFromProps.violetXblue }} />
                            </Item>
                        </Content>
                    </View>
                </View>
                <MapView style={styles.mapStyle} customMapStyle={colorGetterFromProps.mapStyle}>
                    {this.state.markers.map((marker, i) => (
                        <Marker
                            key={i}
                            coordinate={marker.latlng}
                            zoomEnabled={false}
                            rotateEnabled={false}
                            onPress={this.clickProfile}
                        >
                            <View style={{
                                height: normalize(70),
                                width: normalize(70)
                            }}>
                                <Image source={marker.userImage} style={{ height: "100%", height: "100%", borderRadius: 50 }} />
                            </View>
                        </Marker>
                    ))}
                </MapView>
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
)(LeaderBoard);

const styles = StyleSheet.create({
    TextStyle: {
        fontSize: normalize(25),
        color: "#717088",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    TextStyle: {
        fontSize: normalize(25),
        color: "#717088",
    },
    StickToTop: {
        padding: normalize(10),
        backgroundColor: "transparent",
        color: "#000",
        top: 0,
        position: 'absolute',
        width: "100%",
        zIndex: 999
    },
    StickToBottom: {
        padding: normalize(10),
        backgroundColor: "transparent",
        color: "#000",
        bottom: normalize(80),
        position: 'absolute',
        width: "100%",
        zIndex: 999
    },
});
