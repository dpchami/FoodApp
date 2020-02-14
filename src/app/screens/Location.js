import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { getLocation, getDistrict } from '../../store/local';
import { Actions } from 'react-native-router-flux';
import HorizontalSpace from '../components/HorizontalSpace';

class Location extends Component {
    constructor(props){
        super(props);
        this.state = {
            location : null,
            district: null
        }
    }

    async componentDidMount(){
        let location = await getLocation();
        let district = await getDistrict();

        this.setState({ location: location, district: district });
    }

    render(){

        if (this.state.location === null){
            return(
                <View style={{ alignItems:"center", justifyContent:"center", flexDirection:"row" }}>
                    <TouchableHighlight>
                        <Text>Home</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text>Login</Text>
                    </TouchableHighlight>
                </View>
            );
        }
         
        return (
            <View style={styles.body}>
                <View style={styles.content}>
                    <Text style={styles.title}>District</Text>
                    <Text style={styles.value}>{this.state.district}</Text>
                </View>
                <HorizontalSpace size={5} />
                <View style={styles.content}>
                    <Text style={styles.title}>Location</Text>
                    <Text style={styles.value}>{this.state.location}</Text>
                </View>
                <HorizontalSpace size={80} />
                <TouchableHighlight style={{ alignSelf:"center", backgroundColor:"#0000ff" }} onPress={ () => Actions.pop() }>
                    <Text style={{ color:"white", fontWeight:"bold", padding:8 }}>Home</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body : {
        flex : 1,
        padding: 10,
        justifyContent:"flex-start",
    },
    content : {
        padding: 10,
        borderRadius: 5,
        shadowOpacity: 10,
        backgroundColor:"#d9dad7",
    },
    title : {
        //backgroundColor: "#f4f4f4",
        fontWeight:"bold",
        padding:10,
        fontSize: 18,
    },
    value: {
        fontSize: 18,
        //borderBottomColor:"#3a3535",
        //borderBottomWidth: 4,
    }
});

export default Location;