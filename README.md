# Introduction
Using the Parser.parse(str)  function, u can create some sample data by parsing inputed config strings.

# A tool based on DataMocker
![Alt demo](https://github.com/yaojijiayou/DataMocker/blob/master/demo.gif)

# Example
- Input config strings
````
root#username:string|gender:i:[0,1]|inSchool:b|child:object:childObj
childObj#name:s:[Tom,Jack]|weight:double:[40,70]|teacher:o:teacher
teacher#name:s|gender:i:[0,1]|age:i:[20-30]
````

- Output
````
[
    {
        "username": "WUA3j",
        "gender": "0",
        "inSchool": true,
        "child": {
            "name": "Tom",
            "weight": "40",
            "teacher": {
                "name": "wlPpP",
                "gender": "0",
                "age": 28
            }
        }
    },
    {
        "username": "WUA3j",
        "gender": "1",
        "inSchool": false,
        "child": {
            "name": "Jack",
            "weight": "70",
            "teacher": {
                "name": "wlPpP",
                "gender": "1",
                "age": 28
            }
        }
    }
]
````



# How to config
- String
````
name:s:[aa,bb,cc] //enum
name:s:10         //get a random string whose length is 10
name:s            ///get a random string whose length is 10 by default
u can use 's' or 'string' to stand for 'string'
````

- int/long
````
name:i:[1-100]    //get a random in [1,100](both inclusive)
name:i:[1,2,3]	  //enum
name:i            //get a random int in [0,10] by default
u can use 'i','int','integer','l','long' as the second param
````
- double/float
````
name:d             //get a random float num which is fix to 2 by default
name:d:[1.1,2,3.2] //enum
name:d:[1-10]      //get a flaot num in [1,100](both inclusive)
u can use 'd','double','f','float' as the second param
````
- boolean
````
name:b             //true and false
name:b:r           //a random bool
name:b:0           //false
name:b:1           //true
u can use 'b','bool','boolean' as the second param
````
- object
````
name:o:child       //child is a another object
u can use 'o','object' as the second param
````

# Others
- Although the output json is not that large,  I promise that the sample data has covered all the possibilities implies in your config strings
- Pls ignore other files, just pay attention to the Parser.js.



