import React, {useState,useEffect} from 'react'
import { FlatList, Text, View, ScrollView } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import Appear from '../components/Appear';
import axios from "axios";
import { useNavigation } from '@react-navigation/native'


const StoriesOption = () => {
    const navigation = useNavigation()

    const onReport = () =>{
        navigation.navigate('Report')
    }
    const [stories , setStories]=useState([])
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.post('http://192.168.1.21:5000/getallstories')
            setStories(response.data)
            console.log(stories)
        }
        axiosStories()
    }, [])
    return (
        <View>
            <Appear></Appear>
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    return (<Card style={{ padding: 10, margin: 10, backgroundColor: "#85E3DE" }}>
                        <Text style={{ fontSize: 20 }}>{item.title}</Text>
                    </Card>);
                }}
                keyExtractor={item => item.title.toString()}
            />

        </View>
    );
}
export default StoriesOption;