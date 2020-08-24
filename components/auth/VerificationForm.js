import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import NavigationService from '../../services/NavigationService';

import { TextInputField } from '../shared/FormFields';
import { verificationValidationRules } from '../../validation/auth';
import Color from "../../constants/Colors";
import { OutlineButton, TextButton } from '../shared/Button/Button';
import ErrorText from '../shared/Text/ErrorText';
import s from '../../constants/Form';
import { ScrollView } from 'react-native-gesture-handler';
import normalize from "react-native-normalize";


export const VerificationForm = (props) => (
  <Formik
    initialValues={{ code: '', email: props.navigation.getParam('email') || null, password: props.navigation.getParam('password') || null }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={verificationValidationRules}
  >
    {({ handleSubmit, values }) => (
      <View style={{ flex: 1, marginTop: normalize(100) }}>
        <ScrollView style={s.ScrollViewContainerPadding}>
          <View style={{ alignItems: "center", marginBottom: 20 }} >
            <Text style={{ marginBottom: normalize(15), fontSize: 20, color: Color.backgroundColor }} > Verification </Text>
          </View>
          <Field
            name="code"
            component={TextInputField}
            placeholder={"Enter 4 digit code"}
            style={s.input}
          />
          {!!props.verificationError && Object.values(props.verificationError).map((err) => {
            return <ErrorText error={true} message={err} />
          })}
          <OutlineButton onPress={handleSubmit} style={s.Button} text="Verify" />
          <TextButton onPress={() => props.resendCode(values)} text={props.codeText} style={{ alignSelf: "flex-end", color: Color.black }} />
        </ScrollView>
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: Color.diffrentBack
  }
});
