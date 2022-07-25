import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions, Alert, ImageBackground} from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';

const InstructionScreen = () => {
    return(
        <ImageBackground source={require('../../assets/b1.jpg')} style={styles.root}>
            <ScrollView>
            <View style={{padding:20,}}>
            <Text style={styles.text}>הוראות</Text>
            <Text style={styles.t1}>לאחר שתתחברו יוצג בפניכם המסך הראשי ובו ישנן 3 אופציות: סיפורים, מילים ודו"ח.</Text>
            
            <Text style={styles.title}>סיפורים</Text>
            <Text style={styles.t1}> לפניכם 2 אופציות. הראשונה- קריאת סיפורים. תתחילו בשלב הראשון ובו יוצגו לכם סיפורים ברמה הנמוכה ביותר. כל מילה שלא תצליחו בסיפורים, תכנס לרשימת המילים האישית שלכם שתוכלו לתרגל ולשנן. בסוף קריאת הסיפור תקבלו ציון ובמידה והציון יהיה מספיק גבוה- תוכלו לעבור לשלב הבא. אופציה נוספת תהיה לשמוע את הסיפור ולתרגם אותו.</Text>
            <Text style={styles.title}>מילים</Text>
            <Text style={styles.t1}>המילים שלא תצליחו לקרוא נכון יכנסו לרשימת המילים שלכם כך שתוכלו לקרוא , לתרגם ולכתוב מילים אלו. לאחר שתדעו לקרוא נכון את המילים, הם ימחקו מרשימת המילים האישית שלכם. </Text>
            <Text style={styles.title}>דו"ח</Text>
            <Text style={styles.t1}>לאורך השימוש באפליקציה תוצג בפניכם האופציה לראות את מצבכם בעזרת הד"וח. הדו"ח יראה לכם כמה סיפורים קראתם ומה הציון הממוצע שלכם. בנוסף, הוא יראה לכם כמה מילים נותר לכם ללמוד. סה"כ תקבלו סיכום של ההתקדמות שלכם. </Text>
            <Text style={styles.title}>מעבר בין שלבים</Text>
            <Text style={styles.t1}>   מקל לבינוני: צריך לקרוא לפחות 3 סיפורים בממוצע לפחות 80.  </Text>
            <Text style={styles.t1}>   מבינוני לקשה: צריך לקרוא לפחות 3 סיפורים בממוצע לפחות 80.  </Text>
            <Text style={styles.t1}>   מקשה למתקדם: צריך לקרוא לפחות 3 סיפורים בממוצע לפחות 85.  </Text>
            <Text style={styles.title}>בהצלחה !!!</Text>
            </View>
            </ScrollView>
        </ImageBackground>
    )
}
export default InstructionScreen;
const styles = StyleSheet.create({
    root: {
      flex: 1,
      //marginTop:30,
      alignItems: 'center',
      backgroundColor:`#87ceeb`,
    },
    text: {
        //flex: 1,
        //marginTop: 30,
        fontSize: 60,
        fontWeight: 'bold',
        color: '#3d526b',
        textAlign: 'center',
    },
    t1: {
        fontSize: 20,
        //marginTop:30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#3d526b',
        textAlign: 'center',
    },
      
});
