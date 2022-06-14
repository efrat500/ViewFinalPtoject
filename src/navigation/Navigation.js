import { View, Text, SafeAreaView } from 'react-native'
import React, {useRoute} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen'
import ConfirmEmail from '../screens/ConfirmEmailScreen/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPassworfScreen/ForgotPasswordScreen'
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen'
import MenuScreen from '../screens/MenuScreen'
import ReportScreen from '../screens/ReportScreen'
import StoriesMenu from '../screens/StoryScreen'
import WordsMenu from '../screens/WordsScreen'
import LevelScreen from '../screens/levelStory'
import WriteScreen from '../screens/WriteScreen'
import TranslateScreen from '../screens/TranslateScreen'
import ReadScreen from '../screens/ReadScreen'

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
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center"
          }}
        >
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} options={{headerShown:false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:false}}/>
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={MenuScreen} options={{title: "hello"}}/>
        <Stack.Screen name="Report" component={ReportScreen}/>
        <Stack.Screen name="Stories Menu" component={StoriesMenu}/>
        <Stack.Screen name="Words Menu" component={WordsMenu}/>
        <Stack.Screen name="Level Screen" component={LevelScreen}/>
        <Stack.Screen name="Write Screen" component={WriteScreen}/>
        <Stack.Screen name="Translate Screen" component={TranslateScreen}/>
        <Stack.Screen name="Read Screen" component={ReadScreen}/>
        
       
        
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation