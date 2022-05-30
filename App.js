import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native'
import SignInScreen from './src/screens/SignInScreen/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen'
import ConfirmEmail from './src/screens/ConfirmEmailScreen/ConfirmEmailScreen'
import ForgotPasswordScreen from './src/screens/ForgotPassworfScreen/ForgotPasswordScreen'
import NewPasswordScreen from './src/screens/NewPasswordScreen/NewPasswordScreen'
import Navigation from './src/navigation/Navigation'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import StoryScreen from './src/screens/StoryScreen'
import StoriesOptionScreen from './src/screens/StoriesOptionScreen'
import MenuStoryScreen from './src/screens/MenuStoryScreen'
import MenuScreen from './src/screens/MenuScreen'
import LevelStory from './src/screens/levelStory'
import WriteScreen from './src/screens/WriteScreen'
import StoriesOption from './src/screens/StoriesOption'
import { Appbar, Card } from 'react-native-paper';
import Appear from './src/components/Appear'
import ReadScreen from './src/screens/ReadScreen'
import logo from './assets/backgroud.jpg'

export default function App() {
  return (

    <SafeAreaView style={styles.container}>
      <Appear></Appear>

      <ReadScreen />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
});
