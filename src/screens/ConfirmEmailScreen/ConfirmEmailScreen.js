import { View, Text, StyleSheet, Image, useWindowDimensions, ImageBackground } from 'react-native';
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'
import {Formik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    code: Yup.string().trim().required('Confirmation code is require')
})
const ConfirmEmail = () => {
    const navigation = useNavigation()

    const onSignInPressed = () =>{
        navigation.navigate('SignIn')
        
    }
    const onResendPressed =() =>{
        console.warn("onResendPressed")
    }
//check last test
    return (
        <ImageBackground source={require('../../../assets/op1.jpg')} style={styles.root}>
            <Text style={styles.title}>Confirm your email</Text> 
            <Formik 
              initialValues={{code: ''}} 
              validationSchema={validationSchema} 
              onSubmit={(values, formikAction) => navigation.navigate('NewPassword')}
            >
                {({values, errors, handleChange, handleBlur, touched, handleSubmit}) => {
                    const {code} = values
                    return ( 
                        <>
                            <CustomInput 
                                placeholder={'Enter your confirmation code'}  
                                value={code} 
                                error={touched.code && errors.code}
                                setValue={handleChange('code')}
                                onBlur={handleBlur('code')}
                            />
                            <CustemButton 
                                text='Confirm' 
                                onPress={handleSubmit}
                            />
                            <CustemButton 
                                text="Resend code" 
                                onPress={onResendPressed} 
                                type="SECONDARY"
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

export default ConfirmEmail;





