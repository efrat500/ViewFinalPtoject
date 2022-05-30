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

    </ScrollView >);
}
export default MenuScreen;

export const VideoCard = ({ item }) => {

    return (
        <Card style={styles.card} mode='outlined'>
            <Card.Cover

                source={item.image}
                resizeMode='cover' />

            <Card.Content>
                <Paragraph style={styles.text}> {item.title} </Paragraph>
            </Card.Content>
        </Card>
    );

};