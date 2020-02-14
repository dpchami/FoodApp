import React, { Component } from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image } from 'react-native'
import propTypes from 'prop-types';
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux';
import { fetchProductList } from '../../actions/products';
import Loading from '../components/Loading';
import Error from '../components/Error'
import ItemView from '../components/ItemView';
import colors from '../../config/colors';


const styles = StyleSheet.create({
    Body: {
        flexDirection:'row',
        justifyContent: 'space-around',
        paddingRight: 10,
        paddingBottom: 4,
        backgroundColor: colors.White,
        marginBottom: 3,
    },
    ImageWrap : {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    DescriptionWrap: {
        flex: 5,
    },
    ItemContentStyle: {
        color: colors.TabActiveText,
    },
    ModalStyle : {
        flexDirection: 'column',
        backgroundColor:'#fff',
        flex: 3,
    },
    amountWrap : {
        paddingTop:5,
        flexDirection:'row', 
        justifyContent: 'space-between'
    },
    amountButton : {
        padding:3,  
        fontSize: 10,
        color: colors.White,
        backgroundColor: colors.TabActiveText, 
        fontWeight: 'bold', 
        borderRadius: 5
    }
});


const ProductView = (props) => {
    return (
        <SafeAreaView style={ styles.Body }>
            <View style={styles.ImageWrap}>
                <Image
                    style={{ width: 70, height:70, borderRadius: 15 }}
                    source={{uri: props.item.img }}
                />      
            </View>
            {/* description space */}
            <View style={styles.DescriptionWrap}>
                <Text style={[ styles.ItemContentStyle, { fontSize:12,fontWeight:"bold" }]}>{ props.item.name }</Text>
                <Text style={[ styles.ItemContentStyle, { fontSize:12 }]}>{ props.item.description }</Text>
                <View style={ styles.amountWrap }>
                    <Text style={ styles.amountButton }> {'Tsh ' + props.item.price }</Text>
                </View>
            </View>
        </SafeAreaView>
    );
} 

class ProductList extends Component {

    componentDidMount()
    {
        let value = this.props.value;
        let type = this.props.pro_type;
        console.log(value);
        console.log(type);
        this.props.fetchProductList('order',31);        
    }

    render() {
        const { customProductError, customProductLoading, customProductMessage } = this.props;
        
        if (customProductLoading)
        {
            return  <Loading />
        } else if (customProductError !== null) {
            return <Error title={productError}/>
        } else {

            if ( customProductMessage && customProductMessage.length > 0){

                if (this.props.pro_type === 'vendor'){
                    return (
                        <FlatList
                            style={{ flex:1 }}
                            data={customProductMessage}
                            renderItem = {({ item }) => <ItemView  product={item} /> }
                            keyExtractor={item => item.id}
                        />
                    );
                } else {
                    return (
                        <FlatList
                            style={{ flex:1 }}
                            data={customProductMessage}
                            renderItem = {({ item }) => <ProductView item={item}/> }
                            keyExtractor={item => item.id}
                        />
                    );
                }
            } else {
                return (
                    <View>
                        <Text>0 product(s) found</Text>
                    </View>
                );
            }   
        }
    }
}

ProductList.propTypes = {
    customProductLoading: propTypes.bool,
    customProductError: propTypes.object,
    customProductMessage: propTypes.array,
    fetchProductList: propTypes.func, 
    pro_type: propTypes.string.isRequired,
    value: propTypes.number.isRequired
}

function initMapStateToProps(state) {
    return {
        customProductLoading: state.data.customProductLoading,
        customProductError: state.data.customProductError,
        customProductMessage: state.data.customProductMessage,
    }
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchProductList
    }, dispatch);
}

export default connect(initMapStateToProps,initMapDispatchToProps) (ProductList);