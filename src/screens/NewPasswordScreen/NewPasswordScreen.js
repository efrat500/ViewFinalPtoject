import { View, Text, StyleSheet, Image, useWindowDimensions, ImageBackground } from 'react-native';
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    password: Yup.string().trim(). min(8,'Password is too short!').required('Password is require'),
    passwordRepeat: Yup.string().equals([Yup.ref('password'), null], 'Password does not match').required('Repeat password is require')
})

const NewPasswordScreen = () => {
    const navigation = useNavigation()

    const onSignInPressed =() =>{
        navigation.navigate('SignIn')
    }

    return (
        <ImageBackground source={require('../../../assets/op1.jpg')} style={styles.root}>
            <Text style={styles.title}>Reset your password</Text> 
            <Formik
                initialValues={{password: '', passwordRepeat: ''}} 
                validationSchema={validationSchema} 
                onSubmit={(values, formikAction) => navigation.navigate('SignIn')}
            >
                {({values, errors, handleChange, handleBlur, touched, handleSubmit}) => {
                    const {password, passwordRepeat} = values
                    return ( 
                        <>
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
                                text='Submit' 
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

export default NewPasswordScreen;





