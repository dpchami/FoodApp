import React from 'react'
import { ScrollView,View, Text, StyleSheet } from 'react-native'

export default Info = () => {

    return(
        <ScrollView style={{ padding:10 }}>
            <Text style={styles.content}>Tashe-ish is food delivery 
                application based in Dodoma. Designed to provide 
                fast,seemless and quality food at your door step.
                Taste-ish team has recruited best restaurant and food vendors around Dodoma to ensure your provided with super best service.
            </Text>
            <Text style={styles.title}>Contacts: </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        fontSize:16,
        paddingBottom: 5
    },
    title: {
        paddingTop:10,
        paddingBottom: 10,
        fontWeight:"bold",
        fontSize:18,
    }
});