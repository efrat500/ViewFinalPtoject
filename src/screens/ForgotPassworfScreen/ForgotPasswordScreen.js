import { View, Text, StyleSheet, Image, useWindowDimensions, Alert, ImageBackground, Linking } from 'react-native'
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from "axios"



const validationSchema = Yup.object({
    username: Yup.string().trim().required('Username is required'),
    email: Yup.string().trim(). email('Invalid email').required('Email is require'),
    question: Yup.string().trim().required('This field is required')
})


const ForgotPasswordScreen = () => {

    const insertData = (values) => {
        console.log(values.username)
        console.log(values.email)
        console.log(values.question)
        axios.post('http://192.168.1.235:5000/forgotpassword', {username: values.username ,email: values.email, question:values.question})
        .then(resp => {
            console.log(resp.data)
            console.log(resp.status)
            if (resp.data.check == 'please try again!'){
                Alert.alert('OOPS','One of your details are incorrect, Please try again!',[{text: 'Understood'}])
                return
            }
            else{
                console.log('ssss')
                navigation.navigate('NewPassword', {name:values.username}) 
            }
        })
        .catch(error => {
            console.log("s2")
        })
        .finally(() => console.log("done"))
    }


    const navigation = useNavigation()

    const onSignInPressed =() =>{
        navigation.navigate('SignIn')
    }

    return (
        <ImageBackground source={require('../../../assets/op1.jpg')} style={styles.root}>
            <Text style={styles.title1}>Enter Verification</Text> 
            <Text style={styles.title2}>Details</Text> 
            <Formik 
              initialValues={{username:'', email: '', question:''}} 
              validationSchema={validationSchema} 
              onSubmit={(values, formikAction) =>{
                insertData(values)
              }}
            >
             {({values, errors, handleChange, handleBlur, touched, handleSubmit}) => {
                    const {username,email,question} = values
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
                                placeholder={'Enter your email'} 
                                value={email} 
                                error={touched.email && errors.email}
                                setValue={handleChange('email')}
                                onBlur={handleBlur('email')}
                                icon_material={'gmail'}
                            />
                            <CustomInput 
                                placeholder={'Insert your favorite animal'} 
                                value={question} 
                                setValue={handleChange('question')}
                                onBlur={handleBlur('question')}
                                icon_AntDesign={'question'}
                                
                            />
                            <CustemButton 
                                text='Verify' 
                                onPress={handleSubmit}
                            />
                            <CustemButton 
                                text="Back to Sign in" 
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
    title1: {
        paddingTop:20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
       
    },
    title2: {
        paddingBottom:20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
       
    },
  });

export default ForgotPasswordScreen;





