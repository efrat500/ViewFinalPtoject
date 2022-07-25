import { View, Text, SafeAreaView, Image,Button } from 'react-native'
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
import InstructionScreen from '../screens/InstructionScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerTintColor:"black",
            headerStyle:{
              backgroundColor: `white`
            },
          }}
        >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Instruction" component={InstructionScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="Home" component={MenuScreen} />
        <Stack.Screen name="Report" component={ReportScreen}/>
        <Stack.Screen name="Stories Menu" component={StoriesMenu}/>
        <Stack.Screen name="Words Menu" component={WordsMenu}/>
        <Stack.Screen name="Level Story Read" component={LevelStoryRead}/>
        <Stack.Screen name="Translate Words" component={WriteScreen}/>
        <Stack.Screen name="Hearing Words" component={TranslateScreen}/>
        <Stack.Screen name="Reading Words" component={ReadScreen}/>
        <Stack.Screen name="Listen Story" component={ListenStory}/>
        <Stack.Screen name="Read Story" component={Story}/>
        <Stack.Screen name="Level Story Listen" component={LevelStoryListen}/>
        <Stack.Screen name="Dictionary Screen" component={DictionaryScreen}/>
        
       
        
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation