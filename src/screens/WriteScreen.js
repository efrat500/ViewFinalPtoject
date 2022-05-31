import React from 'react';
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
const startScroll = (itemWidth * 3 / 4);
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WriteScreen = (props) => {

    const data = [...Array(20).keys()];
    const flatlistRef = React.useRef();


    React.useEffect(() => {
        if (flatlistRef.current) flatlistRef.current.scrollToOffset({
            offset: startScroll, animated: false
        });
    }, [flatlistRef]);


    const snapToOffsetsLikeGooglePlay = data.map((x, i) => {
        return ((i * itemWidth) + startScroll)
    })

    const snapToOffsets = data.map((x, i) => {
        return ((i * (itemWidth) * previewCount) + startScroll)
    })


    return (

        <FlatList
            ref={flatlistRef}
            style={styles.container}
            pagingEnabled={true}
            horizontal={true}
            decelerationRate={0}
            snapToOffsets={snapToOffsets}
            snapToAlignment={"center"}
            data={data}
            renderItem={({ item, index }) => (
                <MyCard style={styles.card} title="word" ></MyCard>
            )} />
    );

}



export default WriteScreen;


const styles = StyleSheet.create({
    container: {
        marginTop: 150,
    },
    card: {
        flex: 1,
        width: itemWidth - 20, //20 is margin left and right
        margin: 10,
    }
});




