import { View, Text, StyleSheet, Alert, FlatList, Pressable, TouchableOpacity} from 'react-native'
import { Appbar, Card } from 'react-native-paper';
import React, {useState, useEffect} from 'react'
import axios from "axios"
import CustemButton from '../components/CustemButton'



const Story = () => {
    const [stories , setStories]=useState([])

    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.post('http://192.168.1.234:5000/getstory', {title_story: "A RED BERRY"})
            setStories(response.data.story)
            console.log(stories)
           
        }
        axiosStories()
    }, [])
 
    var temp
    const onStartRead = () =>{
        axios.post('http://192.168.1.234:5000/speechToWriting', {title_story: "A RED BERRY", current_index: currentIndex })
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
                    Alert.alert('Congratulations',"You have finished reading the story, your score is 100",[{text: 'Understood'}])
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

    const onPressFunction = () =>{
        axios.post('http://192.168.1.234:5000/translatWord', {word_required:stories[currentIndex]})
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
            <CustemButton 
                text="A RED BERRY"
                onPress={onStartRead}
            />
            {stories.length == 0 ? null:
                <>
                    <Text style={{fontSize:20}}> {stories.slice(0, currentIndex)} </Text>
                        <TouchableOpacity onPress={onPressFunction}>
                        <Text style={{color:"red", fontSize:20}}> {stories[currentIndex]}</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:20}}> {stories.slice(currentIndex+1, - 1)} </Text>
                    {/* </Text> */}

                </>

                
               
            }
                
     
            <CustemButton 
                text="start reading"
                onPress={onStartRead}
            />
            
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
})

export default Story

