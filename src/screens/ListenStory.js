import { View, Text, StyleSheet, Alert, FlatList, Pressable, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from "axios"
import CustemButton from '../components/CustemButton'
import { ScrollView } from 'react-native-virtualized-view';
import { Button } from 'react-native-paper';
import Appear from '../components/Appear';


const Story = () => {
    const [stories , setStories]=useState([])
    var isStop = 0
    useEffect(() => {
        const axiosStories = async () => {
            console.log("getStory")
            const response = await axios.post('http://192.168.1.21:5000/getstory', {title_story: "A RED BERRY"})
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
        axios.post('http://192.168.1.21:5000/listenStory', {title_story: "A RED BERRY", current_index: currentIndex})
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
    
    const onRepeatRead = () =>{
        onRepeatPress = 1
        setonRepeatPress(1)
        console.log("onStartFunc")
        setCurrentIndex(currentIndex-1)
        currentIndex = currentIndex-1
        axios.post('http://192.168.1.21:5000/listenStory', {title_story: "A RED BERRY", current_index: currentIndex})
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
            <Appear></Appear>
            <Text style={{fontSize:30, fontWeight: 'bold',alignItems: 'center',justifyContent: 'center',marginLeft: 105, marginTop: 40, color:'gray',}}>A RED BERRY</Text>
            {stories.length == 0 ? null:
                    <View style={{padding: 20}}>
                    <ScrollView>
                        <View style={{fontSize:20, borderWidth:  5,borderRadius: 20, flex: 1,height: 300,  borderColor:  'gray', padding: 10, marginTop: 20}}>
                            <ScrollView>
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
                    </ScrollView>
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
})

export default Story


// import { View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native'
// import React, {useState, useEffect} from 'react'
// import axios from "axios"
// import CustemButton from '../components/CustemButton'


// const Story = () => {
    
//     const [stories , setStories]=useState([])

//     useEffect(() => {
//         const axiosStories = async () => {
//             const response = await axios.post('http://192.168.1.21:5000/getstory', {title_story: "A RED BERRY"})
//             setStories(response.data.story)
//             console.log(stories)
           
//         }
//         axiosStories()
//     }, [])
//     var temp
//     var isStop
//     const onStartRead = (isStop) =>{
//         axios.post('http://192.168.1.21:5000/listenStory', {title_story: "A RED BERRY", current_index: currentIndex, is_stop:isStop})
//         .then(resp => {
//             temp = resp.data.Playback
//             console.log("befor" + currentIndex)
//             setCurrentIndex(currentIndex+1)
//             currentIndex = currentIndex+1
//             console.log("after" + currentIndex)
//             console.log(stories.length)
//             if (currentIndex == stories.length-1){
//                 setCurrentIndex(0)
//                 currentIndex = 0
//             } else if (isStop == 0) {
//                 onStartRead(isStop)
//                 console.log('check')
//             }
//         })
//         .catch(error => {
//             console.log(error)
//         })
//         .finally(() => console.log("done"))
//     }
//     const onStopRead = () =>{
//         setIsStop(1)
//         isStop = 1
//     }
    

//     var [isStop , setIsStop]=useState(0)
//     var [currentIndex , setCurrentIndex]=useState(0)
//     return (
//         <View>
//             <CustemButton 
//                 text="A RED BERRY"
//                 onPress={onStartRead}
//             />
//             {stories.length == 0 ? null:
//                 <>
//                     <Text style={{fontSize:20}}> {stories.slice(0, currentIndex)} </Text>
//                         <Text style={{color:"red", fontSize:20}}> {stories[currentIndex]}</Text>
//                         <Text style={{fontSize:20}}> {stories.slice(currentIndex+1, - 1)} </Text>

//                 </> 
//             }
            
//             <CustemButton 
//                 text="start reading"
//                 onPress={onStartRead()}
//             />
//             <CustemButton 
//                 text="stop reading"
//                 onPress={onStopRead()}
//             />
            
//         </View>
//     )
   
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 22
//     },
//     item: {
//         padding: 10,
//         fontSize: 18,
//         height: 44,
//     },
// })

// export default Story

