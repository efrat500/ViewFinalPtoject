import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  ImageBackground,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import axios from "axios"
import { ScrollView } from 'react-native-virtualized-view';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Button, TouchableHighlight, TouchableOpacity } from 'react-native-web';
import { IconButton,MD3Colors  } from 'react-native-paper';


const Dictionary = () => {
    const route = useRoute()
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.post('http://192.168.1.21:5000/getwordsgeneral', {username: route.params.name})
            setFilteredDataSource(response.data.allwords)
            setMasterDataSource(response.data.allwords)
        }
        axiosStories()
    }, [])

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.word
          ? item.word.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  var trans
  const onTranslatePressed = (item) =>{
    axios.post('http://192.168.1.233:5000/translatWord', {word_required:item.word})
    .then(resp => {
        trans = resp.data.translated
        Alert.alert('Translate',trans,[{text: 'Understood'}])
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => console.log("done"))
}
const onSoundPressed = (item) =>{
    axios.post('http://192.168.1.233:5000/convertWriting', {word_required:item.word})
    .then(resp => {
        console.log(resp.data)
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => console.log("done"))
}
const ItemView = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemStyle} onPress={() => onTranslatePressed(item)}>
            {item.word}
        </Text>
        <IconButton
            icon="volume-high"
            size={30}
            onPress={() => onSoundPressed(item)}
        />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          //backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.word);
  };

  const onSearch = () =>{
    setSearch("");
    setFilteredDataSource(masterDataSource);
  }

  return (
    <ImageBackground source={require('../../../assets/b1.jpg')} style={{width: '100%', height: '100%'}}> 
    <ScrollView>
        <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.searchWrapperStyle}>
                <IconButton
                    icon="magnify"
                    size={24}
                    onPress={() => onSearch()}
                    style={styles.iconStyle}
                />
                    <TextInput
                    style={styles.searchInputStyle}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    placeholder="Search Here..."
                    />
                <IconButton
                    icon="close"
                    size={24}
                    onPress={() => onSearch()}
                    style={styles.iconStyle}
                />
            </View>
            <FlatList
            style={styles.flat}
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            />
        </View>
        </SafeAreaView>
    </ScrollView>
    </ImageBackground> 
  );
};

const styles = StyleSheet.create({
    flat:{
        narginTop: 15,
        paddingTop: 10,
    },
  container: {
    //backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    fontSize: 22,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: "#64b5f6",
    padding: 3,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius:2,
    borderColor: 'black',
    borderWidth:1,
    },
    iconStyle:{
        marginTop: 12,
        marginHorizontal: 8
    },
    cardStyle:{
        marginTop: 12,
        marginHorizontal: 8
    },
    searchWrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'gray',
    },
    iconStyle: {
        marginTop: 5,
        marginHorizontal: 8,
    },
    searchInputStyle:{
        flex: 1,
        paddingVertical: 2,
        paddingHorizontal: 0,
        margin: 0,
        color: "black",
        backgroundColor: '#FFFFFF',
    }
});

export default Dictionary;