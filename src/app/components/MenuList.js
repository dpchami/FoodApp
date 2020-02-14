import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList , SafeAreaView } from 'react-native'

import ItemView from './ItemView';
import colors from '../../config/colors'
import { fetchProduct } from '../../actions/products'
import Loading from './Loading';
import Error from "./Error";

class MenuList extends Component {
    componentDidMount() {
          if (this.props.category === 'hot_menu')
          {
              const type = 'GET_PRODUCT_LIST';
              const option = {
                  'category' : 6,
                  'vendor': ''
              };
              this.props.fetchProduct(type,option); 
          } 

          else if (this.props.category === 'special') 
          {
              const type = 'GET_PRODUCT_LIST';
              const option = {
                  'category' : 8,
                  'vendor': ''
              };
              this.props.fetchProduct(type,option); 
          } 

          else if (this.props.category === null) 
          {
              const type = 'GET_PRODUCT_LIST';
              const option = {
                  'category' : 6,
                  'vendor': ''
              };
              this.props.fetchProduct(type,option);
          }
           
      }

    render() {
        const { productLoading, productError, productMessage } = this.props;

        if (productLoading){
            return (
                <Loading />
            );
          } else
  
          if (productError !== null) {
            return(
              <Error title={productError} />
            );
          } else {
            return(
                  <SafeAreaView style={styles.container}>
                    <FlatList
                        data={productMessage}
                        renderItem = {({ item }) => <ItemView product={item}/>}
                        keyExtractor={item => item.id}
                    />
                  </SafeAreaView>
            );
          }
    }
}

MenuList.propTypes = {
    productLoading: propTypes.bool.isRequired,
    productMessage: propTypes.array,
    productError: propTypes.object,
    category: propTypes.string,
    fetchProduct: propTypes.func.isRequired,
  }
  
  function initMapStateToProps(state) {
    return {
      productLoading: state.data.productLoading,
      productMessage: state.data.productMessage,
      productError: state.data.productError,
    }
  }
  
  function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchProduct
    }, dispatch);
  }

export default connect(initMapStateToProps,initMapDispatchToProps)(MenuList);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 5,
      backgroundColor: colors.BaseNavBackground,
    },
  });