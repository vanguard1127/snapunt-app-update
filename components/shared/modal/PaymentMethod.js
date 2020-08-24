import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
} from "react-native";
import AddCard from "../../../screens/main/Payment/AddCard";
import { Icon } from "native-base";


class PaymentMethod extends Component {

  state = {
    loading: true,
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
        <TouchableOpacity style={{alignItems: "flex-end"}} onPress={() => this.props.toggleModal()} >  
            <Icon type="EvilIcons" name="close-o" />
        </TouchableOpacity>
          <AddCard />
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
    backgroundColor: "#fff",
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
  }
});

export default PaymentMethod;
