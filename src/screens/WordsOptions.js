

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import axios from "axios"
import { ScrollView } from 'react-native-virtualized-view';
import Appear from '../components/Appear';

const WordsOptions = () => {
    const route = useRoute()
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    useEffect(() => {
        const axiosStories = async () => {
            const response = await axios.post('http://192.168.1.21:5000/getwordsgeneral', {name: route.params.name})
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
    // const Item = ({ title }) => {
    //     return (
    //       <View style={styles.item}>
    //         <Text>{title}</Text>
    //       </View>
    //     );
    //   };
    // const renderItem = ({ item }) => <Item title={item.word} />;
  const ItemView = ({ item }) => {
    return (
      <View style={styles.item}>
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.word}
      </Text>
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
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.word);
  };

  return (
    <ScrollView>
        <Appear></Appear>
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
            />
            <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            />
        </View>
        </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
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
    backgroundColor: "#f5f520",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    },
});

export default WordsOptions;