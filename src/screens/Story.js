import { Image,View, Text, StyleSheet, Alert, FlatList, Pressable, TouchableOpacity, ImageBackground} from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from "axios"
import CustemButton from '../components/CustemButton'
import { ScrollView } from 'react-native-virtualized-view';
import { Button } from 'react-native-paper';
import Appear from '../components/Appear';
import { useNavigation, useRoute } from '@react-navigation/native'
import logo from '../../assets/men.png';


const Story = () => {
    const route = useRoute()
    const [stories , setStories]=useState([])

    useEffect(() => {
        const axiosStories = async () => {
            console.log("getStory")
            const response = await axios.post('http://192.168.1.21:5000/getstory', {title_story: route.params.title_Story})
            setStories(response.data.story)
            console.log(stories)
           
        }
        axiosStories()
    }, [])

    var temp
    const onStartRead = () =>{
        console.log("onStartFunc")
        axios.post('http://192.168.1.235:5000/speechToWriting', {title_story: route.params.title_Story, current_index: currentIndex, username: route.params.name })
        .then(resp => {
            console.log(resp.data)
            temp = resp.data.translated
            if (resp.data.translated == "good"){
                console.log("befor" + currentIndex)
                setCurrentIndex(currentIndex+1)
                currentIndex = currentIndex+1
                console.log("after" + currentIndex)
                console.log(stories.length)
                if (currentIndex == stories.length-1){
                    var grade
                    axios.post('http://192.168.1.235:5000/calculateGrade', {title_story: route.params.title_Story , username: route.params.name })
                    .then(resp => {
                        console.log(resp.data.grade)
                        grade = resp.data.grade
                        Alert.alert('Congratulations',"You have finished reading the story, your score is" +  grade ,[{text: 'Understood'}])
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => console.log("done"))
                }
                else{
                    onStartRead()
                    console.log('check')
                }
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
        
    }

    var trans
    const onPressFunction = () =>{
        axios.post('http://192.168.1.235:5000:5000/translatWord', {word_required:stories[currentIndex]})
        .then(resp => {
            trans = resp.data.translated
            console.log(trans)
            Alert.alert('Translate',trans,[{text: 'Understood'}])
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }

    var [currentIndex , setCurrentIndex]=useState(0)
    return (
        <ImageBackground source={require('../../assets/b1.jpg')} style={{width: '100%', height: '100%'}}> 
            
            <View style={styles.view}>
            <View style={{flexDirection: 'row'}}>
            <Image style={styles.logo} source={logo}></Image>
            <Text style={{marginLeft:-10,fontSize:30, fontWeight: 'bold',textAlign: 'center', marginTop: 50, color:'black',}}> {route.params.title_Story}</Text>
            </View>
            {stories.length == 0 ? null:
                    <View  scrollEnabled={true} style={{padding: 20}}>
                    <View scrollEnabled={true} style={{fontSize:20, borderWidth:  5,  borderColor:  'black', padding: 10, marginTop: -50, borderRadius: 10}}>
                        <ScrollView>
                            {currentIndex > 0 ? 
                                <Text  style={{fontSize:20}}> {stories.slice(0, currentIndex)} </Text> 
                                : null
                            }
                                <TouchableOpacity onPress={onPressFunction}>
                                    <Text style={{color:"red", fontSize:20}}> {stories[currentIndex]}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:20}}> {stories.slice(currentIndex+1, - 1)} </Text>
                        </ScrollView>
                    </View>
                    </View>    
            }
            <TouchableOpacity>
                <Button style={styles.button} color='black' onPress={onStartRead}>
                    Start Reading
                </Button>
            </TouchableOpacity>    
            </View>
        </ImageBackground>
    )
   
}
const styles = StyleSheet.create({
    logo:{
        height: 200,
        width: 100,
        marginTop: -20,
    },
    view:{
        padding:20,
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    button: {
        width: 200,
        marginTop: 10,
        marginLeft:75,
        height: 40,
        borderWidth:  2,  
        borderColor:  'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Story

