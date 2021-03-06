import { NativeModules, Platform } from 'react-native';
const { CDBridgeAnalytics, CDBridgeScheme, CDBridgeShare, CDBridgeAccount, CDBridgeLocation, CDBridgeService, CDBridgeContacts, CDBridgeNavigation, CDBridgeAppEventEmitter } = NativeModules;
const version = global.version = '8.1.0';

/* ===============================NativeModules方法封装通用方法================================ */

/**
 * 判断该客户端版本是否支持该方法
 * @param {string} miniVersion:必填，支持该方法的最小版本
 */
function _compareWithVersion(miniVersion) {
    const currVersionArray = version.split('.'),
        miniVersionArray = miniVersion.split('.'),
        len = currVersionArray.length;
    for (let i = 0; i < len; i++) {
        if (parseInt(currVersionArray[0]) > parseInt(miniVersionArray[0])) return true;
        else if (parseInt(currVersionArray[0]) < parseInt(miniVersionArray[0])) return false;
        else if (i = len - 1) return true;
    }
}
/**
 * 函数执行成功，统一返回结果
 * @param {object} result:函数执行结果
 */
function _handleSuccess(result = {}) {
    return {
        status: 0,
        msg: '函数执行成功',
        data: result
    }
}
/**
 * 函数执行失败，统一返回结果
 * @param {object} error：函数执行错误提示 
 */
function _handleError(error) {
    return {
        status: 1,
        msg: error.message,
        data: {}
    }
}
/**
 * 客户端不支持该方法时，统一返回结果
 * @param {string} methodName :方法名称
 */
function _unSupported(methodName) {
    return {
        status: 2,
        msg: '该版本客户端不支持' + methodName + '方法',
        data: {}
    }
}
/**
 * 对象中的属性值必须为string类型
 * @param {object} obj: 要处理的对象
 */
function _handleIntToString(obj) {
    let _params = {};
    for (let key in obj) {
        _params[key] = String(obj[key]);
    }
    return _params;
}

/* ===============================NativeModules方法封装================================ */

/* ==============统计埋点相关方法START================ */
/**
 * 统计事件（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options：格式如下：
 * {
 *   eventID:'统计事件ID,string,必需'  
 * }
 */
function logEvent(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        //必填参数限制
        if (!options || !options.eventID) throw new Error('必填参数不能为空');
        try {//方法执行成功
            CDBridgeAnalytics.logEvent(options.eventID);
            return _handleSuccess();
        } catch (error) {//方法执行失败
            return _handleError(error);
        }
    } else {
        return _unSupported('logEvent');
    }
}
/**
 * 统计事件带参数（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options:格式如下：
 * {
 *      eventID:'统计事件ID，sting，必需' ,
 *      params:'统计事件参数，object，选填'
 * }
 */
function logEventWithParams(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        //必填参数限制
        if (!options || !options.eventID) throw new Error('必填参数不能为空');
        options.params = options.params || {};
        if (Platform.OS === 'android') {
            //处理params值。android中当值为string时，不能传int类型的值；iOS则支持。
            options.params = _handleIntToString(options.params);
        }
        try {
            CDBridgeAnalytics.logEventWithParams(options.eventID, options.params);
            return _handleSuccess();
        } catch (error) {
            return _handleError(error);
        }
    } else {
        return _unSupported('logEventWithParams');
    }
}

/**
 * 统计事件持续时间——事件开始调用方法（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options ：格式如下：
  * {
 *      eventID:'统计事件ID，sting，必需' ,
 *      params:'统计事件参数，object，选填'
 * }
 */
function logTimedEventWithParams(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        //必填参数限制
        if (!options || !options.eventID) throw new Error('必填参数不能为空');
        options.params = options.params || {};
        if (Platform.OS === 'android') {
            options.params = _handleIntToString(options.params);
        }
        try {
            CDBridgeAnalytics.logTimedEventWithParams(options.eventID, options.params);
            return _handleSuccess();
        } catch (error) {
            return _handleError(error);
        }
    } else {
        return _unSupported('logTimedEventWithParams');
    }
}


/**
 * 统计事件持续时间——事件结束调用方法（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options 
 * {
 *      eventID:'统计事件ID，sting，必需' ,
 *      params:'统计事件参数，object，选填'
 * }
 */
function endTimedEventWithParams(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        //必填参数限制
        if (!options || !options.eventID) throw new Error('必填参数不能为空');
        options.params = options.params || {};
        if (Platform.OS === 'android') {
            options.params = _handleIntToString(options.params);
        }
        try {
            CDBridgeAnalytics.endTimedEventWithParams(options.eventID, options.params);
            return _handleSuccess();
        } catch (error) {
            return _handleError(error);
        }
    } else {
        return _unSupported('endTimedEventWithParams');
    }
}
/**
 * 统计事件持续时间，携带事件唯一标识 —— 事件开始调用 （android和iOS咕咚 v8.0.0开始支持该方法）                           
 * @param {object} options，格式如下：
 * {
 *      eventID:'统计事件ID，sting，必需' ,
 *      params:'统计事件参数，object，选填',
 *      tag:'事件唯一标识，string，必需'
 * }
 */
