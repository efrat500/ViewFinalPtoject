import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen'
import ConfirmEmail from '../screens/ConfirmEmailScreen/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPassworfScreen/ForgotPasswordScreen'
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
const Stack = createNativeStackNavigator()

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../../assets/op1.jpg')}
    />
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} options={{headerShown:false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:false}}/>
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation