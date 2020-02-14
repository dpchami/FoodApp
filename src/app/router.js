import React, { Component } from 'react'
import { StyleSheet, Text, View, PixelRatio, StatusBar, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Router, Scene,Drawer, Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../config/colors'
import Home from './screens/Home'
import Login from './screens/Login'
import Notification from './screens/Notification'
import ProductList from './screens/ProductList';
import Cart from './screens/Cart';
import { SideMenu } from './components/Drawer';
import Order from './screens/Order';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Location from './screens/Location';
import Info from './screens/Info';

class TabIcon extends Component {
      render () {

        var color = this.props.focused
            ? this.props.activeTintColor //'#3b5998'
            : this.props.inactiveTintColor//'#93a8d5'

        let componentBody =
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center',justifyContent: 'center'}}>
                <Icon style={{color: color, paddingTop:8}} name={this.props.iconName || "circle"} size={20} />
                <Text style={{color: color}}>{this.props.title}</Text>
            </View>

        return componentBody;
    }
}

class NavBar extends Component {
    componentDidMount() {
        Actions.refresh({key: 'drawer', ref: this.refs.navigationDrawer});
    }
     render() {
        var color = colors.BaseNavBarColor;
        //00539CFF best until now
        return (
            <View>
                <StatusBar backgroundColor={ colors.BaseNavBackground } barStyle="light-content" />
                <View style={{ padding:20, backgroundColor:colors.BaseNavBackground, flexDirection:'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity 
                        onPress={() => Actions.drawerOpen()}
                    >
                        <Icon style={{color: color, paddingRight: 20 }} name= "bars" size={20}/> 
                    </TouchableOpacity>
                    <Text style={{color: color, fontWeight:'bold', fontSize:16 }}>Taste-ish</Text>
                    <TouchableOpacity onPress={() =>{
                         Actions.notification()
                    }}>
                        <Icon style={{color: color }} name= "bell" size={20}/> 
                    </TouchableOpacity>
                </View>
            </View>
          
        );
      } 
}

class CartNavBar extends Component {
    render() {
       var color = colors.BaseNavBarColor;
       //00539CFF best until now
       return (
           <View>
               <StatusBar backgroundColor={ colors.BaseNavBackground } barStyle="light-content" />
               <View style={{ padding:20, backgroundColor:colors.BaseNavBackground, flexDirection:'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => Actions.drawerOpen()} >
                        <Icon style={{color: color }} name= "bars" size={25}/> 
                    </TouchableOpacity>
                   <Text style={{color: color, fontWeight:'bold', fontSize:16 }}>Msosi App</Text>
                   <TouchableOpacity onPress={() => Actions.tab1()} >
                            <Icon style={{color: color }} name= "plus" size={20}/> 
                    </TouchableOpacity>
               </View>
           </View>
         
        );
        }
    } 

     class CustomNavBar extends Component {
        render() {
           var color = colors.BaseNavBarColor;
           //00539CFF best until now
           return (
               <View>
                   <StatusBar backgroundColor={ colors.BaseNavBackground } barStyle="light-content" />
                   <View style={{ padding:20, backgroundColor:colors.BaseNavBackground, flexDirection:'row', justifyContent: 'space-between'}}>
                        <TouchableHighlight 
                            onPress={() => Actions.tab1()}
                        >
                            <Icon style={{color: color }} name= "arrow-left" size={25}/> 
                        </TouchableHighlight>
                        <Text style={{color: color, fontWeight:'bold', fontSize:16 }}>{ this.props.title }</Text>
                       <Text></Text>
                   </View>
               </View>
             
           );
         } 
    }



const AppRouter = () => {
    return (
        <Router>
            <Scene key="root">
                <Drawer
                    key="drawer"
                    hideNavBar
                    contentComponent={SideMenu}
                    panHandlers={null}
                    drawerWidth={300}
                    drawerPosition="left"
                >

                <Scene 
                    key="login" 
                    title = 'Login'
                    // hideNavBar
                    component={Login} 
                    navBar = { CustomNavBar }
                />

                <Scene 
                    key="register" 
                    title = 'Registration'
                    // hideNavBar
                    component={Register} 
                    navBar = { CustomNavBar }
                />

                <Scene 
                    key = "location"
                    title = "Location"
                    component={Location}
                    navBar = { CustomNavBar }
                />
 
                <Scene 
                    key="info" 
                    title = 'Info'
                    // hideNavBar
                    component={Info} 
                    navBar = { CustomNavBar }
                />

                <Scene 
                    key="tabbar" 
                    tabs 
                    tabBarStyle={ styles.tabStyle }
                    activeTintColor= { colors.TabActiveText }
                    inactiveTintColor= { colors.TabInActiveText } 
                    showLabel={false}
                    hideNavBar
                    initial={true} 
                >
            
                    <Scene 
                        key="tab1" 
                        title="Home"
                        icon={TabIcon} 
                        iconName="home"
                        navBar = { NavBar }
                    > 
                        <Scene key="home" component={Home} initial={true} hideTabBar={false} />
                        <Scene key="products" component={ProductList} hideTabBar={false} />
                        <Scene key="notification" component={Notification} hideNavBar hideTabBar={false} />
                    </Scene>
                    <Scene 
                        key="tab2" 
                        title="Order"
                        icon={TabIcon} 
                        iconName="wpforms"
                        navBar = { NavBar }
                        //hideNavBar
                    >
                        <Scene 
                            key="product" 
                            title = 'Product View'
                           // hideNavBar
                            component={Order} 
                        />
 
                    </Scene>
                    <Scene 
                        key="tab3" 
                        title="Cart"
                        icon={TabIcon} 
                        iconName="shopping-cart"
                        navBar = { CartNavBar }
                        //hideNavBar
                    >
                        <Scene 
                            key="cart" 
                            title = 'Cart'
                            //navBar = { CartNavBar }
                            //hideNavBar
                            component={Cart} 
                        />
 
                    </Scene>
                    <Scene 
                        key="tab4" 
                        title="Profile"
                        icon={TabIcon} 
                        iconName="user"
                        navBar = { NavBar }
                    >
                        <Scene 
                            key="profile" 
                            title = 'Profile'
                            //hideNavBar
                            component={Profile} 
                        />
                    </Scene>
                </Scene>   
            </Drawer>           
            </Scene>          
        </Router>
    );
} 

const styles = StyleSheet.create({
    tabStyle: {
      borderTopColor: 'darkgrey',
      borderTopWidth: 1 / PixelRatio.get(),
      backgroundColor: colors.TabBackgroundColor,
      opacity: 0.98
    },
  });
export default AppRouter;