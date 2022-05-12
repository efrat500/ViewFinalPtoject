import { View, Text, StyleSheet, Image, useWindowDimensions, Alert, ImageBackground} from 'react-native'
import React, {useState} from 'react'
import Logo from '../../../assets/children.png'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'
import {Formik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    username: Yup.string().trim(). min(3,'Invalid name').required('Username is require'),
    password: Yup.string().trim(). min(8,'Password is too short').required('Password is require')
})

const SignInScreen = () => {
    const {height} = useWindowDimensions()
    const navigation = useNavigation()
    // const onSignInPress = () =>{
    //     if (!username.trim()) {
    //         Alert.alert('OOPS!','Please Enter Name',[{text: 'Understood'}]);
    //         return;
    //     }
          
    //     if (!password.trim()) {
    //         Alert.alert('OOPS!','Please Enter password',[{text: 'Understood'}]);
    //         return;
    //     }
    //     navigation.navigate('Home')
    // }
    const onForgotPassworPressed = () =>{
        navigation.navigate('ForgotPassword')
    }
    const onSignUpPressed =() =>{
        navigation.navigate('SignUp')
    }
    
    return (
        <ImageBackground source={require('../../../assets/o3.jpg')} style={styles.root}>
            <Text style={styles.title}>Welcome Back</Text> 
            <Formik 
                initialValues={{username: '',password: ''}} 
                validationSchema={validationSchema} 
                onSubmit={(values, formikAction) => 
                    navigation.navigate('Home')
                }>
                {({values, errors, handleChange, handleBlur, touched, handleSubmit}) => {
                    const {username, password} = values
                    return ( 
                        <>
                            <CustomInput 
                                placeholder={'Username'} 
                                value={username} 
                                error={touched.username && errors.username}
                                setValue={handleChange('username')}
                                onBlur={handleBlur('username')}
                                icon_AntDesign={'user'}
                            />
                            <CustomInput 
                                placeholder={'Password'} 
                                value={password} 
                                onBlur={handleBlur('password')}
                                setValue={handleChange('password')}
                                secureTextEntry={true}
                                icon_material={'lock'}
                                error={touched.password && errors.password}
                            />
                            <CustemButton 
                                text='Sign In' 
                                // check befor press signin all the data is valid
                                onPress={handleSubmit}
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
                        </>
                    )
                }}
            </Formik>
        </ImageBackground>
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





