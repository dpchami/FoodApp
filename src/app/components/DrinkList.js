import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList , SafeAreaView} from 'react-native'

import ItemView from './ItemView';
import colors from '../../config/colors'
import { fetchProduct } from '../../actions/products'
import Loading from './Loading';
import Error from "./Error";

class DrinkList extends Component {
    componentDidMount() { 
        const type = 'GET_DRINK_LIST';
        const option = {
            'category' : 7,
            'vendor': ''
        };
        this.props.fetchProduct(type,option);           
      }

    render() {
        const { drinkLoading, drinkError, drinkMessage } = this.props;

        if (drinkLoading){
            return (
              <Loading />
            );
          } else
  
          if (drinkError !== null) {
            return(
              <Error title={drinkError} />
            );
          } else {
            return(
                  <SafeAreaView style={styles.container}>
                    <FlatList
                        data={drinkMessage}
                        renderItem = {({ item }) => <ItemView product={item}/>}
                        keyExtractor={item => item.id}
                    />
                  </SafeAreaView>
            );
          }
    }
}

DrinkList.propTypes = {
    drinkLoading: propTypes.bool.isRequired,
    drinkMessage: propTypes.array,
    drinkError: propTypes.object,
    fetchProduct: propTypes.func.isRequired,
  }
  
  function initMapStateToProps(state) {
    return {
      drinkLoading: state.data.drinkLoading,
      drinkMessage: state.data.drinkMessage,
      drinkError: state.data.drinkError,
    }
  }
  
  function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchProduct
    }, dispatch);
  }

export default connect(initMapStateToProps,initMapDispatchToProps)(DrinkList);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 5,
      backgroundColor: colors.BaseNavBackground,
    },
  });