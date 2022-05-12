import React from 'react';
import Story from '../../assets/story.jpg';
import Report from '../../assets/report.png';
import Words from '../../assets/words.jpg';
import Profiler from '../../assets/profile.jpg';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


const MenuScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.text3}>Welcome!</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                    style={{ flex: 1, backgroundColor: '#5FE0E6' }}
                    onPress={() => { }}
                >
                    <Image
                        source={Story}
                        style={styles.story}
                    />
                    <Text style={styles.text}>
                        Story
                    </Text>
                </View>

                <View
                    style={{ flex: 1, backgroundColor: '#5FE0E6' }}
                    onPress={() => { }} // Action
                >
                    <Image
                        source={Report}
                        style={styles.report}
                    />
                    <Text style={styles.text}>
                        Report
                    </Text>
                </View>

            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                    style={{ flex: 1, backgroundColor: '#5FE0E6' }}
                    onPress={() => { }} // Action
                >
                    <Image
                        source={Words}
                        style={styles.words}
                    />
                    <Text style={styles.text2}>
                        Words
                    </Text>
                </View>

                <View
                    style={{ flex: 1, backgroundColor: '#5FE0E6' }}
                    onPress={() => { }} // Action
                >
                    <Image
                        source={Profiler}
                        style={styles.profiler}
                    />
                    <Text style={styles.text2}>
                        Profile
                    </Text>
                </View>

            </View>
        </View >
    );
}

//jhiu
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    story: {
        width: '100%',
        maxWidth: 200,
        maxHeight: 180,
        paddingHorizontal: 80,
        borderColor: 'black',
        borderWidth: 5,
        top: 100
    },
    report: {
        width: '100%',
        maxWidth: 200,
        maxHeight: 180,
        paddingHorizontal: 80,
        borderColor: 'black',
        borderWidth: 5,
        top: 100
    },
    words: {
        width: '100%',
        maxWidth: 200,
        maxHeight: 180,
        paddingHorizontal: 80,
        borderColor: 'black',
        borderWidth: 5
    },
    profiler: {
        width: '100%',
        maxWidth: 200,
        maxHeight: 180,
        paddingHorizontal: 80,
        borderColor: 'black',
        borderWidth: 5
    },
    text: {
        alignItems: 'center',
        marginTop: 50,
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
        alignItems: 'center',
        left: 100,
        fontWeight: 'bold',
        fontSize: 50,
        top: 10
    },
})

export default MenuScreen;