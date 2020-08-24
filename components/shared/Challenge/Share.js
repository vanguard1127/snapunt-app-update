import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import * as FileSystem from 'expo-file-system';


class Share extends Component {

  state = {
    progress: 0,
    loading: true,
    downloadPath: FileSystem.cacheDirectory + this.props.source.split("/").pop(),
    source: ""
  }

  callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    this.setState({ progress: progress })
  };

  downloadResumable = FileSystem.createDownloadResumable(
    this.props.source,
    this.state.downloadPath,
    {},
    this.callback
  );

  componentDidMount = async() => {
    const { uri } = await this.downloadResumable.downloadAsync()
    this.props.sendURI(uri)
  }


  render() {
    const { modalVisible } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color: "#fff", marginBottom: 5}} >Downloading...</Text>
            <Text style={{color: "#fff", fontWeight: "bold", fontSize: 18}} >{parseInt(this.state.progress/1*100)}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#000",
    borderWidth: 0.5,
    borderColor: "#444",
    borderRadius: 3,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Share;
