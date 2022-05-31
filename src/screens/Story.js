import { View, Text, StyleSheet, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from "axios"
import CustemButton from '../components/CustemButton'

const Story = () => {
    // const [words , setWords]=useState([])
    // useEffect(() => {
    //     const axiosWords = async () => {
    //         const response = await axios.post('http://192.168.1.235:5000/getwords', {username:"e"})
    //         setWords(response.data.allWords)
    //     }
    //     axiosWords()
    // }, [])
    const [stories , setStories]=useState([])
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.get('http://192.168.1.235:5000/getallstories')
            setStories(response.data)
        }
        axiosStories()
    }, [])
    const onSignInPressed = () =>{
        console.log('s')
    }
    // const useWords = words.map((word)=>{
    //     return (
    //         <View>
    //             <CustemButton 
    //                 text={word}
    //                 onPress={onSignInPressed}
    //             />
    //         </View>
    //     )
    // })
    const useStories = stories.map((story)=>{
        return (
            <View>
                <CustemButton 
                    text={story}
                    onPress={onSignInPressed}
                />
            </View>
        )
    })
    return(
        <View>
            {/* {useWords} */}
            {useStories}
        </View>
    )
   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
})

export default Story