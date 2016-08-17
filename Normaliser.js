function Normaliser(){
    var NORMALOBJ = {};

    this.normalize = function(str,callback){
        NORMALOBJ = {};
        if(!str) return;
        var lines = str.split('\n');
        for(var i = 0;i < lines.length;i++) normalizeOneLine(lines[i].trim());
        if(callback) callback(NORMALOBJ);
        
    }

    function normalizeOneLine(lineStr){
        if(!lineStr) return;
        var strArr = lineStr.split("\t");
        if(strArr.length != 3) return;

        var objName = strArr[0],fieldName = strArr[1],fieldType = strArr[2];

        if(!NORMALOBJ[objName]) NORMALOBJ[objName] = objName+"#";

        if(fieldType.toLowerCase()=="object"){
            NORMALOBJ[objName] += fieldName + ":"  +fieldType.toLowerCase()+":"+fieldName +"|";
        }
        else{
            NORMALOBJ[objName] += fieldName + ":"  +fieldType.toLowerCase()+ "|";
        }
        
    }

}


