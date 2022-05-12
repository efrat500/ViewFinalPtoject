import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput';
import CustemButton from '../../components/CustemButton';
import { useNavigation } from '@react-navigation/native'

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const {height} = useWindowDimensions();
    const navigation = useNavigation()

    const onSignInPressed = () =>{
        navigation.navigate('SignIn')
    }
    const onRegisterPressed =() =>{
        navigation.navigate('Home')
    }

    
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Create a new account</Text> 
            <CustomInput 
                placeholder={'Username'} 
                value={username} 
                setValue={setUsername}
                icon_AntDesign={'user'}
            />
            <CustomInput 
                placeholder={'Email'} 
                value={email} 
                setValue={setEmail}
                icon_material={'gmail'}
            />
            <CustomInput 
                placeholder={'Password'} 
                value={password} 
                setValue={setPassword}
                secureTextEntry={true}
                icon_material={'lock'}
            />
            <CustomInput 
                placeholder={'Repeat Password'} 
                value={passwordRepeat} 
                setValue={setPasswordRepeat}
                secureTextEntry={true}
                icon_material={'lock'}
            />
            <CustemButton 
                text='Register' 
                onPress={onRegisterPressed}
            />
            <CustemButton 
                text="Have an account? Sign in" 
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

export default SignUpScreen;





