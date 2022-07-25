import { DevSettings,ImageBackground,Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react'
import { List } from 'react-native-paper';
import axios from "axios"
import CustemButton from '../../components/CustemButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import { combine } from 'qs/lib/utils';

const LevelStoryRead = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [stories1 , setStories1]=useState([])
    const [stories2 , setStories2]=useState([])
    const [stories3 , setStories3]=useState([])
    const [stories4 , setStories4]=useState([])
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);

    useEffect(() => {
        const axiosStories1 = async () => {
            const response = await axios.post('http://192.168.1.233:5000/getallstories',{current_level: 'easy', username:route.params.name})
            setStories1(response.data)
        }
        axiosStories1()
    }, [])

    useEffect(() => {
        const axiosStories2 = async () => {
            const response = await axios.post('http://192.168.1.233:5000/getallstories',{current_level: 'medium',username:route.params.name})
            setStories2(response.data)
            console.log(stories2)
        }
        axiosStories2()
    }, [])
    useEffect(() => {
        const axiosStories3 = async () => {
            const response = await axios.post('http://192.168.1.233:5000/getallstories',{current_level: 'hard',username:route.params.name})
            setStories3(response.data)
            console.log(stories3)
        }
        axiosStories3()
    }, [])
    useEffect(() => {
        const axiosStories4 = async () => {
            const response = await axios.post('http://192.168.1.233:5000/getallstories',{current_level: 'advanced',username:route.params.name})
            setStories4(response.data)
            console.log(stories4)
        }
        axiosStories4()
    }, [])

    const onReadStory = (item) =>{
        navigation.navigate('Read Story', {name:route.params.name, title_Story: item.title})
        console.log(item.title)
    }

    const onPressFunction2 = () =>{
        console.log(route.params.name)
        axios.post('http://192.168.1.233:5000/checkpasslevel', {username:route.params.name})
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
        axios.post('http://192.168.1.233:5000/checkpasslevel', {username:route.params.name})
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

    const onPressFunction4 = () =>{
        console.log(route.params.name)
        axios.post('http://192.168.1.233:5000/checkpasslevel', {username:route.params.name})
        .then(resp => {
            console.log(resp.data.pass_level_advenc)
            if (resp.data.pass_level_advenc==1){
                console.log("pass=1")
                setExpanded4(!expanded4)
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

    const getStort = () => {
        axios.post('http://192.168.1.233:5000/getdatareport', {username:route.params.name})
        .then(resp => {
            if (resp.data.current_level == "advanced"){
                console.log("pppp")
                axios.post('http://192.168.1.233:5000/addstoryadvenc', {username:route.params.name})
                .then(resp => {
                    if (resp.error == "The story already exists, press again"){
                        Alert.alert('Note',resp.error,[{text: 'Understood'}])
                    }
                    console.log(resp.data.title)
                    console.log(resp.data.story)
                    stories4.pop()
                    stories4.push(resp.data)
                    setStories4(stories4)
                    Alert.alert('Note',"You add a new story for your advence list",[{text: 'Understood'}])
                })
            }
            else{
                Alert.alert('Note',"You must pass the previous level",[{text: 'Understood'}])
            }
        }) 
    }
    return ( <ImageBackground source={require('../../../assets/b1.jpg')} style={{width: '100%', height: '100%'}}> 
        <ScrollView>
        <List.Section title="">
            <View style={{ padding:10}}>
            <List.Accordion  style={{ borderWidth:0.7,borderRadius:3,backgroundColor : '#dcebf1'}}
                title="Easy">
                {stories1.map((item, index)=>{
                    return(
                        <List.Item key={index} onPress={() => onReadStory(item)} title={item.title} />);
                })}
            </List.Accordion>
            </View>
            <View style={{ padding:10}}>
            <List.Accordion style={{borderWidth:0.7,borderRadius:3,backgroundColor : '#dcebf1'}}
                title="Medium"
                expanded={expanded2}
                onPress={onPressFunction2}>
                {stories2.map((item, index)=>{
                    return(<List.Item key={index} onPress={() => onReadStory(item)} title={item.title} />);
                })}
            </List.Accordion>
            </View>
            <View style={{ padding:10}}>
            <List.Accordion style={{borderWidth:0.7,borderRadius:3, borderColor:'black',backgroundColor : '#dcebf1'}}
                title="Hard"
                expanded={expanded3}
                onPress={onPressFunction3}>
                {stories3.map((item, index)=>{
                    return(<List.Item key={index} onPress={() => onReadStory(item)} title={item.title} />);
                })}
            </List.Accordion>
            </View>
            <View style={{ padding:10}}>
            <List.Accordion style={{borderWidth:0.7,borderRadius:3, borderColor:'black',backgroundColor : '#dcebf1'}}
                title="Advanced"
                expanded={expanded4}
                onPress={onPressFunction4}>
                {stories4.map((item, index)=>{
                    return(<List.Item key={index} onPress={() => onReadStory(item)} title={item.title} />);
                })}
            </List.Accordion>
            </View>
        </List.Section>
        {expanded4 == true ? 
         <CustemButton 
            text='Surprise' 
            // check befor press signin all the data is valid
            onPress={getStort}
        />  : null}
    </ScrollView>
    </ImageBackground>
    
    );
}


export default LevelStoryRead;