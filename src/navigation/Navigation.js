import { View, Text, SafeAreaView, Image } from 'react-native'
import React, {useRoute} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen'
import ForgotPasswordScreen from '../screens/ForgotPassworfScreen/ForgotPasswordScreen'
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen'
import MenuScreen from '../screens/MenuScreen'
import ReportScreen from '../screens/ReportScreen'
import StoriesMenu from '../screens/StoryScreen'
import WordsMenu from '../screens/WordsScreen'
import LevelStoryRead from '../screens/LevelStoryRead'
import WriteScreen from '../screens/WriteScreen'
import TranslateScreen from '../screens/TranslateScreen'
import ReadScreen from '../screens/ReadScreen'
import ListenStory from '../screens/ListenStory'
import Story from '../screens/Story'
import LevelStoryListen from '../screens/LevelStoryListen'
import DictionaryScreen from '../screens/WordsOptions'

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
            headerRight: () => (
              <Image style={{ width: 50, height: 50}} source={require("../../assets/logo.png")} />
              ),
            headerTitleAlign: "center",
            headerTintColor:"black",
            headerStyle:{
              backgroundColor: `white`
            },
          }}
        >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="Home" component={MenuScreen} />
        <Stack.Screen name="Report" component={ReportScreen}/>
        <Stack.Screen name="Stories Menu" component={StoriesMenu}/>
        <Stack.Screen name="Words Menu" component={WordsMenu}/>
        <Stack.Screen name="Level Story Read" component={LevelStoryRead}/>
        <Stack.Screen name="Write Screen" component={WriteScreen}/>
        <Stack.Screen name="Translate Screen" component={TranslateScreen}/>
        <Stack.Screen name="Read Screen" component={ReadScreen}/>
        <Stack.Screen name="Listen Story" component={ListenStory}/>
        <Stack.Screen name="Read Story" component={Story}/>
        <Stack.Screen name="Level Story Listen" component={LevelStoryListen}/>
        <Stack.Screen name="Dictionary Screen" component={DictionaryScreen}/>
        
       
        
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation