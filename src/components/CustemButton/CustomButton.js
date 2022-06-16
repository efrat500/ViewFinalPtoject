import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'



const CustomButton = ({onPress, text, type = "PRIMARY"}) => {
  return (
    <TouchableOpacity
        color='white'
        onPress={onPress}
        style={[styles.container, styles[`container_${type}`]]}>
        <Text numberOfLines={1} style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        borderRadius: 10,
        
        
    },
    container_PRIMARY: {
        borderColor: 'whit',
        borderWidth: 2,
        paddingHorizontal: 70,
        paddingVertical: 10,
        alignItems: 'center',
        marginVertical: 15,
    },
    container_SECONDARY: {
        borderColor: '#e8e8e8',
        paddingHorizontal: 50,
        borderWidth: 1,
        backgroundColor: 'white', 
    },
    container_TERRIARY:  {},
    text:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold', 
    },
    text_TERTIARY: {
        color:'black',
        fontSize: 16,  
    }
    
});
export default CustomButton