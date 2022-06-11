import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';

const InputText = () => {
    const [text, setText] = React.useState('');

    return (
        <TextInput
            style={styles.input}
            mode="outlined"
            label="Type the word in English"
            placeholder="Type the word in English"
            right={<TextInput.Affix text="/80" />}
        />
    );
};

export default InputText;
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#eee',
        width: 400, //20 is margin left and right
        margin: 5,
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

    },
    input: {
        width: 300,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});