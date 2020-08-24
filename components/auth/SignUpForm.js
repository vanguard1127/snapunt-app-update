import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField, CheckboxField } from '../shared/FormFields';
import { signUpValidationRules } from '../../validation/auth';
import $t from '@i18n';
import ErrorText from '../shared/Text/ErrorText';
import Color from "../../constants/Colors";
import { Picker, Icon, CheckBox, Button, Text } from 'native-base';
import { OutlineButton, TextButton } from '../shared/Button/Button';
import s from '../../constants/Form';
import normalize from "react-native-normalize";

import Colors from '../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';

const yearCount = 1980

export const DayPicker = props => {

  return <Picker
    mode="dropdown"
    iosIcon={<Icon name="arrow-down" />}
    // placeholder="Day"
    placeholderStyle={{ color: Colors.white }}
    placeholderIconColor="#007aff"
    selectedValue={props.form.values[props.field.name]}
    style={styles.picker}
    onValueChange={props.form.handleChange(props.field.name)}

  >
    <Picker.Item label="Day" value={null} />
    {[...Array(30).keys()].map((day, key) => {
      return <Picker.Item key={key} label={(day + 1).toString()} value={day + 1} />
    })}
  </Picker>

}

export const MonthPicker = props => {

  return <Picker
    mode="dropdown"
    iosIcon={<Icon name="arrow-down" />}
    // placeholder="Month"
    placeholderStyle={{ color: Colors.white }}
    placeholderIconColor="#007aff"
    selectedValue={props.form.values[props.field.name]}
    style={styles.picker}
    onValueChange={props.form.handleChange(props.field.name)}

  >
    <Picker.Item label="Month" value={null} />
    {[...Array(30).keys()].map((month, key) => {
      return <Picker.Item key={key} label={(month + 1).toString()} value={month + 1} />
    })}

  </Picker>
}

export const YearPicker = props => {
  return <Picker
    mode="dropdown"
    iosIcon={<Icon name="arrow-down" />}
    // placeholder="Year"
    placeholderStyle={{ color: Colors.white }}
    placeholderIconColor="#007aff"
    selectedValue={props.form.values[props.field.name]}
    style={styles.picker}
    onValueChange={props.form.handleChange(props.field.name)}

  >
    <Picker.Item label="Year" value={null} />

    {[...Array(39).keys()].map((year, key) => {
      return <Picker.Item key={key} label={(yearCount + year).toString()} value={yearCount + year} />
    })}

  </Picker>
}

export const SignUpForm = props => (

  <Formik
    initialValues={{
      full_name: '',
      last_name: '',
      email: '',
      password: '',
      username: '',
      first_name: '',
      // terms: false,
      // day: null,
      // month: null,
      // year: null
    }}
    onSubmit={values => {
      props.onSubmit(values)
    }
    }

    clickSignIn={() => { props.clickSignIn() }}
  >
    {({ handleSubmit, errors, values, handleChange }) => (
      <View style={{ flex: 2, padding: normalize(30) }}>
      
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={s.formTitle} numberOfLines={1}>{"Don't you have an account"}</Text>
            <Text style={[{ marginBottom: normalize(10) }, s.formTitle]} numberOfLines={1}>{"on SnapHunt yet?"}</Text>
          </View>
          <Field
            name="first_name"
            component={TextInputField}
            placeholder={$t('auth.enterFirstName')}
            style={s.input}
          />
          <Field name="last_name" component={TextInputField} placeholder={$t('auth.enterLastName')} style={s.input} />

          <Field name="username" component={TextInputField} placeholder="Username" style={s.input} />
          {/* {!!props.signUpErrors.username && <ErrorText error={!!props.signUpErrors.username} message={props.signUpErrors.username} />} */}

          {/* <View>
            <Text style={{color: "white"}}>Date of birth</Text>
            <View style={styles.dobContainer} >

            <Field name="day" component={DayPicker} />
            <Field name="month" component={MonthPicker} />
            <Field name="year" component={YearPicker} />


            </View>

          { (  (errors.day || errors.month || errors.year) ) && <ErrorText error={true} style={{color:Colors.white}} message="Please select day, month and year" />}

          </View> */}

          <Field name="email" component={TextInputField} placeholder={$t('auth.enterEmail')} style={s.input} />
          {!!props.signUpErrors.email && <ErrorText error={!!props.signUpErrors.email} message={props.signUpErrors.email} />}

          <Field
            name="password"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('auth.enterPassword')}
            style={[s.input, { color: Colors.backgroundColor }]}
          />

          {/* <Field
            name="confirm_password"
            component={TextInputField}
            secureTextEntry
            placeholder={"Cofirm Password"}
            style={s.input}
          /> */}

          {/* <View style={styles.tcContainer} >
            <Field name="terms" component={CheckboxField} />
            <Text style={{ color: Colors.noticeText }} >I agree to Terms and Conditions</Text>
          </View> */}

          {/* <TouchableOpacity onPress={handleSubmit}>
            <Text>{$t('auth.signUp')}</Text>
          </TouchableOpacity> */}

          <OutlineButton onPress={handleSubmit} text="Sign up" style={s.Button} />

          <View style={s.LinkToOther}>
            <Text style={{ color: Colors.lightGrey }} >Already have an account?</Text>
            <TextButton onPress={() => props.clickSignIn()} style={{ color: Colors.primaryBackgroundColor, marginLeft: 10 }} text="Sign in" />
          </View>
      </View>
    )}
  </Formik>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  signUpErrors: PropTypes.object
};

const styles = StyleSheet.create({

  loginCard: {
    backgroundColor: 'transparent',
    paddingBottom: normalize(20, "height")
    // backgroundColor: Color.backgroundColor
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },

});
