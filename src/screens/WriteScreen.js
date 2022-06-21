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


const WriteScreen = () => {
    const route = useRoute()
    const [words , setWords]=useState([])
    const [textInput , onChangetext]=useState(' ')
    useEffect(() => {
        const axiosWords = async () => {
            const response = await axios.post('http://192.168.1.235:5000/getwordstranslating', {username: route.params.name})
            setWords(response.data.allwords)
            // console.log("my data") 
            console.log(response.data.allwords)
        }
        axiosWords()
    }, [])
    var check
    const onCheckPressed = (item, value) =>{
        var type_list = "words_list_translating"       
        axios.post('http://192.168.1.235:5000/comperTransletetWord', {word_english:item, translate:value, username: route.params.name, which_list: type_list})
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
                                <TextInput
                                style={styles.testInp}
                                mode="outlined"
                                label="Type the word in English"
                                placeholder="Type the word in English"
                                // right={<TextInput.Affix text="/80" style={styles.input1}/>}
                                onChangeText={onChangetext}
                                value = {textInput}
                                />
                              </View>
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
      </Container >
      </View>
    );
   
}

export default WriteScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
input1:{
  paddingButtom:60,
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
testInp:{
  maxHeight:50,
},
input: {
  padding:30,
},
button: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
}
});



