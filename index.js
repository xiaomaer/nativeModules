function ArrayRandomSort(arr) {
    var newArray = [];
    while (arr.length > 0) {
        //随机获取原数组中的元素，存到新数组，并删除原数组该元素
        var currIndex = Math.floor(Math.random() * arr.length);
        newArray.push(arr[currIndex]);
        arr.splice(currIndex, 1);
    }
    return newArray;
}
export { ArrayRandomSort as default, ArrayRandomSort }; 