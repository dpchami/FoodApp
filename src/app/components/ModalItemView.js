import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import propTypes from 'prop-types';
import { addCart } from '../../actions/products'
import Snackbar from 'react-native-snackbar';

class ModalItemView extends Component {

    add_to_cart = (item) => {
        this.props.addCart(item);

        Snackbar.show({
            title:"added to cart",
            duration: Snackbar.LENGTH_SHORT,
        })
    }

    add_like = () => {
        Snackbar.show({
            title: "like received",
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    render() {
        const item = this.props.item;
        return(
            <View style={styles.container}>
                <View style={styles.imageWrap}>
                    <Image
                        style={{ width: '100%' , height: this.props.height }}
                        source={{uri: item.img }}
                    /> 
                </View>
                <View>
                    <View style={styles.contentWrap}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{ item.name}</Text>
                    </View>
                    <View style={styles.contentWrap}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.value}>{ item.description}</Text>
                    </View>
                    <View style={styles.contentWrap}>
                        <Text style={styles.label}>Price:</Text>
                        <Text style={styles.value}>{"TZS " + item.price}</Text>
                    </View>

                    <View style={styles.actionWrap}>
                        <TouchableOpacity style={{ backgroundColor: '#0000ff', borderRadius:5 }} onPress={() => this.add_to_cart(item)}>
                            <Text style={styles.btnText}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius:5 }} onPress={() => this.add_like()}>
                            <Text style={styles.btnText}>Like</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

ModalItemView.propTypes = {
    item: propTypes.object.isRequired,
    addCart: propTypes.func
}

function initMapDispatchToProps(dispatch){
    return bindActionCreators({
        addCart
    },dispatch);
}

const styles  = StyleSheet.create({
    container : {
        //flex: 0.5,
        backgroundColor: '#fff',
        //borderRadius: 15,
        flexDirection:"column",
        justifyContent: "flex-start"
    },
    imageWrap : {
        padding: 10,
        //flex:1,
        flexDirection:"row",
    },
    contentWrap : {
        flexDirection:"row",
        //justifyContent: 'space-between',
        padding:5,
    },
    actionWrap: {
        padding:15,
       flexDirection: "row",
        justifyContent:"space-around",
    },
    label: {
        fontSize:14,
        padding:5,
        flex: 2,
        fontWeight:"bold",
    },
    value: {
        flex: 4,
    },
    btn : {
        
        borderRadius: 3,
    },
    btnText: {
        padding:5,
        color: "#fff",
        fontWeight:"bold",
    }
});

export default connect(null,initMapDispatchToProps)(ModalItemView);