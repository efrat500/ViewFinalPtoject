import { Image,View, Text, StyleSheet, Alert, FlatList, Pressable, TouchableOpacity, ImageBackground} from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from "axios"
import CustemButton from '../../components/CustemButton'
import { ScrollView } from 'react-native-virtualized-view';
import { Card,Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import logo from '../../../assets/men.png';
import API from '../../axiosAPI'


const Story = () => {
    const route = useRoute()
    const [stories , setStories]=useState([])
    var isStop = 0
    useEffect(() => {
        const axiosStories = async () => {
            const response = await API.post('getstory', {title_story: route.params.title_Story, username: route.params.name})
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
        API.post('listenStory', {title_story: route.params.title_Story, current_index: currentIndex, username: route.params.name })
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
        API.post('listenStory', {title_story: route.params.title_Story, current_index: currentIndex, username:route.params.name})
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
                console.log('check')
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done")) 
    }
    var trans
    const onPressFunction = () =>{
        API.post('translatWord', {word_required:stories[currentIndex]})
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
    var [onRepeatPress , setonRepeatPress]=useState(0)
    var [currentIndex , setCurrentIndex]=useState(0)
    return (
        <ImageBackground source={require('../../../assets/background.jpg')} style={{width: '100%', height: '100%'}}> 
            <View style={styles.view}>
            <View style={{flexDirection: 'row'}}>
            <Image style={styles.logo} source={logo}></Image>
            <Text style={{left: -20,flex: 1,marginLeft:-10,fontSize:30, fontWeight: 'bold',textAlign: 'center', marginTop: 50, color:'black',}}> {route.params.title_Story}</Text>
            </View>    
                {stories.length == 0 ? null:
                    <Card style={{marginTop:-30,height:350, elavation: 3, backgroundColor : 'transparent',borderRadius: 7,borderWidth:  3,  borderColor:  'black'}}>
                    <ScrollView>
                    <View style={styles.view1}>
                        {currentIndex > 0 ? 
                            <Text  style={styles.textOpacity}> {stories.slice(0, currentIndex)} </Text> 
                            : null
                        }
                            <TouchableOpacity onPress={onPressFunction}>
                                <Text style={styles.textStory}> {stories[currentIndex]}</Text>
                            </TouchableOpacity>
                            <Text style={styles.textOpacity}> {stories.slice(currentIndex+1, stories.length)} </Text>
                            </View>
                    </ScrollView>
                    </Card>
                        
                }
            <TouchableOpacity>
                <Button style={styles.button} color='black'  onPress={onStartRead}>
                next
                </Button>
            </TouchableOpacity>    
            <TouchableOpacity>
                <Button style={styles.button} color='black'  onPress={onRepeatRead}>
                previous
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
        flex: 1,
    },
    view1:{
        padding:20,
        flex: 1,
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
        marginTop: 25,
        marginLeft:75,
        height: 40,
        borderWidth:  2,  
        borderColor:  'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        marginLeft:-10,
        fontSize:30, 
        fontWeight: 'bold',
        textAlign: 'center', 
        marginTop: 50, 
        color:'black',
    },
    card:{
        marginTop:-60,
        height:300, 
        elavation: 3, 
        backgroundColor : 'transparent', 
        borderRadius: 7,
        borderWidth:  3,  
        borderColor:  'black'
    },
    textOpacity:{
        fontSize:20, 
        opacity:0.3,
    },
    textStory:{
        color:'black', 
        fontSize:20,
    },
})

export default Story


