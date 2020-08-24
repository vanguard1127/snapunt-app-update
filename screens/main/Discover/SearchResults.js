import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { userSelector } from '../../../store/selectors/UserSelector';
import Colors from '../../../constants/Colors';
import { Icon } from "native-base";
import { setSearchUsers } from "../../../store/actions/DiscoverActions"
let colorGetterFromProps = {};
let darkMode = false;
class SearchResults extends React.Component {

    render() {
        const { user } = this.props.user;
        const { searchUsersSuccess, results } = this.props
        return (
            searchUsersSuccess ? (
                results.length > 0 ? (
                    <View style={{ paddingLeft: 15, paddingRight: 15 }} >
                        {results.map((user, index) => {
                            return <TouchableOpacity key={index} onPress={() => this.props.handleSearch(user.username)} style={{ flexDirection: "row", marginBottom: 10, marginTop: 15, alignItems: "center" }} >
                                <Icon style={{ fontSize: 22, marginRight: 10 }} type={"MaterialCommunityIcons"} name={"magnify"} />
                                <Text style={{ fontSize: 15, color: colorGetterFromProps.darkGrey }} >{user.username}</Text>
                            </TouchableOpacity>
                        })}
                    </View>)
                    : (
                        <View style={{ flex: 1, alignItems: "center", padding: 30 }} >
                            <Text style={{ color: colorGetterFromProps.darkGrey, lineHeight: 20, textAlign: "center" }} >Your search did not get any results, Please try a different keyword.</Text>
                        </View>
                    )
            ) : (
                    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }} >
                        <Icon style={{ fontSize: 48, color: "grey" }} type={"MaterialCommunityIcons"} name={"magnify"} />
                    </View>
                )
        );
    }
}

const mapStateToProps = state => {
    return {
        user: userSelector(state),
        searchUsersSuccess: state.discoverReducer.searchUsersSuccess,
        searchUsersError: state.discoverReducer.searchUsersError,
        results: state.discoverReducer.results,
        color: colorGetterFromProps = state.userReducer.Color,
        darkMode: darkMode = state.userReducer.DarkMode,
    };
};

const mapDispatchToProps = {
    setSearchUsers
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResults);





