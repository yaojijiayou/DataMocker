function Parser() {
    var POOL = {};

    this.parse = function(str) {
        if (!str) return;
        POOL = {};
        var lines = str.split('\n');
        for (var i = 0; i < lines.length; i++)
            if (lines[i].trim()) parseOneConfigLine(lines[i].trim());
        var toBeParsed = POOL.root ? POOL.root.data : POOL["根对象"].data;
        return getMininalCombo(toBeParsed);
    }

    function getMininalCombo(obj) {
        var longestLength = 0,
            result = [],
            index = 0,
            keys = Object.keys(obj);
        while (index == 0 || index < longestLength) {
            var tmp = {};
            for (var i in obj) {
                var tmpArr = [];
                if (!Array.isArray(obj[i])) obj[i] = getMininalCombo(POOL[obj[i]].data);
                if (index == 0 && obj[i].length > longestLength) longestLength = obj[i].length;
                tmp[i] = getElementFromArray(obj[i], index);
            }
            result.push(tmp);
            index++;
        }
        return result;
    }

    function parseOneConfigLine(configStr) {
        if (!configStr) return;
        if (configStr[configStr.length - 1] == "|") configStr = configStr.substring(0, configStr.length - 1);
        var strArr = configStr.split("#");
        if (strArr.length != 2) return;
        var objName = strArr[0];
        POOL[objName] = {};
        POOL[objName].data = {};
        var configFieldStrArr = strArr[1].split("|");
        for (var i = 0; i < configFieldStrArr.length; i++) {
            var fieldObj = parseField(configFieldStrArr[i]);
            POOL[objName].data[fieldObj.name] = fieldObj.data;
        }
    }

    function parseField(fieldStr) {
        var fieldStrArr = fieldStr.split(":");
        var fieldType = fieldStrArr[1].toLowerCase();
        var result = null;
        switch (fieldType) {
            case 's':
            case 'string':
                result = parseString(fieldStr);
                break;
            case 'i':
            case 'int':
            case 'integer':
            case 'l':
            case 'long':
                result = parseIntOrLong(fieldStr);
                break;
            case 'd':
            case 'double':
            case 'f':
            case 'float':
                result = parseDouble(fieldStr);
                break;
            case 'b':
            case 'bool':
            case 'boolean':
                result = parseBool(fieldStr);
                break;
            case 'o':
            case 'object':
                result = parseObject(fieldStr);
                break;
            default:
                break;
        }
        return result;
    }

    function parseString(fieldStr) {
        /*
        String:
        name:s:[aa,bb,cc] //枚举
        name:s:5          //随机生成长度为五的字符串
        name:s            //随机生成字符串
        */
        var result = {};
        var fieldStrArr = fieldStr.split(":");
        result.name = fieldStrArr[0];

        if (fieldStrArr.length == 2) {
            result.data = [randomStr()];
            return result;
        }

        var thirdParam = fieldStrArr[2];
        if (thirdParam.startsWith("[")) {
            thirdParam = thirdParam.substring(1, thirdParam.length - 1);
            var arr = thirdParam.split(",");
            result.data = arr;
            return result;
        } else if (Number.isInteger(parseInt(thirdParam))) {
            result.data = [randomStr(parseInt(thirdParam))];
            return result;
        }

        return null;
    }

    function parseIntOrLong(fieldStr) {
        /*
        int/long
        name:i:[1-100]    //随机生成[1,100]范围内的(包括1和100)
        name:i:[1,2,3]    //枚举
        name:i            //随机生成[1,10]范围内的(包括1和10)
        */
        var result = {};
        var fieldStrArr = fieldStr.split(":");
        result.name = fieldStrArr[0];

        if (fieldStrArr.length == 2) {
            result.data = [random(0, 10)];
            return result;
        }

        var thirdParam = fieldStrArr[2];
        if (thirdParam.startsWith("[")) {
            thirdParam = thirdParam.substring(1, thirdParam.length - 1);
            if (thirdParam.indexOf("-") >= 0) {
                var arr = thirdParam.split("-");
                result.data = [random(parseInt(arr[0]), parseInt(arr[1]))];
                return result;
            } else {
                var arr = thirdParam.split(",");
                result.data = arr;
                return result;
            }
        }

        return null;
    }

    function parseDouble(fieldStr) {
        /*
        double
        name:d             //随机生成保留两位小数的浮点数，(默认是2位)
        name:d:[1.1,2,3.2] //枚举
        name:d:[1-10]    //随机生成[1,10]范围内的(包括1和10)保留2位小数的浮点数
        */
        var result = {};
        var fieldStrArr = fieldStr.split(":");
        result.name = fieldStrArr[0];

        if (fieldStrArr.length == 2) {
            result.data = [randomDouble(0, 10)];
            return result;
        }

        var thirdParam = fieldStrArr[2];
        if (thirdParam.startsWith("[")) {
            thirdParam = thirdParam.substring(1, thirdParam.length - 1);

            if (thirdParam.indexOf("-") >= 0) {
                var arr = thirdParam.split("-");
                result.data = [randomDouble(parseInt(arr[0]), parseInt(arr[1]))];
                return result;
            } else {
                var arr = thirdParam.split(",");
                result.data = arr;
                return result;
            }
        }

        return null;
    }

    function parseBool(fieldStr) {
        /*
        boolean
        name:b             //随机生成一个布尔值
        name:b:all         //true和false
        name:b:0           //false
        name:b:1           //true
        */
        var result = {};
        var fieldStrArr = fieldStr.split(":");
        result.name = fieldStrArr[0];

        if (fieldStrArr.length == 2) {
            result.data = [true, false];
            return result;
        }

        var thirdParam = fieldStrArr[2];
        if (thirdParam == "r") {
            result.data = [randomBool()];
            return result;
        } else if (thirdParam == "0") {
            result.data = [false];
            return result;
        } else if (thirdParam == "1") {
            result.data = [true];
            return result;
        } else {
            result.data = [randomBool()];
            return result;
        }

        return null;
    }


    function parseObject(fieldStr) {
        /*
        object
        name:o:child       //child是具体的子对象
        */
        var result = {};
        var fieldStrArr = fieldStr.split(":");
        result.name = fieldStrArr[0];
        result.type = "object";
        result.data = fieldStrArr[2];

        return result;
    }

    function getLongestChildArrLength(obj) {
        var longestLength = 0;
        for (var i in obj) {
            longestLength = (longestLength > obj[i].length) ? longestLength : obj[i].length;
        }
        return longestLength;
    }

    function getElementFromArray(arr, index) {
        if (!arr || !arr.length || index == undefined || index < 0) return "";
        var length = arr.length;
        return (index < length) ? arr[index] : arr[random(0, length - 1)];
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomDouble(min, max) {
        min = min * 100;
        max = max * 100;
        return (Math.floor(Math.random() * (max - min + 1)) + min) / 100;
    }

    function randomStr(length) {
        length = length || 5;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function randomBool() {
        return Math.floor(Math.random() * (10 - 0 + 1)) % 2 == 0;
    }


}
