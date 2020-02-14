import React, { Component } from 'react';

import { View, Text, StyleSheet, FlatList , SafeAreaView, Image, Dimensions} from 'react-native'
import colors from '../../config/colors'
import VendorCarousel from '../components/VendorCarousel';
import MenuTabView from '../components/MenuTabView';
const { width } = Dimensions.get('window'); 
 
class Home extends Component
{
    
    render(){
      return (
          <SafeAreaView style={styles.container}>
            <View style={styles.carouselContainer2}>
                <Text style={{ color : colors.BaseNavBarColor}}>Vendor List</Text>
                  <VendorCarousel />   
            </View>
            <View style={styles.contentWrap}>
              <MenuTabView />
            </View>
          </SafeAreaView>
      );
    }
}


export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BaseNavBackground,
    },
    contentWrap : {
      flex: 2,
    },
    carouselContainer2: { 
      flex : 1.5,
      width: width,
      height:width*0.8, 
      marginTop:10
    },
  });


