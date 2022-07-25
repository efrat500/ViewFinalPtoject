import React, { Component, useState,useEffect } from 'react';
import { Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Header, View, DeckSwiper, CardItem, Thumbnail, Text, Left, Body, Icon, Card } from 'native-base';
import MyCard from '../../components/Card/Card';
import InputText from '../../components/InputText'
import { Button } from 'react-native-paper';
import Appear from '../../components/Appear';
import { TextInput } from 'react-native-paper';
import axios from "axios"
import { useNavigation, useRoute } from '@react-navigation/native'


const ReadScreen = () => {
    const route = useRoute()
    const [words , setWords]=useState([])
    const [buttonRead, setButtonRead] = useState('Start Read');
    const [buttonColorRead, setButtonColorRead] = useState('gray');
    const [buttonTranslate, setButtonTranslate] = useState('Translate');
    const [buttonColorTranslate, setButtonColorTranslate] = useState('gray');
    useEffect(() => {
        const axiosWords = async () => {
            const response = await axios.post('http://192.168.1.233:5000/getwordsreading', {username: route.params.name})
            setWords(response.data.allwords)
            console.log("sss")
        }
        axiosWords()
    }, [])
    var read
    var list_type
    const onReadPressed = (item) =>{
        list_type = "words_list_reading"
        console.log("sss")
        console.log(route.params.name)
        axios.post('http://192.168.1.233:5000/speechWordToWriting', {speech_word: item, username: route.params.name, which_list: list_type})
        .then(resp => {
            console.log(resp.data.feedback)
            read = resp.data.feedback
            Alert.alert('Note',read,[{text: 'Understood'}])
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    var trans 
    const onTranslatePressed = (item) =>{
        axios.post('http://192.168.1.233:5000/translatWord', {word_required:item})
        .then(resp => {
            trans = resp.data.translated
            Alert.alert('Translate',trans,[{text: 'Understood'}])
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    return (
        <View style={styles.input}>
        <Container sytle={styles.dir}>
            {words.length == 0 ? null:
                <DeckSwiper
                style={styles.dir}
                dataSource={words}
                renderItem={item =>
                    <Card style={styles.dir}>
                    <CardItem>
                        <Left>
                            <Body >
                                <View>
                                    <Text style={styles.text}>{item.word}</Text>
                                </View>
                                    <Button style={styles.button} color='green' mode="contained" onPress={() => onReadPressed(item.word)}>
                                         Start Read
                                    </Button>
                                    <Button style={styles.button} color='pink' mode="contained" onPress={() => onTranslatePressed(item.word)}>
                                        Translate
                                    </Button>
                            </Body>
                        </Left>
                    </CardItem>
                    </Card>
                }
                />
                
            }
        </Container >
        </View>
    );
   
}

export default ReadScreen;
const styles = StyleSheet.create({
    dir:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        marginTop:20,
        padding:30,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding:30,
    },
    text: {
        flex: 1,
        marginTop: 20,
        paddingBottom:10,
        fontSize: 50,
        fontWeight: 'bold',
        color: '#aaa',
        textAlign: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
});





