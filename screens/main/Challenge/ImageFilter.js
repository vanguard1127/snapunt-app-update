import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Surface } from "gl-react-expo"
import {
  F1977,
  Amaro,
  Brannan,
  Earlybird,
  Hefe,
  Hudson,
  Inkwell,
  Lokofi,
  LordKelvin,
  Nashville,
  Normal,
  Rise,
  Sierra,
  Sutro,
  Toaster,
  Valencia,
  Walden,
  XproII

} from "gl-react-instagramfilters"
import GLImage from '../../../components/shared/GLImage';
import { OutlineButton, TextButton } from '../../../components/shared/Button/Button';
import NavigationService from '../../../services/NavigationService';
import { Icon } from "native-base"
let colorGetterFromProps = {};
let darkMode = false;
class ImageFilter extends React.Component {

  state = {
    containerHeight: 0,
    width: 0,
    height: 0,
    data: this.props.navigation.getParam("data"),
    containerHeight: 0,
    containerWidth: 0,
    filters: {
      "Normal": Normal,
      "F1977": F1977,
      "Amaro": Amaro,
      "Brannan": Brannan,
      "Earlybird": Earlybird,
      "Hefe": Hefe,
      "Hudson": Hudson,
      "Inkwell": Inkwell,
      "Lokofi": Lokofi,
      "LordKelvin": LordKelvin,
      "Nashville": Nashville,
      "Rise": Rise,
      "Sierra": Sierra,
      "Sutro": Sutro,
      "Toaster": Toaster,
      "Valencia": Valencia,
      "Walden": Walden,
      "XproII": XproII
    },
    selectedFilter: Normal,
    loading: false
  }

  changeFilter(filter) {
    this.setState({
      selectedFilter: filter
    })
  }


  async processImage() {
    // save image
    let pictureSave = await this.imageFilter.glView.capture();
    let data = this.state.data
    data["filter_uri"] = pictureSave.uri
    this.props.navigation.navigate("CreatePost", data)
  }

  render() {

    const SelectedFilter = this.state.selectedFilter

    return (
      <View style={styles.container} >
        <View style={{ flex: 1 }} >
          <View style={{ flex: 1 }} >
            <Surface ref={view => (this.imageFilter = view)} style={{ width: "100%", height: "100%" }} >
              <SelectedFilter>
                <GLImage
                  source={{ uri: this.state.data.uri }}
                  resizeMode={"contain"}
                />
              </SelectedFilter>
            </Surface>
          </View>

          <View style={styles.overlay} >
            <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20, paddingTop: 30, alignItems: "center", justifyContent: "space-between" }} >
              <TouchableOpacity
                onPress={() => {
                  NavigationService.goBack()
                }}>
                <Icon name="arrow-back" type="MaterialIcons" size={28} style={{ color: "white" }} />
              </TouchableOpacity>
              <TextButton style={{ fontWeight: "bold", fontSize: 18 }} text={"Next"} onPress={() => this.processImage()} />
            </View>
            <ScrollView horizontal={true} style={{ bottom: 0, position: "absolute" }} >
              {Object.keys(this.state.filters).map((Filter) => {
                const FilterComp = this.state.filters[Filter]
                return <TouchableOpacity key={Filter} style={{ margin: 5 }} onPress={() => this.changeFilter(FilterComp)} >
                  <Surface style={{ width: 100, height: 100 }} >
                    <FilterComp>
                      <GLImage
                        source={{ uri: this.state.data.uri }}
                      />
                    </FilterComp>
                  </Surface>
                  <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff", textAlign: "center", paddingTop: 5 }} >{Filter}</Text>
                </TouchableOpacity>
              })}
            </ScrollView>
          </View>


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
)(ImageFilter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 1,
  }
});
