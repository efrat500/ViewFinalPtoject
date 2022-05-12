import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import Logo from '../../../assets/children.png'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput'
import CustemButton from '../../components/CustemButton'
import { useNavigation } from '@react-navigation/native'

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');
    const {height} = useWindowDimensions();
    const navigation = useNavigation()

    const onSendPressed = () =>{
        navigation.navigate('ConfirmEmail')
    }
    const onSignInPressed =() =>{
        navigation.navigate('SignIn')
    }

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Reset your password</Text> 
            <CustomInput 
                placeholder={'Enter your email'} 
                value={username} 
                setValue={setUsername}
                icon_material={'gmail'}
            />
            <CustemButton 
                text='Send' 
                onPress={onSendPressed}
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

export default ForgotPasswordScreen;





