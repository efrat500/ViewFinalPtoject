import React, { Component, useState,useEffect } from 'react';
import { Image, StyleSheet, Dimensions, Pressable, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { Container, Header, View, DeckSwiper, CardItem, Thumbnail, Text, Left, Body, Icon, Card } from 'native-base';
import MyCard from '../components/Card/Card';
import InputText from '../components/InputText'
import { Button } from 'react-native-paper';
import Appear from '../components/Appear';
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'
import axios from "axios"

const cards = [
  {
    word: '',
  },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TranslateScreen = () => {
    const [words , setWords]=useState([])
    const [buttonTranslate, setButtonTranslate] = useState('Translate');
    const [buttonColorTranslate, setButtonColorTranslate] = useState('gray');
    useEffect(() => {
        const axiosWords = async () => {
            const response = await axios.post('http://192.168.1.234:5000/getwords', {username:"e"})
            setWords(response.data.allwords)
        }
        axiosWords()
    }, [])
    var trans 
    const onTranslatePressed = (item) =>{
        axios.post('http://192.168.1.234:5000/translatWord', {word_required:item})
        .then(resp => {
            trans = resp.data.translated
            Alert.alert('Translate',trans,[{text: 'Understood'}])
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    const onSoundPressed = (item) =>{
        axios.post('http://192.168.1.234:5000/convertWriting', {word_required:item})
        .then(resp => {
            console.log(resp.data)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    return (
        <Container sytle={styles.view}>
        <Appear></Appear>
        <Header />
        <View sytle={styles.view}>
            {words.length == 0 ? null:
                <DeckSwiper
                dataSource={words}
                renderItem={item =>
                    <Card sytle={styles.view}>
                    <CardItem>
                        <Left>
                            <Body>
                                {/* <View sytle={styles.container}> */}
                                <Text style={styles.text}>{item.word}</Text>
                                    {/* <TouchableHighlight onPress={() => console.log(item.word)}>
                                        <AntDesign style={styles.sound} name="sound" size={50} />
                                    </TouchableHighlight> */}
                                {/* </View> */}
                                <View sytle={styles.container}>
                                    <Button style={styles.button} color='blue' mode="contained" onPress={() => onSoundPressed(item.word)}>
                                        Heard word
                                        <AntDesign style={styles.sound} name="sound" size={30} />
                                    </Button>
                                   
                                </View>
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

export default TranslateScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
        marginTop: 30,
        marginLeft: 15,
        height: 50,
    },
    sound: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#aaa',
    }
});