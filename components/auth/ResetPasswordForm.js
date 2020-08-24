import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { resetPasswordValidationRules } from '../../validation/auth';
import $t from '@i18n';
import ErrorText from '../shared/Text/ErrorText';
import Colors from '../../constants/Colors';
import { OutlineButton } from '../shared/Button/Button';
import s from '../../constants/Form';
import { ScrollView } from 'react-native-gesture-handler';
import normalize from "react-native-normalize";



export const ResetPasswordForm = props => (
  <Formik
    initialValues={{ password: '', password_confirmation: '' }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={resetPasswordValidationRules}
  >
    {({ handleSubmit }) => (
      <View style={{ flex: 1, marginTop: normalize(100) }}>
        <ScrollView style={s.ScrollViewContainerPadding}>
          <View style={{ alignItems: "center", marginBottom: 20 }} >
            <Text style={{ marginBottom: normalize(15), fontSize: 20, color: Colors.backgroundColor }} > Reset Password</Text>
          </View>
          <Field
            name="password"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('auth.enterPassword')}
            style={[s.input, { color: Colors.backgroundColor }]}
          />
          <Field
            name="password_confirmation"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('auth.confirmPassword')}
            style={[s.input, { color: Colors.backgroundColor }]}
          />
          <ErrorText error={!!props.resetPasswordError} message={$t('auth.invalidToken')} />
          <OutlineButton onPress={handleSubmit} text="Save" style={s.Button} />
        </ScrollView>
      </View>
    )}
  </Formik>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  resetPasswordError: PropTypes.string
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: Colors.backgroundColor
  }
});