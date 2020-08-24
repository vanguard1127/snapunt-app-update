import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator } from "react-native-paper"
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux';

const ActivityIndicatorComponent = ({ animating, transparent = false, ...props }) => {
  return (
    <View style={styles.container} >
      <ActivityIndicator
        style={{ backgroundColor: "black", padding: 10, borderRadius: 5 }}
        animating={animating}
      />
      <Text style={{color: Colors.backgroundColor, marginTop: 10}} >{props.loadingText}</Text>
    </View>
  );
};


const mapStateToProps = state => {
  return {
      loadingText: state.userReducer.loadingText
  };
};

export default connect(
  mapStateToProps,
  null
)(ActivityIndicatorComponent);


ActivityIndicatorComponent.propTypes = {
  animating: PropTypes.bool,
  transparent: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0.7
  }
});
