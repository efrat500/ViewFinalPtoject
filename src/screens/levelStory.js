import React from 'react';
import Story from '../../assets/story.jpg';
import Write from '../../assets/write.jpg';
import Hear from '../../assets/hear.jpg';
import Read from '../../assets/read1.jpg';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import CustemButton from '../components/CustemButton'
import MyCard from '../components/Card';
import Appear from '../components/Appear';
import Level from '../components/level';
import CardStory from '../components/CardStory';

const onResendPressed = () => {
    console.warn("onResendPressed")
}

const levelStory = () => {
    return (<ScrollView>
        <Appear />
        <Level></Level>
    </ScrollView >);
    // return (
    //     <View style={{ flex: 1 }}>
    //         <Text style={styles.text3}>Words</Text>
    //         <CustemButton
    //             text="Resend code"
    //             onPress={onResendPressed}
    //             type="SECONDARY"
    //         />
    //         <View style={{ flex: 1, flexDirection: "row" }}>

    //             <View
    //                 style={{ flex: 1, backgroundColor: '#93DED6' }}
    //                 onPress={() => { }} // Action
    //             >

    //                 <Image
    //                     source={Write}
    //                     style={styles.profiler}
    //                 />
    //                 <Text style={styles.text2}>
    //                     Writing
    //                 </Text>

    //             </View>

    //         </View>
    //         <View style={{ flex: 1, flexDirection: "row" }}>

    //             <View
    //                 style={{ flex: 1, backgroundColor: '#93DED6' }}
    //                 onPress={() => { }} // Action
    //             >
    //                 <Image
    //                     source={Hear}
    //                     style={styles.profiler}
    //                 />
    //                 <Text style={styles.text2}>
    //                     Hearing
    //                 </Text>
    //                 {/* <Text style={styles.text2}>
    //                     Words
    //                 </Text> */}
    //             </View>

    //         </View>
    //         <View style={{ flex: 1, flexDirection: "row" }}>

    //             <View
    //                 style={{ flex: 1, backgroundColor: '#93DED6' }}
    //                 onPress={() => { }} // Action
    //             >
    //                 <Image
    //                     source={Read}
    //                     style={styles.profiler}
    //                 />
    //                 <Text style={styles.text2}>
    //                     Reading
    //                 </Text>
    //             </View>

    //         </View>
    //     </View >
    // );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    report: {
        width: '80%',
        marginTop: 80,
        maxWidth: 300,
        maxHeight: 200,
        paddingHorizontal: 230,
        borderColor: 'black',
        borderWidth: 5
    },
    profiler: {
        marginTop: 5,
        width: '80%',
        maxWidth: 100,
        maxHeight: 200,
        paddingHorizontal: 120,
        borderColor: 'black',
        borderWidth: 5
    },
    text: {
        alignItems: 'center',
        marginTop: 0,
        padding: 20,
        left: 80,
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
    },
    text2: {
        marginTop: 0,
        padding: 20,
        left: 250,
        fontWeight: 'bold',
        fontSize: 30,
        top: -150,
    },
    text3: {
        alignItems: 'center',
        left: 120,
        fontWeight: 'bold',
        fontSize: 45,
        top: 10,
        flex: 0.3,
    },
})

export default levelStory;