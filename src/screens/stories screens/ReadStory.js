import { Image,View, Text, StyleSheet, Alert, FlatList, Pressable, TouchableOpacity, ImageBackground} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustemButton from '../../components/CustemButton'
import { ScrollView } from 'react-native-virtualized-view';
import {Card, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native'
import logo from '../../../assets/men.png';
import API from '../../axiosAPI'


const Story = () => {
    const route = useRoute()
    const [stories , setStories]=useState([])
    var [counterWorng , setCounterWorng]=useState(0)
    const [buttonStart, setButtonStart] = useState('Start reading');
    const [buttonColorStart, setButtonColorStart] = useState('black');

    useEffect(() => {
        const axiosStories = async () => {
            const response = await API.post('getstory', {title_story: route.params.title_Story, username:route.params.name})
            setStories(response.data.story)
        }
        axiosStories()
    }, [])

    var temp
    const onStartRead = () =>{
        setButtonColorStart('black')
        setButtonStart("Continue reading")
        API.post('speechToText', {title_story: route.params.title_Story, current_index: currentIndex, username: route.params.name, counterWorng:counterWorng })
        .then(resp => {
            temp = resp.data.translated
            if (resp.data.translated == "good"){
                setCounterWorng(0)
                counterWorng = 0
                if (counterWorng == 1){
                    counterWorng = counterWorng - 1
                }
                setCounterWorng(0)
                setCurrentIndex(currentIndex+1)
                currentIndex = currentIndex+1
                if (currentIndex == stories.length){
                    var grade
                    API.post('calculateGrade', {title_story: route.params.title_Story , username: route.params.name })
                    .then(resp => {
                        console.log(resp.data.grade)
                        grade = resp.data.grade
                        Alert.alert('Congratulations',"You have finished reading the story, your score is  " +  grade ,[{text: 'Understood'}])
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
            if (resp.data.translated == "worng"){
                console.log("in worng")
                if (counterWorng==0) {
                    console.log("if: counter= " + counterWorng)
                    setCounterWorng(1)
                    console.log("if: counter= " + counterWorng)
                    Alert.alert('Wrongs', resp.data.list_worng + ".\n",[{text: 'Understood'}])
                    setButtonStart("Try again")
                    setButtonColorStart('red')
                }
                else {
                    console.log("else: counter= " + counterWorng)
                    Alert.alert('Learn this words:', resp.data.list_worng + ".\n",[{text: 'Understood'}])
                    setCounterWorng(0)
                    console.log("after counter= " + counterWorng)
                    console.log("befor" + currentIndex)
                    setCurrentIndex(currentIndex+1)
                    currentIndex = currentIndex+1
                    console.log("after" + currentIndex)
                    console.log(stories.length)
                    if (currentIndex == stories.length){
                        var grade
                        API.post('calculateGrade', {title_story: route.params.title_Story , username: route.params.name })
                        .then(resp => {
                            console.log(resp.data.grade)
                            grade = resp.data.grade
                            Alert.alert('Congratulations',"You have finished reading the story, your score is  " +  grade ,[{text: 'Understood'}])
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        .finally(() => console.log("done"))
                    }
                    setButtonStart("Continue reading")
                    setButtonColorStart('red')
                }
            }
        })
        .catch(error => {
            Alert.alert('Note',"Please repeat the sentence aloud and clearly",[{text: 'Understood'}])
            setButtonStart("Continue reading")
            setButtonColorStart('red')
            
        })
        .finally(() => console.log("done"))
        
    }

    var trans
    const onPressFunction = () =>{
        API.post('convertWriting', {word_required:stories[currentIndex]})
        .then(resp => {
            trans = resp.data.Playback
            console.log(trans)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }

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
                        <View style={{padding:20}}>
                            {currentIndex > 0 ? 
                                <Text  style={{fontSize:20, opacity:0.3}}> {stories.slice(0, currentIndex)} </Text> 
                                : null
                            }
                                <TouchableOpacity onPress={onPressFunction}>
                                    <Text style={{color:'black', fontSize:20}}> {stories[currentIndex]}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize:20, opacity:0.3}}> {stories.slice(currentIndex+1, stories.length)} </Text>
                                </View>
                        </ScrollView>
                        </Card>
            }
            <TouchableOpacity>
                <Button style={styles.button} color={buttonColorStart}  onPress={onStartRead}>
                    {buttonStart}
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
    text:{
        marginLeft:-10,
        fontSize:30, 
        fontWeight: 'bold',
        textAlign: 'center', 
        marginTop: 50, 
        color:'black',
    },
    view:{
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
})

export default Story

