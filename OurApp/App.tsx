import {Text, View} from 'react-native';
import React, {Component} from 'react';

export class App extends Component {
  render() {
    return (
      <View className="flex justify-center items-center w-full h-full bg-black">
        <Text className='text-white text-xl'>Welcome </Text>
      </View>
    );
  }
}

export default App;
