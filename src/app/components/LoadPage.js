import React, { Component } from 'react'
import { View, Image, Text, StatusBar } from 'react-native'
import images from '../../config/images';


class LoadPage extends Component {

    render() {
        return (
            <View style={{ flex:1, backgroundColor: "#ffc928", alignItems:"center",justifyContent:"center"}}>
                <StatusBar backgroundColor="#ffc928"  barStyle="dark-content" />
                <Image
                    style={{
                        width: 80,
                        height: 50,
                    }}
                    source={ images.logo }
                />
            </View>
        );
    }
}
export default LoadPage;