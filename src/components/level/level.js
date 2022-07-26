import React, {useState, useEffect} from 'react'
import { List } from 'react-native-paper';
import axios from "axios"

const Level = () => {
    const [stories , setStories]=useState([])
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.get('http://192.168.1.233:5000/getallstories')
            setStories(response.data)
            console.log(stories)
        }
        axiosStories()
    }, [])
    const mydata = [
        { id: 1, title: "Kaka" },
        { id: 2, title: "Kipa" },
        { id: 3, title: "Hard" },
    ];
 
    const handlePress = () => {
        console.log("s")
    }
    // const ex = false
    // expanded={ex} >
    return (
        <List.Section title="">
            <List.Accordion
                title="First Level">
                {stories.map((item)=>{
                    return(<List.Item title={item.title} />);
                })}
            </List.Accordion>
            <List.Accordion
                title="Second Level"
                onPress={handlePress}>
                {mydata.map((item)=>{
                    return(<List.Item title={item.title} />);
                })}
            </List.Accordion>
            <List.Accordion
                title="Third Level">
                {mydata.map((item)=>{
                    return(<List.Item title={item.title} />);
                })}
            </List.Accordion>
        </List.Section>
        
    );
};

export default Level;