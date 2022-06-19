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
    var isStop = 0
    useEffect(() => {
        const axiosStories = async () => {
            console.log("getStory")
            const response = await axios.post('http://192.168.1.21:5000/getstory', {title_story: route.params.title_Story})
            setStories(response.data.story)
            console.log(stories)
           
        }
        axiosStories()
    }, [])
 
    const onStartRead = () =>{
        if (onRepeatPress == 1){
            setCurrentIndex(currentIndex+1)
            currentIndex = currentIndex+1
            onRepeatPress = 0
            setonRepeatPress(0)
        }
        console.log("onStartFunc")
        axios.post('http://192.168.1.21:5000/listenStory', {title_story: route.params.title_Story, current_index: currentIndex})
        .then(resp => {
            console.log(resp.data)
            console.log("befor" + currentIndex)
            setCurrentIndex(currentIndex+1)
            currentIndex = currentIndex+1
            console.log("after" + currentIndex)
            console.log(stories.length)
            if (currentIndex == stories.length-1){
                setCurrentIndex(0)
                currentIndex = 0
            }
            else{
                //onStartRead()
                console.log('check')
            }

        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
        
    }
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };
    const onRepeatRead = () =>{
        onRepeatPress = 1
        setonRepeatPress(1)
        console.log("onStartFunc")
        setCurrentIndex(currentIndex-1)
        currentIndex = currentIndex-1
        axios.post('http://192.168.1.21:5000/listenStory', {title_story: route.params.title_Story, current_index: currentIndex})
        .then(resp => {
            console.log(resp.data)
            console.log("befor" + currentIndex)
            console.log("after" + currentIndex)
            console.log(stories.length)
            if (currentIndex == stories.length-1){
                setCurrentIndex(0)
                currentIndex = 0
            }
            else{
                //onStartRead()
                console.log('check')
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done")) 
    }

    var [onRepeatPress , setonRepeatPress]=useState(0)
    var [currentIndex , setCurrentIndex]=useState(0)
    return (
        <View>
            <Text style={{fontSize:30, fontWeight: 'bold',alignItems: 'center',justifyContent: 'center',marginLeft: 105, marginTop: 40, color:'gray',}}>A RED BERRY</Text>
            {stories.length == 0 ? null:
                    <View style={{padding: 20}}>
                        
                        <View scrollEnable={true} style={{fontSize:20, borderWidth:  5,borderRadius: 20,overflow : "hidden", flex: 1,height: 300,  borderColor:  'gray', padding: 10, marginTop: 20}}>
                        <ScrollView   onScroll={({nativeEvent}) => {
                            if (isCloseToBottom(nativeEvent)) {
                                enableSomeButton();
                            }
                            }}
                            scrollEventThrottle={400}
                            contentContainerStyle={styles.scrollView}> 
                                {currentIndex > 0 ? 
                                    <Text style={{fontSize:20}}> {stories.slice(0, currentIndex)} </Text> 
                                    : null
                                }
                                    <TouchableOpacity>
                                        <Text style={{color:"red", fontSize:20}}> {stories[currentIndex]}</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize:20}}> {stories.slice(currentIndex+1, - 1)} </Text>
                                    </ScrollView>  
                        </View>
                        
                    </View>

                
               
            }
            <TouchableOpacity>
                <Button style={styles.button} color='white' mode="contained" onPress={onStartRead}>
                next sentence
                </Button>
            </TouchableOpacity>    
            <TouchableOpacity>
                <Button style={styles.button} color='white' mode="contained" onPress={onRepeatRead}>
                previous sentence
                </Button>
            </TouchableOpacity>   
            
        </View>
    )
   
}
const styles = StyleSheet.create({
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
    scrollView:{
        height: 40,   
    },
})

export default Story


