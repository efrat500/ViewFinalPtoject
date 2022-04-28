import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, type = "PRIMARY"}) => {
  return (
    <Pressable
        onPress={onPress}
        style={[styles.container, styles[`container_${type}`]]}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        
    },
    container_PRIMARY: {
        borderColor: '#e8e8e8',
        borderWidth: 2,
        paddingHorizontal: 70,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 25,
        backgroundColor: 'white', 
    },
    container_TERRIARY:  {},
    text:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold', 
    },
    text_TERTIARY: {
        color:'gray',
        fontSize: 12,  
    }
    
});
export default CustomButton