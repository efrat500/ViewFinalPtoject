import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Hear from '../../../assets/hear.jpg';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CardStory = (source) => (
    <Card>
        <Card.Content>
            <Title>Hearing</Title>
        </Card.Content>
        <Card.Cover source={source} />
        <Card.Actions>
        </Card.Actions>
    </Card>
);

export default CardStory;