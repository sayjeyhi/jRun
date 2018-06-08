# jRun
Main javascript library to manage our js files and handle site creating in a fast and easy
build passing ...

Demo at : http//jrjs.ir

##Installation
using npm :
```bash
npm i --save jrjs.ir
```
in browser :
```html
<script type="application/javascript" src="jRun/Dist/jRun.js"></script>
```

Usage :
```javascript
jRun.plugins = [{
    url : "vivus/vivus.min" ,
    kind : "PlugIn"
}];
jRun.buildPlugIns();

jRun.init(
    [
        "javascript1",
        "path/javascript.min",
        {
            url : ['file1.js' , 'file2.js'],
            attributes : {class : 'myFiles'},
            multiFileUrl : true,
            afterLoad : function(){
                // some code after this part load
            }
        },
        {
            url: "style.css",
            kind: "Folder",
            waitLoading: false
        }
    ], function () {
        // my codes after files load
    }
);
```
