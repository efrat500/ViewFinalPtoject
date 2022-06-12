import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import SignInScreen from './src/screens/Startscreen/SignInScreen';
import StoriesOption from './src/screens/StoriesOptions';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StoriesOption></StoriesOption>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',

  },
});
