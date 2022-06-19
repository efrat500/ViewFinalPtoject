import React from 'react';
import Hear from '../../assets/h_n.png';
import Read from '../../assets/r_n.png';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Appear from '../components/Appear';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native'


const StoryScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()

    const onHearing = () =>{
        navigation.navigate('Level Story Listen', {name:route.params.name})
    }
    const onReading = () =>{
        navigation.navigate('Level Story Read', {name:route.params.name})
    }
    return (<ImageBackground style={styles.container}>
    <ScrollView>
        {console.log(route.params.name)}
        <TouchableOpacity onPress={onReading}>
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
        </TouchableOpacity>
        <TouchableOpacity onPress={onHearing}>
            <Card style={styles.container}>
                <Card.Content style={styles.container}>
                    <Title>Hearing</Title>
                </Card.Content>
                <Card.Cover source={Hear}
                    style={styles.words} />
                <Card.Actions style={styles.container}>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
    </ScrollView >
    </ImageBackground>);
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: `#4d82bd`,
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

export default StoryScreen;