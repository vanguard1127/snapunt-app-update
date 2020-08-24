import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const ErrorText = props => {
  return <Text style={Object.assign(props.style || {}, {color: "#fff", marginBottom: 10})} >{props.error ? props.message : ''}</Text>;
};

ErrorText.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string
};

export default ErrorText;
