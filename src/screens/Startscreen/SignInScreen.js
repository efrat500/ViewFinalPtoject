import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput';
import CustemButton from '../../components/CustemButton';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();
    const onSignInPress = () =>{
        console.warn("sign in");
    }
    const onForgotPassworPressed = () =>{
        console.warn("onForgotPassworPressed");
    }
    const onSignUpPressed =() =>{
        console.warn("onForgotPassworPressed");
    }
    
    return (
        <View style={styles.root}>
            <Image
                source={Logo}
                style={[styles.logo, {height: height*0.3}]}
                resizeMode="contain"
            />  
            <CustomInput 
                placeholder={'Username'} 
                value={username} 
                setValue={setUsername}
            />
            <CustomInput 
                placeholder={'Password'} 
                value={password} 
                setValue={setPassword}
                secureTextEntry={true}
            />
            <CustemButton 
                text='Sign In' 
                onPress={onSignInPress}
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
    }
  });

export default SignInScreen;





