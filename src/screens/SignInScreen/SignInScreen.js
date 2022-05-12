import { View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native'
import React, {useState} from 'react'
import Logo from '../../../assets/children.png'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'



const SignInScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {height} = useWindowDimensions()
    const navigation = useNavigation()
    // const {control, handleSubmit, errors} = useForm();
    // console.log(errors)


    const onSignInPress = () =>{
        navigation.navigate('Home')
    }
    const onForgotPassworPressed = () =>{
        navigation.navigate('ForgotPassword')
    }
    const onSignUpPressed =() =>{
        navigation.navigate('SignUp')
    }
    
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Welcome Back</Text> 
            <CustomInput 
                placeholder={'Username'} 
                value={username} 
                setValue={setUsername}
                icon_AntDesign={'user'}
            />
            <CustomInput 
                placeholder={'Password'} 
                value={password} 
                setValue={setPassword}
                secureTextEntry={true}
                icon_material={'lock'}
            />
            <CustemButton 
                text='Sign In' 
                // check befor press signin all the data is valid
                onPress={onSignInPress}
            />
            
            <CustemButton 
                text='Forget Password?' 
                onPress={onForgotPassworPressed} 
                type="TERTIARY"
            />
            <CustemButton 
                text="Don't have an account? Create one" 
                onPress={onSignUpPressed} 
                type="TERTIARY"
            />
    
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center',
      padding: 70,
    },
    background:{
        flex: 1,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
  });

export default SignInScreen;





