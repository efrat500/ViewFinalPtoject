import { DevSettings,ImageBackground,Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react'
import { List } from 'react-native-paper';
import axios from "axios"
import CustemButton from '../../components/CustemButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import { combine } from 'qs/lib/utils';
import {advancedCurrentLevel, advancedLevel, advancedSurprise, easyLevel, hardLevel, LEVEL_NAME, mediumLevel} from './NameLevels';
import { mergeWith } from 'lodash';


const LevelStory = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [storiesEasy , setStoriesEasy]=useState([])
    const [storiesMedium , setStoriesMedium]=useState([])
    const [storiesHard , setStoriesHard]=useState([])
    const [storiesAdvanced , setStoriesAdvanced]=useState([])
    const [expandedMedium, setExpandedMedium] = useState(false);
    const [expandedHard, setExpandedHard] = useState(false);
    const [expandedAdvanced, setExpandedAdvanced] = useState(false);

    const axiosStories = async (level) => {
        const response = await axios.post('http://192.168.1.21:5000/allstories',{current_level: level, username:route.params.name})
        switch(level){  // getting all the stories by levels
            case easyLevel:
                setStoriesEasy(response.data)
            case mediumLevel:
                setStoriesMedium(response.data)
            case hardLevel:
                setStoriesHard(response.data)
            case advancedLevel:
                setStoriesAdvanced(response.data)
        }
    }

    useEffect(() => {
        axiosStories(easyLevel)
        axiosStories(mediumLevel)
        axiosStories(hardLevel)
        axiosStories(advancedLevel)
    }, [])


    const onStory = (item) =>{
        if (route.params.isRead){ // go to the selected story reading screen
            navigation.navigate('Read Story', {name:route.params.name, title_Story: item.title}) 
        } else {
            navigation.navigate('Listen Story', {name:route.params.name, title_Story: item.title})
        } 
    }

    const onPressExpanded = (level) =>{
        axios.post('http://192.168.1.21:5000/checkpasslevel', {username:route.params.name})
        .then(resp => { 
                if (resp.data.pass_level_medium==1 && level == mediumLevel){   // checking whether the stories can be read at a specific level
                    setExpandedMedium(!expandedMedium)
                }
                else if (resp.data.pass_level_hard==1 && level == hardLevel){
                    setExpandedHard(!expandedHard)
                }
                else if (resp.data.pass_level_advenc==1 && level == advancedLevel){
                    setExpandedAdvanced(!expandedAdvanced)

                }else{
                    Alert.alert('Note',"You must pass the previous level",[{text: 'Understood'}])
                }
            }
            
        )
        .catch(error => {
            console.log(error)
        })
        .finally(() => console.log("done"))
    }

    const getStory = () => {
        axios.post('http://192.168.1.21:5000/datareport', {username:route.params.name})
        .then(resp => {
            if (resp.data.current_level == advancedCurrentLevel){
                axios.post('http://192.168.1.21:5000/addstoryadvenc', {username:route.params.name})
                .then(resp => {
                    storiesAdvanced.pop()                  // pop the old story
                    storiesAdvanced.push(resp.data)        // push the new story
                    setStoriesAdvanced(storiesAdvanced)
                    Alert.alert('Note',"You add a new story for your advence list",[{text: 'Understood'}])
                })
            }else{
                Alert.alert('Note',"You must pass the previous level",[{text: 'Understood'}])
            }
        }) 
    }
    
    const titleStory = (mapStory) =>{
        return (mapStory.map((item, index)=>{return(<List.Item key={index} onPress={() => onStory(item)} title={item.title} />);}));
    }
    
    const AccordionEasy = (mapStory, level) => (
        <View style={styles.padding}>
            <List.Accordion  style={styles.accordion}
                title={level}>
                {titleStory(mapStory)}
            </List.Accordion> 
        </View>          
    );

    const AccordionLevels = (mapStory, level, expanded) => (
        <View style={styles.padding}>
            <List.Accordion  style={styles.accordion}
                title={level}
                expanded={expanded}
                onPress={()=> onPressExpanded(level)}>
                {titleStory(mapStory)}
            </List.Accordion>    
        </View>       
    );

    return ( 
        <ImageBackground source={require('../../../assets/background.jpg')} style={styles.background}> 
            <ScrollView>
                <List.Section title="">
                    {AccordionEasy(storiesEasy, easyLevel)}
                    {AccordionLevels(storiesMedium, mediumLevel, expandedMedium)}
                    {AccordionLevels(storiesHard, hardLevel, expandedHard)}
                    {AccordionLevels(storiesAdvanced, advancedLevel, expandedAdvanced)}
                </List.Section>
            {expandedAdvanced == true ? 
            <CustemButton 
                text={advancedSurprise}
                // check befor press signin all the data is valid
                onPress={getStory}
            />  : null}
        </ScrollView>
    </ImageBackground>
    
    );
}


export default LevelStory;
const styles = StyleSheet.create({
    background:{
        width: '100%', 
        height: '100%',
    },
    padding:{
        padding:10,
    },
    accordion:{
        borderWidth:0.7,
        borderRadius:3,
        backgroundColor : '#dcebf1',
    },
})