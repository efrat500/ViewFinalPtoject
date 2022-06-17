import React from 'react';
import Story from '../../assets/r1_n.png';
import Report from '../../assets/r_n.jpg';
import Words from '../../assets/w_n.png';
import Profiler from '../../assets/profile.jpg';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Appear from '../components/Appear';
import MyCard from '../components/Card/Card';
import { useNavigation, useRoute } from '@react-navigation/native'


const MenuScreen = ({}) => {
    const route = useRoute()
    const navigation = useNavigation()

    const onReport = () =>{
        console.log(route.params.name)
        navigation.navigate('Report',{name:route.params.name})
    }
    const onStories = () =>{
        navigation.navigate('Stories Menu', {name:route.params.name})
    }
    const onWords = () =>{
        navigation.navigate('Words Menu' , {name:route.params.name})
    }

    return (
        <ImageBackground source={require('../../assets/a5.jpg')} style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={onReport}>
                    <Card
                        style={styles.container}>
                        <Card.Content style={styles.container}>
                            <Title>Report</Title>
                        </Card.Content>
                        <Card.Cover source={Report}
                            style={styles.words} />
                        <Card.Actions
                            style={styles.container}>
                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={onStories}>
                    <Card
                        style={styles.container}>
                        <Card.Content>
                            <Title>Stories</Title>
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
                            <Title>Words</Title>
                        </Card.Content>
                        <Card.Cover source={Words}
                            style={styles.words} />
                        <Card.Actions>
                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
            </ScrollView >
        </ImageBackground>
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
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        padding: 0,
        paddingHorizontal: 80,
        borderRadius: 50,
        resizeMode: "contain",
        borderColor: '#DDE1DF',
        borderWidth: 5,
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


