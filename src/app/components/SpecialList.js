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

class SpecialList extends Component {
    componentDidMount() { 
        const type = 'GET_SPECIAL_LIST';
        const option = {
            'category' : 8,
            'vendor': ''
        };
        this.props.fetchProduct(type,option);           
      }

    render() {
        const { specialLoading, specialError, specialMessage } = this.props;

        if (specialLoading){
            return (
                  <Loading />
              );
          } else
  
          if (specialError !== null) {
            return(
                <Error title={specialError} />
            );
          } else {
            return(
                  <SafeAreaView style={styles.container}>
                    <FlatList
                        data={specialMessage}
                        renderItem = {({ item }) => <ItemView product={item}/>}
                        keyExtractor={item => item.id}
                    />
                  </SafeAreaView>
            );
          }
    }
}

SpecialList.propTypes = {
    specialLoading: propTypes.bool.isRequired,
    specialMessage: propTypes.array,
    specialError: propTypes.object,
    fetchProduct: propTypes.func.isRequired,
  }
  
  function initMapStateToProps(state) {
    return {
      specialLoading: state.data.specialLoading,
      specialMessage: state.data.specialMessage,
      specialError: state.data.specialError,
    }
  }
  
  function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchProduct
    }, dispatch);
  }

export default connect(initMapStateToProps,initMapDispatchToProps)(SpecialList);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 5,
      backgroundColor: colors.BaseNavBackground,
    },
  });