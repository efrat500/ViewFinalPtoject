import { View, Text, StyleSheet, Image, useWindowDimensions, Alert, ImageBackground } from 'react-native'
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'
import {Formik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    email: Yup.string().trim(). email('Invalid email').required('Email is require')
})


const ForgotPasswordScreen = () => {
    const navigation = useNavigation()

    const onSendPressed = () =>{
        navigation.navigate('ConfirmEmail')
    }
    const onSignInPressed =() =>{
        navigation.navigate('SignIn')
    }

    return (
        <ImageBackground source={require('../../../assets/op1.jpg')} style={styles.root}>
            <Text style={styles.title}>Reset your password</Text> 
            <Formik 
              initialValues={{email: ''}} 
              validationSchema={validationSchema} 
              onSubmit={(values, formikAction) =>{
                Alert.alert('Note','The confirmation code was sent to your email, check it',[{text: 'Understood'}])
                navigation.navigate('ConfirmEmail')
              }}
            >
             {({values, errors, handleChange, handleBlur, touched, handleSubmit}) => {
                    const {email} = values
                    return ( 
                        <>
                            <CustomInput 
                                placeholder={'Enter your email'} 
                                value={email} 
                                error={touched.email && errors.email}
                                setValue={handleChange('email')}
                                onBlur={handleBlur('email')}
                                icon_material={'gmail'}
                            />
                            <CustemButton 
                                text='Send' 
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
  });

export default ForgotPasswordScreen;





