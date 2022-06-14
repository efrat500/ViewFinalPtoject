import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react'
import { List } from 'react-native-paper';
import axios from "axios"
import { useNavigation, useRoute } from '@react-navigation/native'

const LevelStoryListen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [stories , setStories]=useState([])
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.get('http://192.168.1.21:5000/getallstories')
            setStories(response.data)
            console.log(stories)
        }
        axiosStories()
    }, [])
    const onReadStory = (item) =>{
        navigation.navigate('Listen Story', {name:route.params.name, title_Story: item.title})
        console.log(item.title)
    }
    return (<ScrollView>
        <List.Section title="">
            <List.Accordion
                title="First Level">
                {stories.map((item)=>{
                    return(
                        <List.Item onPress={() => onReadStory(item)} title={item.title} />);
                })}
            </List.Accordion>
            <List.Accordion
                title="Second Level">
                {stories.map((item)=>{
                    return(<TouchableOpacity  onPress={() => onReadStory(item)}><List.Item title={item.title} /></TouchableOpacity>);
                })}
            </List.Accordion>
            <List.Accordion
                title="Third Level">
                {stories.map((item)=>{
                    return(<TouchableOpacity onPress={() => onReadStory(item)}><List.Item title={item.title} /></TouchableOpacity>);
                })}
            </List.Accordion>
        </List.Section>
    </ScrollView >);
}


export default LevelStoryListen;