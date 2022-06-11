import {
    LineChart, ProgressChart
} from 'react-native-chart-kit';
import { FlatList, Text, ScrollView, View, Dimensions, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Appear from '../components/Appear';
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
const data = {
    labels: ["Read", "Write"], // optional
    data: [0.4, 0.6]
};
const ReportScreen = () => {
    return (
        <View>
            <Appear></Appear>
            <Text style={styles.text}>Current Level: Easy</Text>
            <Text style={styles.text2}>Number Of Stories: 50</Text>
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
                            data: [
                                5,
                                10,
                                30,
                                40,
                                60
                            ]
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
        </View>)
}


export default ReportScreen;
const styles = StyleSheet.create({
    text: {
        marginTop: 60,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 65,
    },
    text2: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 65,
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