import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import normalize from 'react-native-normalize';

// import { TextInput } from 'react-native-paper';
import { ErrorMessage } from 'formik';
import Color from "../../constants/Colors"
import { Picker, Icon, CheckBox, Textarea, Item, Input, ListItem, Left, Body, Switch } from 'native-base';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../../services/NavigationService';
import s from "../../constants/Form";

export const CustomPicker = ({ field, form, ...props }) => {

  var pickerOrderWithSeason = [
    "18",
    "2",
    "19",
    "20",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17"
  ];

  var pickerOrder = [
    "18",
    "2",
    "19",
    "20",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];

  var customOrder = props.season1 ? pickerOrderWithSeason : pickerOrder

  return (

    <View>
      <Picker
        mode="modal"
        iosIcon={<Icon name="arrow-down" />}
        placeholder={props.placeholder}
        placeholderIconColor="#fff"
        placeholderTextColor="#fff"
        selectedValue={form.values[field.name]}
        onValueChange={form.handleChange(field.name)}
        enabled={props.enable}
        iosHeader={"Select One"}
        style={{ color: Colors.white, width: "85%", marginLeft: "15%" }}
      >
        <Picker.Item label={props.placeholder} value="" style={{ color: Colors.white }} />

        {field.name == "category" ? (
          customOrder.map((order, index) => {
            return <Picker.Item key={index} style={{ color: Colors.white }} label={props.list[order].name} value={order} />
          })) : (
            Object.keys(props.list).map((key, index) => {
              return <Picker.Item key={index} style={{ color: Colors.white }} label={props.list[key]} value={key} />
            })
          )
        }

      </Picker>

      <ErrorMessage
        style={{color: Colors.redError, position: "absolute", top: normalize(47), left: normalize(5), fontSize: normalize(14)}}
        name={field.name}
        component={Text}
      />
    </View>
  );
};

export const TextInputField = ({ field, form, ...props }) => {
  return (
    <View >
      {props.nativeBase != undefined ? (
        <Item regular style={{ ...props.style, marginBottom: 5, marginTop: 5 }}>
          <Input style={{ fontSize: 16, height: 40 }} placeholderTextColor="#fff" placeholder="something" onBlur={form.handleBlur(field.name)} onChangeText={form.handleChange(field.name)} value={field.value} />
        </Item>

      ) : (
          <TextInput
            mode="outlined"

            style={{ ...props.style, height: 0, }}
            value={field.value}
            onChangeText={form.handleChange(field.name)}
            onBlur={form.handleBlur(field.name)}
            theme={props.theme}
            placeholderTextColor={Colors.textInputColor}
            {...props}
          />
        )}
      <View>
        <ErrorMessage
          style={{
            color: Colors.redError, fontSize: normalize(15), marginTop: normalize(-13, "height"), marginBottom: normalize(2), marginLeft: normalize(5), borderTopColor: Colors.redError, borderTopWidth: 1, padding: 5
          }}
          name={field.name}
          component={Text}
        />
      </View>
    </View>
  );
};

export const TextInputPaper = (props) => {
  return (
    <View>
      <TextInput
        mode="outlined"
        value={props.value}
        onChangeText={props.handleChange}
        style={props.style}
      />
      <ErrorMessage
        style={{ marginBottom: 10, color: Colors.errorText }}
        component={Text}
      />
    </View>
  );
};

export const CustomTextarea = ({ field, form, ...props }) => {
  return (
    <View style={props.style}>
      <Textarea
        value={field.value}
        onChangeText={form.handleChange(field.name)}
        {...props}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      <ErrorMessage
        style={{ color: Colors.redError, position: "absolute", top: normalize(47), left: normalize(5), fontSize: normalize(14) }}
        name={field.name}
        component={Text}
      />
    </View>
  );
};

export const FormikSwitch = ({ field, form, ...props }) => {
  return (
    <View style={props.style}>
      <Switch
        value={field.value}
        onValueChange={val => {
          form.setFieldValue(field.name, !field.value);
        }}
        {...props}
      />
      <ErrorMessage
        style={{ marginTop: 10, color: Colors.redError }}
        name={field.name}
        component={Text}
      />
    </View>
  );
};

export const CheckboxField = ({ field, form, ...props }) => {
  return (
    <View>

      <View style={styles.tcContainer}>
        <CheckBox
          style={{ marginRight: 20 }}
          checked={field.value}
          onPress={e => {
            form.setFieldValue(field.name, !form.values[field.name]);
          }}
          {...props}
        />
        <TouchableOpacity onPress={() => NavigationService.navigate("Terms")} >
          <Text style={{ color: Colors.noticeText }} >I agree to Terms and Conditions</Text>
        </TouchableOpacity>
      </View>

      <ErrorMessage
        style={{ marginBottom: 1, color: Colors.errorText }}
        name={field.name}
        component={Text}
      />
    </View>
  );
};

export const RegularInput = (props) => (
  <Item regular style={{ ...props.style, ...{ flexShrink: 1 } }}>
    <Icon style={{ fontSize: 14 }} type={props.family} name={props.icon} />
    <Input disabled={props.disabled} style={{ fontSize: 14, height: 35 }} placeholder={props.placeholder} onFocus={props.onFocus} onChangeText={props.onChangeText} value={props.value} />
  </Item>
)

TextInputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object
};


const styles = StyleSheet.create({
  tcContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  }
});