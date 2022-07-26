import React from 'react';
import Write from '../../assets/wordTran.png';
import Hear from '../../assets/hearing.jpg';
import Read from '../../assets/reading.jpg';
import Dict from '../../assets/dict.png';
import { StyleSheet, TouchableOpacity, ScrollView,Alert } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useNavigation, useRoute} from '@react-navigation/native'
import axios from "axios"
import API from '../axiosAPI'


const WordsScreen = () => {
    const route = useRoute()
    console.log(route.params.name)
    const navigation = useNavigation()
    
    const onWriting = () =>{
        API.post('datareport', {username: route.params.name})
        .then(resp => {
            if (resp.data.size_list_translating < 1){
                Alert.alert('Note','You dont have words to practice',[{text: 'Understood'}])
            }
            else{
                navigation.navigate('Translate Words', {name: route.params.name})
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }

    const onHearing = () =>{
        API.post('datareport', {username: route.params.name})
        .then(resp => {
            if (resp.data.size_list_general < 1){
                Alert.alert('Note','You dont have words to practice',[{text: 'Understood'}])
            }
            else{
                navigation.navigate('Listening Words', {name: route.params.name})
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }

    const onReading = () =>{
        API.post('datareport', {username: route.params.name})
        .then(resp => {
            if (resp.data.size_list_reading < 1){
                Alert.alert('Note','You dont have words to practice',[{text: 'Understood'}])
            }
            else{
                navigation.navigate('Reading Words', {name: route.params.name})
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    const onDictionary = () =>{
        navigation.navigate('Dictionary Screen', {name: route.params.name})
    }
    return (<ScrollView>
        <TouchableOpacity onPress={onWriting}>
            <Card
                style={styles.container}>
                <Card.Content style={styles.container}>
                    <Title>Translating</Title>
                </Card.Content>
                <Card.Cover source={Write}
                    style={styles.words} />
                <Card.Actions
                    style={styles.container}>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={onHearing}>
            <Card style={styles.container}>
                <Card.Content style={styles.container}>
                    <Title>Listening</Title>
                </Card.Content >
                <Card.Cover source={Hear}
                    style={styles.words} />
                <Card.Actions style={styles.container}>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={onReading}>
            <Card style={styles.container}>
                <Card.Content style={styles.container}>
                    <Title>Reading</Title>
                </Card.Content>
                <Card.Cover source={Read}
                    style={styles.words} />
                <Card.Actions style={styles.container}>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDictionary}>
            <Card style={styles.container}>
                <Card.Content style={styles.container}>
                    <Title>Dictionary</Title>
                </Card.Content>
                <Card.Cover source={Dict}
                   style={styles.words} />
                <Card.Actions style={styles.container}>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
    </ScrollView >);
}


const styles = StyleSheet.create({
    story: {
        width: '100%',
        maxWidth: 200,
        maxHeight: 180,
        paddingHorizontal: 70,
        borderColor: 'black',
        borderWidth: 5,
        top: 100
    },
    report: {
        width: '100%',
        maxWidth: 200,
        maxHeight: 180,
        paddingHorizontal: 70,
        borderColor: 'black',
        borderWidth: 5,
        top: 100
    },
    words: {
        backgroundColor: '#aed5ee',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        padding: 0,
        paddingHorizontal: 80,
        borderRadius: 50,
        resizeMode: "contain",
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    profiler: {
        width: '100%',
        maxWidth: 200,
        maxHeight: 180,
        paddingHorizontal: 50,
        borderColor: 'black',
        borderWidth: 5
    },
    text: {
        alignItems: 'center',
        marginTop: 45,
        padding: 50,
        fontWeight: 'bold',
        fontSize: 30,
        flex: 1,
    },
    text2: {
        alignItems: 'center',
        left: 50,
        fontWeight: 'bold',
        fontSize: 30,
        flex: 1,
    },
    text3: {
        justifyContent: 'center',
        alignItems: 'center',
        left: 20,
        fontWeight: 'bold',
        fontSize: 50,
        top: 10
    },
})

export default WordsScreen;
