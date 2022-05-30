import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import SignInScreen from './src/screens/SignInScreen/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen'
import ConfirmEmail from './src/screens/ConfirmEmailScreen/ConfirmEmailScreen'
import ForgotPasswordScreen from './src/screens/ForgotPassworfScreen/ForgotPasswordScreen'
import NewPasswordScreen from './src/screens/NewPasswordScreen/NewPasswordScreen'
import Navigation from './src/navigation/Navigation'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import MenuScreen from './src/screens/MenuScreen'
import Story from './src/screens/Story'

export default function App() {
  const name = "efrat"
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <SafeAreaView style={styles.container}>
        {/* <Navigation/> */}
        <Story />
        {/* <MenuScreen name= {name} /> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5FE0E6'
  },
});