function logTimedEventWithParamsAndTag(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        //必填参数限制
        if (!options || !options.eventID || !options.tag) throw new Error('必填参数不能为空');
        options.params = options.params || {};
        if (Platform.OS === 'android') {
            options.params = _handleIntToString(options.params);
        }
        try {
            CDBridgeAnalytics.logTimedEventWithParamsAndTag(options.eventID, options.params, options.tag);
            return _handleSuccess();
        } catch (error) {
            return _handleError(error);
        }
    } else {
        return _unSupported('logTimedEventWithParamsAndTag')
    }
}
/**
 * 统计事件持续时间，携带事件唯一标识 —— 事件结束调用（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options，格式如下： 
 * {
 *      eventID:'统计事件ID，string，必需' ,
 *      params:'统计事件参数，object，选填',
 *      tag:'事件唯一标识，string，必需'
 * }
 */
function endTimedEventWithParamsAndTag(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        if (!options || !options.eventID || !options.tag) throw new Error('必填参数不能为空');
        options.params = options.params || {};
        if (Platform.OS === 'android') {
            options.params = _handleIntToString(options.params);
        }
        try {
            CDBridgeAnalytics.endTimedEventWithParamsAndTag(options.eventID, options.params, options.tag);
            return _handleSuccess();
        } catch (error) {
            return _handleError(error);
        }
    } else {
        return _unSupported('endTimedEventWithParamsAndTag')
    }
}

/**
 * 秒针广告监控（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options:格式如下：
 * {
 *      url:'请求链接，string，必需'
 * } 
 */
function miaoZhenAdAnalytics(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        if (!options || !options.url) throw new Error('必填参数不能为空');
        try {
            CDBridgeAnalytics.miaoZhenAdAnalytics(options.url);
            return _handleSuccess();
        } catch (error) {
            return _handleError(error);
        }
    } else {
        return _unSupported('miaoZhenAdAnalytics');
    }
}
/* ==============统计埋点相关方法END================ */

/**
 * 页面跳转，包括跳转原生页面和浏览器页面（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options：格式如下：
 * {
 *      url:'跳转协议，string，必需',
 *      success:'成功回调函数，function，选填',
 *      error:'失败回调函数，function，选填'
 * } 
 */
function handleSchemeURL(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        if (!options || !options.url) throw new Error('必填参数不能为空');
        const resultPromise = CDBridgeScheme.handleSchemeURL(options.url);
        resultPromise.then(() => options.success && options.success(_handleSuccess()))
            .catch((error) => options.error && options.error(_handleError(error)));
    } else {
        return _unSupported('handleSchemeURL');
    }
}

/**
 * 调用原生分享组件（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options：格式如下：
 * {
 *      types:'分享类型，array，必需',
 *      defaultShareInfo:'默认分享信息，object，必需',
 *      customShareInfo:'自定义分享信息，object，必填',
 *      success:'成功回调函数，function，选填',
 *      error:'失败回调函数，function，选填'
 * }
 */
function shareWithTypes(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        if (!options) throw new Error('传参不能为空');
        if (!options.types || options.types.length === 0) throw new Error('参数types不能为空');
        if (!options.defaultShareInfo || !options.defaultShareInfo.title || !options.defaultShareInfo.content) throw new Error('参数defaultShareInfo必填参数不能为空');
        if (!options.customShareInfo || !options.customShareInfo.title || !options.customShareInfo.content) throw new Error('参数customShareInfo必填参数不能为空');
        const resultPromise = CDBridgeShare.shareWithTypes(options.types, options.defaultShareInfo, options.customShareInfo);
        resultPromise.then((success) => options.success & options.success(_handleSuccess({ success })))
            .catch((error) => options.error && options.error(_handleError(error)));
    } else {
        return _unSupported('shareWithTypes');
    }
}

/**
 * 获取当前用户信息（android和iOS咕咚 v8.0.0开始支持该方法）
 *  @param {object} options：格式如下：
 * {
 *      success:'成功回调函数，function，选填',
 *      error:'失败回调函数，function，选填'
 */
function fetchAccount(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        const resultPromise = CDBridgeAccount.fetchAccount();
        resultPromise.then((user) => options.success && options.success(_handleSuccess(user)))
            .catch((error) => options.error && options.error(_handleError(error)));
    } else {
        return _unSupported('fetchAccount');
    }
}
/**
 * 获取当前用户定位信息（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options：格式如下：
 * {
 *      success:'成功回调函数，function，选填',
 *      error:'失败回调函数，function，选填'
 */
function fetchLocation(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        const resultPromise = CDBridgeLocation.fetchLocation();
        resultPromise.then((location) => options.success && options.success(_handleSuccess(location)))
            .catch((error) => options.error && options.error(_handleError(error)));
    } else {
        return _unSupported('fetchLocation');
    }
}

