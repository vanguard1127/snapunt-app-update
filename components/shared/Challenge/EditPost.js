import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList
} from "react-native";
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { editPostRules } from "../../../validation/challenge";
import { Formik, Field } from "formik";
import { DarkOutlineButton } from "../Button/Button";
import { CustomTextarea } from "../FormFields";
import { editPost } from "../../../store/actions/ChallengeActions"
import { setLoader } from '../../../store/actions/LoaderAction';

class EditPost extends Component {

    state = {
        loading: true,
        data: []
      }

    onSubmit = (values) => {
        this.props.setLoader(true)
        this.props.editPost({
            desc: values.desc,
            postId: this.props.navigation.getParam("postData").uuid
        })
    }

    UNSAFE_componentWillReceiveProps(props){
        if(props.success){
            this.props.setLoader(false)
            this.props.navigation.goBack(null)
        }
    }

  render() {
      var postData = this.props.navigation.getParam("postData")
    return (
        <View style={styles.centeredView}>
            {/* <View style={{justifyContent: "space-between", alignItems: "center", padding: 10, flexDirection: "row", borderBottomWidth: 1, marginBottom: 20, borderBottomColor: "lightgrey"}} >
                <Text style={{fontWeight: "bold", fontSize: 18}} >Edit Post</Text>
                <Icon type={"AntDesign"} name={"closecircleo"} onPress={() => this.props.setModalVisible()} />
            </View> */}
            <Formik
                    initialValues={{
                        desc: postData.desc,
                    }}
                    onSubmit={ (values, type) => this.onSubmit(values, type)}
                    validationSchema={editPostRules}
                >
                {({ handleSubmit, errors, values }) => (
                        <View style={{flex: 1, justifyContent: "space-between"}} >
                            
                            <Field name="desc" style={{height: 100, borderWidth: 0.5, borderColor: "lightgrey"}}  component={CustomTextarea} placeholder={"Describe your challenge"} />
                            
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}  >
                                <DarkOutlineButton  text="Update" style={{ width: "100%"}} onPress={ (data) => {handleSubmit(data)} } />
                            </View>


                        </View>
                    )}
            </Formik>
        </View>
    );
  }
}

const mapStateToProps = state => {
    return {
        success: state.challengeReducer.editPostSuccess
    };
};

const mapDispatchToProps = {
    editPost,
    setLoader
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
    padding: 10
}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditPost);