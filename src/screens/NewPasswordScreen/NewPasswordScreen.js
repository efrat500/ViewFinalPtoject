import { View, Text, StyleSheet, Image, useWindowDimensions, ImageBackground } from 'react-native';
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'

const NewPasswordScreen = () => {
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const {height} = useWindowDimensions();
    const navigation = useNavigation()

    const onSubmitPressed = () =>{
        console.warn("onSubmitPressed");
        navigation.navigate('SignIn')
    }
    const onSignInPressed =() =>{
        navigation.navigate('SignIn')
    }

    return (
        <ImageBackground source={require('../../../assets/childrenBackground.jpg')} style={styles.root}>
            <Text style={styles.title}>Reset your password</Text> 
            <CustomInput 
                placeholder={'Enter your new password'} 
                value={password} 
                setValue={setPassword}
                secureTextEntry={true}
                icon_material={'lock'}
            />
            <CustomInput 
                placeholder={'Repeat your new Password'} 
                value={passwordRepeat} 
                setValue={setPasswordRepeat}
                secureTextEntry={true}
                icon_material={'lock'}
            />
            <CustemButton 
                text='Submit' 
                onPress={onSubmitPressed}
            />
            <CustemButton 
                text="Back to Sign in" 
                onPress={onSignInPressed} 
                type="TERTIARY"
            />
    
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





