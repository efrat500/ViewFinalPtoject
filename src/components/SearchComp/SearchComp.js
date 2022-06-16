import { StatusBar } from 'expo-status-bar';
import {React, useState, useEffect} from 'react'
import { FlatList, Text, ScrollView, View, TextInput, StyleSheet } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'; 

const SearchComp = (term, {setTerm}) => {
    //const [term, setTerm] = useState("");
    return(
        <View style={styles.searchWapperStyle} >
            <StatusBar backgroundColor='gray'/>
            <FontAwesome name="search" size={24} color="black"  style={styles.iconStyle}/>
            <TextInput placeholder="Search"
                placeholderTextColor= "white"
                style={styles.textStyle}
                onChangeText={setTerm}
                value={term}
                onEndEditing={()=>{
                    setTerm(term);
                }}/>
            <FontAwesome name="close" size={24} color="black" style={styles.iconStyle}/>
        </View>
    );
}
export default SearchComp;
const styles = StyleSheet.create({
    searchWapperStyle: {
      backgroundColor: "#16A085",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    iconStyle:{
        marginTop: 12,
        marginHorizontal: 8
    },
    textStyle:{
        flex :1,
        //frontsize: 16,
        paddingHorizontal: 0,
        paddingVertical: 8,
        margin:0,
        color: "white",
    },
});
