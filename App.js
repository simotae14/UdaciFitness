import React from 'react';
import { View, Slider } from 'react-native';
import AddEntry from './components/AddEntry';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
}

