import { View, Text, StyleSheet, Image, useWindowDimensions, Alert, ImageBackground, Linking } from 'react-native'
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


// export async function sendEmail(to, subject, body, options = {}) {
//     const { cc, bcc } = options;

//     let url = `mailto:${to}`;

//     // Create email link query
//     const query = JSON.stringify({
//         subject: subject,
//         body: body,
//         cc: cc,
//         bcc: bcc
//     });

//     if (query.length) {
//         url += `?${query}`;
//     }

//     // check if we can use this link
//     const canOpen = await Linking.canOpenURL(url);

//     if (!canOpen) {
//         Alert.alert('Provided URL can not be handled');
//     }

//     return Linking.openURL(url);
// }

const ForgotPasswordScreen = () => {

    const insertData = (values) => {
        fetch('http://192.168.1.21:5000/register', {
            method:'get',
            headers: {
                'Content-Type':'application/json',
                Accept: 'application/json'

            },
            timeout: 4000,
            body: JSON.stringify({email:values.email})
        })
        .then((responseJson) => {
            if (responseJson.status != 200){
                Alert.alert('OOPS','The username already exists, Please enter another username!',[{text: 'Understood'}])
                return
            }
            else{
                props.navigation.navigate('Home') 
            }
        })
        .catch(error => console.log(error))
    }



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
                // sendEmail(values.email,
                //     'We need your feedback',
                //     'UserName, we need 2 minutes of your time to fill this quick survey'
                // ).then(() => {console.log('Our email successful provided to device mail ')})
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





