import React, { Component } from 'react'
import {Drawer,Text, View, StyleSheet, TouchableHighlight, TouchableOpacity ,StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux';
import { getToken, getUserName } from '../../store/local';
import { logoutUser } from '../../actions/auth';

const Header = (props) => {
    if (props.token === null) {
        return(
            <View style={styles.topDiv}>
                <Text style={ styles.mainText }>Log in to your account</Text>
            </View>
        );
    } else {
        return(
            <View style={styles.topDiv}>
                <Text style={ styles.mainText }>{ "Welcome, " + props.username   }</Text>
            </View>
        );
    }
}

const AuthAction = (props) => {
    if (props.token === null) {
        return(
            <TouchableOpacity style={styles.links} onPress={() => Actions.login() }>
                <Icon 
                    style={{ fontWeight:'bold' }}
                    name = "sign-in"
                    size = {20}
                />
                <Text style={ styles.textStyle }>Log in</Text>
            </TouchableOpacity>
        );
    } else {
        return(
            <TouchableOpacity style={styles.links} onPress={() => logoutUser() }>
                <Icon 
                    style={{ fontWeight:'bold' }}
                    name = "power-off"
                    size = {20}
                />
                <Text style={ styles.textStyle }>Log out</Text>
            </TouchableOpacity>
        );
    }
}


export class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token : null,
            name : '',
        }
    };

    async componentDidMount(){
        let token = await getToken();
        let name = await getUserName();

        this.setState({ token: token,name: name });
    } 

    async componentDidUpdate(){
        let token = await getToken();
        let name = await getUserName();

        this.setState({ token: token,name: name });
    }



    render() {
        return (
            <View style={styles.container}>
                <Header token={this.state.token} username={this.state.name} /> 
                <View style={styles.bottomDiv}>
                    <TouchableOpacity style={styles.links} onPress={() => Actions.location()}>
                        <Icon 
                            name = "map-marker"
                            size = {20}
                        />
                        <Text style={ styles.textStyle }>My location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.links} onPress={() => Actions.tab2()}>
                        <Icon 
                            style={{ fontWeight:'bold' }}
                            name = "building-o"
                            size = {20}
                        />
                        <Text style={ styles.textStyle }>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.links} onPress={() => Actions.info() }>
                        <Icon 
                            style={{ fontWeight:'bold' }}
                            name = "info"
                            size = {20}
                        />
                        <Text style={ styles.textStyle }>Info</Text>
                    </TouchableOpacity>
                    <AuthAction token={this.state.token} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'white',
        /* paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10, */

    },
    topDiv : {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#EAB66A',
        padding:10,
    },
    bottomDiv : {
        flex:4,
        padding:10,
    },
    textStyle : {
        fontSize: 16,
        paddingLeft:10
    },
    mainText:{
        fontWeight:"bold",
        fontSize: 16,
        color: "#000"
    },
    links :{
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft:10,
        flexDirection:"row",
        justifyContent:"flex-start"
    }

});