/* ==============网络请求start================ */
/**
 * POST请求（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options ：格式如下：
 * {
 *      url:'发送请求完整API，string，必需',
 *      data:'接口传参，objcet，选填，默认{}',
 *      cache:'是否缓存，boolean,选填，默认false',
 *      verify:'是否验签，boolean，选填，默认true',
 *      success:'成功回调函数，function，选填',
 *      error:'失败回调函数，function，选填'
 * }
 */
function postURL(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        if (!options || !options.url) throw new Error('必填参数不能为空');
        const params = {
            param: options.data || {},
            cache: options.cache || false,
            verify_signature: options.verify || true
        }
        const resultPromise = CDBridgeService.postURL(options.url, params);
        resultPromise.then((response) => options.success && options.success(_handleSuccess(JSON.parse(response))))
            .catch((error) => options.error && options.error(_handleError(error)));
    } else {
        return _unSupported('postURL');
    }
}
/**
 * GET请求（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options ：格式如下：
 * {
 *      url:'发送请求完整API，string，必需',
 *      data:'接口传参，objcet，选填，默认{}',
 *      cache:'是否缓存，boolean,选填，默认false',
 *      verify:'是否验签，boolean，选填，默认true',
 *      success:'成功回调函数，function，选填',
 *      error:'失败回调函数，function，选填'
 * }
 */
function getURL(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        if (!options || !options.url) throw new Error('必填参数不能为空');
        const params = {
            param: options.data || {},
            cache: options.cache || false,
            verify_signature: options.verify || true
        }
        const resultPromise = CDBridgeService.getURL(options.url, params);
        resultPromise.then((response) => options.success && options.success(_handleSuccess(JSON.parse(response))))
            .catch((error) => options.error && options.error(_handleError(error)));
    } else {
        return _unSupported('getURL');
    }
}
/* ==============网络请求END================ */


/* ==============用户关系start================ */
/**
 * 获取用户关系（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options :格式如下：
 * {
 *      userID:'被查询的用户ID，string，必需',
 *      success:'成功回调函数，function，选填',
 *      error:'失败回调函数，function，选填'
 * }
 */
function relationWithUserID(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        if (!options || !options.userID) throw new Error('必填参数不能为空');
        CDBridgeContacts.relationWithUserID(options.userID, (error, status) => {
            if (error) {
                options.error && options.error(_handleError(error));
            } else {
                options.success && options.success(_handleSuccess({ status }));
            }
        })
    } else {
        return _unSupported('relationWithUserID');
    }
}
/**
 * 更新用户关系（android和iOS咕咚 v8.0.0开始支持该方法）
 * @param {object} options :格式如下：
 * {
 *      success:'成功回调函数，function，选填',
 *      error:'失败回调函数，function，选填'
 * }
 */
function synchronizeRelations(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        const resultPromise = CDBridgeContacts.synchronizeRelations();
        resultPromise.then(() => options.success && options.success(_handleSuccess({ update: true })))
            .catch((error) => options.error && options.error(_handleError(error)));
    } else {
        return _unSupported('synchronizeRelations');
    }
}
/**
 * 标记当前页面是哪一个页面，android专用
 * @param {object} options ：格式如下
 * {
 *      type:'页面对应索引，number，必需'
 * }
 */
function initPageType(options) {
    if (Platform.OS === 'android' && _compareWithVersion('8.0.0')) {
        if (!options || !options.type) throw new Error('必填参数不能为空');
        try {
            CDBridgeContacts.initPageType(options.type, function () { });
            return _handleSuccess({ pageType: options.type });
        } catch (error) {
            return _handleError(error);
        }
    } else {
        return _unSupported('initPageType');
    }
}
/* ==============用户关系end================ */

/**
 * 关闭rn模块
 * @param {string} options ：格式如下：
 * {
 *      moduleName:'要关闭的rn模块'
 * }
 */
function popModule(options) {
    const isSupported = _compareWithVersion('8.0.0');
    if (isSupported) {
        if (!options || !options.moduleName) throw new Error('必填参数不能为空');
        try {
            CDBridgeNavigation.popModule(options.moduleName);
            return _handleSuccess({ popModule: true });
        } catch (error) {
            return _handleError(error);
        }
    } else {
        return _unSupported('popModule');
    }
}


const NativeMethods = {
    logEvent, logEventWithParams, logTimedEventWithParams, endTimedEventWithParams, logTimedEventWithParamsAndTag, endTimedEventWithParamsAndTag, miaoZhenAdAnalytics,
    handleSchemeURL,
    shareWithTypes,
    fetchAccount,
    fetchLocation,
    postURL,
    getURL,
    relationWithUserID, synchronizeRelations, initPageType,
    popModule,
}
global.NativeMethods = NativeMethods;
export {
    NativeMethods as default,
    logEvent, logEventWithParams, logTimedEventWithParams, endTimedEventWithParams, logTimedEventWithParamsAndTag, endTimedEventWithParamsAndTag, miaoZhenAdAnalytics,
    handleSchemeURL,
    shareWithTypes,
    fetchAccount,
    fetchLocation,
    postURL,
    getURL,
    relationWithUserID, synchronizeRelations, initPageType,
    popModule,
}