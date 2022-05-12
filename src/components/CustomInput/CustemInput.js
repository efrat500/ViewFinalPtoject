import { View, TextInput, StyleSheet, Text} from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {AntDesign} from '@expo/vector-icons'

const CustemInput = ({value, setValue, placeholder, secureTextEntry, icon_material, icon_AntDesign, error}) => {
  return (
    <View>
      <View>
        {error ? (<Text style={{ color: 'red', fontSize: 16}}>{error} </Text>) : null}
      </View>
      <View style={styles.container}>
        <MaterialCommunityIcons name={icon_material} size={30} />
        <AntDesign name={icon_AntDesign} size={30} />
        <TextInput 
          autoCapitalize='none'
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
        />
      </View>
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
      width: 300,
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 12,
      marginVertical: 10,
      flexDirection: 'row',



    },
    input: {},
});
export default CustemInput