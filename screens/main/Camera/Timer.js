import React from 'react';
import { Text, View } from 'react-native';

export default class Timer extends React.Component {

  state = {
    clock : "00:00",
    clockInterval: null
  };

  componentDidMount(){
      this.handler()
  }

  handler() {
    var secs = 0;
    var sec = 0;
    var min = 0
    this.state.clockInterval = setInterval(() => {
        secs++
        sec = parseInt(secs % 60, 10)
        min = Math.floor(secs / 60);
        this.setState({clock: (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec) })
    }, 1000);
  };
  
  componentWillUnmount(){
    clearInterval(this.state.clockInterval)
  }

  render() {
      return (
          <View>
            <Text style={{color: "#fff", marginBottom: 10}} >{this.state.clock}</Text>
          </View>
      )
    }
  }