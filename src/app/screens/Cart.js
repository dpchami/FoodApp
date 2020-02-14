import React, { Component } from 'react'
import { SafeAreaView, Text, FlatList, View, StyleSheet, TouchableHighlight } from  'react-native'
import propTypes from 'prop-types';
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux';
import CartItem from '../components/CartItem';
import colors  from '../../config/colors';
import { createOrder, clearCart } from '../../actions/products';
import { getToken } from '../../store/local';
import Snackbar from 'react-native-snackbar';
import { Actions } from 'react-native-router-flux';
import Loading from '../components/Loading';

const MyItem = (props) => {
    return (
        <View style={{ paddingBottom:5 }}>
            <Text style={{ fontSize:18, fontWeight:"bold"}}>Selected products are: </Text>
            {
                props.data.map((item) => {
                    return <CartItem item={item} />
                })
            }
        </View>
    );
}

class Cart extends Component {
     constructor(props){
         super(props);
         this.state = {
             carts : [],
             token : null,
             showError: null,
         };
         this.carts = [];
    }
    
    async componentDidMount() {
    	let token = await getToken();
    	
    	this.setState({ token : token});
    }
    
    
    componentDidUpdate()
    {
        this.updateCartList();
    }
    
    hideShowError = () => {
        this.setState({ showError : false })
    }
    
    completeOrder = () => {
    	if (this.state.token === null){
    		Snackbar.show({
                title: 'Please login to complete',
                duration: Snackbar.LENGTH_LONG,
                action: {
                    title: 'login',
                    color: 'green',
                    onPress: () => { Actions.login() },
                  },
              });
    	} else {
    		//send cart items to server
    		this.props.createOrder(this.state.token,this.props.cartList); 
    		this.setState({ showError: true });
    	}
    
    }

    updateCartList = () => {
        this.carts = this.props.cartList
    } 

    render() {
        //onst cartList = this.updateCartList();
        const { orderLoading, orderError, orderMessage } = this.props;
        
        if (orderLoading) {
        	return (
                <Loading />
            );
        } else if ((orderError !== null) && (this.state.showError)) {
         	this.hideShowError();
         	
         	let errMsg = '';
            if (typeof orderError === 'string'){
                errMsg = orderError
            } else {
                errMsg = orderError.message;
            }
            
         	Snackbar.show({
                title: errMsg,
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    title: 'Dismass',
                    color: 'green',
                    onPress: () => { Snackbar.dismiss() },
                  },
              });
         } else if ((orderMessage !== null) && (this.state.showError)){
         	this.hideShowError();
         	
         	//call clear cart function
         	this.props.clearCart();
         	            
         	Snackbar.show({
                title: 'Order successfully created',
                duration: Snackbar.LENGTH_SHORT,
              });
         }
        
        this.updateCartList();
        let total = 0;
        //console.log(this.carts);
        if ( this.carts && this.carts.length > 0)
        {
            this.carts.forEach(item => {
                total = (parseInt(item.product.price)*item.count) + total;
            });
            return (
                <SafeAreaView style={styles.body}>

                    <MyItem data={this.carts} /> 

                    <View style={styles.amountStyle}>
                        <Text style={ styles.header }>SubTotal</Text>
                        <Text>{total}</Text>
                    </View>
                    <View style={styles.amountStyle}>
                        <Text style={ styles.header }>Delivery</Text>
                        <Text>free</Text>
                    </View>
                    <View style={styles.amountStyle}>
                        <Text style={ styles.header }>Total</Text>
                        <Text>{total}</Text>
                    </View>
                    <TouchableHighlight style={ styles.completeBtn } onPress={ () => this.completeOrder() }>
                        <Text style={styles.btnText}>COMPLETE ORDER</Text>
                    </TouchableHighlight>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView>
                    <Text>Empty cart found</Text>
                </SafeAreaView>
            );
        }
        
    }
}

Cart.propTypes = {
    cartList: propTypes.array.isRequired, 
    orderLoading: propTypes.bool,
    orderError: propTypes.object,
    orderMessage: propTypes.object,
    createOrder: propTypes.func,
    clearCart : propTypes.func
}

function initMapStateToProps(state) {
    return {
        cartList : state.data.cartList,
        orderLoading : state.data.orderLoading,
        orderError : state.data.orderError,
        orderMessage : state.data.orderMessage
    }
}

function initMapDispatchToProps(dispatch) {
	return bindActionCreators({
      createOrder,
      clearCart
    }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps) (Cart);

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'darkgrey',
        paddingBottom: 10,
        //paddingTop: 10,
    },
    amountStyle: {
        paddingTop: 6,
        paddingLeft: 10,
        paddingRight:10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    header: {
        flex:1,
        fontWeight:"bold"
    },
    amount: {
        flex: 1,
    },
    completeBtn: {
        alignSelf:'center',
        padding:8,
        backgroundColor: colors.BaseNavBackground,
        borderRadius:25,
    },
    btnText : {
        color:colors.BaseNavBarColor,
        fontSize:14,
        fontWeight:"bold",
        padding:2,
        

    }
});

//export default connect(initMapStateToProps,null)(Cart);
