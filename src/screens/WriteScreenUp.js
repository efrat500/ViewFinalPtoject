import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, View, DeckSwiper, CardItem, Thumbnail, Text, Left, Body, Icon, Card } from 'native-base';
import MyCard from '../components/Card/Card';
import InputText from '../components/InputText'
import { Button } from 'react-native-paper';
import Appear from '../components/Appear';
import { TextInput } from 'react-native-paper';

const cards = [
  {
    text: 'Dog',
  },
  {
    text: 'Cat',
  },
];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class DeckSwiperExample extends Component {
  render() {
    return (
      <Container sytle={styles.view}>
        <Appear></Appear>
        <Header />
        <View sytle={styles.view}>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card sytle={styles.view}>
                <CardItem>
                  <Left>
                    <Body sytle={styles.view}>
                      <Text style={styles.text}>{item.text}</Text>
                      <TextInput
                        style={styles.input}
                        mode="outlined"
                        label="Type the word in English"
                        placeholder="Type the word in English"
                        right={<TextInput.Affix text="/80" />}
                      />
                      <Button style={styles.button} color="green" mode="contained" onPress={() => console.log('Pressed')}>
                        Check
                      </Button>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginTop: 50,
    marginLeft: 100,
    fontSize: 70,
    fontWeight: 'bold',
    color: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 50,
  },
  button: {
    width: 150,
    marginTop: 60,
    marginLeft: 90,
    height: 40,
  }
});