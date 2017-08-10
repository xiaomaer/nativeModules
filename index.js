/**
     * 数组随机排序
     * @param {array} arr 
     */
function arrayRandomSort(arr) {
    var newArray = [];
    while (arr.length > 0) {
        //随机获取原数组中的元素，存到新数组，并删除原数组该元素
        var currIndex = Math.floor(Math.random() * arr.length);
        newArray.push(arr[currIndex]);
        arr.splice(currIndex, 1);
    }
    return newArray;
}
/**
 * 判断数组是否包含重复值
 * @param {array} arr 
 */
function arrRepeat(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        //indexOf()和lastIndexOf()请匹配是否包含，即类型和值完全一样
        if (arr.indexOf(arr[i]) !== arr.lastIndexOf(arr[i])) {
            return true;
        }
    }
    return false;
}
const MyArray = {
    arrayRandomSort: arrayRandomSort,
    arrRepeat: arrRepeat
}
global.XMArray = MyArray;
export { MyArray as default, arrayRandomSort, arrRepeat };