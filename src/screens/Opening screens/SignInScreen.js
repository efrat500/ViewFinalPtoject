import { View, Text, StyleSheet, Image, useWindowDimensions, Alert, ImageBackground} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import API from '../../axiosAPI'

const validationSchema = Yup.object({
    username: Yup.string().trim().required('Username is required'),
    password: Yup.string().trim().required('Password is required')
})


const SignInScreen = (props) => {
    const insertData = (values) => {
        API.post('login', {username: values.username ,password: values.password})
        .then(resp => {
            console.log(resp.data)
            console.log("s1")
            console.log(resp.status)
            if (resp.status != 200){
                console.log("s1")
                Alert.alert('OOPS','The username or password is incorrect, Please try again!',[{text: 'Understood'}])
            }
            else{
                props.navigation.navigate('Home', {name:values.username}) 
            }
        })
        .catch(error => {
            Alert.alert('OOPS','The username or password is incorrect, Please try again!',[{text: 'Understood'}])
        })
        .finally(() => console.log("done"))
    }
    const navigation = useNavigation()

    const onForgotPassworPressed = () =>{
        navigation.navigate('ForgotPassword')
    }
    const onSignUpPressed =() =>{
        navigation.navigate('SignUp')
    }
    const onInstructionScreenPressed =() =>{
        navigation.navigate('Instruction')
    }
    
    
    return (
        <ImageBackground source={require('../../../assets/background.jpg')} style={styles.root}> 
            <Image source={require('../../../assets/Logon.png')} style={styles.logo}/> 
            <Text style={styles.title}>Welcome Back</Text> 
            <Formik 
                initialValues={{username: '',password: ''}} 
                validationSchema={validationSchema} 
                onSubmit={(values, formikAction) => {
                    //console.log(values)
                    insertData(values)
                }
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
                            <View style={{marginTop:70,}}>
                            <CustemButton 
                                text="Instruction" 
                                onPress={onInstructionScreenPressed} 
                                type="TERTIARY"
                            />
                            </View>
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
      padding: 50,
      backgroundColor:`#87ceeb`,
    },
    background:{
        flex: 1,
    },
    logo: {
        maxWidth: 250,
        maxHeight: 190,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
  });

export default SignInScreen;





