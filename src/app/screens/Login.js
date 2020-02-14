import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import propTypes from 'prop-types';
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux';
import HorizontalSpace from '../components/HorizontalSpace';
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../../actions/auth';
import Loading from "../components/Loading";
import Snackbar from 'react-native-snackbar';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            mobile: '',
            password: '',
            showError: null,
        }
    }

    handleMobileChange = (mob) => {
        this.setState({ mobile : mob });
    }

    handlePasswordChange = (pass) => {
        this.setState({ password: pass });
    }

    hideShowError = () => {
        this.setState({ showError : false })
    }
    login = () => {
        //call login action with state values
        this.props.loginUser(this.state.mobile,this.state.password);
        this.setState({ showError: true });
    }

    render() {
        const { loginSuccess, loginError, loginLoading } = this.props;

        if (loginLoading) {
            return <Loading />
        } 
        if ((loginError !== null) && (this.state.showError)) {
            
            this.hideShowError();

            let errMsg = '';
            if (typeof loginError === 'string'){
                errMsg = loginError
            } else {
                errMsg = loginError.message;
            }

            Snackbar.show({
                title: errMsg,
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    title: 'Dismiss',
                    color: 'green',
                    onPress: () => { Snackbar.dismiss() },
                  },
              });
        } else if ((loginSuccess !== null) && this.state.showError)
        {
            this.hideShowError();

            Snackbar.show({
                title: 'User login successfully',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    title: 'Dismiss',
                    color: 'green',
                    onPress: () => { Snackbar.dismiss() },
                  },
              });
        }

        return(
            <View style={styles.bodyStyle}>
                <View>
                    <Text style={{ alignSelf:"center", color:"red" }}>{loginLoading?"loading...":null}</Text>
                </View>
                <View style={ styles.inputStyle }>
                    <Text style={styles.title}>Enter your Email/Mobile</Text>
                    <TextInput 
                        autoCorrect={false}
                        style={styles.input}
                        placeholder="Username/Mobile"
                        onChangeText={(text) => this.handleMobileChange(text)}
                        underlineColorAndroid="transparent"
                        keyboardType = "phone-pad"
                    />

                    <Text style={styles.title}>Enter your Password</Text>
                    <TextInput 
                        autoCorrect={false}
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={(text) => this.handlePasswordChange(text)}
                        underlineColorAndroid="transparent"
                        keyboardType = "default"
                        secureTextEntry={true}
                    />
                    <HorizontalSpace size={5} />
                    <TouchableHighlight style={styles.submitBtn} onPress={ () => this.login() } >
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableHighlight>
                </View>
                <HorizontalSpace size={10} />
                <View style={ styles.bottomStyle }>
                    <Text>Don't have account ?</Text>
                    <TouchableHighlight onPress={ () => Actions.register() }>
                        <Text style={{ color: 'red', fontWeight:"bold", padding: 5, }}>Create Account</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
} 

Login.propTypes = {
    loginError: propTypes.object,
    loginSuccess: propTypes.object,
    loginLoading: propTypes.bool,
    
    loginUser: propTypes.func 
}

function initMapStateToProps(state) {
    return {
        loginError: state.auth.loginError,
        loginSuccess: state.auth.loginSuccess,
      loginLoading: state.auth.loginLoading,
    }
  }
  
  function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
      loginUser
    }, dispatch);
  }

export default connect(initMapStateToProps,initMapDispatchToProps)(Login);

const styles = StyleSheet.create({
    bodyStyle: {
        flex :1,
        justifyContent: "flex-start",
        padding: 10,
    },
    title : {
        fontWeight:"bold",
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 15,
    },
    input : {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
    },
    submitBtn: {
        backgroundColor: 'blue',
        justifyContent:"center",
        padding: 10,
    },
    btnText : {
        color: '#fff',
        fontSize: 16,
        alignSelf:"center",
    },
    bottomStyle : {
       alignItems:"center",
    },
});