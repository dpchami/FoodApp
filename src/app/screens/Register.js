import React, { Component } from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux';
import { View, ScrollView, Text, TextInput, Picker,StyleSheet, TouchableHighlight } from 'react-native';
import HorizontalSpace from '../components/HorizontalSpace';
import { registerUser } from "../../actions/auth";
import Loading from '../components/Loading';
import Snackbar from 'react-native-snackbar';

class Register extends Component {
    constructor(props){
        super(props);
        this.state ={ 
            name: "",
            mobile: "",
            email: "",
            location: "",
            password: "",
            re_password: "",
            district: "Dodoma",
            region: "Dodoma",
            showError: null,
        }
    }

    options = ["Kiwanja cha ndege","Chimwaga","Hazina","Chamwino","Nzuguni", "Nkuhungu", "Chang'ombe", ];
    district = ['Dodoma'];

    handleNameChange = ( text ) => {
        this.setState({ name : text });
    }

    handleMobileChange = (text) => {
        this.setState({ mobile: text })
    }

    handleEmailChange = (text) => {
        this.setState({ email: text })
    }

    handlePasswordChange = (text) => {
        this.setState({ password: text })
    }

    handleConfirmChange = (text) => {
        this.setState({ re_password: text })
    }

    validateInput = () => {
        var errMsg = ''
        var response  = true;

        if (!this.state.name || !this.state.mobile || !this.state.email || !this.state.password) 
        {
            errMsg += this.state.name ? "" : "Name cannot be empty \n";
            errMsg += this.state.mobile ? "" : "Mobile number cannot be empty \n";
            errMsg += this.state.email ? "" : "Email cannot be empty \n";
            errMsg += this.state.password ? "" : "Password cannot be empty \n";
            response = false;
        } else {
            if ((this.state.mobile.length !== 10) || isNaN(this.state.mobile) ){
                errMsg += "Mobile must have 10 digits \n";
                response = false;
            } 

            let re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!re.test(this.state.email)){
                errMsg += "Email is not Valid \n";
                response = false;
            }
            if (this.state.password !== this.state.re_password)
            {
                errMsg += "Passwords are not the same \n";
                response = false;
            }
        }

        return [response,errMsg];
    }

    hideShowError = () => {
        this.setState({ showError : false })
    }

    submitRegistration = () => {
        /* var name = this.state.name;
        var mobile = this.state.mobile;
        var email = this.state.email;
        var location = this.state.location;
        var password = this.state.password; */

        let check = this.validateInput();
        if (check[0]){
            //lert("we will submit data");
            this.props.registerUser(this.state)
            //allow error to display
            this.setState({ showError: true })
        } else {
            alert(check[1]);
        }
    }

    render() {
        const { registerSuccess, registerError, registerLoading } = this.props;

        if (registerLoading) {
            return(
                <Loading />
            );
        } else if ((registerError !== null) && this.state.showError) {
            //set error alert off
            //this.setState({showError : false})
            this.hideShowError();

            let errMsg = '';
            if (typeof registerError === 'string'){
                errMsg = registerError
            } else {
                errMsg = registerError.message;
            }
            
            //display error msg
            Snackbar.show({
                title: errMsg,
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    title: 'Dismiss',
                    color: 'green',
                    onPress: () => { Snackbar.dismiss() },
                  },
              });
        } else if ((registerSuccess !== null) && this.state.showError)
        {
            this.hideShowError();

            Snackbar.show({
                title: 'User registration completed',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    title: 'Dismiss',
                    color: 'green',
                    onPress: () => { Snackbar.dismiss() },
                  },
              });
        }
        return(
            <ScrollView style={ styles.body}>
                <Text style={ styles.label }>Enter full name</Text>
                <TextInput 
                        autoCorrect={false}
                        style={styles.input}
                        placeholder="name"
                        onChangeText={(text) => this.handleNameChange(text)}
                        underlineColorAndroid="transparent"
                        //keyboardType = "number-pad"d
                    />

                <Text style={ styles.label }>Enter Mobile number</Text>
                <TextInput 
                        autoCorrect={false}
                        style={styles.input}
                        placeholder="mobile"
                        onChangeText={(text) => this.handleMobileChange(text)}
                        underlineColorAndroid="transparent"
                        keyboardType = "number-pad"
                    />

                <Text style={ styles.label }>Enter Email</Text>
                <TextInput 
                        autoCorrect={false}
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={(text) => this.handleEmailChange(text)}
                        underlineColorAndroid="transparent"
                        keyboardType = "email-address"
                    />
                
                <Text style={[styles.label, { paddingTop: 5}]}>Location</Text>
                <View style={{ flexDirection:"row", justifyContent:"space-between" }}>
                <Picker
                        selectedValue={this.state.district}
                        style={{height: 50, width: 150, }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({location: itemValue})
                        }>
                        {this.district.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index}/>) 
                        })}
                    </Picker>
                    <Picker
                        selectedValue={this.state.location}
                        style={{height: 50, width: 150, }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({location: itemValue})
                        }>
                        {this.options.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index}/>) 
                        })}
                    </Picker>
                </View>
            

                <Text style={ styles.label }>Enter password</Text>
                <TextInput 
                    autoCorrect={false}
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => this.handlePasswordChange(text)}    
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    //keyboardType = "number-pad"d
                />

                <Text style={ styles.label }>Confirm password</Text>
                <TextInput 
                    autoCorrect={false}
                    style={styles.input}
                    placeholder="Confirm password"
                    onChangeText={(text) => this.handleConfirmChange(text)}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    //keyboardType = "number-pad"d
                />

                <HorizontalSpace size={10} />
                <TouchableHighlight style={styles.submitBtn} onPress={ () => this.submitRegistration() } >
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableHighlight>

            </ScrollView>
        );
    }
}

Register.propTypes = {
    registerLoading: propTypes.bool,
    registerError: propTypes.object,
    registerSuccess: propTypes.object,
    registerUser: propTypes.func
}

function initMapStateToProps(state) {
    return {
      registerLoading: state.auth.registerLoading,
      registerError: state.auth.registerError,
      registerSuccess: state.auth.registerSuccess,

    }
  }
  
  function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
      registerUser
    }, dispatch);
  }

export default connect(initMapStateToProps,initMapDispatchToProps) (Register);

const styles = StyleSheet.create({
    body: {
        padding: 10,
    },
    label: {
        fontWeight:"bold",
        fontSize: 15,
    },
    input: {
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
});