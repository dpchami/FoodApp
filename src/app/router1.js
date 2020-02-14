import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './screens/Home'
import ProductView from './screens/ProductView';

class TabIcon extends Component {
    render() {
        var color = this.props.selected ? 'red' : 'blue';
    
        return (
          <View style={{  flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
            <Icon style={{paddingTop: 5, color: color}} name={this.props.iconName || "circle"} size={18}/>
            <Text style={{color: color, fontSize: 12}}>{this.props.title}</Text>
          </View>
        );
      }
}

const AppRouter = () => {
    return (
        <Router>
            <Scene key="root">
              <Scene key="tabbar" /* component={DrawerMenu} */ type="reset" duration={1} initial={true} >
                <Scene key="main" tabs={true} tabBarStyle={styles.tabStyle} default="tab1">
                  <Scene  key="tab1"
                          title="home"
                          iconName="user"
                          icon={TabIcon}
                          hideNavBar
                          component={Home}
                          initial={true}
                  />
                  <Scene  key="NewsFeed"
                          title="MainNewssFed"
                          iconName="newspaper-o"
                          icon={TabIcon}
                          hideNavBar={true}
                          component={ProductView}
                   />

                    <Scene  key="settings"
                            iconName="gear"
                            icon={TabIcon}
                            hideNavBar={true}
                            title="JustSetting" //{Local.settings}
                            component={ProductView} />
                    <Scene  key="tab4"
                            iconName="user"
                            icon={TabIcon}
                            hideNavBar={true}
                            title="JustSetting" //{Local.settings}
                            component={ProductView} />
                    <Scene  key="tab5"
                            iconName="bank"
                            icon={TabIcon}
                            hideNavBar={true}
                            title="JustSetting" //{Local.settings}
                            component={Home} />
                  </Scene>
                </Scene>
            </Scene>       
        </Router>
    );
} 

const styles = StyleSheet.create({
    tabStyle: {
      borderTopWidth: 0.5,
      borderColor: '#b7b7b7',
      backgroundColor: 'white',
      opacity: 1
    }
  
  });
export default AppRouter;