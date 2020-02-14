import React from "react";
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Error = ({ title }) => {
    let errMsg = '';
    if (typeof title === "string"){
        errMsg = title;
    } else if (typeof title === "object") {
        console.log(title.message);
        errMsg = title.message
    } else {
        errMsg = title
    }
    
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems:"center", backgroundColor:'#fff' }}>
            <Icon name="exclamation-triangle" size={40} />
            <Text>{errMsg}</Text>
        </View>
    );
}
export default Error;