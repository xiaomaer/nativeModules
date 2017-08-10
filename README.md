# mia-native-modules
A component to enclose react-native NativeModules methods.

### installation
```
npm install mia-native-modules --save-dev
```

### usage
```
import MyArray from 'mia-native-modules';//导入默认模块\
//或者
import * as array from 'mia-native-modules';//整个导入模块
//或者
import { arrayRandomSort } from 'mia-native-modules';//导入模块单个方法
//或者
import MyArray, { arrayRandomSort, arrRepeat } from 'mia-native-modules';//合并写法
//或者
import 'mia-native-modules';//使用这种方法导入整个模块，不导入任何绑定，使用模块副作用（即执行某段代码，使用其返回值。在这通过导入模块，使用global.XMArray全局变量调用模块中的方法）

...
const randomArray = MyArray.arrayRandomSort([1, 2, 3, 4, 5, 6]);
const randomArray2 = arrayRandomSort([2, 4, 7, 3, 9]);
const isRepeated = XMArray.arrRepeat([1, 2, 3, 4, 5, 1]);

```