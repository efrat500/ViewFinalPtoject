import { View, Text, StyleSheet, Image, useWindowDimensions, ImageBackground, Alert } from 'react-native';
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

const NewPasswordScreen = (props) => {

    const insertData = (values) => {
        fetch('http://192.168.1.234:5000/updatepassword', {
            method:'put',
            headers: {
                'Content-Type':'application/json',
                Accept: 'application/json'

            },
            timeout: 4000,
            body: JSON.stringify({username:values.username, password:values.password})
        })
        .then((responseJson) => {
            if (responseJson.status != 200){
                Alert.alert('OOPS','The username is incorrect, Please enter another username!',[{text: 'Understood'}])
                return
            }
            else{
                Alert.alert('Note','Your password successfully change!',[{text: 'OK'}])
                props.navigation.navigate('SignIn') 
            }
        })
        .catch(error => console.log(error))
    }
//
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
                onSubmit={(values, formikAction) => {
                    console.log(values)
                    insertData(values)
                } }
                //  navigation.navigate('SignIn')}
            >
                {({values, errors, handleChange, handleBlur, touched, handleSubmit}) => {
                    const {username, password, passwordRepeat} = values
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





