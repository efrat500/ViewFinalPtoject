import { View, Text, SafeAreaView, Image,Button } from 'react-native'
import React, {useRoute} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/Opening screens/SignInScreen'
import SignUpScreen from '../screens/Opening screens/SignUpScreen'
import ForgotPasswordScreen from '../screens/Opening screens/ForgotPasswordScreen'
import NewPasswordScreen from '../screens/Opening screens/NewPasswordScreen'
import MenuScreen from '../screens/MenuScreen'
import ReportScreen from '../screens/report screen/ReportScreen'
import StoriesMenu from '../screens/MenuStoryScreen'
import WordsMenu from '../screens/MenuWordsScreen'
import LevelStoryRead from '../screens/stories screens/LevelStoryRead'
import WriteScreen from '../screens/words screens/WriteScreen'
import TranslateScreen from '../screens/words screens/TranslateScreen'
import ReadScreen from '../screens/words screens/ReadScreen'
import ListenStory from '../screens/stories screens/ListenStory'
import Story from '../screens/stories screens/ReadStory'
import LevelStoryListen from '../screens/stories screens/LevelStoryListen'
import DictionaryScreen from '../screens/words screens/Dictionary'
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
        <Stack.Screen name="Listening Words" component={TranslateScreen}/>
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