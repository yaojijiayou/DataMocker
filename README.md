# Introduction
Using the Parser.parse(str)  function, u can create some sample data by parsing inputed config strings.

# Example
 - Input
 - root#username:string|gender:i:[0,1]|inSchool:b|child:object:childObj
   childObj#name:s:[Tom,Jack]|weight:double:[40,70]|teacher:o:teacher
   teacher#name:s|gender:i:[0,1]|age:i:[20-30]

