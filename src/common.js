import { Platform } from 'react-native';
import config from './config';
import { fetchGet } from '../api/httpService';
const { width, amapKeyIOS, amapKeyAndroid } = config;
const basePx = 375;

/**
 * px转换为dp，
 * @param {number} px：要转换px长度值
 */
function px2dp(px) {
    // parseInt for android bug
    return parseInt(px * width / basePx);
}

/**
 * string转换为json对象
 * @param {*} item：要转换的数据
 */
function stringToJson(item) {
    if (item && typeof item !== 'object') {
        try {
            item = JSON.parse(item)
        }
        catch (e) {
            console.error(e);
        };
    }
    return item
}

/**
 * ios图片链接处理
 * @param {string} url：图片链接 
 */
function urlRemoveQuery(url) {
    if (Platform.OS === "ios") {
        return url.replace('/format/webp', '');
    } else {
        return url;
    }
}
/**
 * 动态调整margin
 * @param {number} total 
 * @param {number} index 
 */
function dynamicMargin(total, index) {
    let style = {};
    if (index == 0) {
        style.marginLeft = px2dp(16)
    } else if (index == total - 1) {
        style.marginRight = px2dp(16)
    }
    return style;
}


/**
 * 通过navigator.geolocation获取定位信息
 * @param {function} callback ：获取成功或失败回调函数
 */
function gpsLocation(callback) {
    return navigator.geolocation.getCurrentPosition(
        (position) => {
            let location = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
            }
            getCityInfoByLongitudeAndLatitude(location).then(callback).catch((error) => {
                console.warn(JSON.stringify(error));
                callback(null);
            })
        },
        (error) => { console.warn(JSON.stringify(error)); callback(null) },
        { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 }
    );
}
/**
 * 根据经纬度获取城市信息
 * @param {object} location：城市信息 
 */
function getCityInfoByLongitudeAndLatitude(location) {
    let params = {
        key: Platform.OS === "ios" ? amapKeyIOS : amapKeyAndroid,
        location: `${location.longitude},${location.latitude}`
    }
    return fetchGet(`amap`, params).then((response) => {
        if (response) {
            // 开发中在模拟器可能拿不到数据
            if (response && response.regeocode && response.regeocode.addressComponent) {
                if (Object.prototype.toString.call(response.regeocode.addressComponent.adcode) === '[object String]') {
                    location.cityCode = response.regeocode.addressComponent.adcode;
                } else {
                    location.cityCode = '';
                }
                if (Object.prototype.toString.call(response.regeocode.addressComponent.adcode) === '[object String]') {
                    location.cityName = response.regeocode.addressComponent.city;
                } else {
                    location.cityName = '';
                }
            }
        }
        return location;
    });
}

export { px2dp, stringToJson, urlRemoveQuery, dynamicMargin, gpsLocation, getCityInfoByLongitudeAndLatitude }

