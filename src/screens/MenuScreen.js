import React from 'react';
import Story from '../../assets/books.png';
import Report from '../../assets/repo.png';
import Words from '../../assets/words.jpg';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground,Alert } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import MyCard from '../components/Card/Card';
import { useNavigation, useRoute } from '@react-navigation/native'
import API from '../axiosAPI'


const MenuScreen = ({}) => {
    const route = useRoute()
    const navigation = useNavigation()

    const onReport = () =>{
        console.log(route.params.name)
        API.post('datareport', {username: route.params.name})
        .then(resp => {
            if (resp.data.num_stories < 1){
                Alert.alert('Note','Read at least 1 story to get a report on your progress',[{text: 'Understood'}])
            }
            else{
                navigation.navigate('Report',{name:route.params.name})
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    const onStories = () =>{
        navigation.navigate('Stories Menu', {name:route.params.name})
    }
    const onWords = () =>{
        navigation.navigate('Words Menu' , {name:route.params.name})
    }

    return (
        <ScrollView>
            
            <TouchableOpacity onPress={onStories}>
                <Card
                    style={styles.container}>
                    <Card.Content>
                        <Title style= {styles.profiler}>Stories</Title>
                    </Card.Content>
                    <Card.Cover source={Story}
                        style={styles.words} />
                    <Card.Actions>
                    </Card.Actions>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={onWords}>
                <Card
                    style={styles.container}>
                    <Card.Content>
                        <Title style= {styles.profiler}>Words</Title>
                    </Card.Content>
                    <Card.Cover source={Words}
                        style={styles.words} />
                    <Card.Actions>
                    </Card.Actions>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={onReport}>
                <Card
                    style={styles.container}>
                    <Card.Content style={styles.container}>
                        <Title style= {styles.profiler}>Report</Title>
                    </Card.Content>
                    <Card.Cover source={Report}
                        style={styles.words} />
                    <Card.Actions
                        style={styles.container}>
                    </Card.Actions>
                </Card>
            </TouchableOpacity>
        </ScrollView >
    );
}
export default MenuScreen;


const styles = StyleSheet.create({
    container: {
        backgroundColor: `white`,
    },
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
        color: 'black',
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


