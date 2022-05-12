import { View, TextInput, StyleSheet, Text} from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const CustemInput = ({value, setValue, placeholder, secureTextEntry, icon_material, icon_AntDesign}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon_material} size={30} />
      <AntDesign name={icon_AntDesign} size={30} />
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
      // borderTopColor:'black',
      // borderBottomColor: 'black',
      // borderEndColor:'black',
      // borderStartColor:'black',
      borderColor: '#e8e8e8',
      borderWidth: 2,
      backgroundColor: 'white',
      height: 60,
      width:'130%',
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 12,
      marginVertical: 15,
      flexDirection: 'row',



    },
    input: {},
});
export default CustemInput