import React, { Component } from 'react';
import { ScrollView, StyleSheet, SectionList,View, Text, TouchableHighlight, Image, Dimensions  } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import colors from '../../config/colors'
import MenuList from './MenuList';
import DrinkList from './DrinkList';
import SpecialList from './SpecialList';

class FirstRoute extends Component 
{
  render(){
    return(
      <View style={ styles.tabScene}>
        <MenuList category = 'hot_menu' />
    </View>  
    );
  }
}
class SecondRoute extends Component 
{
  render(){
    return(
      <View style={ styles.tabScene}>
        <DrinkList />
    </View>  
    );
  }
}

class ThirdRoute extends Component 
{
  render(){
    return(
      <View style={ styles.tabScene}>
        <SpecialList />
    </View>  
    );
  }
}
  


export default class MenuTabView extends Component {
    static navigationOptions = {
        title: 'Bookings',
        headerStyle: {
        backgroundColor: '#0087e2',
    },
    headerTintColor: '#fff',
    
  };

  _renderHeader = props => 
      <TabBar {...props} 
      scrollEnabled = {true}
      indicatorStyle={{ 
        backgroundColor: colors.TabActiveText, 
        fontSize: 16, 
        fontWeight: 'bold' 
      }} 
      labelStyle={{ 
        fontSize: 14, 
        fontWeight: 'bold',
        color: colors.TabActiveText,
      }} 
      tabStyle={{
        marginRight: 10,
        padding: 0
      }} 
      style={{ 
        backgroundColor: colors.White, 
        height: 45, 
        paddingBottom: 0, 
        marginBottom: 0 
      }} 
    /> 
constructor(props){
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'Upcoming', title: 'Hot Menu' },
        { key: 'Past', title: 'Drinks' },
        { key: 'Cancelled', title: 'Special Menu' },
      ],
    };
}

render() {
    return (
        <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              Upcoming: FirstRoute,
              Past: SecondRoute,
              Cancelled: ThirdRoute,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar = {this._renderHeader}
        />
    );
}
}



const styles = StyleSheet.create({
 tabScene: {
   flex: 1,
 }
});