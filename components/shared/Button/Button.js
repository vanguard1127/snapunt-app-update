import React from 'react';
import {  Button, Text as NativeText, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '../../../constants/Colors';


export const OutlineButton = props => {
  const textColor = props.textColor != undefined ? props.textColor : "white"
    return (
    <Button bordered light style={{ ...props.style, justifyContent: "center", borderColor: "#fff" }}
        onPress={props.onPress}
      >
        <NativeText uppercase={false} style={{color: textColor}} >{props.text}</NativeText>
      </Button>
    );
  };

  export const RoundButton = props => {
    const textColor = props.textColor != undefined ? props.textColor : "white"
    const icon = props.showIcon != undefined ? true : false
      return (

          <Button bordered iconRight={icon} light small rounded style={{ ...props.style, justifyContent: "center", borderColor: "white" }} onPress={props.onPress} >
            <NativeText uppercase={false} style={{color: textColor, fontSize: 12, fontWeight: "bold"}} >{props.text}</NativeText>
            {props.showIcon != undefined && <Icon name={props.icon} type={props.iconType} /> }
          </Button>
         
      );
    };

  export var DarkOutlineButton = props => {
    const small = props.small != undefined ? props.small : false
    const iconName = props.name != undefined ? props.name : false
    const iconType = props.type != undefined ? props.type : false

    return (
    <Button ref={(input) => props.updateRef != undefined && props.updateRef(input)} small={small} iconRight style={{ ...props.style, justifyContent: "center", backgroundColor: Colors.backgroundColor }}
        onPress={() => props.onPress(props.params)}
      >
        <NativeText uppercase={false} style={{color: Colors.white}} >{props.text}</NativeText>
        {iconName && <Icon name={iconName} type={iconType} />}
        {props.children}
      </Button>
    );
  };

  export const NativeButton = props => {
    return (
    <Button small  style={{ ...props.style, justifyContent: "center", backgroundColor: Colors.backgroundColor }}
        onPress={props.onPress}
      >
        <NativeText uppercase={false} >{props.text}</NativeText>
      </Button>
    );
  };

  export const TransparentButton = props => {
    return (
    <Button transparent light style={{ ...props.style, justifyContent: "center"}}
        onPress={props.onPress}
      >
        <NativeText uppercase={false} >{props.text}</NativeText>
      </Button>
    );
  };

  export const TextButton = props => {
    return (
    <TouchableOpacity onPress={props.onPress} >
        <Text style={{ ...props.style}}>{props.text}</Text>
      </TouchableOpacity>
    );
  };