import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const CustemInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput 
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width:'100%',
        borderColor: '#e8e8e8',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 9,



    },
    input: {},
});
export default CustemInput