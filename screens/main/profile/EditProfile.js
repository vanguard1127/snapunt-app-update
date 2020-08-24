import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Avatar, Badge, Button } from 'react-native-paper';

import { updateUser } from '../../../store/actions/UserActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import { UpdateProfileForm } from '../../../components/profile/UpdateProfileForm';
import Picture from '../../../components/shared/Picture';
import NoPermissionsForCameraModal from '../../../components/shared/modal/NoPermissionsForCameraModal';
import ImagePickerModal from '../../../components/shared/modal/ImagePickerModal';
import { PERMISSIONS_STATUS } from '../../../constants';
import defaultAvatar from '../../../assets/images/robot-dev.png';
import ActionSheet from 'react-native-actionsheet'
import Colors from '../../../constants/Colors';
import normalize from "react-native-normalize";
let colorGetterFromProps = {};
let darkMode = false;
class EditProfile extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Edit Profile",
      tabBarVisible: false
    };
  };

  static propTypes = {
    navigation: PropTypes.object,
    updateUser: PropTypes.func,
    user: PropTypes.object
  };

  state = {
    image: '',
    imagePickerModalVisible: false,
    permissionsModalVisible: false
  };

  handleSubmit = updateUserData => {
    this.props.updateUser({ ...updateUserData, avatar: this.state.image });
  };

  openImagePickerModal = async () => {
    const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const hasCameraRollPermission = cameraRollPermissions.status === PERMISSIONS_STATUS.GRANTED;
    const cameraPermissions = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = cameraPermissions.status === PERMISSIONS_STATUS.GRANTED;

    if (hasCameraPermission && hasCameraRollPermission) {
      this.ActionSheet.show()
    }

    this.setState({
      imagePickerModalVisible: hasCameraPermission && hasCameraRollPermission,
      permissionsModalVisible: !(hasCameraPermission && hasCameraRollPermission)
    });
  };

  closePermissionsModal = () => {
    this.setState({ permissionsModalVisible: false });
  };

  closeImagePickerModal = () => {
    this.setState({ imagePickerModalVisible: false });
  };

  openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4]
    });

    this.setImage(result);
  };

  openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4]
    });

    this.setImage(result);
  };

  setImage = image => {
    if (!image.cancelled) {
      this.setState({
        image: image
      });
      // this.closeImagePickerModal();
    }
  };

  handleActionSheet(index) {
    if (index == 0) {
      this.openCamera()
    } else if (index == 1) {
      this.openImagePicker()
    }
  }

  render() {
    const { user } = this.props;
    const { imagePickerModalVisible, permissionsModalVisible, image } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.imageContainer} >
          {image !== '' || user.avatar !== null ? (
            <Picture source={image} uri={user.avatar} style={{
              height: normalize(70), width: normalize(70), borderRadius: 50, marginTop: normalize(10), marginBottom: normalize(10), alignSelf: "center", borderWidth: 3,
              borderColor: "#BDBFCB"
            }} />
          ) : (
              <Picture source={defaultAvatar} style={{
                height: normalize(70), width: normalize(70), borderRadius: 50, marginTop: normalize(10), marginBottom: normalize(10), alignSelf: "center", borderWidth: 3,
                borderColor: "#BDBFCB"
              }} />
            )}
          <TouchableOpacity onPress={() => this.openImagePickerModal()}>
            <Badge style={{
              borderRadius: 50, alignSelf: "center", width: normalize(30), height: normalize(30), marginTop: normalize(-20), shadowColor: "rgba(0,0,0,0.5)", shadowOffset: { width: 0, height: 9, }, shadowOpacity: 0.48, shadowRadius: 11.95, elevation: 18, backgroundColor: "#45b6fe"
            }}>
              <Text style={{ fontSize: normalize(22), color: "#fff", alignItems: "center", alignSelf: "center", textAlign: "center", justifyContent: "center" }}>+</Text>
            </Badge>
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <UpdateProfileForm onSubmit={this.handleSubmit} user={user} />
          </View>
        </KeyboardAwareScrollView>
        {permissionsModalVisible && alert("No Camera Permissions, please allow us via settings.")}
        {/* <NoPermissionsForCameraModal
          isVisible={permissionsModalVisible}
          closeModal={this.closePermissionsModal}
        /> */}

        {/* <ImagePickerModal
          isVisible={imagePickerModalVisible}
          closeModal={this.closeImagePickerModal}
          galleryImport={this.openImagePicker}
          openCamera={this.openCamera}
        /> */}

        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={"Options"}
          options={['Take Picture', 'Import From Gallery', 'Cancel']}
          cancelButtonIndex={2}
          onPress={(index) => { this.handleActionSheet(index) }}
        />

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state), color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = { updateUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10
  },
  imageContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
