import {BarChart,LineChart, ProgressChart} from 'react-native-chart-kit';
import { Image, FlatList, Text, ScrollView, View, Dimensions, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import React, {useState, useEffect} from 'react'
import logo from '../../../assets/men.png';
import logo2 from '../../../assets/girl.png';
import { useNavigation, useRoute } from '@react-navigation/native'
import API from '../../axiosAPI'

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255,0,0,0.5)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const ReportScreen = () => {
    const route = useRoute()
    const [reportlevel , setReportlevel]=useState('')
    const [numStories , setNumStories]=useState('')
    const [list_titles_vec , setlist_titles]=useState(["a"])
    const [list_grades_vec , setlist_grades]=useState([1])
    const [size_list_general , setsize_list_general]=useState(1)
    const [calc_reading , setcalc_reading]=useState(0)
    const [calc_translating , setcalc_translating]=useState(0)
    useEffect(() => {
        const axiosStories = async () => {
            const response = await API.post('datareport', {username: route.params.name})
            setReportlevel(response.data.current_level)
            console.log(response.data.current_level)
            setNumStories(response.data.num_stories)
            setsize_list_general(response.data.size_list_general)
            setcalc_reading(response.data.size_list_general-response.data.size_list_reading)
            setcalc_translating(response.data.size_list_general-response.data.size_list_translating)
            setlist_titles(response.data.list_titles.alltitles)
            setlist_grades(response.data.list_grades.allgrades)
            console.log("title")
            console.log(list_titles_vec)
            console.log(list_grades_vec)
        }
        axiosStories()
    }, [])
    var data;
    {(size_list_general != 0) ? data = {
        labels: ["Read", "Translate"], // optional
        data: [(calc_reading/size_list_general), (calc_translating/size_list_general)],

    }: []}    
    const onCalc = () =>{
        API.post('calcaverage', {username: route.params.name})
        .then(resp => {
            console.log(resp.data.average)
            Alert.alert('Note','Your average is ' + resp.data.average,[{text: 'Understood'}])
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }
    // if(list_grades_vec.length != 0 || list_titles_vec.length != 0) {
    return (
        
        <ScrollView>
            <Text style={styles.text}>Current Level: {reportlevel} </Text>
            <Text style={styles.text2}>Number Of Stories: {numStories}</Text>
            <Text style={styles.text3}>Words:</Text>
            <View style={styles.view1}>
                <Image style={styles.logo} source={logo}></Image>
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
                
            </View>
            <Text style={styles.text3}>Stories:</Text>
            <View style={styles.view1}>
                <Image style={styles.logo2} source={logo2}></Image>
                    <LineChart
                        data={{
                            labels: list_titles_vec,
                            datasets: [
                                {
                                data: list_grades_vec,
                                }
                            ],
                        }}
                        width={Dimensions.get("window").width} 
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        yAxisInterval={1}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.lineChart}
                        hideLegend={false}
                    />
            
            </View>
            <Button color='#f93e30' mode="contained" style={{marginTop:20}} onPress={onCalc}>
                Calculate average
            </Button>
        </ScrollView>)
    // } else{
    //     return(<View></View>);
    // }
}


export default ReportScreen;

const styles = StyleSheet.create({
    lineChart:{
        marginLeft:-400,
        borderRadius: 16,
        marginTop: 20,
    },
    view1:{
        flexDirection: 'row',
    },
    logo:{
        width:100,
        height:200,
        marginTop:100,
    },
    logo2:{
        width:100,
        height:200,
        marginTop:150,
        marginLeft:280,
    },
    text: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    text2: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text3: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginLeft: 0,
    },
    firstG: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        marginVertical: 8,
        borderRadius: 16,
        marginRight:-200,
    },
});