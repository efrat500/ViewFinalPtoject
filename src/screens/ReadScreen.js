import React from 'react';
import { Button } from 'react-native-paper';
import { Card } from 'react-native-paper';
import { FlatList, Text, ImageBackground } from 'react-native';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Appear from '../components/Appear';
import InputText from '../components/InputText'




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
                <Card style={styles.view}>
                    <Card.Content>
                        <Text style={styles.text}>dog</Text>
                        <Text style={styles.text1}>כלב</Text>
                        <Button style={styles.button} color="green" mode="contained" onPress={() => console.log('Pressed')}>
                            Start Read
                        </Button>
                    </Card.Content>
                </Card>
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
    },
    view: {
        backgroundColor: '#eee',
        width: 400, //20 is margin left and right
        margin: 10,
        height: 400,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 60,
        fontSize: 70,
        fontWeight: 'bold',
        color: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 65,
    },
    text1: {
        marginTop: 10,
        fontSize: 40,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 95,
    },
    input: {
        width: 300,
    },
    button: {
        width: 150,
        marginLeft: 50,
        height: 40,
    }
});




