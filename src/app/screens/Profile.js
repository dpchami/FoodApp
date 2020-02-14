import React, { Component } from "react";
import { SafeAreaView, Text, Button, View, StyleSheet } from "react-native";
import { getToken,getUserName } from "../../store/local";
import { Actions } from "react-native-router-flux";


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: null,
            name: null,
            mobile: null,
            email: null,
            district: null,
            region: null,
            region: null,
        }
    }


    async componentDidMount(){
        let token = await getToken();
        let userName = await getUserName();
        this.setState({ token : token, name: userName });
        console.log(token); 
    }

    render() {
        if (this.state.token === null){
            return(
                <SafeAreaView style={{ justifyContent:"center",alignItems:"center", flex:1 }}>
                    <Text style={{ padding:10 }}>You have not login</Text>
                    <Button title="login now" color="black" onPress={() => Actions.login() } />
                </SafeAreaView>
            );
        } else {
            return(
                <SafeAreaView>
                	<View>
                		<Text>Name: </Text>
                    	<Text>{this.state.name}</Text>		
                	</View> 
                	<View>
                		<Text>Mobile: </Text>
                    	<Text>{this.state.mobile}</Text>		
                	</View> 
                	<View>
                		<Text>Email: </Text>
                    	<Text>{this.state.email}</Text>		
                	</View> 
                	<View>
                		<Text>Region: </Text>
                    	<Text>{this.state.region}</Text>		
                	</View>
                	<View>
                		<Text>District: </Text>
                    	<Text>{this.state.district}</Text>		
                	</View>     
                	<View>
                		<Text>Location: </Text>
                    	<Text>{this.state.location}</Text>		
                	</View>                
                </SafeAreaView>
            );
        }  
    }
}

const styles = StyleSheet.create({
	
});

export default Profile;
