import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import MyCard from '../components/Card';
import Appear from '../components/Appear';
import StoriesOption from './StoriesOption';


const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64
};

const StoriesOptionScreen = () => {
    return (<ScrollView>
        <Appear></Appear>
        <StoriesOption />
    </ScrollView >);
}



export default StoriesOptionScreen;