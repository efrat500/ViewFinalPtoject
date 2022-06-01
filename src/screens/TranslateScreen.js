import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, View, DeckSwiper, CardItem, Thumbnail, Text, Left, Body, Icon, Card } from 'native-base';
import MyCard from '../components/Card/Card';
import InputText from '../components/InputText'
import { Button } from 'react-native-paper';
import Appear from '../components/Appear';
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'

const cards = [
    {
        text: 'Dog',
    },
    {
        text: 'Cat',
    },
    {
        text: 'a',
    },
    {
        text: 'b',
    },
    {
        text: 'a',
    },
];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class DeckSwiperExample extends Component {
    render() {
        return (
            <Container sytle={styles.view}>
                <Appear></Appear>
                <Header />
                <View sytle={styles.view}>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card sytle={styles.view}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <View sytle={styles.container}>
                                                <Text style={styles.text}>{item.text}</Text>
                                                <AntDesign style={styles.sound} name="sound" size={50} />
                                            </View>
                                            <Button style={styles.button} color="green" mode="contained" onPress={() => console.log('Pressed')}>
                                                Translate
                                            </Button>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
        marginTop: 60,
        marginLeft: 30,
        height: 40,
    },
    sound: {
        marginTop: -60,
        marginLeft: 250,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#aaa',
    }
});