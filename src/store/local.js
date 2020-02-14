import { AsyncStorage } from "react-native";

export const setUserName = ( username ) => {
    AsyncStorage.setItem('username', username,err =>
    {
        console.log(`err while store username ${err}`)
    })
    console.log(`store username ${username}`);
}

export const setMobile = ( mobile ) => {
    AsyncStorage.setItem('mobile', mobile, function(err){
        console.log(`error while store mobile ${err}`)
    });
    console.log(`mobile number stored ${mobile}`);
}

export const setEmail = ( email ) => {
    AsyncStorage.setItem('email',email, function(err) {
        console.log(`error while store email ${err}`)
    })
    console.log(`email stored ${email}`)
}

export const setLocation = ( location ) => {
    AsyncStorage.setItem('location', location, (err) => {
        console.log('error while store location ' + err);
    })
    console.log(`location stored ${location}`)
}

export const setDistrict = ( district ) => {
    AsyncStorage.setItem('district', district, (err) => {
        console.log('error while store district ' + err);
    })
    console.log(`district stored ${district}`)
}

export const setRegion = ( region ) => {
    AsyncStorage.setItem('region', region, (err) => {
        console.log('error while store region ' + err);
    })
    console.log(`region stored ${region}`)
}


export const setToken = (token) => {
    AsyncStorage.setItem('token', token, function(err){
        console.log('error while store token ' + err)
    });
    console.log(`token stored ${token}`)
}

export const clearUserDetail = async () => {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('mobile');
    await AsyncStorage.removeItem('token');
    console.log('User data cleared successfully')
}

export const getToken = async () => {
    var token = await AsyncStorage.getItem('token');
    return token;
}

export const getDistrict = async () => {
    var district = await AsyncStorage.getItem('district');
    return district;
}

export const getUserName = async () => {
    var username = await AsyncStorage.getItem('username');
    return username;
}

export const getMobile = async () => {
    var mobile = await AsyncStorage.getItem('mobile');
    return mobile;
}

export const getEmail = async () => {
    var email = await AsyncStorage.getItem('email');
    return email;
}

export const getLocation = async () => {
    var location = await AsyncStorage.getItem('location');
    return location;
}