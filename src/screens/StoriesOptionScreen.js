import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import MyCard from '../components/Card';
import Appear from '../components/Appear';
import StoriesOption from './StoriesOption';




const StoriesOptionScreen = () => {
    return (<ScrollView>
        <StoriesOption></StoriesOption>
    </ScrollView>);
}



export default StoriesOptionScreen;