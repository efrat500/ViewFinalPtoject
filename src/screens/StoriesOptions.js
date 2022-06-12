import React, {useState,useEffect} from 'react'
import { FlatList, Text, ScrollView } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import Appear from '../components/Appear';
import axios from "axios"


const renderData = (item) => {
    return (
        <Card style={{ padding: 10, margin: 10, backgroundColor: "#85E3DE" }}>
            <Text style={{ fontSize: 20 }}>{item.title}</Text>
        </Card>
    );

}

const StoriesOption = () => {
    const [stories , setStories]=useState([])
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.get('http://192.168.1.21:5000/getallstories')
            setStories(response.data)
            console.log(stories)
        }
        axiosStories()
    }, [])
    return (
        <ScrollView>
        <FlatList
        {...console.log(stories)}
            data={stories}
            renderItem={({ item }) => {
                return renderData(item)
            }}
            keyExtractor={item => `${item.id}`}


        />
        </ScrollView>
    );
}
export default StoriesOption;