import * as React from 'react';
import { List } from 'react-native-paper';

const Level = () => {
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    return (
        <List.Section title="Levels">
            <List.Accordion
                title="First Level"
                left={props => <List.Icon {...props} icon="folder" />}>
                <List.Item title="Stories" />
                <List.Item title="Words" />
            </List.Accordion>

            <List.Accordion
                title="Second Level"
                left={props => <List.Icon {...props} icon="folder" />}>
                <List.Item title="Stories" />
                <List.Item title="Words" />
            </List.Accordion>
            <List.Accordion
                title="Third Level"
                left={props => <List.Icon {...props} icon="folder" />}>
                <List.Item title="Stories" />
                <List.Item title="Words" />
            </List.Accordion>
        </List.Section>
    );
};

export default Level;