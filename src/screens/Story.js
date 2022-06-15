import { View, Text, StyleSheet, Alert, FlatList, Pressable, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from "axios"
import CustemButton from '../components/CustemButton'
import { ScrollView } from 'react-native-virtualized-view';
import { Button } from 'react-native-paper';
import Appear from '../components/Appear';
import { useNavigation, useRoute } from '@react-navigation/native'


const Story = () => {
    const route = useRoute()
    const [stories , setStories]=useState([])

    useEffect(() => {
        const axiosStories = async () => {
            console.log("getStory")
            const response = await axios.post('http://192.168.1.235:5000/getstory', {title_story: route.params.title_Story})
            setStories(response.data.story)
            console.log(stories)
           
        }
        axiosStories()
    }, [])

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
        axios.post('http://192.168.1.235:5000/translatWord', {word_required:stories[currentIndex]})
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
        <View>
            <Text style={{fontSize:30, fontWeight: 'bold',alignItems: 'center',justifyContent: 'center',marginLeft: 105, marginTop: 40, color:'gray',}}>A RED BERRY</Text>
            {stories.length == 0 ? null:
                    <View style={{padding: 20}}>
                    <View style={{fontSize:20, borderWidth:  5,  borderColor:  'gray', padding: 10, marginTop: 20}}>
                        <ScrollView>
                            {currentIndex > 0 ? 
                                <Text style={{fontSize:20}}> {stories.slice(0, currentIndex)} </Text> 
                                : null
                            }
                                <TouchableOpacity onPress={onPressFunction}>
                                    <Text style={{color:"red", fontSize:20}}> {stories[currentIndex]}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:20}}> {stories.slice(currentIndex+1, - 1)} </Text>
                            {/* </Text> */}
                        </ScrollView>
                    </View>
                    </View>

                
               
            }
            <TouchableOpacity>
                <Button style={styles.button} color='white' mode="contained" onPress={onStartRead}>
                    Start Reading
                </Button>
            </TouchableOpacity>    
            {/* <CustemButton 
                style={styles.button}
                text="start reading"
                onPress={onStartRead}
            /> */}
            
        </View>
    )
   
}
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     fontSize: 20
    // },
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
        width: 300,
        marginTop: 10,
        marginLeft: 50,
        height: 40,
        borderWidth:  1,  
        borderColor:  'gray'
    },
})

export default Story

