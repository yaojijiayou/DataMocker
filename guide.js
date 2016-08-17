String:
name:s:[aa,bb,cc] //枚举
name:s:10         //随机生成一个长度为10的字符串
name:s            //随机生成一个字符串，长度为5

int/long
name:i:[1-100]    //随机生成一个[1,100]范围内的(包括1和100)
name:i:[1,2,3]	  //枚举
name:i            //随机生成一个10以内的整数


double
name:d             //随机生成一个保留两位小数的浮点数，(默认是2位)
name:d:[1.1,2,3.2] //枚举
name:d:[1-10]      //随机生成一个[1,10]范围内的(包括1和10)保留2位小数的浮点数


boolean
name:b             //true和false
name:b:r           //随机生成一个布尔值
name:b:0           //false
name:b:1           //true


object
name:o:child       //child是具体的子对象

例如:
root#result:bool:all|kind:s|msg:s|data:o:list
list#pcId:l|hosName:s|hosLogo:s|child1:o:child1|child2:o:child2
child1#name:s:[小花,小刚]
child2#gender:i:[0,1]|age:i:[20-30]


结果为:
[{
    "result": true,
    "kind": "syAwH",
    "msg": "cwdcN",
    "data": {
        "pcId": 9,
        "hosName": "jj1Db",
        "hosLogo": "lvg1o",
        "child1": { "name": "小花" },
        "child2": { "gender": "0", "age": 28 }
    }
}, {
    "result": false,
    "kind": "syAwH",
    "msg": "cwdcN",
    "data": {
        "pcId": 9,
        "hosName": "jj1Db",
        "hosLogo": "lvg1o",
        "child1": { "name": "小刚" },
        "child2": { "gender": "1", "age": 28 }
    }
}]
