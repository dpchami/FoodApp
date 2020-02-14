import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);

export default class CustomTabView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
      { key: 'third', title: 'Third' },
      { key: 'fourth', title: 'Fourth' },
      { key: 'second', title: 'Second' },
      { key: 'third', title: 'Third' },
      { key: 'fourth', title: 'Fourth' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 255 : 0
                ),
              })
            ),
            0,
            0
          );

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: FirstRoute,
    fourth: SecondRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={{ width: Dimensions.get('window').width }}
      />

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
});


{/* <TabView 
        navigationState={this.state} 
        renderScene={SceneMap({ 
          first: FirstRoute, 
          second: SecondRoute, 
          third: ThirdRoute, 
          fourth: FourthRoute, 
          fifth: FifthRoute, 
          sixth: SixthRoute, 
        })} 
        onIndexChange={index => this.setState({ index })} 
        swipeEnabled={false} 
        renderTabBar= {props => 
          <ScrollView 
            horizontal 
            style={{
              width: width, 
              height: 55, 
              paddingBottom: -400, 
              marginRight: 0, 
              marginBottom: -400, 
              elevation: 4
            }} 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ 
              paddingBottom: 0, 
              marginBottom: 0 
            }} 
            decelerationRate={6.5} 
            snapToInterval={width - 100} 
            snapToAlignment={"center"} > 
            <TabBar {...props} indicatorStyle={{ 
                backgroundColor: 'white', 
                fontSize: 16, 
                fontWeight: '500' 
              }} 
              labelStyle={{ 
                fontSize: 16, 
                fontWeight: '400'
              }} 
              tabStyle={{marginRight: 25}} 
              style={{ 
                backgroundColor: '#f4511e', 
                height: 55, 
                paddingBottom: 0, 
                marginBottom: 0 
              }} 
            /> 
            </ScrollView> 
          } 
        initialLayout={{ width: Dimensions.get('window').width, height: 0 }} 
      /> */}