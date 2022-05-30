import React from 'react';
import Story from '../../assets/story.jpg';
import Report from '../../assets/report.png';
import Words from '../../assets/words.jpg';
import Profiler from '../../assets/profile.jpg';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Appear from '../components/Appear';
import MyCard from '../components/Card/Card';

const MenuScreen = () => {
    return (<ScrollView>
        <Appear />
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
        <Card>
            <Card.Content>
                <Title>Story</Title>
            </Card.Content>
            <Card.Cover source={Story}
                style={styles.words} />
            <Card.Actions>
            </Card.Actions>
        </Card>
        <Card>
            <Card.Content>
                <Title>Profile</Title>
            </Card.Content>
            <Card.Cover source={Profiler}
                style={styles.words} />
            <Card.Actions>
            </Card.Actions>
        </Card>
        <Card>
            <Card.Content>
                <Title>Words</Title>
            </Card.Content>
            <Card.Cover source={Words}
                style={styles.words} />
            <Card.Actions>
            </Card.Actions>
        </Card>
    </ScrollView >);
}
export default MenuScreen;


const styles = StyleSheet.create({
    container: {
        color: 'white',
    },
    story: {
        width: '100%',
        maxWidth: 200,
        maxHeight: 180,
        paddingHorizontal: 80,
        borderColor: 'black',
        borderWidth: 5,
        top: 100
    },
    report: {
        width: '100%',
        maxWidth: 200,
        maxHeight: 180,
        paddingHorizontal: 80,
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
        paddingHorizontal: 80,
        borderColor: 'black',
        borderWidth: 5
    },
    text: {
        alignItems: 'center',
        marginTop: 50,
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
        alignItems: 'center',
        left: 100,
        fontWeight: 'bold',
        fontSize: 50,
        top: 10
    },
})


