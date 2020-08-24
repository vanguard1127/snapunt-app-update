import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { updateProfileValidationRules } from '../../validation/profile';
import $t from '@i18n';
import { DarkOutlineButton } from '../shared/Button/Button';
import Colors from '../../constants/Colors';
import normalize from 'react-native-normalize';
import { Button } from "react-native-paper";

export const UpdateProfileForm = props => (
  <Formik
    initialValues={{
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      username: props.user.username,
      bio: props.user.bio,
      website: props.user.website
    }}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={updateProfileValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field
          name="first_name"
          component={TextInputField}
          placeholder={$t('profile.updateUser.firstName')}
          style={[styles.TextInput, {
            backgroundColor: Colors.white,
            color: Colors.violetXblue
          }]}
        />
        <Field
          name="last_name"
          component={TextInputField}
          placeholder={$t('profile.updateUser.lastName')}
          style={[styles.TextInput, {
            backgroundColor: Colors.white,
            color: Colors.violetXblue
          }]}
        />
        <Field
          name="website"
          component={TextInputField}
          placeholder={"Add Website"}
          style={[styles.TextInput, {
            backgroundColor: Colors.white,
            color: Colors.violetXblue
          }]}
        />

        <Field
          name="username"
          component={TextInputField}

          placeholder={"Username"}
          style={[styles.TextInput, {
            backgroundColor: Colors.white,
            color: Colors.violetXblue
          }]}
        />
        <Field
          name="bio"
          component={TextInputField}
          multiline={true}
          placeholder={"Add Bio"}
          style={[styles.TextField, {
            backgroundColor: Colors.white,
            color: Colors.violetXblue
          }]}
        />
        <Button onPress={handleSubmit} style={{ height: normalize(40), backgroundColor: Colors.backgroundColor, width: normalize(300), justifyContent: 'center', alignItems: 'center', marginTop: normalize(20) }} >
          <Text style={{ color: Colors.white }}>
            Update
          </Text>
        </Button>
      </View>
    )}
  </Formik>
);

UpdateProfileForm.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  TextInput: {
    height: normalize(40),
    borderColor: Colors.violetXblue,
    borderBottomWidth: 1,
    width: normalize(300),
    padding: 5,

    fontSize: normalize(20),
    borderRadius: 3,
    marginTop: normalize(15), marginBottom: normalize(15)
  },
  TextField: {
    height: normalize(90),
    borderColor: Colors.violetXblue,
    borderBottomWidth: 1,
    width: normalize(300),
    padding: 5,
    fontSize: normalize(20),
    borderRadius: 3,
    marginTop: normalize(15), marginBottom: normalize(15)
  }
});

