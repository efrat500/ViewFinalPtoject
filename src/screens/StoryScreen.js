import React from 'react';
import Story from '../../assets/story.jpg';
import Report from '../../assets/report.png';
import Hear from '../../assets/hear.jpg';
import Read from '../../assets/read.jpg';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


const StoryScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.text3}>Sroties!</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                    style={{ flex: 1, backgroundColor: '#EB71A6' }}
                    onPress={() => { }} // Action
                >
                    <Image
                        source={Read}
                        style={styles.report}
                    />
                    <Text style={styles.text}>
                        Reading stories
                    </Text>
                </View>

            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>

                <View
                    style={{ flex: 1, backgroundColor: '#EB71A6' }}
                    onPress={() => { }} // Action
                >
                    <Image
                        source={Hear}
                        style={styles.profiler}
                    />
                    <Text style={styles.text2}>
                        Hearing stories
                    </Text>
                </View>

            </View>
        </View >
    );
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
        paddingHorizontal: 230,
        borderColor: 'black',
        borderWidth: 5
    },
    text: {
        alignItems: 'center',
        marginTop: 0,
        padding: 20,
        left: 80,
        fontWeight: 'bold',
        fontSize: 30,
        flex: 1,
    },
    text2: {
        alignItems: 'center',
        marginTop: 0,
        padding: 20,
        left: 80,
        fontWeight: 'bold',
        fontSize: 30,
        flex: 1,
    },
    text3: {
        alignItems: 'center',
        left: 110,
        fontWeight: 'bold',
        fontSize: 50,
        top: 10
    },
})

export default StoryScreen;