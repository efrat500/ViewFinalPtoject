import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Appear from '../components/Appear';
import InputText from '../components/InputText'
import MyCard from '../components/Card/Card';




const { width } = Dimensions.get('window');
//you need to preview n items.
const previewCount = 3;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth 
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
const itemWidth = width / (previewCount + .5);
//to center items you start from 3/4 firstItemWidth 
const windowWidth = Dimensions.get('window').width;
const startScroll = (windowWidth * 3 / 4);

const windowHeight = Dimensions.get('window').height;

const WriteScreen = (props) => {

    const data = [...Array(20).keys()];
    const flatlistRef = React.useRef();

    const [words, setWords] = useState([])
    // useEffect(() => {
    //     const axiosWords = async () => {
    //         const response = await axios.post('http://192.168.1.25:5000/getwords', { username: "shahar" })
    //         setWords(response.data.allWords)
    //     }
    //     axiosWords()
    // }, [])
    React.useEffect(() => {
        if (flatlistRef.current) flatlistRef.current.scrollToOffset({
            offset: startScroll, animated: false
        });
        const axiosWords = async () => {
            const response = await axios.post('http://192.168.1.25:5000/getwords', { username: "shahar" })
            setWords(response.data.allWords)
        }
        axiosWords()
    }, [flatlistRef]);


    const snapToOffsetsLikeGooglePlay = data.map((x, i) => {
        return ((i * itemWidth) + startScroll)
    })

    const snapToOffsets = data.map((x, i) => {
        return ((i * (itemWidth) * previewCount) + startScroll)
    })

    const useWords = () => {
        return (
            <FlatList
                ref={flatlistRef}
                style={styles.container}
                pagingEnabled={true}
                horizontal={true}
                decelerationRate={0}
                snapToOffsets={snapToOffsets}
                snapToAlignment={"center"}
                data={words}
                renderItem={(item) => (
                    <MyCard title={item} ></MyCard>
                )} />
        );
    }




    return (
        { useWords }
    );

}



export default WriteScreen;


const styles = StyleSheet.create({
    container: {
        marginTop: 150,
    },
    card: {
        flex: 1,
        width: itemWidth - 10, //20 is margin left and right
    }
});




