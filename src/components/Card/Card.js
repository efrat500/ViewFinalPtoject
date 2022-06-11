import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, Dimensions } from 'react-native';
import InputText from '../../components/InputText'
import { Button } from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const itemWidth = windowWidth / (3 + .5);

const MyCard = (props) => (
  <Card style={styles.view}>
    <Card.Content>
      <Text style={styles.text}>{props.title}</Text>
      <InputText ></InputText>
      <Title > </Title>
      <Button style={styles.button} color="green" mode="contained" onPress={() => console.log('Pressed')}>
        Check
      </Button>
    </Card.Content>
  </Card>
);

export default MyCard;
const styles = StyleSheet.create({
  view: {
    backgroundColor: '#eee',
    width: windowWidth - 20, //20 is margin left and right
    margin: 10,
    height: 400,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 60,
    fontSize: 70,
    fontWeight: 'bold',
    color: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 65,
  },
  input: {
    width: 300,
  },
  button: {
    width: 150,
    marginLeft: 80,
    height: 40,
  }
});