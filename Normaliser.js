function Normaliser(){
    var NORMALOBJ = {};

    this.normalize = function(str,callback){
        if(!str) return;
        NORMALOBJ = {};
        var lines = str.split('\n');
        for(var i = 0;i < lines.length;i++) normalizeOneLine(lines[i].trim());
        if(callback) callback(NORMALOBJ);
    }

    function removeEmptyElement(arr){
    	var result = [];
    	for(var i=0;i<arr.length;i++){
    		if(arr[i]) result.push(arr[i]);
    	}
    	return result;
    }

    function normalizeOneLine(lineStr){
        if(!lineStr) return;
        var strArr = removeEmptyElement(lineStr.split("\t"));
        if(strArr.length != 3) return;

        var objName = strArr[0],fieldName = strArr[1],fieldType = strArr[2];

        if(!NORMALOBJ[objName]) NORMALOBJ[objName] = objName+"#";
        
        if(fieldType.indexOf("List") >=0 ){
        	newFieldType = fieldType.substring(5,fieldType.length-1);
			NORMALOBJ[objName] += fieldName + ":o:"+newFieldType +"|";
        	return;
        }

        switch(fieldType.toLowerCase()){
        	case 'object':
        		NORMALOBJ[objName] += fieldName + ":"  +fieldType.toLowerCase()+":"+fieldName +"|";
        		break;
        	case 'map':
        		NORMALOBJ[objName] += fieldName + ":o:map|";
        		break;
        	default:
        		NORMALOBJ[objName] += fieldName + ":"  +fieldType.toLowerCase()+ "|";
        		break;

        }
        
    }

}


