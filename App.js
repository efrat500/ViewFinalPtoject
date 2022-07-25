import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, Keyboard, ImageBackground, LogBox } from 'react-native'
import Navigation from './src/navigation/Navigation'
import './src/ignoreWarnings'

LogBox.ignoreAllLogs();

export default function App() {
  const name = "efrat"
  return (

    // <TouchableWithoutFeedback onPress={() => {
    //   Keyboard.dismiss()
    // }}>
      <SafeAreaView style={styles.container}>
        <Navigation/>
      </SafeAreaView>
    // </TouchableWithoutFeedback>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white'

  },
});
