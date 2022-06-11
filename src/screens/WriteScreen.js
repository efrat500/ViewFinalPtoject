// import React, {useState,useEffect} from 'react'
// import { FlatList, Text } from 'react-native';
// import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
// import Appear from '../components/Appear';
// import InputText from '../components/InputText'
// import MyCard from '../components/Card/Card';
// import axios from "axios"




// const { width } = Dimensions.get('window');
// //you need to preview n items.
// const previewCount = 3;
// //to center items
// //the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth 
// //so for example if previewCount = 3
// //itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
// const itemWidth = width / (previewCount + .5);
// //to center items you start from 3/4 firstItemWidth 
// const startScroll = (itemWidth * 3 / 4);
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const WriteScreen = (props) => {

//     const data = [...Array(20).keys()];
//     // const flatlistRef = React.useRef();


//     // React.useEffect(() => {
//     //     if (flatlistRef.current) flatlistRef.current.scrollToOffset({
//     //         offset: startScroll, animated: false
//     //     });
//     // }, [flatlistRef]);


//     // const snapToOffsetsLikeGooglePlay = data.map((x, i) => {
//     //     return ((i * itemWidth) + startScroll)
//     // })

//     // const snapToOffsets = data.map((x, i) => {
//     //     return ((i * (itemWidth) * previewCount) + startScroll)
//     // })
//     const [words , setWords]=useState([])
//     useEffect(() => {
//         const axiosWords = async () => {
//             const response = await axios.post('http://192.168.1.235:5000/getwords', {username:"e"})
//             setWords(response.data.word) 
//             // const response = await axios.post('http://192.168.1.235:5000/getstory', {title_story: "A RED BERRY"})
//             // setWords(response.data.story)
//         }
//         axiosWords()
//     }, [])


//     return (

//         <FlatList
//             // ref={flatlistRef}
//             style={styles.container}
//             pagingEnabled={true}
//             horizontal={true}
//             decelerationRate={0}
//             // snapToOffsets={snapToOffsets}
//             snapToAlignment={"center"}
//             data={words}
//             renderItem={({ item }) => (
//                 <MyCard style={styles.card} title={item} ></MyCard>
//             )} />
//     );

// }



// export default WriteScreen;


// const styles = StyleSheet.create({
//     container: {
//         marginTop: 150,
//     },
//     card: {
//         flex: 1,
//         width: itemWidth - 20, //20 is margin left and right
//         margin: 10,
//     }
// });
import React, { Component, useState,useEffect } from 'react';
import { Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { Container, Header, View, DeckSwiper, CardItem, Thumbnail, Text, Left, Body, Icon, Card } from 'native-base';
import MyCard from '../components/Card/Card';
import InputText from '../components/InputText'
import { Button } from 'react-native-paper';
import Appear from '../components/Appear';
import { TextInput } from 'react-native-paper';
import axios from "axios"

const cards = [
  {
    word: '',
  },
];

const WriteScreen = () => {
    const [words , setWords]=useState([])
    const [textInput , onChangetext]=useState(' ')
    useEffect(() => {
        const axiosWords = async () => {
            const response = await axios.post('http://192.168.1.234:5000/getwords', {username:"e"})
            setWords(response.data.allwords)
            // console.log("my data") 
            console.log(response.data.allwords)
        }
        axiosWords()
    }, [])
    var check
    const onCheckPressed = (item, value) =>{
        axios.post('http://192.168.1.234:5000/comperTransletetWord', {word_english:item, translate:value})
        .then(resp => {
            check = resp.data.feedback
            console.log(resp.data.feedback)
            anotherFunc()
            Alert.alert('check',check,[{text: 'Understood'}])

        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    const anotherFunc = () =>{
      onChangetext('');
    }
    return (
        <Container sytle={styles.view}>
        <Appear></Appear>
        <Header />
        <View sytle={styles.view}>
            {words.length == 0 ? null:
                <DeckSwiper
                dataSource={words}
                renderItem={item =>
                    <Card sytle={styles.view}>
                    <CardItem>
                        <Left>
                        <Body sytle={styles.view}>
                            <Text style={styles.text}>{item.word}</Text>
                            <TextInput
                            style={styles.input}
                            mode="outlined"
                            label="Type the word in English"
                            placeholder="Type the word in English"
                            right={<TextInput.Affix text="/80" />}
                            onChangeText={onChangetext}
                            value = {textInput}
                            />
                            <Button style={styles.button} color='pink' mode="contained" onPress={() => {onCheckPressed(item.word, textInput)}}>
                            Check
                            </Button>
                        </Body>
                        </Left>
                    </CardItem>
                    </Card>
                }
                />
            }
        </View>
        </Container >
    );
   
}

export default WriteScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    marginTop: 30,
  },
  button: {
    flex: 1,
    width: 200,
    marginTop: 60,
    marginLeft: 70,
    height: 40,
    alignItems: 'center',
  }
});



