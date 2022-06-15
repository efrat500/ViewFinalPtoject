import React, { Component, useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";
import axios from "axios"
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation, useRoute } from '@react-navigation/native'
  
const Item = ({ title }) => {
    return (
      <View style={styles.item}>
        <Text>{title}</Text>
      </View>
    );
  };
const renderItem = ({ item }) => <Item title={item.word} />;
  
function WordsOptions (props) {
    //const route = useRoute()
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState(data);
    const [arrayholder, setarrayholder] = useState(data);
    const [searchValue, setsearchValue] = useState("");
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.post('http://192.168.1.21:5000/getwordsgeneral', {username: "shahar"})
            setdata(response.data.allwords)
            console.log(arrayholder)
            console.log(data)
        }
        axiosStories()
    }, [])
    searchFunction = (text) => {
        const updatedData = data.filter((item) => {
            const item_data = `${item.word.toUpperCase()})`;
            const text_data = text.toUpperCase();
            return item_data.indexOf(text_data) > -1;
        }).map(({word}) =>({word}));
        setdata(updatedData);
        setsearchValue(text);
        
    };
  
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <SearchBar
                placeholder="Search Here..."
                lightTheme
                round
                value={searchValue}
                onChangeText={(text) => searchFunction(text)}
                autoCorrect={false}
                />
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.word}
                />
            </View>
        </ScrollView>
    );
    
}
  
export default WordsOptions;
  
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
  },
  item: {
    backgroundColor: "#f5f520",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});


// import React from 'react'
// import { FlatList, Text, ScrollView, View } from 'react-native';
// import { Appbar, Card } from 'react-native-paper';
// import Appear from '../components/Appear';

// const mydata = [
//     { id: 1, title: "First Title", description: "First Description" },
//     { id: 2, title: "Second Title", description: "Second Description" },
//     { id: 3, title: "Third Title", description: "Third Description" },
//     { id: 4, title: "Fourth Title", description: "Fourth Description" },
//     { id: 5, title: "geekscoders.com", description: "Fourth Description" },
//     { id: 6, title: "geekscoders.com", description: "Fourth Description" },
//     { id: 7, title: "geekscoders.com", description: "Fourth Description" },
//     { id: 8, title: "geekscoders.com", description: "Fourth Description" },
//     { id: 9, title: "geekscoders.com", description: "Fourth Description" },
//     { id: 10, title: "First Title", description: "First Description" },
//     { id: 11, title: "Second Title", description: "Second Description" },
//     { id: 12, title: "Third Title", description: "Third Description" },
//     { id: 13, title: "Fourth Title", description: "Fourth Description" },
//     { id: 14, title: "geekscoders.com", description: "Fourth Description" },
//     { id: 15, title: "geekscoders.com", description: "Fourth Description" },
//     { id: 16, title: "geekscoders.com", description: "Fourth Description" },
//     { id: 17, title: "geekscoders.com", description: "Fourth Description" },
    
// ]

// const renderData = (item) => {
//     return (
//         <Card style={{ padding: 10, margin: 5, backgroundColor: "#85E3DE" }}>
//             <Text style={{ fontSize: 20 }}>{item.title}</Text>
//             <Text style={{ fontSize: 12 }}>{item.description}</Text>

//         </Card>
//     );

// }

// const WordsOptions = () => {
//     return (
//         <View>
//         <Appear></Appear>
//         <FlatList
//             data={mydata}
//             renderItem={({ item }) => {
//                 return renderData(item)
//             }}
//         />

//     </View>);
// }

// export default WordsOptions;