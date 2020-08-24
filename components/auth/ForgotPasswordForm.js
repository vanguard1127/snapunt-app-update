import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import { TextInputField } from '../shared/FormFields';
import { forgotPasswordValidationRules } from '../../validation/auth';
import ErrorText from '../shared/Text/ErrorText';
import Colors from '../../constants/Colors';
import { OutlineButton, TextButton } from '../shared/Button/Button';
import s from '../../constants/Form';
import { ScrollView } from 'react-native-gesture-handler';
import normalize from "react-native-normalize";


export const ForgotPasswordForm = props => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={forgotPasswordValidationRules}
  >
    {({ handleSubmit }) => (
      <View style={{ FLEX: 1 }}>
        <ScrollView style={s.ScrollViewContainerPadding}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={s.formTitle} numberOfLines={2}>{"Oops."}</Text>
            <Text style={[{ marginBottom: 40 }, s.formTitle]} numberOfLines={2}>{"It happens."}</Text>
          </View>
          <Field
            name="email"
            component={TextInputField}
            placeholder={"Email"}
            style={s.input}
          />
          <ErrorText error={!!props.forgotPasswordError} message={props.forgotPasswordError} />
          <OutlineButton onPress={handleSubmit} text="Get New Password" style={s.Button} />
          <View style={s.LinkToOther}>
            <Text style={{ color: Colors.lightGrey }} >Remember your password?</Text>
            <TextButton onPress={() => props.clickSignIn()} style={{ color: Colors.primaryBackgroundColor, marginLeft: 10 }} text="Sign In" />
          </View>
        </ScrollView>
      </View>

    )}
  </Formik>
);

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  forgotPasswordError: PropTypes.string
};
