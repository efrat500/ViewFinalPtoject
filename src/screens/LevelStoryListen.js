import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react'
import { List } from 'react-native-paper';
import axios from "axios"
import { useNavigation, useRoute } from '@react-navigation/native'

const LevelStoryListen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [stories1 , setStories1]=useState([])
    const [stories2 , setStories2]=useState([])
    const [stories3 , setStories3]=useState([])
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);

    useEffect(() => {
        const axiosStories1 = async () => {
            const response = await axios.post('http://192.168.1.235:5000/getallstories',{current_level: 'easy'})
            setStories1(response.data)
        }
        axiosStories1()
    }, [])

    useEffect(() => {
        const axiosStories2 = async () => {
            const response = await axios.post('http://192.168.1.235:5000/getallstories',{current_level: 'medium'})
            setStories2(response.data)
            console.log(stories2)
        }
        axiosStories2()
    }, [])
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.post('http://192.168.1.235:5000/getallstories',{current_level: 'hard'})
            setStories3(response.data)
            console.log(stories3)
        }
        axiosStories()
    }, [])

    const onReadStory = (item) =>{
        navigation.navigate('Listen Story', {name:route.params.name, title_Story: item.title})
        console.log(item.title)
    }

    const onPressFunction2 = () =>{
        console.log(route.params.name)
        axios.post('http://192.168.1.21:5000/checkpasslevel', {username:route.params.name})
        .then(resp => {
            console.log(resp.data.pass_level_medium)
            if (resp.data.pass_level_medium==1){
                console.log("pass=1")
                setExpanded2(!expanded2)
            }
            else{
                Alert.alert('Note',"You must pass the previous level",[{text: 'Understood'}])
            }
            
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }

    const onPressFunction3 = () =>{
        console.log(route.params.name)
        axios.post('http://192.168.1.21:5000/checkpasslevel', {username:route.params.name})
        .then(resp => {
            console.log(resp.data.pass_level_hard)
            if (resp.data.pass_level_hard==1){
                console.log("pass=1")
                setExpanded3(!expanded3)
            }
            else{
                Alert.alert('Note',"You must pass the previous level",[{text: 'Understood'}])
            }
            
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }

    return (<ScrollView>
        <List.Section title="">
            <List.Accordion
                title="First Level">
                {stories1.map((item)=>{
                    return(
                        <List.Item key="{item}" onPress={() => onReadStory(item)} title={item.title} />);
                })}
            </List.Accordion>
            <List.Accordion
                title="Second Level"
                expanded={expanded2}
                onPress={onPressFunction2}>
                {stories2.map((item)=>{
                    return(<TouchableOpacity  onPress={() => onReadStory(item)}><List.Item  key="{item1}" title={item.title} /></TouchableOpacity>);
                })}
            </List.Accordion>
            <List.Accordion
                title="Third Level"
                expanded={expanded3}
                onPress={onPressFunction3}>
                {stories3.map((item)=>{
                    return(<TouchableOpacity onPress={() => onReadStory(item)}><List.Item key="{item2}" title={item.title} /></TouchableOpacity>);
                })}
            </List.Accordion>
        </List.Section>
    </ScrollView >);
}

export default LevelStoryListen;