import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import propTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';
import { removeCart } from '../../actions/products'

class CartItem extends Component {

    remove_to_cart = ( item) => {
        this.props.removeCart(item);
    }

    render() {
        const item = this.props.item;
        console.log(item.count);
        return (
            <View style={ styles.main }>
                <Text style={styles.imageWrap}>{ item.count + 'x'}</Text>
                <Text style={ styles.contentWrap}>{ item.product.name }</Text>
                <Text style={ styles.amountWrap}>{ 'Tsh '+ item.product.price }</Text>
                <TouchableHighlight style={ styles.actionWrap } onPress={ () => this.remove_to_cart(item.product) }>
                    <Icon style={{color: 'black', }} name="trash" size={20} />
                </TouchableHighlight>
            </View>
        );
    }
}

CartItem.protoTypes = {
    item : propTypes.object.isRequired,
    removeCart: propTypes.func
}


function initMapDispatchToProps(dispatch){
    return bindActionCreators({
        removeCart
    },dispatch);
}

const styles = StyleSheet.create({
    main: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding:10,
    },
    imageWrap : {
        flex:0.5,
    },
    contentWrap: {
        flex: 3,
    },
    amountWrap: {
        flex: 2,
    },
    actionWrap: {
        flex: 0.5,
        paddingLeft: 3,
        paddingRight:3
    }
});

export default connect(null,initMapDispatchToProps)(CartItem)
