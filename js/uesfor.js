/*
 * @Description: 表单验证
 * @Author: 张晓旭
 * @Date: 2019-07-24 17:43:55
 * @LastEditTime: 2019-08-07 17:34:51
 * @LastEditors: Please set LastEditors
 */

var checkdeg = {
    username: function (str) {//用户名验证
        console.log(str)
        var deg = /^[a-z][\w\-]{5,19}$/;
        return deg.test(str)
    },
    nickname: function (str) {//昵称验证
        var deg = /^[\u2E80-\u9FFF]+$/;
        return deg.test(str)
    },
    email: function (str) {//邮箱验证
        var deg = /^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/;
        return deg.test(str)
    },
    identity: function (str) {//身份证
        var deg = /^(\d{17}|\d{14})[\dx]$/;
        return deg.test(str)
    },
    birthday: function (str) {//出生日期
        var deg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        return deg.test(str)
    },
    password: function (str) {//密码验证
        var deg = /^\S{6,20}$/;
        return deg.test(str)
    },
    phone_number: function (str) {
        var deg = /^1[3456789]\d{9}$/;
        return deg.test(str)
    }
}

/*
 * @Description: 封装毫秒转换 xx年xx月xx日xx时xx分xx秒
 * @Author: 张晓旭
 * @Date: 2019-08-02 19:16:16
 * @LastEditTime: 2019-08-07 11:20:52
 * @LastEditors: Please set LastEditors
 */
function toDate(num) {
    var date = new Date(Number(num));
    var year = date.getFullYear();
    var month = toDouble(date.getMonth() + 1);
    var day = toDouble(date.getDate());
    var hour = toDouble(date.getHours());
    var minute = toDouble(date.getMinutes());
    var second = toDouble(date.getSeconds())
    return year + '年' + month + '月' + day + '日' + hour + ':' + minute + ':' + second
}
/*
 * @Description: 封装to double
 * @Author: 张晓旭
 * @Date: 2019-08-02 19:16:16
 * @LastEditTime: 2019-08-02 20:54:49
 * @LastEditors: Please set LastEditors
 */

function toDouble(num) {
    if (num < 10) {
        return '0' + num
    } else {
        return '' + num
    }
}
/*
 * @Description:封装(兼容IE8和高级浏览器)的(非行内和行内)样式的获取和添加行内样式
 * @Author: 张晓旭
 * @Date: 2019-07-24 17:43:55
 * @LastEditTime: 2019-08-02 20:55:44
 * @LastEditors: Please set LastEditors
 */

function css() {
    if (arguments.length == 2) {
        //获取样式
        if (getComputedStyle(arguments[0], false)) {
            //高级浏览器
            return getComputedStyle(arguments[0], false)[arguments[1]];
            //getComputedStyle(h1, false)['top'];
        } else {
            //IE8-
            return arguments[0].currentStyle[arguments[1]];
        }
    } else if (arguments.length == 3) {
        //设置样式  ele.style.width = '200px'
        arguments[0].style[arguments[1]] = arguments[2];
    }
}

/*
 * @Description: 对象转字符串
 * @Author: 张晓旭
 * @Date: 2019-07-27 14:12:37
 * @LastEditTime: 2019-08-02 19:08:45
 * @LastEditors: Please set LastEditors
 */
function objTostr(obj) {
    var str = '';
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';
    }
    str = str.slice(0, -1)
    return str
}
/*
 * @Description:字符串转对象
 * @Author: 张晓旭
 * @Date: 2019-07-27 14:12:37
 * @LastEditTime: 2019-07-27 18:01:59
 * @LastEditors: Please set LastEditors
 */
function strToobj(str) {//字符样式：name=laoxie&age=18&sex=male
    var obj = {};//空字符，存切割后的数组
    var arr = str.split('&');//切割字符&
    arr.forEach(function (item) {//遍历切割后的数组
        var arr2 = item.split('=');//再次切割字符=
        obj[arr2[0]] = arr2[1]//生成对象的属性，属性名
    });
    return obj
}
/*
 * @Description: 过滤敏感词汇
 * @Author:张晓旭
 * @Date: 2019-07-24 17:43:55
 * @LastEditTime: 2019-07-27 17:40:57
 * @LastEditors: Please set LastEditors
 */
function guolv(str) {//接受过滤字符串
    var mingan = ['操', '垃圾', '小学生'];//敏感词汇
    mingan.forEach(function (item) {//遍历敏感词汇数组
        var reg = new RegExp(item, 'ig');//正则(i忽略大小、g全局查找)
        str = str.replace(reg, '*')//将敏感词汇过滤成*
    });
    return str//返回字符串
}
/*
 * @Description: 寻找实参最大值
 * @Author:张晓旭
 * @Date: 2019-07-23 19:55:57
 * @LastEditTime: 2019-07-27 11:55:43
 * @LastEditors: Please set LastEditors
 */
function findMax() {
    console.log(arguments)
    var max = arguments[0];
    if (arguments.length < 2) {
        return max
    }
    else {
        for (var i = 0; i < arguments.length; i++) {
            max = max > arguments[i] ? max : arguments[i];
        }
    }
    // console.log(max)
    return max
}

