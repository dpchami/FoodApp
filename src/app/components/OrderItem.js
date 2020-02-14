import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const OrderItem = (props) => {

    return (
        <View style={styles.wrapStyle}>
            <View style={styles.detailWrap}>
                <View style={styles.contentContainer}>
                    <Text>STATUS</Text>
                    <Text>{props.order.order_status}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text>TOTAL AMOUNT</Text>
                    <Text>{"TZS " + props.order.total_amount}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text>ORDER DATE</Text>
                    <Text>{props.order.order_date}</Text>
                </View>
                <TouchableHighlight style={styles.buttonWrap} onPress={ () => Actions.products({ pro_type: "order", value: props.order.id }) }>
                    <Text style={styles.buttonText}> View Products</Text>
                </TouchableHighlight> 
            </View>
             
        </View>
    );
}
export default OrderItem;

const styles = StyleSheet.create({
    wrapStyle : {
        flexDirection: "row",
        padding:10,
        backgroundColor:"#fffff0",
        borderBottomWidth:2,
        borderColor:'#001'
    },

    detailWrap :{
        flex: 2,
        padding:5,
    },

    buttonWrap: {
        flex: 1,
        flexDirection: "row",
        justifyContent:"flex-end",
        //alignSelf: "center"
    },

    contentContainer : {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    
    buttonText: {
        color:'#fff',
        backgroundColor:"#0000ff",
        //alignSelf: "center",
        fontSize: 16,
        fontWeight:"bold",
        borderRadius: 5,
        padding:4,
    }
});