import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native'
import SignInScreen from './src/screens/SignInScreen/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen'
import ConfirmEmail from './src/screens/ConfirmEmailScreen/ConfirmEmailScreen'
import ForgotPasswordScreen from './src/screens/ForgotPassworfScreen/ForgotPasswordScreen'
import NewPasswordScreen from './src/screens/NewPasswordScreen/NewPasswordScreen'
import Navigation from './src/navigation/Navigation'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'

import MenuScreen from './src/screens/MenuScreen'
import Story from './src/screens/Story'
import ReportScreen from './src/screens/ReportScreen'
import WordsOptions from './src/screens/WordsOptions'
import StoriesOptionScreen from './src/screens/StoriesOptionScreen'
import StoriesOption from './src/screens/StoriesOption'



export default function App() {
  const name = "efrat"
  return (

    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <SafeAreaView style={styles.container}>
        {/* <Navigation/> */}
        {/* <Story /> */}
        {/* <StoriesOptionScreen></StoriesOptionScreen> */}
        {/* <ReportScreen></ReportScreen> */}
        {/* <WordsOptions></WordsOptions> */}
        <StoriesOption></StoriesOption>
        {/* <WriteScreen /> */}
        {/* <ReadScreen /> */}
        {/* <TranslateScreen /> */}
        {/* <StoriesOptionScreen /> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white'

  },
});
