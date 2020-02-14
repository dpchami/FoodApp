import { State } from "react-native-gesture-handler";

const initialState = {
  drinkError: null,
  drinkLoading: false,
  drinkMessage: null,
  specialError: null,
  specialLoading: false,
  specialMessage: null,
  productLoading: false,
  productMessage: null,
  productError: null,
  
  orderLoading: false,
  orderError: null,
  orderMessage: null,

  vendorLoading: true,
  vendorError: null,
  vendorMessage: null,

  orderHistoryLoading: false,
  orderHistoryError: null,
  orderHistoryMessage: null,

  customProductLoading: false,
  customProductError: null,
  customProductMessage: null,

  cartList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_SPECIAL_LOADING':
      return {
        ...state,
        specialError: null,
        specialLoading: true,
        specialMessage: null,
      };
    case 'FETCH_SPECIAL_ERROR':
      return {
        ...state,
        specialError: payload,
        specialLoading: false,
        specialMessage: null,
      };
    case 'FETCH_SPECIAL_SUCCESS':
      return {
        ...state,
        specialError: null,
        specialLoading: false,
        specialMessage: payload,
      };
    case 'FETCH_DRINK_LOADING':
      return {
        ...state,
        drinkLoading: true,
        drinkMessage: null,
        drinkError: null,
      };
    case 'FETCH_DRINK_ERROR':
      return {
        ...state,
        drinkLoading: false,
        drinkMessage: null,
        drinkError: payload,
      };
    case 'FETCH_DRINK_SUCCESS':
      return {
        ...state,
        drinkLoading: false,
        drinkError: null,
        drinkMessage: payload,
      };
    case 'FETCH_PRODUCT_LOADING':
      return {
        ...state,
        productLoading: true,
        productMessage: null,
        productError: null,
      };
    case 'FETCH_PRODUCT_ERROR':
      return {
        ...state,
        productLoading: false,
        productMessage: null,
        productError: payload,
      };
    case 'FETCH_PRODUCT_SUCCESS':
      return {
        ...state,
        productLoading: false,
        productError: null,
        productMessage: payload,
      };

    case 'ADD_TO_CART':
    //if payload not exist add payload to cart
    if (!checkExist(state.cartList,payload)){
      let cart = { 
        product: payload,
        count: 1,
      }

      return {
        ...state,
        cartList : [ ...state.cartList, cart ] ,
      } 
    } else {
      // cart have items increment count
      state.cartList.map((item) => {
          if (item.product === payload){
            let count = item.count++;
            state.cartList[item] = { 
              product: payload,
              count: count,
            };
          } 
      });

      return {
        ...state,
        cartList : [ ...state.cartList ] ,
      } 
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartList: [...state.cartList.filter( item => item.product !== payload)], // payload is object to remove
      };
    case 'CLEAR_CART_LIST': {
        return {
          ...state,
          cartList: initialState.cartList,
        }
    };

    case 'ORDER_REQUEST_LOADING': {
        return {
          ...state,
          orderLoading: true,
          orderError: null,
          orderMessage: null,
        }
    };
    case 'ORDER_REQUEST_ERROR': {
      return {
        ...state,
        orderLoading: false,
        orderError: payload,
        orderMessage: null,
      }
    };
    case 'ORDER_REQUEST_MESSAGE': {
        return {
          ...state,
          orderLoading: false,
          orderError: null,
          orderMessage: payload,
        }
    };

    case 'VENDOR_REQUEST_LOADING':{
        return {
            ...state,
            vendorLoading: true,
            vendorError: null,
            vendorMessage: null,
        }
    };

    case 'VENDOR_REQUEST_ERROR': {
        return {
          ...state,
          vendorLoading: false,
          vendorError: payload,
          vendorMessage: null,
        };
    };
    case 'VENDOR_REQUEST_MESSAGE': {
        return {
          ...state,
          vendorLoading: false,
          vendorError: null,
          vendorMessage: payload,
        };
    };
    case 'HISTORY_REQUEST_LOADING': {
        return {
          ...state,
          orderHistoryLoading: true,
          orderHistoryError: null,
          orderHistoryMessage: null,
        };
    };
    case 'HISTORY_REQUEST_ERROR': {
        return {
          ...state,
          orderHistoryLoading: false,
          orderHistoryError: payload,
          orderHistoryMessage: null,
        }
    };
    case 'HISTORY_REQUEST_MESSAGE': {
        return {
          ...state,
          orderHistoryLoading: false,
          orderHistoryError: null,
          orderHistoryMessage: payload,
        }
    };

    case 'CUSTOM_PRODUCT_LOADING': {
      return {
        ...state,
        customProductLoading: true,
        customProductError: null,
        customProductMessage: null,
      }
    };
    case 'CUSTOM_PRODUCT_ERROR': {
      return {
        ...state,
        customProductLoading: false,
        customProductError: payload,
        customProductMessage: null,
      }
    };
    case 'CUSTOM_PRODUCT_MESSAGE': {
      return {
        ...state,
        customProductLoading: false,
        customProductError: null,
        customProductMessage: payload,
      }
    }

    case 'AUTH_LOGOUT_RESET':
        console.log('reached pia');
       // clearLoginDetail();
      return initialState;
    default:
      return state;
  }
};


const checkExist =( arr, payload ) => {
  let response = false;
  arr.map((item) => {
    if (item.product === payload){
      response = true;
    }
  });
  return response;
}
