import React, { Component } from 'react'
import { View,Image, Text, StyleSheet, TouchableOpacity,Button, Dimensions } from 'react-native'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors';
import ModalItemView from './ModalItemView';

class ItemView extends Component {
    state = {
        isModalVisible: false
    };
    
    toggleModal = () => {
        console.log('pressed');
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render(){
        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios" ? Dimensions.get("window").height: require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
        const product = this.props.product;
        return (
            <View>
                <TouchableOpacity onPress={ this.toggleModal }>
                    <View style={styles.Body}>
                        {/* image space */}
                        <View style={styles.ImageWrap}>
                            <Image
                                style={{ width: 70, height:70, borderRadius: 15 }}
                                source={{uri: product.img }}
                            />      
                        </View>
                        {/* description space */}
                        <View style={styles.DescriptionWrap}>
                            <Text style={[ styles.ItemContentStyle, { fontSize:12,fontWeight:"bold" }]}>{ product.name }</Text>
                            <Text style={[ styles.ItemContentStyle, { fontSize:12 }]}>{ product.description }</Text>
                            <View style={ styles.amountWrap }>
                                <Text style={ styles.amountButton }> {'Tsh ' + product.price }</Text>
                                <Text style={ styles.amountButton }> {'12:00 AM - 04:00 PM'}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <ItemModal product={product} is_visible={this.state.isModalVisible} toggle_modal={this.toggleModal} />
            </View>
        );  
    }
}

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

const ItemModal = ({ product, is_visible, toggle_modal }) => {
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Platform.OS === "ios" ? Dimensions.get("window").height: require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
    const imageHeight = deviceHeight / 4;
    const imageWidth = deviceWidth / 2;
    return (
        <Modal isVisible={is_visible}  
            //onBackdropPress={ toggle_modal } 
            onBackButtonPress ={ toggle_modal }
            backdropTransitionInTiming={0} 
            animationOutTiming={0}
            animationInTiming={0}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            style={{ flex: 1 }}
        >
            <ModalItemView item={product} width={imageWidth} height={imageHeight} />            
        </Modal>
    );
}

export default ItemView;

{/* <Modal isVisible={this.state.isModalVisible}  
            onBackdropPress={ this.toggleModal } 
            backdropTransitionInTiming={10} 
            animationOutTiming={10}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
        ></Modal>
 */}