/*
 * @Description: 获取任意范围的随机数
 * @Author: your name
 * @Date: 2019-07-23 19:55:57
 * @LastEditTime: 2019-07-23 21:10:35
 * @LastEditors: Please set LastEditors
 */
function RRN(one, two) {
    var max = one > two ? one : two;
    var min = one < two ? one : two;
    return parseInt(Math.random() * (max - min + 1)) + min;
}

/*
 * @Description: 函数封装随机验证码
 * @Author: 张晓旭
 * @Date: 2019-07-23 19:55:57
 * @LastEditTime: 2019-07-23 21:00:46
 * @LastEditors: Please set LastEditors
 */
function authCode() {
    var html = '0987654321qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM';
    var res = '';
    for (i = 0; i < 4; i++) {
        var j = parseInt(Math.random() * html.length);
        res += html[j]
    }
    return res;
}

/*
 * @Description: 函数封装随机颜色
 * @Author: 张晓旭
 * @Date: 2019-07-23 19:55:57
 * @LastEditTime: 2019-07-23 20:50:07
 * @LastEditors: Please set LastEditors
 */
function randomColor(type) {
    if (type == 16) {
        html = '123456789abcdef';
        var res = '#';
        for (var i = 0; i < 6; i++) {
            var j = parseInt(Math.random() * (html.length));
            res += html[j]
        }
    } else if (type == 'rgb') {
        var r = parseInt(Math.random() * 256);
        var g = parseInt(Math.random() * 256);
        var b = parseInt(Math.random() * 256);
        var res = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    return res;
}

/*
 * @Description: 封装寻找id名的变量声明
 * @Author: 张晓旭
 * @Date: 2019-07-24 17:44:16
 * @LastEditTime: 2019-07-24 17:46:25
 * @LastEditors: Please set LastEditors
 */
function getid(id) {
    return document.getElementById(id)
}
/*
 * @Description: 数组去重
 * @Author: 张晓旭
 * @Date: 2019-07-26 16:23:30
 * @LastEditTime: 2019-07-26 16:23:30
 * @LastEditors: your name
 */
function norepeat(arr) {
    var newarr = [];
    arr.forEach(function (item) {
        if (newarr.indexOf(item) == -1) {
            newarr.push(item)
        }
    });
    return newarr
}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}
/*
 * @Description: AJAX
 * @Author: 张晓旭
 * @Date: 2019-07-26 16:23:30
 * @LastEditTime: 2019-07-26 16:23:30
 * @LastEditors: your name
 */
function ajax(opt) {
    //默认参数
    let defaultData = {
        data: '',
        asyn: true,
        failure: null
    }

    Object.assign(defaultData, opt);//用默认参数

    let xhr = new XMLHttpRequest();
    if (defaultData.type.toLowerCase() == 'get') {
        //get方式
        if (defaultData.data) {
            defaultData.data = objTostr(defaultData.data);
            defaultData.url += '?' + defaultData.data;
        }
        xhr.open('get', defaultData.url, defaultData.asyn);
        xhr.send(null);
    } else if (defaultData.type.toLowerCase() == 'post') {
        //post方式
        xhr.open('post', defaultData.url, defaultData.asyn);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        defaultData.data = objTostr(defaultData.data);
        xhr.send(defaultData.data);
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 304) {
                //成功了
                let data = xhr.responseText;

                defaultData.success(data);//实参
            } else {
                //失败
                if (defaultData.failure) {
                    //写了这个回调
                    defaultData.failure(xhr.status);
                }
            }
        }
    }
}
/*
 * @Description: cookie设置
 * @Author: 张晓旭
 * @Date: 2019-07-26 16:23:30
 * @LastEditTime: 2019-07-26 16:23:30
 * @LastEditors: your name
 */
function setcookie(key, val, iday) {
    var str = key + '=' + val + ';path=/';
    if (iday) {
        var date = new Date();
        date.setDate(date.getDate() + iday);
        str += ';expires=' + date;
    }
    document.cookie = str
}
/*
 * @Description: cookie获取
 * @Author: 张晓旭
 * @Date: 2019-07-26 16:23:30
 * @LastEditTime: 2019-07-26 16:23:30
 * @LastEditors: your name
 */
function getcookie(key) {
    var str = document.cookie;
    var arr = str.split('; ');
    for (var ele of arr) {
        var arr2 = ele.split('=');
        if (key == arr2[0]) {
            return arr2[1]
        }
    }
}
/*
 * @Description: cookie删除
 * @Author: 张晓旭
 * @Date: 2019-07-26 16:23:30
 * @LastEditTime: 2019-07-26 16:23:30
 * @LastEditors: your name
 */
function removecookie(key) {
    setcookie(key, '', -1);
}
/*
 * @Description: 倒计时
 * @Author: 张晓旭
 * @Date: 2019-07-27 14:12:37
 * @LastEditTime: 2019-08-02 19:08:45
 * @LastEditors: Please set LastEditors
 */
function TimeDown(endDateStr) {
    //结束时间
    var endDate = new Date(endDateStr);
    //当前时间
    var nowDate = new Date();
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);

    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    var hourss = toDouble(-hours)
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    var minutess = toDouble(-minutes)
    //秒
    var seconds = modulo % 60;
    var secondss = toDouble(-seconds)
    //输出到页面
    return {
        day: days,
        hours: hourss,
        minutes: minutess,
        seconds: secondss
    }
}