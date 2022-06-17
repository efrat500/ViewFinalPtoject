import React from 'react';
import Write from '../../assets/translat.png';
import Hear from '../../assets/hear.jpg';
import Read from '../../assets/read1.jpg';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useNavigation, useRoute} from '@react-navigation/native'


const WordsScreen = () => {
    const route = useRoute()
    console.log(route.params.name)
    const navigation = useNavigation()
    const onWriting = () =>{
        navigation.navigate('Write Screen', {name: route.params.name})
        console.log(route.params.name)
    }

    const onHearing = () =>{
        navigation.navigate('Translate Screen', {name: route.params.name})
    }

    const onReading = () =>{
        navigation.navigate('Read Screen', {name: route.params.name})
    }
    const onDictionary = () =>{
        navigation.navigate('Dictionary Screen', {name: route.params.name})
    }
    return (<ScrollView>
        <TouchableOpacity onPress={onWriting}>
            <Card
                style={styles.container}>
                <Card.Content style={styles.container}>
                    <Title>Writing</Title>
                </Card.Content>
                <Card.Cover source={Write}
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
                </Card.Content >
                <Card.Cover source={Hear}
                    style={styles.words} />
                <Card.Actions style={styles.container}>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={onReading}>
            <Card style={styles.container}>
                <Card.Content style={styles.container}>
                    <Title>Reading</Title>
                </Card.Content>
                <Card.Cover source={Read}
                    style={styles.words} />
                <Card.Actions style={styles.container}>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDictionary}>
            <Card style={styles.container}>
                <Card.Content style={styles.container}>
                    <Title>Dictionary</Title>
                </Card.Content>
                <Card.Cover source={Read}
                    style={styles.words} />
                <Card.Actions style={styles.container}>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
    </ScrollView >);
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

export default WordsScreen;
// import React from 'react';
// import Story from '../../assets/story.jpg';
// import Write from '../../assets/write.jpg';
// import Hear from '../../assets/hear.jpg';
// import Read from '../../assets/read1.jpg';
// import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


// const WordsScreen = () => {
//     return (
//         <View style={{ flex: 1 }}>
//             <Text style={styles.text3}>Words</Text>
//             <View style={{ flex: 1, flexDirection: "row" }}>

//                 <View
//                     style={{ flex: 1, backgroundColor: '#93DED6' }}
//                     onPress={() => { }} // Action
//                 >

//                     <Image
//                         source={Write}
//                         style={styles.profiler}
//                     />
//                     <Text style={styles.text2}>
//                         Writing
//                     </Text>

//                 </View>

//             </View>
//             <View style={{ flex: 1, flexDirection: "row" }}>

//                 <View
//                     style={{ flex: 1, backgroundColor: '#93DED6' }}
//                     onPress={() => { }} // Action
//                 >
//                     <Image
//                         source={Hear}
//                         style={styles.profiler}
//                     />
//                     <Text style={styles.text2}>
//                         Hearing
//                     </Text>
//                     {/* <Text style={styles.text2}>
//                         Words
//                     </Text> */}
//                 </View>

//             </View>
//             <View style={{ flex: 1, flexDirection: "row" }}>

//                 <View
//                     style={{ flex: 1, backgroundColor: '#93DED6' }}
//                     onPress={() => { }} // Action
//                 >
//                     <Image
//                         source={Read}
//                         style={styles.profiler}
//                     />
//                     <Text style={styles.text2}>
//                         Reading
//                     </Text>
//                 </View>

//             </View>
//         </View >
//     );
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//     },
//     report: {
//         width: '80%',
//         marginTop: 80,
//         maxWidth: 300,
//         maxHeight: 200,
//         paddingHorizontal: 230,
//         borderColor: 'black',
//         borderWidth: 5
//     },
//     profiler: {
//         marginTop: 5,
//         width: '80%',
//         maxWidth: 100,
//         maxHeight: 200,
//         paddingHorizontal: 120,
//         borderColor: 'black',
//         borderWidth: 5
//     },
//     text: {
//         alignItems: 'center',
//         marginTop: 0,
//         padding: 20,
//         left: 80,
//         fontWeight: 'bold',
//         fontSize: 20,
//         flex: 1,
//     },
//     text2: {
//         marginTop: 0,
//         padding: 20,
//         left: 250,
//         fontWeight: 'bold',
//         fontSize: 30,
//         top: -150,
//     },
//     text3: {
//         alignItems: 'center',
//         left: 120,
//         fontWeight: 'bold',
//         fontSize: 45,
//         top: 10,
//         flex: 0.3,
//     },
// })

// export default WordsScreen;