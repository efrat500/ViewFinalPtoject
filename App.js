import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native'
import SignInScreen from './src/screens/SignInScreen/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen'
import ForgotPasswordScreen from './src/screens/ForgotPassworfScreen/ForgotPasswordScreen'
import NewPasswordScreen from './src/screens/NewPasswordScreen/NewPasswordScreen'
import Navigation from './src/navigation/Navigation'
import MenuScreen from './src/screens/MenuScreen'
import Story from './src/screens/Story'
import ReportScreen from './src/screens/ReportScreen'
import WordsOptions from './src/screens/WordsOptions'
import StoriesOption from './src/screens/StoriesOption'
import WordsScreen from './src/screens/WordsScreen'
import WriteScreen from './src/screens/WriteScreen'
import LevelStoryRead from './src/screens/LevelStoryRead'
import InstructionScreen from './src/screens/InstructionScreen'
import './src/ignoreWarnings'


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
