import {LineChart, ProgressChart} from 'react-native-chart-kit';
import { FlatList, Text, ScrollView, View, Dimensions, StyleSheet, Alert } from 'react-native';
// import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useNavigation, useRoute } from '@react-navigation/native'

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 2, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const ReportScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [reportlevel , setReportlevel]=useState('')
    const [numStories , setNumStories]=useState('')
    const [list_titles , setlist_titles]=useState([])
    const [list_grades , setlist_grades]=useState([])
    const [size_list_general , setsize_list_general]=useState('')
    const [size_list_reading , setsize_list_reading]=useState('')
    const [calc_reading , setcalc_reading]=useState('')
    const [size_list_translating , setsize_list_translating]=useState('')
    const [calc_translating , setcalc_translating]=useState('')
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.post('http://192.168.1.235:5000/getdatareport', {username: route.params.name})
            setReportlevel(response.data.current_level)
            setNumStories(response.data.num_stories)
            setsize_list_general(response.data.size_list_general)
            setsize_list_reading(response.data.size_list_reading)
            setcalc_reading(response.data.size_list_general-response.data.size_list_reading)
            setsize_list_translating(size_list_translating)
            setcalc_translating(response.data.size_list_general-response.data.size_list_translating)
            setlist_titles(response.data.list_titles.alltitles)
            console.log(list_titles)
        }
        axiosStories()
    }, [])
    const data = {
        labels: ["Read", "Write"], // optional
        data: [0.4,0.6]
    };
    const onCalc = () =>{
        axios.post('http://192.168.1.235:5000/calcaverage', {username: route.params.name})
        .then(resp => {
            console.log(resp.data.average)
            Alert.alert('Note','Your average is ' + resp.data.average,[{text: 'Understood'}])
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }

    return (
        <ScrollView>
            <Text style={styles.text}>Current Level: {reportlevel} </Text>
            <Text style={styles.text2}>Number Of Stories: {numStories}</Text>
            <Text style={styles.text3}>Words:</Text>
            <ProgressChart
                style={styles.firstG}
                data={data}
                width={screenWidth}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
            />
            <Text style={styles.text3}>Stories:</Text>
            <LineChart
                data={{
                    labels: ["Kipa Adoma", "Zeev", "Kaka", "Pipi", "Shilshol"],
                    datasets: [
                        {
                            data: [5,10,30,40,60]
                            // {console.log(data)}
                        }
                    ]
                }}
                
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    marginTop: 20
                }}
            />
            <Button icon="camera" mode="contained" style={{marginTop:20}} onPress={onCalc}>
                Calculate average
            </Button>
        </ScrollView>)
}


export default ReportScreen;

const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 65,
    },
    text2: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 65,
    },
    text3: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
    },
    firstG: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        marginVertical: 8,
        borderRadius: 16
    },
});