import { View, Text, StyleSheet, Image, useWindowDimensions, ImageBackground, Alert } from 'react-native';
import Logo from '../../../assets/children.png'
import React, {useState, useEffect} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from "axios"

const validationSchema = Yup.object({
    username: Yup.string().trim(). min(3,'Invalid name').required('Username is required'),
    email: Yup.string().trim(). email('Invalid email').required('Email is required'),
    password: Yup.string().trim(). min(8,'Password is too short - you need at least 8 characters!').required('Password is required'),
    passwordRepeat: Yup.string().equals([Yup.ref('password'), null], 'Password does not match').required('Repeat password is required')

})

const SignUpScreen = (props) => {
    const insertData = (values) => {
        axios.post('http://192.168.1.21:5000/register', {username:values.username, password:values.password, email:values.email})
        .then(resp => {
            console.log(resp.data)
            props.navigation.navigate('Home') 
        })
        .catch(error => {
            if (error.status != 200){
                Alert.alert('OOPS','The username already exists, Please enter another username!',[{text: 'Understood'}])
                return
            }
        })
        .finally(() => console.log("done"))
    }

    const navigation = useNavigation()

    const onSignInPressed = () =>{
        navigation.navigate('SignIn')
    }

    return (
        <ImageBackground source={require('../../../assets/op1.jpg')} style={styles.root} resizeMode={"cover"}>
            <Text style={styles.title}>Create a new account</Text> 
            <Formik
                initialValues={{username: '', email:'',password: '', passwordRepeat: ''}} 
                validationSchema={validationSchema} 
                onSubmit={(values, formikAction) => {
                    insertData(values)
                }

                }
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
                                onChangeText = {text =>setPassword(text)}
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





