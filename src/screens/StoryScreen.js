import React from 'react';
import Story from '../../assets/story.jpg';
import Report from '../../assets/report.png';
import Hear from '../../assets/hear.jpg';
import Read from '../../assets/read.jpg';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Appear from '../components/Appear';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


const StoryScreen = () => {
    return (<ScrollView>
        <Appear />
        <Card
            style={styles.container}>
            <Card.Content style={styles.container}>
                <Title>Reading</Title>
            </Card.Content>
            <Card.Cover source={Read}
                style={styles.words} />
            <Card.Actions
                style={styles.container}>
            </Card.Actions>
        </Card>
        <Card>
            <Card.Content>
                <Title>Hearing</Title>
            </Card.Content>
            <Card.Cover source={Hear}
                style={styles.words} />
            <Card.Actions>
            </Card.Actions>
        </Card>
    </ScrollView >);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    report: {
        width: '80%',
        marginTop: 80,
        maxWidth: 300,
        maxHeight: 200,
        paddingHorizontal: 230,
        borderColor: 'black',
        borderWidth: 5
    },
    profiler: {
        marginTop: 5,
        width: '80%',
        maxWidth: 100,
        maxHeight: 200,
        paddingHorizontal: 230,
        borderColor: 'black',
        borderWidth: 5
    },
    text: {
        alignItems: 'center',
        marginTop: 0,
        padding: 20,
        left: 80,
        fontWeight: 'bold',
        fontSize: 30,
        flex: 1,
    },
    text2: {
        alignItems: 'center',
        marginTop: 0,
        padding: 20,
        left: 80,
        fontWeight: 'bold',
        fontSize: 30,
        flex: 1,
    },
    text3: {
        alignItems: 'center',
        left: 110,
        fontWeight: 'bold',
        fontSize: 50,
        top: 10
    },
})

export default StoryScreen;