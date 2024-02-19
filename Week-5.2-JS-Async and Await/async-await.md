Welcome to the Modern Application Development - 2 Screencasts. In this screencast we will explore javascript ASYNC functions and AWAIT keyword.

For this you will need 

- Browser Firefox or Chrome

### JavaScript
Note from [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)
In its most basic form, JavaScript is a synchronous, blocking, single-threaded language, in which only one operation can be in progress at a time. 

But that said, web browsers define functions and APIs that allow us to register functions that should not be executed synchronously, and should instead be invoked asynchronously when some kind of event occurs.
- the passage of time - timeout 
- the user's interaction with the mouse or keybaord - like on click
- the arrival of data over the network - AJAX requests

This means that you can let your code do several things at the same time without stopping or blocking your main thread. So can become unblocking. Some of the built in functions are aync by default, like fetch or ajax


In this session we will look into how to make functions async. We will also learn how to use the keyword AWAIT.


# Standard JS functions as SYNC

```javascript
function say_hello(){
    return "hello";
}
console.log("before")
wish = say_hello()
console.log(wish)
console.log("after")
````
# Convert that into async

```javascript
async function say_hello(){
    return "async hello";
}
console.log("before")
wish = say_hello()
console.log(wish)
console.log("after")
````
It doesn't return the result but returns a Promise.

So we get the result when the promise gets fullfilled.

```javascript
async function say_hello(){
    return "async hello";
}
console.log("before")
wish = say_hello()
console.log(wish)
wish.then((v) => console.log(v))
console.log("after")
````


We generally use promise to resolve it
```javascript
async function say_hello(){
    return new Promise(resolve => { resolve('async hello'); } )
}
console.log("before")
wish = say_hello()
console.log(wish)
wish.then((v) => console.log(v))
console.log("after")
````

It becomes easy to visualize when you are doing some processing

```javascript
async function say_hello(){
    return new Promise((resolve, reject) => {
        //resolve after two seconds
        //you could be doing non cpu stuff
        setTimeout(function(){
          resolve("async hello");
        }, 2000);
      });
}
console.log("before")
wish = say_hello()
console.log(wish)
wish.then((v) => console.log(v))
console.log("after")
```

# Convert to sync like using AWAIT keyword

```javascript
async function say_hello(){
    return new Promise((resolve, reject) => {
        //resolve after two seconds
        //you could be doing non cpu stuff
        setTimeout(function(){
          resolve("async hello");
        }, 2000);
      });
}
console.log("before")
wish = await say_hello()
console.log(wish)
console.log("after")
```

## Calling await in a SYNC
This will throw - Uncaught SyntaxError: await is only valid in async functions, async generators and modules.
Except in Developer tools
- https://developer.chrome.com/blog/new-in-devtools-62/#await


```javascript
async function say_hello(){
    return new Promise((resolve, reject) => {
        //resolve after two seconds
        //you could be doing non cpu stuff
        setTimeout(function(){
          resolve("async hello");
        }, 2000);
      });
}
function greetings(){
    console.log("before")
    wish = await say_hello()
    console.log(wish)
    console.log("after")
    return wish
}
greetings()
```

You always call AWAIT inside an async function

```javascript
async function say_hello(){
    return new Promise((resolve, reject) => {
        //resolve after two seconds
        //you could be doing non cpu stuff
        setTimeout(function(){
          resolve("async hello");
        }, 2000);
      });
}
async function greetings(){
    console.log("before")
    wish = await say_hello()
    console.log(wish)
    console.log("after")
    return wish
}
x = greetings()
console.log(x)
//x.then((v) => console.log(v))

```

```javascript
async function say_hello(){
    return new Promise((resolve, reject) => {
        //resolve after two seconds
        //you could be doing non cpu stuff
        setTimeout(function(){
          resolve("async hello");
        }, 2000);
      });
}
async function greetings(){
    console.log("before")
    wish = await say_hello()
    console.log(wish)
    console.log("after")
    return wish
}
//only because we are in the console
x = await greetings()
console.log(x)
```

## Error handling

on async function

```javascript
async function say_hello(){
    return new Promise((resolve, reject) => {
        //resolve after two seconds
        //you could be doing non cpu stuff
        setTimeout(function(){
          reject("error: async hello");
        }, 2000);
      });
}

say_hello()
.then((v) => console.log(v))
.catch(e => {
    console.log("GOT ERROR")
    console.log(e);
})


```

if you use AWAIT then you can use. try catch.




Whether we want to run code synchronously or asynchronously will depend on what we're trying to do.

Overtime you will understand and plan which functions need to be in sync and which one can be async.