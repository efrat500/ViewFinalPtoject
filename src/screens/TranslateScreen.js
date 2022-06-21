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
import { useNavigation, useRoute } from '@react-navigation/native'
import { IconButton,MD3Colors  } from 'react-native-paper';

const cards = [
  {
    word: '',
  },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TranslateScreen = () => {
    const route = useRoute()
    const [words , setWords]=useState([])
    const [buttonTranslate, setButtonTranslate] = useState('Translate');
    const [buttonColorTranslate, setButtonColorTranslate] = useState('gray');
    useEffect(() => {
        const axiosWords = async () => {
            const response = await axios.post('http://192.168.1.233:5000/getwordsgeneral', {username: route.params.name})
            setWords(response.data.allwords)
        }
        axiosWords()
    }, [])
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
    const onSoundPressed = (item) =>{
        axios.post('http://192.168.1.233:5000/convertWriting', {word_required:item.word})
        .then(resp => {
            console.log(resp.data)
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
                                <View >
                                    <Text style={styles.text}>{item.word}</Text>
                                        <IconButton
                                        style={styles.container}
                                            icon="volume-high"
                                            size={40}
                                            onPress={() => onSoundPressed(item)}
                                        />  
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
        </Container >
        </View>
    );
   
}

export default TranslateScreen;

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        marginLeft: 84,
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
    dir:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        padding:30,
        marginTop:20,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding:30,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    sound: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#aaa',
    }
});