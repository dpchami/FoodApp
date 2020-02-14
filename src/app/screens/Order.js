import React, { Component } from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux';
import { View, Text, Button, FlatList } from 'react-native';
import { getToken } from '../../store/local';
import { Actions } from 'react-native-router-flux';
import { getHistory } from '../../actions/products'
import Loading from '../components/Loading';
import OrderItem from '../components/OrderItem';
import Error from '../components/Error';

class Order extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: null
        }
    }

    async componentDidMount() {
        let token = await getToken();
        this.setState({ token : token }); 

        this.props.getHistory(token);
    }

    render(){
        const { orderHistoryError, orderHistoryLoading, orderHistoryMessage } = this.props;

        if (this.state.token === null)
        {
            return (
                <View style={{ justifyContent:"center",alignItems:"center", flex:1 }}>
                    <Text style={{ padding:10 }}>
                        Kindly login in to view previous orders
                    </Text>
                    <View style={{ width: 80 }}>
                        <Button  title="login" color="black" onPress={ () => Actions.login() } />
                    </View>
                </View>
            );
        }

        if (orderHistoryLoading){
            return (
                <Loading />
            );
        } else if( orderHistoryError !== null){
            return (
                <Error title={orderHistoryError} />
            );
        } else if ( orderHistoryMessage !== null ) {

            if (orderHistoryMessage.length > 0){
                return (
                    <View>
                        <FlatList
                            data={orderHistoryMessage}
                            renderItem = {({ item }) => <OrderItem order={item}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                );
            } else{
                return (
                    <View>
                        <Text>System encounter empty order</Text>
                    </View>
                );
            }
           
        } else {
            return (
                <Loading />
            );
        }
    }
}

Order.propTypes = {
    orderHistoryLoading: propTypes.bool,
    orderHistoryError: propTypes.object,
    orderHistoryMessage: propTypes.object,
    getHistory: propTypes.func
}

function initMapStateToProps(state) {
    return {
        orderHistoryLoading: state.data.orderHistoryLoading,
        orderHistoryMessage: state.data.orderHistoryMessage,
        orderHistoryError: state.data.orderHistoryError,
    }
  }
  
  function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
      getHistory
    }, dispatch);
  }

export default connect(initMapStateToProps,initMapDispatchToProps) (Order);