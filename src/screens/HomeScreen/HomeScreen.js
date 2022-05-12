import { SafeAreaView, Text,StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import CustemButton from '../../components/CustemButton';
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation()

  const onExitPressed =() =>{
    navigation.navigate('SignIn')
}
  return (
    <ImageBackground source={require('../../../assets/op1.jpg')} style={styles.container}>
      <Text style={{fontSize: 24, alignItems: 'center'}}>HomeScreen</Text>
      <CustemButton 
        text='Exit' 
        onPress={onExitPressed}
      />
    </ImageBackground>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default HomeScreen