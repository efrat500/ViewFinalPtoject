import React, { Component, useState,useEffect } from 'react';
import { Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Header, View, DeckSwiper, CardItem, Thumbnail, Text, Left, Body, Icon, Card } from 'native-base';
import MyCard from '../components/Card/Card';
import InputText from '../components/InputText'
import { Button } from 'react-native-paper';
import Appear from '../components/Appear';
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
            const response = await axios.post('http://192.168.1.21:5000/getwordsreading', {username: route.params.name})
            setWords(response.data.allwords)
        }
        axiosWords()
    }, [])
    var read
    const onReadPressed = (item) =>{
        axios.post('http://192.168.1.21:5000/speechWordToWriting', {speech_word: item})
        .then(resp => {
            console.log(resp.data.feedback)
            read = resp.data.feedback
            Alert.alert('Translate',read,[{text: 'Understood'}])
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    var trans 
    const onTranslatePressed = (item) =>{
        axios.post('http://192.168.1.21:5000/translatWord', {word_required:item})
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
        <Container sytle={styles.view}>
        <Header />
        <View sytle={styles.view}>
            {words.length == 0 ? null:
                <DeckSwiper
                dataSource={words}
                renderItem={item =>
                    <Card sytle={styles.view}>
                    <CardItem>
                        <Left>
                        <Body sytle={styles.view}>
                            <Text style={styles.text}>{item.word}</Text>
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
        </View>
        </Container >
    );
   
}

export default ReadScreen;
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        marginTop: 50,
        marginLeft: 100,
        fontSize: 70,
        fontWeight: 'bold',
        color: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginTop: 30,
    },
    button: {
        width: 300,
        marginTop: 60,
        marginLeft: 10,
        height: 40,
    }
});





