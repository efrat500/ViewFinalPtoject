import React, { Component, useState,useEffect } from 'react';
import { Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Header, View, DeckSwiper, CardItem, Thumbnail, Text, Left, Body, Icon, Card } from 'native-base';
import MyCard from '../components/Card/Card';
import InputText from '../components/InputText'
import { Button } from 'react-native-paper';
import Appear from '../components/Appear';
import { TextInput } from 'react-native-paper';
import axios from "axios"


const WriteScreen = () => {
    const [words , setWords]=useState([])
    const [textInput , onChangetext]=useState(' ')
    useEffect(() => {
        const axiosWords = async () => {
            const response = await axios.post('http://192.168.1.235:5000/getwordstranslating', {username:"e44"})
            setWords(response.data.allwords)
            // console.log("my data") 
            console.log(response.data.allwords)
        }
        axiosWords()
    }, [])
    var check
    const onCheckPressed = (item, value) =>{
        axios.post('http://192.168.1.21:5000/comperTransletetWord', {word_english:item, translate:value})
        .then(resp => {
            check = resp.data.feedback
            console.log(resp.data.feedback)
            anotherFunc()
            Alert.alert('check',check,[{text: 'Understood'}])

        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    const anotherFunc = () =>{
      onChangetext('');
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
                              <TextInput
                              style={styles.input}
                              mode="outlined"
                              label="Type the word in English"
                              placeholder="Type the word in English"
                              right={<TextInput.Affix text="/80" />}
                              onChangeText={onChangetext}
                              value = {textInput}
                              />
                              <Button style={styles.button} color='pink' mode="contained" onPress={() => {onCheckPressed(item.word, textInput)}}>
                              Check
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

export default WriteScreen;

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
    flex: 1,
    marginTop: 30,
  },
  button: {
    flex: 1,
    width: 200,
    marginTop: 60,
    marginLeft: 70,
    height: 40,
    alignItems: 'center',
  }
});



