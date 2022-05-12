import { View, Text, StyleSheet, Image, useWindowDimensions, ImageBackground } from 'react-native';
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'
import {Formik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    username: Yup.string().trim(). min(3,'Invalid name').required('Username is require'),
    email: Yup.string().trim(). email('Invalid email').required('Email is require'),
    password: Yup.string().trim(). min(8,'Password is too short!').required('Password is require'),
    passwordRepeat: Yup.string().equals([Yup.ref('password'), null], 'Password does not match').required('Repeat password is require')

})

const SignUpScreen = () => {
    const navigation = useNavigation()

    const onSignInPressed = () =>{
        navigation.navigate('SignIn')
    }

    return (
        <ImageBackground source={require('../../../assets/o3.jpg')} style={styles.root}>
            <Text style={styles.title}>Create a new account</Text> 
            <Formik
                initialValues={{username: '', email:'',password: '', passwordRepeat: ''}} 
                validationSchema={validationSchema} 
                onSubmit={(values, formikAction) => navigation.navigate('Home')}
            >
                {({values, errors, handleChange, handleBlur, touched, handleSubmit}) => {
                    const {username, password, email, passwordRepeat} = values
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
                                placeholder={'Email'} 
                                value={email} 
                                error={touched.email && errors.email}
                                setValue={handleChange('email')}
                                onBlur={handleBlur('email')}
                                icon_material={'gmail'}
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
                            <CustomInput 
                                placeholder={'Repeat Password'} 
                                value={passwordRepeat} 
                                setValue={handleChange('passwordRepeat')}
                                onBlur={handleBlur('passwordRepeat')}
                                secureTextEntry={true}
                                icon_material={'lock'}
                                error={touched.passwordRepeat && errors.passwordRepeat}
                            />
                            <CustemButton 
                                text='Register' 
                                onPress={handleSubmit}
                            />
                            <CustemButton 
                                text="Have an account? Sign in" 
                                onPress={onSignInPressed} 
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

export default SignUpScreen;





