import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'

const ConfirmEmail = () => {
    const [code, setCode] = useState('')
    const {height} = useWindowDimensions()
    const navigation = useNavigation()

    const onConfirmPressed = () =>{
        navigation.navigate('NewPassword')
    }
    const onSignInPressed = () =>{
        navigation.navigate('SignIn')
        
    }
    const onResendPressed =() =>{
        console.warn("onResendPressed")
    }

    
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your email</Text> 
            <CustomInput 
                placeholder={'Enter your confirmation code'} 
                value={code} 
                setValue={setCode}
            />
            <CustemButton 
                text='Confirm' 
                onPress={onConfirmPressed}
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
    
        </View>
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





