import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  Linking, 
  Platform
} from 'react-native';
import propTypes from 'prop-types';
import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux';
import Carousel from 'react-native-anchor-carousel'; 
import images from '../../config/images'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { fetchVendor } from '../../actions/products'
import Loading from './Loading';
import Error from './Error';
import Snackbar from 'react-native-snackbar';

const { width } = Dimensions.get('window');

class VendorCarousel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			likeIcon : 'heart-o',
		}
	}

    componentDidMount(){
      if (this.props.vendorMessage === null){
        this.props.fetchVendor();
      }
    }

  renderItem = ({ item, index }) => {
    //const { uri, title, content, status } = item;
    return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.item}
          onPress={() => {
            this.numberCarousel.scrollToIndex(index);
          }}
        >
          <ImageBackground
            source={{ uri: item.profile_pic }}
            style={styles.imageBackground}
          >
            <View style={styles.rightTextContainer}>
              <Text style={styles.rightText}>{item.status}</Text>
            </View>
          </ImageBackground>
          <View style={styles.lowerContainer}>
            <Text style={styles.titleText}>{item.name}</Text>
            <View style={ styles.iconBox }>
                <TouchableOpacity style={styles.iconWrap} onPress={() => this.makeCall(item.mobile_num)} activeOpacity={0.7} >
                  <Icon style={styles.iconStyle} name={"phone"} size={18} />
                  <Text style={styles.icontextStyle}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrap} onPress={ () => this.textWhatsApp(item.whatsapp)} activeOpacity={0.7} >
                  <Icon style={styles.iconStyle} name={"whatsapp"} size={18} />
                  <Text style={styles.icontextStyle}>whatsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrap} onPress={ () => this.likeButton() }>
                  <Icon  name={this.state.likeIcon} size={18} />
                  <Text style={styles.icontextStyle}>like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconWrap} onPress={() => Actions.products({ pro_type: "vendor", value: item.id }) }>
                  <Icon style={styles.iconStyle} name={"cutlery"} size={18} />
                  <Text style={styles.icontextStyle}>menu</Text>
                </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
  };
  
  likeButton = () => {
      if (this.state.likeIcon === 'heart-o'){
        this.setState({ likeIcon : 'heart' });
      } else {
        this.setState({ likeIcon : 'heart-o' });
      }
      
  }
 
  makeCall = (number) => {

    let phoneNumber = '';
  
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + number + '}';
    } else {
      phoneNumber = 'telprompt:${' + number + '}';
    }
  
    Linking.openURL(phoneNumber);
  };

  textWhatsApp = (number) => {
    Linking.openURL('whatsapp://send?text=Need%20your%20Service&phone='+number);
  }

  render() {

      const { vendorError, vendorLoading, vendorMessage } = this.props;

      if (vendorLoading) {
        return <Loading />
      } else if (vendorError !== null ) {
        return <Error title={vendorError} />
      } else {
        if (vendorMessage && vendorMessage.length > 0 ){
            return (
              <Carousel
                  style={styles.carousel}
                  data={vendorMessage}
                  renderItem={this.renderItem}
                  itemWidth={0.7 * width}
                  inActiveOpacity={0.3}
                  containerWidth={width - 10}
                  ref={(c) => {
                    this.numberCarousel = c;
                  }}
                />
            );
        } else {
            return (
              <View>
                <Text>Empty vendor list</Text>
              </View>
            );
        }
    }
  }
}


VendorCarousel.propTypes = {
    vendorLoading: propTypes.bool,
    vendorError: propTypes.object,
    vendorMessage: propTypes.array,
    fetchVendor: propTypes.func
}

function initMapStateToProps(state) {
  return {
    vendorLoading: state.data.vendorLoading,
    vendorError: state.data.vendorError,
    vendorMessage: state.data.vendorMessage,
  }
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchVendor
  }, dispatch);
}

export default connect(initMapStateToProps,initMapDispatchToProps) (VendorCarousel);

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: '#141518'
  },
  item: {
    borderWidth: 2,
    backgroundColor: '#F2AA4CFF',//'white',
    flex: 1,
    borderRadius: 5,
    //borderColor: 'white',
    paddingRight: 8,
    paddingLeft: 8,
    elevation: 3
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: '#F2AA4CFF',//'white'
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  rightText: { color: 'white' },
  lowerContainer: {
    flex: 1,
   // marginBottom: 10
  },
  titleText: {
    paddingTop: 5,
    color:'#101820FF',
    fontWeight: 'bold',
    fontSize: 18
  },

  iconBox : {
    flexDirection:"row", 
    justifyContent: "space-between",
  },
  iconWrap: {
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'column',
    paddingRight:10,
  },
  iconStyle : {
    //color: '#101820FF',
  },
  icontextStyle : {
    fontSize:10,
    paddingBottom:5,
  }
});

const data = [
  {
    uri: images.ven1,
    title: 'Tee-Kay Foods',
    content: 'Neque porro quisquam est qui dolorem ipsum quia ',
    status: 'Open'
  },
  {
    uri: images.ven3,
    title: 'Dodoma Fast Foods ',
    content: 'Neque porro quisquam est qui dolorem ipsum ',
    status: 'Open'
  },
  {
    uri: images.homeImage,
    title: 'Brenda Restaurants',
    content: 'Neque porro quisquam est qui',
    status: 'Closed'
  },
  {
    uri: images.ven4,
    title: 'Native Quality Restaurant',
    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    status: 'Closed'
  },
  {
    uri: images.ven2,
    title: 'Pizza Huts',
    content: 'Neque porro quisquam est qui dolorem ipsum quia dolor ',
    status: 'Closed'
  }
];
