import React from 'react'
import { FlatList, Text, ScrollView } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import Appear from '../components/Appear';

const mydata = [
    { id: 1, title: "First Title", description: "First Description" },
    { id: 2, title: "Second Title", description: "Second Description" },
    { id: 3, title: "Third Title", description: "Third Description" },
    { id: 4, title: "Fourth Title", description: "Fourth Description" },
    { id: 5, title: "geekscoders.com", description: "Fourth Description" },
    { id: 6, title: "geekscoders.com", description: "Fourth Description" },
    { id: 7, title: "geekscoders.com", description: "Fourth Description" },
    { id: 8, title: "geekscoders.com", description: "Fourth Description" },
    { id: 9, title: "geekscoders.com", description: "Fourth Description" },
    { id: 10, title: "First Title", description: "First Description" },
    { id: 11, title: "Second Title", description: "Second Description" },
    { id: 12, title: "Third Title", description: "Third Description" },
    { id: 13, title: "Fourth Title", description: "Fourth Description" },
    { id: 14, title: "geekscoders.com", description: "Fourth Description" },
    { id: 15, title: "geekscoders.com", description: "Fourth Description" },
    { id: 16, title: "geekscoders.com", description: "Fourth Description" },
    { id: 17, title: "geekscoders.com", description: "Fourth Description" },
    
]

const renderData = (item) => {
    return (
        <Card style={{ padding: 10, margin: 5, backgroundColor: "#85E3DE" }}>
            <Text style={{ fontSize: 20 }}>{item.title}</Text>
            <Text style={{ fontSize: 12 }}>{item.description}</Text>

        </Card>
    );

}

const WordsOptions = () => {
    return (<ScrollView>
        <Appear></Appear>
        <FlatList
            data={mydata}
            renderItem={({ item }) => {
                return renderData(item)
            }}
            keyExtractor={item => `${item.id}`}


        />
    </ScrollView >);
}

export default WordsOptions;