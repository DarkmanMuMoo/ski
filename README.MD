# How to run 

The program take 2 parameter which is location in array 8x8  according from the snippet below. 
```
const map = [
    [51, 39, 64, 4, 42, 15, 23, 35],
    [20, 84, 66, 91, 72, 38, 19, 55],
    [94, 7, 28, 99, 36, 69, 8, 99],
    [79, 98, 91, 73, 11, 60, 76, 61],
    [98, 40, 65, 40, 54, 88, 74, 73],
    [71, 40, 63, 43, 77, 82, 97, 71],
    [89, 24, 71, 24, 93, 79, 23, 71],
    [76, 14, 43, 86, 73, 19, 47, 71],
];

```
You can run the program by following this pattern.  ``` node index.js ${x} ${y}```

### Example
```
  node index.js 3 1
 
  node index.js 2 7

  node index.js 0 4

```
# ISSUE

I wrote this on node v8.10.0 enviroment using some ES6 feature. Please make sure you run this with the same version or higher.


