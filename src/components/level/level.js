import * as React from 'react';
import { List } from 'react-native-paper';

const Level = () => {
    const [expanded, setExpanded] = React.useState(true);
    const mydata = [
        { id: 1, title: "Kaka" },
        { id: 2, title: "Kipa" },
        { id: 3, title: "Hard" },
    ];
    const handlePress = () => setExpanded(!expanded);

    return (
        <List.Section title="Levels">
            <List.Accordion
                title="First Level">
                {mydata.map((item)=>{
                    return(<List.Item title={item.title} />);
                })}
            </List.Accordion>
            <List.Accordion
                title="Second Level">
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