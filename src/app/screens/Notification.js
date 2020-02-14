import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../config/colors'
import { Actions } from 'react-native-router-flux';

class Notification extends Component{
    state = { hideNavBar: false, hideTabBar: false };

    render() {
        return( 
            <View>
                <StatusBar backgroundColor={ colors.BaseNavBackground } barStyle="light-content" />
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={ () => Actions.pop() }>
                        <Icon style={{color: colors.BaseNavBarColor, paddingRight: 0 }} name= "arrow-left" size={20}/> 
                    </TouchableOpacity>
                    <Text style={{ color: colors.BaseNavBarColor,fontSize:16,fontWeight:"bold" }}>Notification</Text>
                    <Text></Text>
                </View>
                <View style={styles.content}>
                <Text style={{ fontWeight:"bold", fontSize:18, }}>No new Notification</Text>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{

    },
    navBar: {
        height:50,
        paddingTop:20,
        paddingLeft:20,
        backgroundColor:  colors.BaseNavBackground,
        flexDirection:'row', 
        justifyContent: 'space-between',
    },
    content: {
        paddingTop:150,
        alignSelf:"center",
        //backgroundColor:'purple',
        justifyContent:"center",
    }
});

export default Notification;